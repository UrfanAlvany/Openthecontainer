// Game-logic tests (no browser).   node web/tests/game.test.js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const Game = require("../js/core/game.js");

const dataDir = path.join(__dirname, "..", "..", "data");
const raw = {};
for (const n of ["config", "containers", "items", "upgrades", "collections", "rivals", "contracts"]) {
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
    let bonus = 0;
    g.on((type, p) => { if (type === "contract") bonus += p.contract.reward; });
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
    assert.ok(Math.abs(g.s.money - (start - price + cash + bonus)) < 1e-6, "money mismatch at seed " + seed);
  }
});

test("buying Haggling mid-container keeps Found equal to what you get", () => {
  const g = new Game(raw, { seed: 3 });
  let bonus = 0;
  g.on((type, p) => { if (type === "contract") bonus += p.contract.reward; });
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
  const received = g.s.money - afterBuy + upgradeCost - bonus;
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

test("auction: bid until won or outbid; money stays consistent; lot class mix is kept", () => {
  for (let seed = 1; seed < 80; seed++) {
    const g = new Game(raw, { seed });
    g.s.money = 1e6;
    g.buyUpgrade("license");
    let bonus = 0;
    g.on((type, p) => { if (type === "contract") bonus += p.contract.reward; });
    const classes = g.s.lots.map(l => l.containerId).sort().join();
    const i = g.s.lots.findIndex(l => l.containerId === "standard");
    assert.ok(g.openBidding(i));
    const before = g.s.money;
    let result = null;
    for (let k = 0; k < 200 && g.s.bidding; k++) {
      if (g.s.bidding.holder === "you") result = g.rivalTurn();
      else if (g.biddingInfo().nextBid > 1200) { g.passBidding(); result = "passed"; }
      else assert.ok(g.playerBid());
    }
    assert.strictEqual(g.s.bidding, null);
    if (result === "won") {
      assert.ok(g.s.current, "container should be open after winning");
      assert.ok(Math.abs(before + bonus - g.s.money - g.s.current.price) < 1e-9);
      assert.ok(g.s.current.price <= 1200 + 1e-9);
    } else {
      assert.strictEqual(g.s.money, before);
    }
    assert.strictEqual(g.s.lots.map(l => l.containerId).sort().join(), classes);
  }
});

test("auction in the game matches the simulator's auctionOutcome", () => {
  const R = require("../js/core/rules.js");
  for (let seed = 1; seed < 60; seed++) {
    const g = new Game(raw, { seed });
    g.s.money = 1e6;
    g.buyUpgrade("license");
    const i = g.s.lots.findIndex(l => l.containerId === "standard");
    const p = g.lotPreview(g.s.lots[i]);
    const limit = p.container.price * 1.1;
    const expected = R.auctionOutcome(p.auction, limit);
    g.openBidding(i);
    let won = false;
    for (let k = 0; k < 200 && g.s.bidding; k++) {
      if (g.s.bidding.holder === "you") { if (g.rivalTurn() === "won") won = true; }
      else if (g.biddingInfo().nextBid > limit) g.passBidding();
      else g.playerBid();
    }
    assert.strictEqual(won, expected.won, "seed " + seed);
    if (won) assert.ok(Math.abs(g.s.current.price - expected.price) < 1e-9, "seed " + seed);
  }
});

test("upgrades are blocked while bidding", () => {
  const g = new Game(raw, { seed: 4 });
  g.s.money = 1e6;
  g.buyUpgrade("license");
  g.openBidding(g.s.lots.findIndex(l => l.containerId === "standard"));
  assert.strictEqual(g.buyUpgrade("haggle"), false);
});

test("contracts: always two on offer; completing one pays its fixed reward and refills", () => {
  const g = new Game(raw, { seed: 11 });
  assert.strictEqual(g.s.contracts.length, raw.contracts.active);
  let paid = 0;
  g.on((type, p) => { if (type === "contract") paid += p.contract.reward; });
  g.s.money = 1e6;
  for (let k = 0; k < 40; k++) {
    if (!g.buyLot(0)) break;
    scrapeAll(g);
    g.finishContainer();
  }
  assert.ok(paid > 0, "no contract completed in 40 containers");
  assert.strictEqual(g.s.contracts.length, raw.contracts.active);
  g.s.contracts.forEach(c => assert.ok(c.progress < c.n));
});

test("a save taken while the room is answering your bid resumes cleanly", () => {
  const store = {};
  const storage = { setItem: (k, v) => { store[k] = v; }, getItem: k => store[k] || null, removeItem: k => { delete store[k]; } };
  const g = new Game(raw, { seed: 21, storage });
  g.s.money = 1e6;
  g.buyUpgrade("license");
  g.openBidding(g.s.lots.findIndex(l => l.containerId === "standard"));
  assert.ok(g.playerBid());
  g.save();                                   // tab killed before rivalTurn
  const h = new Game(raw, { seed: 22, storage });
  assert.ok(h.load());
  assert.ok(!h.s.bidding || h.s.bidding.holder !== "you", "stuck holding the bid after reload");
});

test("free scrap piles never advance or pay contracts", () => {
  const g = new Game(raw, { seed: 8 });
  g.s.contracts = [{ tpl: "curator", progress: 0, n: 1, classId: "rusty", amount: 0, reward: 999 }];
  g.s.money = 0;
  assert.ok(g.takeScrapPile());
  scrapeAll(g);
  g.s.current.itemState.forEach(st => { st.kept = false; });
  // Force a collection filing from the pile.
  const cur = g.s.current;
  const idx = cur.gen.items.findIndex(it => raw.collections.collections.some(c => c.items.includes(it.id)));
  if (idx >= 0) cur.itemState[idx].kept = true;
  const before = g.s.money;
  g.finishContainer();
  assert.ok(g.s.contracts.some(c => c.tpl === "curator" && c.progress === 0));
  assert.ok(g.s.money - before < 999);
});

test("rivals bid the same on average whatever the player's luck", () => {
  const R = require("../js/core/rules.js");
  const d = R.indexData(raw), c = d.containerById.standard;
  const mean = luck => {
    let t = 0, n = 0;
    for (let seed = 1; seed < 1500; seed++) {
      const a = R.auctionSetup(d, c, R.generate(d, c, luck, seed), seed, luck);
      a.rivals.forEach(r => { t += r.max; n++; });
    }
    return t / n;
  };
  const m0 = mean(0), m8 = mean(8);
  assert.ok(Math.abs(m8 / m0 - 1) < 0.03, `luck changed average rival limit by ${((m8 / m0 - 1) * 100).toFixed(1)}%`);
});

console.log(`\n${passed} tests passed`);
