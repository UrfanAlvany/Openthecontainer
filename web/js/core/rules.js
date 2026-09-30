/* Game rules. Must match sim/engine.py exactly for the same seed (see sim/test_parity.py).
 * Classic script: attaches to window.DS in the browser, module.exports in Node. */
(function (root) {
  "use strict";
  var RARITIES = ["junk", "common", "rare", "epic", "legendary"];

  // ------------------------------------------------------------ random numbers
  function Mulberry32(seed) { this.a = seed >>> 0; }
  Mulberry32.prototype.next = function () {
    this.a = (this.a + 0x6D2B79F5) >>> 0;
    var a = this.a;
    var t = Math.imul(a ^ (a >>> 15), 1 | a) >>> 0;
    t = ((t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  function weightedIndex(weights, u) {
    var total = 0, i;
    for (i = 0; i < weights.length; i++) total += weights[i];
    var x = u * total, last = 0;
    for (i = 0; i < weights.length; i++) {
      if (weights[i] <= 0) continue;
      last = i;
      x -= weights[i];
      if (x < 0) return i;
    }
    return last;
  }

  function roundHalfUp(x) { return Math.floor(x + 0.5); }

  // ------------------------------------------------------------ data helpers
  function indexData(raw) {
    var d = {
      config: raw.config,
      containers: raw.containers.containers,
      items: raw.items.items,
      baseStats: raw.upgrades.baseStats,
      categories: raw.upgrades.categories,
      upgrades: raw.upgrades.upgrades,
      collections: raw.collections.collections,
      auction: raw.rivals.auction,
      rivals: raw.rivals.rivals,
      contracts: raw.contracts,
      containerById: {}, itemById: {}, upgradeById: {}, collectionOfItem: {}
    };
    d.containers.forEach(function (c) { d.containerById[c.id] = c; });
    d.items.forEach(function (i) { d.itemById[i.id] = i; });
    d.upgrades.forEach(function (u) { d.upgradeById[u.id] = u; });
    d.collections.forEach(function (col) {
      col.items.forEach(function (iid) { d.collectionOfItem[iid] = col.id; });
    });
    return d;
  }

  function pool(d, container) {
    var t = container.itemTier;
    return d.items.filter(function (i) { return i.tiers[0] <= t && t <= i.tiers[1]; });
  }

  function buyableContainers(d) {
    return d.containers.filter(function (c) { return !c.safetyNetOnly; });
  }

  // ------------------------------------------------------------ rules
  function rarityWeights(d, container, luck) {
    var cfg = d.config.luck;
    return RARITIES.map(function (r) {
      var mult = Math.max(cfg.minMult, 1 + luck * cfg.perLevel[r]);
      return container.rarityWeights[r] * mult;
    });
  }

  /* Fill the grid. cells[i] = index into items of the item covering cell i. */
  function generate(d, container, luck, seed) {
    var rng = new Mulberry32(seed);
    var cols = container.cols, rows = container.rows, n = cols * rows, i, j, tmp;
    var order = [];
    for (i = 0; i < n; i++) order.push(i);
    for (i = n - 1; i > 0; i--) {
      j = Math.floor(rng.next() * (i + 1));
      tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    var p = pool(d, container);
    var weights = rarityWeights(d, container, luck);
    var conditions = d.config.conditions;
    var condWeights = conditions.map(function (c) { return c.weight; });
    var cells = [], items = [];
    for (i = 0; i < n; i++) cells.push(-1);

    function fits(x, y, w, h) {
      if (x + w > cols || y + h > rows) return false;
      for (var dy = 0; dy < h; dy++)
        for (var dx = 0; dx < w; dx++)
          if (cells[(y + dy) * cols + (x + dx)] !== -1) return false;
      return true;
    }

    for (var k = 0; k < n; k++) {
      var cell = order[k];
      if (cells[cell] !== -1) continue;
      var x = cell % cols, y = Math.floor(cell / cols);
      var rarity = RARITIES[weightedIndex(weights, rng.next())];
      var cands = p.filter(function (it) { return it.rarity === rarity && fits(x, y, it.w, it.h); });
      var item = cands[weightedIndex(cands.map(function (it) { return it.weight == null ? 1 : it.weight; }), rng.next())];
      var cond = conditions[weightedIndex(condWeights, rng.next())];
      var idx = items.length;
      items.push({ id: item.id, x: x, y: y, w: item.w, h: item.h, rarity: rarity,
                   condition: cond.id, value: item.value * cond.mult });
      for (var dy = 0; dy < item.h; dy++)
        for (var dx = 0; dx < item.w; dx++) cells[(y + dy) * cols + (x + dx)] = idx;
    }
    return { cells: cells, items: items };
  }

  function upgradeCost(upgrade, level) {
    var c = upgrade.cost;
    if (c.list) return c.list[level];
    return roundHalfUp(c.base * Math.pow(c.growth, level));
  }

  function requirementsMet(upgrade, levels) {
    return (upgrade.requires || []).every(function (r) { return (levels[r.id] || 0) >= r.level; });
  }

  function computeStats(d, levels, completed, stars) {
    var s = {};
    Object.keys(d.baseStats).forEach(function (k) { s[k] = d.baseStats[k]; });
    d.upgrades.forEach(function (u) {
      var lv = levels[u.id] || 0;
      if (lv) s[u.stat] += u.perLevel * lv;
    });
    d.collections.forEach(function (col) {
      if (completed && completed.indexOf(col.id) !== -1) s[col.reward.stat] += col.reward.add;
    });
    s.sellTotal = s.sellMult + (stars || 0) * d.config.prestige.sellBonusPerStar;
    return s;
  }

  function prestigeStars(d, lifetime) {
    return Math.floor(Math.sqrt(Math.max(0, lifetime) / d.config.prestige.earningsPerStarSquared));
  }

  var evCache = {};
  function expectedValue(d, containerId, luck, samples) {
    samples = samples || d.config.evSamples;
    var key = containerId + "|" + luck + "|" + samples;
    if (evCache[key] != null) return evCache[key];
    var c = d.containerById[containerId], total = 0;
    for (var s = 0; s < samples; s++) {
      var g = generate(d, c, luck, 1000003 + s);
      for (var i = 0; i < g.items.length; i++) total += g.items[i].value;
    }
    return (evCache[key] = total / samples);
  }

  function crewIncomePerSec(d, stats) {
    if (stats.crew <= 0) return 0;
    var tier = Math.min(stats.crewTier, stats.tierAccess);
    var c = buyableContainers(d).filter(function (c) { return c.tier === tier; })[0];
    var profit = expectedValue(d, c.id, stats.luck) * stats.sellTotal - c.price;
    return stats.crew * Math.max(0, profit) / d.config.crew.secondsPerContainer;
  }

  // ------------------------------------------------------------ auction (mirrors sim/engine.py)
  function niceRound(x) {
    if (x <= 0) return 0;
    var e = String(Math.floor(x)).length - 2;
    if (e >= 0) { var step = Math.pow(10, e); return roundHalfUp(x / step) * step; }
    var mult = Math.pow(10, -e);
    return roundHalfUp(x * mult) / mult;
  }

  function peekCells(container, seed, n) {
    var rng = new Mulberry32((seed ^ 0x5BD1E995) >>> 0);
    var cells = [], out = [];
    for (var i = 0; i < container.cols * container.rows; i++) cells.push(i);
    for (var k = 0; k < Math.min(n, container.cols * container.rows); k++) {
      var j = Math.floor(rng.next() * cells.length);
      out.push(cells.splice(j, 1)[0]);
    }
    return out;
  }

  function normal(rng) { return (rng.next() + rng.next() + rng.next() - 1.5) * 2.0; }

  function auctionSetup(d, container, gen, seed) {
    var a = d.auction, guide = container.price, tiles = container.cols * container.rows;
    var base = peekCells(container, seed, container.peekTiles);
    var avgTile = expectedValue(d, container.id, 0) / tiles;
    var seen = 0;
    for (var i = 0; i < base.length; i++) {
      var it = gen.items[gen.cells[base[i]]];
      seen += it.value / (it.w * it.h);
    }
    var ratio = base.length ? seen / (avgTile * base.length) : 1.0;
    var signal = Math.min(a.signalClamp[1], Math.max(a.signalClamp[0], (ratio - 1) * a.signalScale));
    var rng = new Mulberry32((seed ^ 0x9E3779B9) >>> 0);
    var pool = d.rivals.filter(function (r) { return r.minTier <= container.tier; });
    var count = a.minRivals + Math.floor(rng.next() * (a.maxRivals - a.minRivals + 1));
    var rivals = [];
    var picks = Math.min(count, pool.length);
    for (var k = 0; k < picks; k++) {
      var r = pool.splice(Math.floor(rng.next() * pool.length), 1)[0];
      var z = normal(rng);
      var mx = guide * r.mult * (1 + r.signalWeight * signal) * Math.max(0.3, 1 + r.spread * z);
      rivals.push({ id: r.id, max: mx });
    }
    return { opening: niceRound(guide * a.openingRatio), increment: niceRound(guide * a.incrementRatio),
             signal: signal, rivals: rivals };
  }

  function nextRaiser(setup, nextBid, last) {
    var n = setup.rivals.length;
    for (var k = 1; k <= n; k++) {
      var i = (last + k) % n;
      if (setup.rivals[i].max >= nextBid) return i;
    }
    return -1;
  }

  function auctionOutcome(setup, willingness) {
    var step = 0, bid = setup.opening, last = -1;
    if (willingness < bid) return { won: false, price: null };
    for (;;) {
      var nxt = setup.opening + (step + 1) * setup.increment;
      var i = nextRaiser(setup, nxt, last);
      if (i < 0) return { won: true, price: bid };
      last = i; step += 1; bid = nxt;
      var mine = setup.opening + (step + 1) * setup.increment;
      if (mine > willingness) return { won: false, price: bid };
      step += 1; bid = mine;
    }
  }

  var api = {
    RARITIES: RARITIES, Mulberry32: Mulberry32, weightedIndex: weightedIndex,
    roundHalfUp: roundHalfUp, indexData: indexData, pool: pool,
    buyableContainers: buyableContainers, rarityWeights: rarityWeights, generate: generate,
    upgradeCost: upgradeCost, requirementsMet: requirementsMet, computeStats: computeStats,
    prestigeStars: prestigeStars, expectedValue: expectedValue, crewIncomePerSec: crewIncomePerSec,
    niceRound: niceRound, peekCells: peekCells, auctionSetup: auctionSetup, nextRaiser: nextRaiser,
    auctionOutcome: auctionOutcome
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.DS = root.DS || {}; root.DS.rules = api; }
})(this);
