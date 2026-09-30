/* Game state and actions. Pure logic, no DOM. Emits events through `on(fn)`.
 * Balance numbers all come from data (window.DOCKSIDE_DATA). */
(function (root) {
  "use strict";
  var R = (typeof module !== "undefined" && module.exports) ? require("./rules.js") : root.DS.rules;
  var SAVE_KEY = "dockside-save-v1";
  var LOT_COUNT = 3;

  function Game(rawData, opts) {
    opts = opts || {};
    this.d = R.indexData(rawData);
    this.listeners = [];
    this.storage = opts.storage || null;
    this.reset(opts.seed != null ? opts.seed : (Date.now() >>> 0));
  }

  Game.prototype.reset = function (seed) {
    this.s = {
      version: 1,
      money: this.d.config.startMoney,
      lifetime: 0,           // earnings this business (resets on prestige)
      totalEarned: 0,        // all-time, never resets
      levels: {},
      collected: [],         // item ids placed in the collection book (persist)
      completed: [],         // collection ids completed (persist)
      stars: 0,
      rngState: seed >>> 0,
      lots: [],
      current: null,
      history: [],           // last few tallies
      stats: { opened: 0, best: null, found: { junk: 0, common: 0, rare: 0, epic: 0, legendary: 0 } }
    };
    this.refreshLots();
  };

  Game.prototype.on = function (fn) { this.listeners.push(fn); };
  Game.prototype.emit = function (type, payload) {
    for (var i = 0; i < this.listeners.length; i++) this.listeners[i](type, payload || {});
  };

  Game.prototype.nextSeed = function () {
    var rng = new R.Mulberry32(this.s.rngState);
    var v = Math.floor(rng.next() * 4294967296) >>> 0;
    this.s.rngState = rng.a;
    return v;
  };

  Game.prototype.stats = function () {
    return R.computeStats(this.d, this.s.levels, this.s.completed, this.s.stars);
  };

  // ------------------------------------------------------------ auction
  Game.prototype.availableContainers = function () {
    var access = this.stats().tierAccess;
    return R.buyableContainers(this.d).filter(function (c) { return c.tier <= access; });
  };

  /* Lots: the best unlocked classes, newest first, so the next step up is always visible. */
  Game.prototype.refreshLots = function () {
    var avail = this.availableContainers().slice().reverse();
    var lots = [];
    for (var i = 0; i < LOT_COUNT; i++) {
      var c = avail[Math.min(i, avail.length - 1)];
      lots.push({ containerId: c.id, seed: this.nextSeed(), serial: 100000 + (this.nextSeed() % 900000) });
    }
    this.s.lots = lots;
    this.emit("lots");
  };

  Game.prototype.lotPreview = function (lot) {
    var c = this.d.containerById[lot.containerId];
    var st = this.stats();
    var g = R.generate(this.d, c, st.luck, lot.seed);
    var peekN = c.peekTiles + st.peekBonus;
    var rng = new R.Mulberry32(lot.seed ^ 0x5bd1e995);
    var cells = [];
    for (var i = 0; i < c.cols * c.rows; i++) cells.push(i);
    var peek = [];
    for (var k = 0; k < peekN && cells.length; k++) {
      var j = Math.floor(rng.next() * cells.length);
      peek.push(cells.splice(j, 1)[0]);
    }
    return { container: c, gen: g, peek: peek };
  };

  Game.prototype.canAfford = function (amount) { return this.s.money >= amount - 1e-9; };

  Game.prototype.safetyNetAvailable = function () {
    var cheapest = Math.min.apply(null, this.availableContainers().map(function (c) { return c.price; }));
    return !this.s.current && this.s.money < cheapest;
  };

  Game.prototype.buyLot = function (index) {
    if (this.s.current) return false;
    var lot = this.s.lots[index];
    var p = this.lotPreview(lot);
    if (!this.canAfford(p.container.price)) return false;
    this.s.money -= p.container.price;
    this.startContainer(p.container, p.gen, p.peek, lot.serial);
    this.s.lots.splice(index, 1);
    var avail = this.availableContainers().slice().reverse();
    this.s.lots.push({ containerId: avail[Math.min(this.s.lots.length, avail.length - 1)].id,
                       seed: this.nextSeed(), serial: 100000 + (this.nextSeed() % 900000) });
    this.emit("lots");
    return true;
  };

  Game.prototype.takeScrapPile = function () {
    if (!this.safetyNetAvailable()) return false;
    var c = this.d.containerById[this.d.config.safetyNet.containerId];
    var g = R.generate(this.d, c, this.stats().luck, this.nextSeed());
    this.startContainer(c, g, [], 0);
    return true;
  };

  Game.prototype.startContainer = function (c, gen, peek, serial) {
    var n = c.cols * c.rows, hp = [], i;
    for (i = 0; i < n; i++) hp.push(c.rustHp);
    this.s.current = {
      containerId: c.id, price: c.price, serial: serial, gen: gen, hp: hp,
      itemState: gen.items.map(function () { return { revealed: false, sold: false, kept: false }; }),
      found: 0, done: false
    };
    this.emit("start", { container: c });
    for (i = 0; i < peek.length; i++) this.damage(peek[i], c.rustHp, true);
  };

  // ------------------------------------------------------------ scraping
  /* Player scrapes at a tile: brush pattern around it, scrape power per tile. */
  Game.prototype.scrape = function (cell) {
    var cur = this.s.current;
    if (!cur || cur.done) return;
    var c = this.d.containerById[cur.containerId];
    var st = this.stats();
    var patterns = this.d.config.scraping.brushPatterns;
    var pat = patterns[Math.min(st.brush, patterns.length - 1)];
    var x0 = cell % c.cols, y0 = Math.floor(cell / c.cols);
    for (var i = 0; i < pat.length; i++) {
      var x = x0 + pat[i][0], y = y0 + pat[i][1];
      if (x < 0 || y < 0 || x >= c.cols || y >= c.rows) continue;
      this.damage(y * c.cols + x, st.scrapePower, false);
    }
  };

  Game.prototype.damage = function (cell, amount, silent) {
    var cur = this.s.current;
    if (!cur || cur.hp[cell] <= 0) return;
    cur.hp[cell] = Math.max(0, cur.hp[cell] - amount);
    this.emit("tile", { cell: cell, hp: cur.hp[cell], silent: silent });
    if (cur.hp[cell] > 0) return;
    var idx = cur.gen.cells[cell];
    var it = cur.gen.items[idx];
    var c = this.d.containerById[cur.containerId];
    // Item revealed once all its tiles are clear.
    for (var dy = 0; dy < it.h; dy++)
      for (var dx = 0; dx < it.w; dx++)
        if (cur.hp[(it.y + dy) * c.cols + (it.x + dx)] > 0) return;
    this.revealItem(idx, silent);
  };

  Game.prototype.revealItem = function (idx, silent) {
    var cur = this.s.current;
    var st = this.itemState(idx);
    if (st.revealed) return;
    st.revealed = true;
    var it = cur.gen.items[idx];
    var sale = it.value * this.stats().sellTotal;
    cur.found += sale;
    this.s.stats.found[it.rarity]++;
    var colId = this.d.collectionOfItem[it.id];
    var keptHere = cur.gen.items.some(function (other, j) { return j !== idx && other.id === it.id && cur.itemState[j].kept; });
    var forCollection = !!colId && this.s.collected.indexOf(it.id) === -1 && !keptHere;
    if (forCollection) st.kept = true;
    this.emit("reveal", { index: idx, item: it, def: this.d.itemById[it.id], sale: sale,
                          forCollection: forCollection, silent: silent });
    if (!forCollection && it.rarity === "junk" && this.stats().autoSellJunk) this.sellItem(idx, true);
    this.checkDone();
  };

  Game.prototype.itemState = function (idx) { return this.s.current.itemState[idx]; };

  Game.prototype.checkDone = function () {
    var cur = this.s.current;
    if (cur.done) return;
    for (var i = 0; i < cur.hp.length; i++) if (cur.hp[i] > 0) return;
    cur.done = true;
    var tally = { containerId: cur.containerId, paid: cur.price, found: cur.found,
                  profit: cur.found - cur.price, serial: cur.serial };
    this.s.stats.opened++;
    if (cur.price > 0 && (!this.s.stats.best || tally.profit > this.s.stats.best.profit)) this.s.stats.best = tally;
    this.s.history.unshift(tally);
    this.s.history = this.s.history.slice(0, 8);
    this.emit("done", tally);
  };

  /* Auto-scraper: called by the UI loop with a target chooser for cosmetics. */
  Game.prototype.autoScrape = function (hits, pickCell) {
    var cur = this.s.current;
    if (!cur || cur.done) return;
    var power = this.stats().scrapePower;
    for (var h = 0; h < hits; h++) {
      var open = [];
      for (var i = 0; i < cur.hp.length; i++) if (cur.hp[i] > 0) open.push(i);
      if (!open.length) return;
      this.damage(pickCell(open), power, false);
    }
  };

  // ------------------------------------------------------------ selling
  Game.prototype.sellItem = function (idx, auto) {
    var cur = this.s.current, st = this.itemState(idx);
    if (!st.revealed || st.sold) return 0;
    var it = cur.gen.items[idx];
    var sale = it.value * this.stats().sellTotal;
    st.sold = true; st.kept = false;
    this.earn(sale);
    this.emit("sold", { index: idx, sale: sale, auto: !!auto });
    return sale;
  };

  Game.prototype.toggleKeep = function (idx) {
    var cur = this.s.current, st = this.itemState(idx);
    var it = cur.gen.items[idx];
    if (st.sold || !this.d.collectionOfItem[it.id] || this.s.collected.indexOf(it.id) !== -1) return;
    // Only one copy per collection slot: keeping this one releases any other copy.
    if (!st.kept) cur.gen.items.forEach(function (other, j) { if (j !== idx && other.id === it.id) cur.itemState[j].kept = false; });
    st.kept = !st.kept;
    this.emit("keep", { index: idx, kept: st.kept });
  };

  /* Close the container: sell everything not kept, file kept items into collections. */
  Game.prototype.finishContainer = function () {
    var cur = this.s.current;
    if (!cur || !cur.done) return null;
    var sold = 0, filed = [];
    for (var i = 0; i < cur.gen.items.length; i++) {
      var st = cur.itemState[i], it = cur.gen.items[i];
      if (st.kept && this.s.collected.indexOf(it.id) === -1) {
        this.s.collected.push(it.id);
        filed.push(it.id);
      } else if (!st.sold) {
        sold += this.sellItem(i, true);
      }
    }
    var newlyCompleted = [];
    var self = this;
    this.d.collections.forEach(function (col) {
      if (self.s.completed.indexOf(col.id) !== -1) return;
      if (col.items.every(function (id) { return self.s.collected.indexOf(id) !== -1; })) {
        self.s.completed.push(col.id);
        newlyCompleted.push(col);
      }
    });
    this.s.current = null;
    this.emit("finished", { sold: sold, filed: filed, completed: newlyCompleted });
    this.save();
    return { sold: sold, filed: filed, completed: newlyCompleted };
  };

  Game.prototype.earn = function (amount) {
    this.s.money += amount;
    this.s.lifetime += amount;
    this.s.totalEarned += amount;
  };

  // ------------------------------------------------------------ upgrades
  Game.prototype.upgradeInfo = function (u) {
    var lv = this.s.levels[u.id] || 0;
    var maxed = lv >= u.maxLevel;
    return {
      level: lv, maxed: maxed,
      cost: maxed ? null : R.upgradeCost(u, lv),
      unlocked: R.requirementsMet(u, this.s.levels),
      nextName: u.levelNames && !maxed ? u.levelNames[lv] : null
    };
  };

  Game.prototype.buyUpgrade = function (id) {
    var u = this.d.upgradeById[id], info = this.upgradeInfo(u);
    if (info.maxed || !info.unlocked || !this.canAfford(info.cost)) return false;
    var beforeAccess = this.stats().tierAccess;
    this.s.money -= info.cost;
    this.s.levels[id] = info.level + 1;
    this.emit("upgrade", { upgrade: u, level: info.level + 1 });
    if (this.stats().tierAccess !== beforeAccess) this.refreshLots();
    else if (u.stat === "luck" || u.stat === "peekBonus") this.emit("lots");
    this.save();
    return true;
  };

  /* The cheapest thing the player can't afford yet: always show a next goal. */
  Game.prototype.nextGoal = function () {
    var best = null, self = this;
    this.d.upgrades.forEach(function (u) {
      var info = self.upgradeInfo(u);
      if (info.maxed || !info.unlocked || self.canAfford(info.cost)) return;
      if (!best || info.cost < best.cost) best = { upgrade: u, cost: info.cost };
    });
    return best;
  };

  // ------------------------------------------------------------ idle income and prestige
  Game.prototype.crewRate = function () { return R.crewIncomePerSec(this.d, this.stats()); };

  Game.prototype.tick = function (dt) {
    var rate = this.crewRate();
    if (rate > 0) this.earn(rate * dt);
  };

  Game.prototype.prestigePreview = function () {
    return R.prestigeStars(this.d, this.s.lifetime);
  };

  Game.prototype.prestige = function () {
    var gain = this.prestigePreview();
    if (gain < 1 || this.s.current) return false;
    this.s.stars += gain;
    this.s.money = this.d.config.startMoney;
    this.s.lifetime = 0;
    this.s.levels = {};
    this.refreshLots();
    this.emit("prestige", { gain: gain, stars: this.s.stars });
    this.save();
    return true;
  };

  // ------------------------------------------------------------ save
  Game.prototype.save = function () {
    if (!this.storage) return;
    try { this.storage.setItem(SAVE_KEY, JSON.stringify(this.s)); } catch (e) { /* storage unavailable */ }
  };

  Game.prototype.load = function () {
    if (!this.storage) return false;
    try {
      var raw = this.storage.getItem(SAVE_KEY);
      if (!raw) return false;
      var s = JSON.parse(raw);
      if (!s || s.version !== 1) return false;
      this.s = s;
      if (!this.s.lots || !this.s.lots.length) this.refreshLots();
      return true;
    } catch (e) { return false; }
  };

  Game.prototype.wipe = function () {
    try { if (this.storage) this.storage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
    this.reset(Date.now() >>> 0);
    this.emit("wipe");
  };

  if (typeof module !== "undefined" && module.exports) module.exports = Game;
  else { root.DS = root.DS || {}; root.DS.Game = Game; }
})(this);
