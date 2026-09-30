# Decisions log

Append new entries at the bottom. Never rewrite an old entry — if a decision changes,
add a new entry that supersedes it and link back.

Status values: **Decided** (Urfan approved), **Working** (developers chose it to keep
moving; Urfan can overrule at any time), **Superseded**.

---

### D-001 — The game: mystery shipping containers at a port auction
- **Date:** 2026-09-30 · **By:** Urfan · **Status:** Decided
- **What:** Incremental "open-the-box" game. Buy sealed containers, scrape them open tile
  by tile, sell or collect finds, upgrade, prestige. In the spirit of Scritchy Scratchy
  and Dealer's Life.
- **Why:** Proven loop (reveal → sell → upgrade), a theme people understand from one
  screenshot, and clip-friendly jackpot moments.

### D-002 — Business model: buy once, no real-money randomness
- **Date:** 2026-09-30 · **By:** Urfan · **Status:** Decided
- **What:** Free public demo first, then a paid Steam release. No loot boxes, no paid
  random items, no microtransactions.
- **Why:** Players trust it, it avoids loot-box regulation, and reviews punish predatory
  monetisation.

### D-003 — Prototype in the browser, ship on Unity
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Phases 2–3 are a plain HTML/JS browser prototype. The Steam build moves to
  Unity once the loop is proven fun (Phase 4/5 boundary).
- **Why:** The cloud container can build, run and screenshot a browser game, and Urfan
  can play every build from a link on any device the same day. Unity cannot run in the
  cloud container, so Unity iteration is limited to one round per evening on Urfan's
  laptop. Unity remains the end goal (Urfan's call).

### D-004 — Game content lives in shared JSON data
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Containers, items, upgrades and collections are defined in `data/*.json`,
  read by the Python simulator, the web prototype and later the Unity build.
- **Why:** Balance work done in the simulator carries over unchanged; switching from web
  to Unity only rewrites presentation code.

### D-005 — Two proposed hooks: peek-and-bid auctions, shaped items on the grid
- **Date:** 2026-09-30 · **By:** Claude (proposal) · **Status:** Working — to be proven in the prototype
- **What:** (a) Before buying, the player gets a short "door-crack" peek with a few clues
  and bids against NPC rivals. (b) Items occupy shapes on the tile grid (1×1 coin, 2×3
  painting, 3×4 motorbike), so a partial reveal hints at something big.
- **Why:** Differentiates the game from scratch-card clones; adds real decisions and skill;
  creates honest anticipation and near-misses from the grid itself.

### D-006 — Near-misses must be honest
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Near-miss moments come only from real information (a partially revealed item,
  a set missing one piece). Outcomes are never rigged to look close.
- **Why:** Rigged near-misses are what players and regulators call manipulative; honest
  ones produce the same excitement without the backlash.

### D-007 — Bidding against readable rivals is the core differentiator
- **Date:** 2026-09-30 · **By:** Claude (from Phase 0 research) · **Status:** Working
- **What:** Rival NPC bidders with names, personalities, visible tells and consistent
  logic, with no hidden random caps and no scaling with the player's upgrades. Built in Phase 3. The
  Phase 2 prototype uses peek-and-buy at a listed price to prove the scrape/reveal loop first.
- **Why:** The market leader (Storage Hunter Simulator) is most criticised for bidding that
  feels rigged and random. Skill-based bidding also makes near-misses honest and lowers
  gambling-rating risk. See RESEARCH.md, principles 3–4.
- **Refines:** D-005(a).

### D-008 — Show Paid / Found / Profit on every container; scale fanfare to profit
- **Date:** 2026-09-30 · **By:** Claude (from Phase 0 research) · **Status:** Working
- **What:** Every opened container ends with a tally card: price paid, value found, profit.
  Celebration size follows profit and rarity; a loss gets a comic "dud" beat, never a win sound.
- **Why:** Avoids "losses disguised as wins" (Dixon et al. 2010) and gives clips a
  two-second readable punchline. RESEARCH.md principles 2 and 5.

### D-009 — Publish the odds
- **Date:** 2026-09-30 · **By:** Claude (from Phase 0 research) · **Status:** Working
- **What:** Rarity odds per container class are visible in-game. Outcomes are resolved
  before any animation plays.
- **Why:** Answers "rigged" accusations before they start; consistent with D-006.

### D-010 — Proposed commercial targets (needs Urfan)
- **Date:** 2026-09-30 · **By:** Claude (proposal) · **Status:** Proposed — awaiting Urfan
- **What:** Price $6.99–$7.99. Web demo first; Steam page live in autumn 2026; Steam demo
  out >1 month before **June 2027 Next Fest** (14–21 June; register by ~25 April). Aim for
  10K+ wishlists before the fest. Main arc 5–7 h, completion 15–20 h.
- **Why:** Under-$10 games convert better (0.17× vs 0.10× wishlists); October 2026 Next
  Fest registration has closed; pre-fest wishlists are the strongest predictor of results.
