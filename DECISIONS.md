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
