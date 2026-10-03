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

### D-011 — The starter class (Rusty Box) gives the player a small edge
- **Date:** 2026-09-30 · **By:** Claude (from the simulator) · **Status:** Working — Urfan to confirm
- **What:** The Rusty Box pays back 1.16× its price on average before upgrades. Every
  bigger class opens below break-even (1.01× → 0.84×), and upgrades push it into profit.
- **Why:** With the starter at or below break-even, about a quarter of simulated new
  players went broke within 15 minutes and spent 10+ minutes in the scrap pile. That is a
  terrible first session. The brief's "EV below price, upgrades push it above" still holds
  for every class after the first.
- **Refines:** Urfan's brief (Economy).

### D-012 — Yard crew only works the cheap classes
- **Date:** 2026-09-30 · **By:** Claude (from the simulator) · **Status:** Working
- **What:** Hired crew opens Rusty, then at most Standard or Premium containers. Military
  and Ship Cargo are always opened by the player.
- **Why:** Crew on top classes made income explode 2,000× in 20 minutes, and it would
  automate away the best reveals.

### D-013 — Prototype tech: plain HTML/CSS/JS, no build tools, shared seeded RNG
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Classic scripts (they also work from `file://`), data exported from `data/*.json`
  by `web/build.py`, and a single-file build for the shareable link. The same mulberry32
  generator in Python and JavaScript, checked by a parity test.
- **Why:** Zero setup on Urfan's laptop (double-click `web/index.html`), and simulator
  results apply to the real game exactly.

### D-014 — Rusty Boxes sell at a fixed price; auctions start with Standard 20ft
- **Date:** 2026-09-30 · **By:** Claude (from the simulator) · **Status:** Working
- **What:** The starter class is bought at the yard gate for a fixed price. Live bidding
  against rivals begins with the first Auction License (Standard 20ft).
- **Why:** Bidding on every $95 box slowed the first minutes badly (the first Haggling
  purchase slipped from 0:28 to 7:30 in simulation), and new players should learn scraping
  before bidding. It also gives the "Auction License" upgrade a literal meaning.

### D-015 — Rival bidders: fixed private limits, honest tells, and "what you missed"
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Each lot's rivals get private limits from the lot's seed and what they can see
  through the base door crack. Their visible mood (confident / neutral / nervous / out)
  comes from real headroom. When you walk away, you see what they paid and what was inside.
- **Why:** D-007 (readable, beatable rivals). Showing the contents after passing turns the
  auction into a skill you can learn, instead of a black box.

### D-016 — Port contracts: two optional goals, no timers
- **Date:** 2026-09-30 · **By:** Claude · **Status:** Working
- **What:** Two contracts on offer at all times, with rewards fixed when offered
  (0.2–0.35× the guide price of your best class). No expiry, no penalty.
- **Why:** Gives saving stretches a short-term goal. Simulated median worst gap fell from
  8.8 to 6.4 min. The research's "session clock/quota" idea, adapted without a fail state.

### D-017 — Visual direction: a game screen, not a web page
- **Date:** 2026-09-30 · **By:** Urfan (feedback) → Claude (implementation) · **Status:** Working
- **What:** Urfan: "design is like ai and toy not a game". The prototype drops the dashboard
  layout for a full-screen night-port scene (procedural canvas: cranes, container stacks,
  sodium lamps, water, fog) with a game HUD, containers drawn as steel boxes with real
  markings, an LED auction board with rival medallions, a paper docket with an ink stamp,
  chunky pressable buttons, and slide-in sheets for upgrades, contracts, the collection
  book and the log. Emoji are replaced by one consistent icon set: game-icons.net
  (CC BY 3.0, credited in-game and in the README).
- **Why:** The dashboard look and emoji read as "AI-made toy". This is still prototype art;
  final art direction (style, characters, item illustrations) is Phase 5 and Urfan's call.

### D-018 — Drop the mystery-container game
- **Date:** 2026-10-02 · **By:** Urfan · **Status:** Decided
- **What:** The container/auction/scrape game (Dockside) is shelved. The web prototype and
  research stay in the repo as reference.
- **Why:** Urfan: "this is like just pressing opening box, and so what?" and "even our idea is
  not something interesting". Opening had no decisions or risk, and progression only
  changed the numbers. The 2026-10-03 research (`reports/Why job simulator games are fun.md`)
  confirms that a balanced economy is not evidence of fun.

### D-019 — New lane: first-person job/business simulator in Unity; pick the concept by fun test
- **Date:** 2026-10-03 · **By:** Urfan (lane) → Claude (method) · **Status:** Working, concept pending Urfan
- **What:** A first-person job sim in Unity, inspired by Internet Cafe Simulator 2 as a
  structural model, not as the theme (internet cafe is a faded lane). Three candidates
  are in `CONCEPTS.md`; the lead candidate is "Second Hand" (restore and flip junk). Each
  surviving candidate gets a ≤5-day greybox toy test before any production work.
- **Why:** The research says to choose the verb first, then the ladder, then the theme,
  that every level must change the work, and that the player's own skill must stay
  necessary (Urfan's progression insight, refined). Price target moves to $14.99–19.99 for a
  15–25 h arc (supersedes D-010's under-$10 advice for this lane).
