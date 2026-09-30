// Prints generated containers for fixed seeds as JSON (used by sim/test_parity.py).
const fs = require("fs");
const path = require("path");
const R = require("../js/core/rules.js");
const root = path.join(__dirname, "..", "..", "data");
const raw = {};
for (const n of ["config", "containers", "items", "upgrades", "collections", "rivals", "contracts"]) {
  raw[n] = JSON.parse(fs.readFileSync(path.join(root, n + ".json"), "utf8"));
}
const d = R.indexData(raw);
const out = { rng: [], gens: [], costs: {} };
const rng = new R.Mulberry32(12345);
for (let i = 0; i < 5; i++) out.rng.push(rng.next());
for (const c of d.containers) {
  for (const luck of [0, 7]) {
    for (const seed of [1, 42, 4294967295]) {
      const g = R.generate(d, c, luck, seed);
      out.gens.push({ c: c.id, luck, seed, cells: g.cells, items: g.items.map(i => [i.id, i.x, i.y, i.condition]) });
    }
  }
}
out.auctions = [];
for (const c of d.containers.filter(c => c.price > 0)) {
  for (const seed of [3, 77, 123456789, 4000000000]) {
    const g = R.generate(d, c, 0, seed);
    const a = R.auctionSetup(d, c, g, seed);
    const outcomes = [0.5, 0.9, 1.0, 1.2, 2.0].map(w => R.auctionOutcome(a, c.price * w));
    out.auctions.push({ c: c.id, seed, setup: a, outcomes, peek: R.peekCells(c, seed, 5), nice: R.niceRound(c.price * 0.08) });
  }
}
out.ev = {};
for (const c of d.containers) out.ev[c.id] = [R.expectedValue(d, c.id, 0), R.expectedValue(d, c.id, 5)];
for (const u of d.upgrades) out.costs[u.id] = Array.from({ length: u.maxLevel }, (_, l) => R.upgradeCost(u, l));
process.stdout.write(JSON.stringify(out));
