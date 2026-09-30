# GAME_DESIGN.md — Dockside (working title)

> **Version 0.2** (2026-09-30), Phase 1 design plus the Phase 3 auction and contracts. All numbers here are generated from
> `data/*.json`. The data files are the source of truth; if a number here disagrees with
> the data, the data wins. Re-run `python3 sim/run.py` after changing any number.

## 1. The game in one paragraph

You run a salvage yard at a night-time port. Every day the auction house puts sealed
shipping containers up for sale. Rusty boxes sell at the yard gate; bigger containers go
to auction, where you peek through the door crack and bid against the regulars. Then you scrape the rust off it tile by tile. Items sit under the rust
in real shapes: a coin fills one tile, a sports car fills eight. Uncovering a gold corner
tells you something big is there. Every container ends with a tally card: **Paid, Found,
Profit**. You sell your finds or keep them for collections, buy upgrades that make you
faster, luckier and richer, unlock bigger container classes, and finally sell the whole
business for a permanent reputation bonus and start again, stronger.

**Pillars**
1. **The reveal is the product.** Anticipation before, a payoff sized to the find after.
2. **Honest luck.** Published odds, outcomes decided before any animation, no rigged near-misses.
3. **Always a next goal.** Something is always almost affordable, and it's shown on screen.
4. **Readable in two seconds.** Every container ends with Paid / Found / Profit, big enough for a clip.

### Research → design (from RESEARCH.md)

| Research principle | How the design applies it | Status |
|---|---|---|
| Anticipation carries the reward | Items revealed piece by piece; glints on partly uncovered Epic/Legendary items; a 0.4 s build-up before big reveals | Prototype ✅ |
| Paid / Found / Profit on screen | Live meter while scraping plus the tally card | Prototype ✅ |
| Every container a coin-flip on profit | Starter tier: 57% of containers profit; bigger classes open slightly below break-even | Sim ✅ |
| Celebrate net profit, not the item | Loss → "dud" sound and a wobble; big profit → fanfare | Prototype ✅ |
| Readable rival bidders | Auction with 5 named regulars, honest tells, fixed private limits | Prototype ✅ |
| Stories and a heavy tail | 70 items with flavour text; the jackpot tail up to $7.5M | Prototype ✅ (more in Phase 4) |
| Hands-on first, automate later | Manual scraping → Wider Blade → Auto-Scraper → yard crew | Prototype ✅ |
| Exponential economy, visible goals | Cost = base × growth^level; "Next goal" bar | Prototype ✅ |
| Session clock / quota | Two optional port contracts at a time, with no timer and no fail state | Prototype ✅ |
| Rule-bending modifiers | Market events, buyer contracts, specialist appraisers | Phase 4 |
| Prestige as a deterministic conversion with a preview | "Sell the business" shows the stars you'd gain; collections persist | Prototype ✅ |
| Collections with a head start | 7 sets; first finds start filling sets immediately | Prototype ✅ (pity/duplicate trading in Phase 4) |
| Publish odds | Odds bar and percentages on every lot | Prototype ✅ |
| Docks, not casino | Industrial port visuals, no reels, no casino words | Prototype ✅ |
| Streamer features | Chat votes and value predictions | Phase 6 |

## 2. Core loop

```
 Lots ──► Peek (door crack, odds) ──► Buy at the gate (Rusty) / Bid vs rivals (Standard+)
   ▲                                              │ won                 │ walked away
   │                                              ▼                     ▼
 Upgrade ◄── Sell / keep ◄── Tally ◄── Doors open ─► Scrape ─► Reveal   "What was inside" card
   │
   ├──► Port contracts (optional cash goals)
   └──► Unlock bigger classes ──► Sell the business (prestige)
```

A container takes about 5–20 seconds early on (12–30 tiles). A session of 10 minutes is
about 40–80 containers and 10–20 upgrades.

## 3. Containers

| Class | Guide price | How it's sold | Grid | Rust HP | Expected value | EV / price | Odds per item (J/C/R/E/L %) |
|---|---:|---|---|---:|---:|---:|---|
| Dockside Scrap Pile | $0 | free when broke | 3×3 | 1 | $30 | free | 88 / 12 / 0 / 0 / 0 |
| Rusty Box | $95 | yard gate, fixed | 4×3 | 2 | $110 | 1.16× | 67 / 28 / 5 / 0.45 / 0.06 |
| Standard 20ft | $800 | auction | 6×5 | 3 | $802 | 1.00× | 65 / 30 / 4.6 / 0.7 / 0.12 |
| Premium 40ft | $6,000 | auction | 7×5 | 5 | $5,732 | 0.96× | 63 / 31 / 5.1 / 0.75 / 0.12 |
| Sealed Military | $51,000 | auction | 8×6 | 9 | $47,885 | 0.94× | 62 / 32 / 4.9 / 0.73 / 0.11 |
| Legendary Ship Cargo | $560,000 | auction | 9×6 | 14 | $471,624 | 0.84× | 62 / 32 / 5.3 / 0.75 / 0.11 |

- **Expected value** is before sell bonuses. Profit comes from upgrades (Haggling, Lucky
  Charm, collections, reputation stars). Each new class opens a little below break-even,
  and the next upgrades push it into profit. This is how "upgrades make me richer" shows
  up in the game.
- **The Rusty Box has a small player edge (1.16×).** Without it, about a quarter of
  simulated new players went broke in the first 15 minutes (see D-011).
- **The scrap pile** is only offered when you can't afford any lot. It is all junk: a way
  back to one container's worth of cash, never a better deal than playing.
- **Rust HP grows with class**, so late containers stay satisfying to open even with big tools.

### 3a. The auction (D-007, D-014)

- **Who:** 1–3 regulars per lot, drawn from five characters (`data/rivals.json`): Big Tony
  (reckless), Mrs. Okafor (careful appraiser, reads the door crack), Dex (short on cash),
  the Vega Sisters (antiques) and Harbourmaster Lou (big boxes only).
- **Private limits, fixed per lot:** limit = guide × personality × (1 + weight × what they
  saw through the door crack) × noise. They see only the base door-crack tiles, never
  your Door Crack extras, and **nothing about you** (upgrades, cash) changes their limits.
  That fixes the most-hated flaw of the market leader.
- **Bidding:** opening bid 40% of guide, raises of 8% (2 significant figures). You bid; the
  room answers after a beat; whoever can still afford the next raise does so, in turn.
- **Honest tells:** each rival shows one of four moods from their real headroom:
  confident (red), neutral, nervous (green, about to drop), out.
- **Walk away and see what you missed:** the lot goes to the best rival, and you see what
  they paid and what was inside. This teaches valuation and creates honest regret ("Big
  Tony got a bargain. That one hurts.").
- **Economy:** lots sell for about 0.95× guide on average (p10 0.72×, p90 1.20×). Reading the
  room and passing on overpriced lots is a real edge. The simulator plays the same
  auction rules (parity-tested) and bids up to 1.05× its expected value.

### 3b. Port contracts

Two optional goals are always on offer, such as "Find 3 Rare-or-better items" or "Make
$400 profit on a single container". Rewards are fixed when a contract is offered (a
fraction of your best class's guide price). There's no timer and no penalty. They exist
to give the saving stretches a short-term goal: in the simulator they cut the median
longest no-purchase gap from 8.8 to 6.4 minutes.

### 3c. Door-opening beat

After you win a lot: "SOLD!", the doors swing open and a flashlight sweeps the cargo
(1.3 s, tap to skip, off with reduced motion). Then you scrape.

## 4. Items, shapes and generation

- **Catalogue:** `data/items.json`, 70 items across 5 themed tiers (house clear-outs,
  storage units, luxury importer, military surplus, lost ship cargo). Each item has a
  rarity, a value, a shape (1×1 up to 4×2), the classes it appears in, an icon and a line
  of flavour text.
- **Rarities:** Junk (grey) → Common (green) → Rare (blue) → Epic (purple) → Legendary
  (gold). The colour is the same everywhere: tiles, plates, lists and the odds bar.
- **Condition:** each find rolls Poor ×0.6 (25%), Fair ×1.0 (50%), Good ×1.3 (20%) or
  Mint ×2.0 (5%). A Mint Legendary is the clip moment.
- **Generation** (identical in Python and JavaScript, verified by `sim/test_parity.py`):
  1. Shuffle all cells with the container's seed (mulberry32).
  2. For each empty cell: roll a rarity (weights × luck), then pick an item of that rarity
     whose shape fits there, then roll its condition.
  3. Every rarity has at least one 1×1 item per class, so every cell always fills.
- **Luck:** each Lucky Charm level multiplies rarity weights: Junk −3%, Rare +5%,
  Epic +7%, Legendary +10% (floored at 20% of base).

## 5. Scraping and reveal

- Drag across the grid; each tile you enter takes a hit. Holding still repeats a hit every
  110 ms. A hit removes *scrape power* HP from the tiles in the brush pattern (single →
  plus → 3×3 → diamond).
- A tile at 0 HP falls away and shows the part of the item beneath it. The item is
  **revealed** when all its tiles are gone: value tag, sound and particles.
- **Anticipation:** once any tile of an Epic or Legendary item is uncovered, its remaining
  tiles glint in its rarity colour. That's honest, because you really are seeing part of
  it. The final tile gets a 0.4 s build-up (rising tone, wobble), then the payoff: flash,
  screen shake, banner and a burst of particles. The size of the effect follows the rarity.
- **Knowledge upgrades** turn information into anticipation: Appraiser's Eye (glints),
  Door Crack (more tiles in the auction peek) and X-Ray (item outlines).
- **Tally card:** Paid / Found / Profit with a verdict line ("Jackpot. 6.2× your money." /
  "A dud. It happens to the best of us."). Collection items can be kept or sold here.

## 6. Upgrades

| Upgrade | Category | Effect | Levels | Cost range |
|---|---|---|---:|---|
| Better Scraper | Tools | +1 scrape power | 20 | $60 → $79M |
| Wider Blade | Tools | Bigger brush pattern | 3 | $250 → $60K |
| Auto-Scraper | Tools | +1 automatic hit per second | 25 | $1.5K → $7.3B |
| Appraiser's Eye | Knowledge | Glints: Epic+, then Rare+, then all | 3 | $150 → $50K |
| Door Crack | Knowledge | +1 tile visible in the auction peek | 3 | $300 → $80K |
| X-Ray Scanner | Knowledge | Item outlines (then also at the auction) | 2 | $8K → $200K |
| Auction License | Access | Unlocks the next class (Standard is the first auction) | 4 | $400 → $3M |
| Haggling | Business | +10% sell price | 25 | $100 → $68M |
| Hire Crew | Business | Idle income from opening low classes | 20 | $5K → $2.6B |
| Crew Training | Business | Crew moves up to Standard, then Premium (never higher) | 2 | $60K → $900K |
| Junk Dealer | Business | Auto-sells junk | 1 | $400 |
| Lucky Charm | Luck | Better rarity odds | 20 | $300 → $962M |

Costs follow `base × growth^level` (or a fixed list). **The crew only works the cheap
classes**, so the exciting containers stay the player's to open.

## 7. Collections

Seven sets (`data/collections.json`). The first copy of a set item is marked "keep" by
default; duplicates are sold. Completing a set grants a permanent reward that survives
prestige: +3% to +25% sell price, +1/+2 luck, +1 scrape power or +2 free crew. Starter
sets (Kitchen Nightmare, Old Timer) fill in the first 20–25 minutes, which gives the
endowed-progress effect.

## 8. Prestige: "Sell the business"

- Stars available = ⌊√(lifetime earnings of this business ÷ $12M)⌋. Each ★ gives +50% to
  sell prices, forever.
- Resets cash, upgrades and licenses. Keeps collections and stars.
- The button shows the exact gain before you commit (two-step confirm).
- Simulated median: first ★ available at **43 min**; 3 ★ (worth taking) at **47 min**.

## 9. Economy targets and current results

From `python3 sim/run.py --seeds 80` (80 simulated players, 120 minutes each, auctions
and contracts included):

| Metric | Result | Target | |
|---|---:|---|---|
| First upgrade | 0:42 | ≤ 1:00 | ✅ |
| Starter EV / price, no upgrades | 1.16× | 1.05–1.20× | ✅ |
| Starter EV / price after 3 Haggling | 1.50× | ≥ 1.05× | ✅ |
| Starter containers that turn a profit | 57% | 35–70% | ✅ |
| First Epic | 2:03 | 2–15 min | ✅ |
| First Legendary | 10:08 | 10–25 min | ✅ |
| Standard unlocked | 2:51 | 1.5–7 min | ✅ |
| Premium unlocked | 12:12 | 8–25 min | ✅ |
| Military unlocked | 29:51 | 25–55 min | ✅ |
| First ★ available | 42:38 | 35–60 min | ✅ |
| 3 ★ available | 47:16 | 50–80 min | ❌ slightly early |
| Longest gap without a purchase (median player) | 6:22 | ≤ 3:00 | ❌ |
| Longest gap without a purchase (unluckiest 10%) | 10:18 | ≤ 5:00 | ❌ |

**Open issues:** (1) gaps: players saving for a license. Contracts halved the worst case;
the rest waits on playtest evidence. (2) Earnings accelerate sharply after Military
unlocks, so 3 ★ follows the first ★ quickly. Phase 4 content (more classes, prestige
upgrades) will stretch the late game.

**Known limits of the simulator:** it bids like an accountant (up to 1.05× expected value),
doesn't use the door-crack peek to pick better lots, and doesn't model second runs after
prestige. It uses 6 hits per second for a human scraper and 4 s per auction.

## 10. Feel and UI rules

- One accent (sodium-lamp orange) for actions and goals. Rarity colours only for rarity.
  Green/red only for profit/loss.
- The stage shows one thing at a time: the auction, or the container being opened.
- Sounds are synthesised (no files), scale with rarity and start only after the first tap.
- `prefers-reduced-motion`: particles cut to a quarter, no shake or build-up delays.
- Must work with touch on a phone (390 px wide) and with a mouse on a desktop.

## 11. Next phases (proposed)

**Phase 3 (this build):** the auction with rival bidders, the door-opening beat, port
contracts, tally count-up and "one away" collection alerts are in. The rest of Phase 3 is
driven by Urfan's playtest notes.

**Phase 4, content and depth:** 200+ items, themed container stories (a touring band's
lost gear, a smuggler's decoy), market events ("electronics +300% this week"), pity timer
and duplicate trading for collections, prestige-only upgrades, more classes to stretch
the late game, achievements.

## 12. Questions for Urfan

1. The Rusty Box player edge (1.16×) differs from the brief's "slightly below price at
   start". Keep it? (D-011)
2. Price $6.99–$7.99 and a June 2027 Next Fest target? (D-010)
3. The working title "Dockside": keep it for now, or brainstorm names in Phase 5?
