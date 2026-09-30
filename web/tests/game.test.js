// Game-logic tests (no browser).   node web/tests/game.test.js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const Game = require("../js/core/game.js");

const dataDir = path.join(__dirname, "..", "..", "data");
const raw = {};
for (const n of ["config", "containers", "items", "upgrades", "collections"]) {
  raw[n] = JSON.parse(fs.readFileSync(path.join(dataDir, n + ".json"), "utf8"));
}

function scrapeAll(g) {
  const cur = g.s.current;
  for (let guard = 0; guard < 10000 && !cur.done; guard++) {
    const i = cur.hp.findIndex(h => h > 0);
    g.scrape(i);
  }
}

let passed = 0;
function test(name, fn) { fn(); passed++; console.log("ok -", name); }

test("buy, scrape, finish: cash change equals the tally's cash line", () => {
  for (let seed = 1; seed < 60; seed++) {
    const g = new Game(raw, { seed });
    const start = g.s.money;
    assert.ok(g.buyLot(0));
    const price = g.s.current.price;
    scrapeAll(g);
    const cur = g.s.current;
    assert.ok(cur.done && cur.tally);
    const cash = g.cashValue();
    assert.ok(Math.abs(cur.tally.found - g.foundValue()) < 1e-9);
    assert.ok(Math.abs(cur.tally.profit - (cur.tally.found - price)) < 1e-9);
    g.finishContainer();
    assert.ok(Math.abs(g.s.money - (start - price + cash)) < 1e-6, "money mismatch at seed " + seed);
  }
});

test("buying Haggling mid-container keeps Found equal to what you get", () => {
  const g = new Game(raw, { seed: 3 });
  g.s.levels.auto_sell_junk = 1;          // some items sell during scraping
  g.s.money += 1000;
  const beforeBuy = g.s.money;
  g.buyLot(0);
  const cur = g.s.current;
  const afterBuy = beforeBuy - cur.price;   // peeked junk may auto-sell inside buyLot
  for (let i = 0; i < 6; i++) g.scrape(cur.hp.findIndex(h => h > 0));
  const upgradeCost = 100;   // Haggling level 1 (data/upgrades.json)
  assert.ok(g.buyUpgrade("haggle"));
  scrapeAll(g);
  cur.itemState.forEach(st => { st.kept = false; });   // sell everything
  const found = g.foundValue();
  g.finishContainer();
  const received = g.s.money - afterBuy + upgradeCost;
  assert.ok(Math.abs(received - found) < 1e-6, `received ${received} vs found ${found}`);
});

test("only one copy of an item is kept for a collection", () => {
  for (let seed = 1; seed < 400; seed++) {
    const g = new Game(raw, { seed });
    g.buyLot(0);
    scrapeAll(g);
    const cur = g.s.current;
    const keptIds = cur.gen.items.filter((it, i) => cur.itemState[i].kept).map(it => it.id);
    assert.strictEqual(new Set(keptIds).size, keptIds.length, "duplicate kept at seed " + seed);
  }
});

test("cannot buy what you cannot afford; money never negative", () => {
  const g = new Game(raw, { seed: 7 });
  g.s.money = 1;
  assert.strictEqual(g.buyLot(0), false);
  assert.strictEqual(g.buyUpgrade("license"), false);
  assert.ok(g.s.money >= 0);
  assert.ok(g.safetyNetAvailable());
  assert.ok(g.takeScrapPile());
});

test("license unlocks the next class in the auction", () => {
  const g = new Game(raw, { seed: 3 });
  g.s.money = 1e6;
  assert.ok(g.buyUpgrade("license"));
  assert.ok(g.s.lots.some(l => l.containerId === "standard"));
});

test("prestige keeps collections and stars, resets money and upgrades", () => {
  const g = new Game(raw, { seed: 5 });
  g.s.lifetime = raw.config.prestige.earningsPerStarSquared * 4;
  g.s.levels = { haggle: 3 };
  g.s.collected = ["toaster"];
  assert.ok(g.prestige());
  assert.strictEqual(g.s.stars, 2);
  assert.deepStrictEqual(g.s.levels, {});
  assert.deepStrictEqual(g.s.collected, ["toaster"]);
  assert.strictEqual(g.s.money, raw.config.startMoney);
});

test("save and load round-trip", () => {
  const store = {};
  const storage = { setItem: (k, v) => { store[k] = v; }, getItem: k => store[k] || null, removeItem: k => { delete store[k]; } };
  const g = new Game(raw, { seed: 9, storage });
  g.s.money = 12345;
  g.save();
  const h = new Game(raw, { seed: 10, storage });
  assert.ok(h.load());
  assert.strictEqual(h.s.money, 12345);
});

console.log(`\n${passed} tests passed`);
