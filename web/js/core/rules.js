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

  var api = {
    RARITIES: RARITIES, Mulberry32: Mulberry32, weightedIndex: weightedIndex,
    roundHalfUp: roundHalfUp, indexData: indexData, pool: pool,
    buyableContainers: buyableContainers, rarityWeights: rarityWeights, generate: generate,
    upgradeCost: upgradeCost, requirementsMet: requirementsMet, computeStats: computeStats,
    prestigeStars: prestigeStars, expectedValue: expectedValue, crewIncomePerSec: crewIncomePerSec
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.DS = root.DS || {}; root.DS.rules = api; }
})(this);
