# RESEARCH.md — Phase 0

> **Status:** Phase 0 complete (2026-09-30). Five research tracks (incremental/reveal market,
> roguelike & social hits, reward-loop psychology, virality & competitors, Steam business)
> were run in parallel and synthesised below. Raw notes: `research_notes/Mystery container game research/`.
>
> **Data caveat:** Steam, SteamDB and the sales trackers blocked direct page reads, so most
> numbers come from search-result extracts of those pages. Sales figures are third-party
> estimates unless marked developer-reported. Treat them as ±50%.

## Lead developer review (read this first)

**Verdict: the brief's direction is supported by the evidence, with three changes.**

What the research confirms in Urfan's brief:
- The lane is real and profitable for tiny teams: Scritchy Scratchy (94% of 15,131 reviews,
  ~$2M+ on Steam), CloverPit (1M+, two developers), Cookie Clicker (2.6M+ copies),
  TCG Card Shop Simulator (3.5M+). All under $10, all spread by creators, not ads.
- Buy-once with no real-money randomness is the right call — it's also what keeps the
  age rating and the reviews safe (Balatro was briefly PEGI 18 over imagery alone).
- A free web demo first, then a Steam demo, is the documented best path.

What the research changes:
1. **The bidding layer moves from "nice idea" to "the core differentiator".** The market
   leader (Storage Hunter Simulator, 250K sold, 78%) is criticised for rigged-feeling AI
   bidding, predictable units and repetition after ~2 hours. Readable rival bidders with
   consistent logic are the gap. *(Built in Phase 3; the Phase 2 prototype starts with
   peek-and-buy so we can prove the scrape/reveal loop first.)*
2. **Celebrate profit, not the item.** Show *Paid / Found / Profit* together on every
   container; losses get a comic "dud" beat, never a win jingle. This is both the ethical
   line (no "losses disguised as wins") and the clip format (readable in 2 seconds).
3. **Depth beats length.** Players forgive short games but punish padding and forced
   resets. Target a 5–7 hour main arc and 15–20 hour completion at $6.99–$7.99, with a new
   system roughly every hour, and nothing that feels "done" inside Steam's 2-hour refund window.

What I'm adapting rather than adopting as written:
- *Principle 9 (session clock & quota / debt):* strong in roguelites, but a hard fail state
  fights the brief's incremental "always growing" feel. We'll prototype it as optional
  **port contracts** (timed goals with bonuses), not a game-over, and playtest it.
- *Principle 1 (door opening as the centrepiece):* we keep the brief's tile scraping as the
  main action and add the door-opening beat in front of it: doors open → flashlight sweep
  → scrape. Both are anticipation beats.
- *Timeline:* registration for the October 2026 Next Fest has closed. **June 2027 Next Fest**
  is the realistic target (Feb 2027 is a stretch); Steam page live this autumn. This is
  Urfan's call — logged as a proposal in DECISIONS.md.

Biggest risks, in order: (1) "What's in the box?" — a first-person container incremental
with 100+ upgrades — ships first; (2) being perceived as "AI slop" in a flooded idle
market → we need a hand-directed, distinctive visual identity; (3) the two-hour
repetition cliff every competitor falls off.

How this shaped the design: see `GAME_DESIGN.md` §1 (principles → features table).

---

# Full report: The Container Door Decides Everything

The evidence says a small team should build this game as a **short, cheap, tactile reveal-and-upgrade game**, not a long shop simulator. The recent hits in this lane are Scritchy Scratchy, CloverPit, TCG Card Shop Simulator and Cookie Clicker. They share four traits: a price under $10, a physical reveal that makes sense in a two-second clip, a 5–7 hour arc of rising numbers, and discovery through creators rather than ads. Most of the user's benchmark figures check out. Scritchy Scratchy sits at **94% positive on 15,131 reviews**. Studio Bitdot's August playtest drew **~23,000 players**. NoGlyph's haystack game launched on 29 Sept at **47% positive on just 17 reviews**. Thinflow's sorting game launched on 25 Sept, and Find The Needle advertises **300+ upgrades**. One figure needs correcting. The Steam-only gross estimate for Scritchy Scratchy is **~$2M**, which is the floor of the user's "$2–4M" range. The top of that range needs mobile and Switch 2 revenue that nobody has verified. The psychology research is consistent: the moment of **anticipation before the reveal** does most of the work. The same levers become manipulative, and put the age rating at risk, when they are faked (rigged near-misses, win sounds on losses). The niche is open. Its leader, Storage Hunter Simulator, is grindy and accused of rigged bidding, and the newer container games are weak or unreleased. The exception is "What's in the box?", a first-person container incremental with 100+ upgrades due in 2026, which is the closest threat. Commercially, the median Steam game earns very little. Whether this game does better depends mostly on having **10K+ wishlists before a February or June 2027 Next Fest**. One caveat applies throughout: almost every figure here comes from search-engine snippets of Steam and tracker pages, because direct page fetches were blocked during the research. All sales numbers are third-party estimates unless marked as developer-reported.

## Cheap, tactile reveal games sell, and most of the user's benchmarks hold

Small teams have not had better odds on Steam before. In 2025, **20,282 games launched and 608 of them (just under 3%) passed 1,000 reviews**, the highest hit rate ever measured ([GamesRadar](https://www.gamesradar.com/games/a-terrifying-20-282-games-were-released-on-steam-in-2025-and-just-608-managed-to-get-1-000-reviews-expert-finds-we-might-be-in-a-bit-of-an-indie-golden-age/); [Spawn Point Marketing](https://spawnpointmarketing.substack.com/p/roguelite-fatigue-is-brewing-on-the)). Three lanes did especially well for small teams:

- **Co-op "friendslop".** R.E.P.O., PEAK and Schedule I all made Steam's 2025 top-ten premium games by copies ([Kotaku](https://kotaku.com/steam-top-selling-2025-friendslop-rpgs-sales-2000654157)).
- **Blue-collar job and business simulators** ([How To Market A Game](https://howtomarketagame.com/2025/04/11/the-hit-games-of-early-2025/)).
- **Idle/incremental games.** Twelve idle games had reached 1,000 reviews by mid-2025, against 16 in all of 2024 ([HTMAG](https://howtomarketagame.com/2025/11/04/the-optimistic-case-that-indie-games-are-in-a-golden-age-right-now/)). Tiny-team idle titles such as **Cast n Chill (~$6.8M, 550K+ copies)** and **The Farmer Was Replaced (~$6.8M, 960K+ copies)** reached top-tier results (estimates; [AppMagic](https://appmagic.rocks/research/idle-steam-games-2026)).

Roguelite deckbuilders are the cautionary case. **212 shipped in 2025**, and the share reaching 1,000 reviews fell from 6.71% to 5.1% ([Spawn Point Marketing](https://spawnpointmarketing.substack.com/p/roguelite-fatigue-is-brewing-on-the)). Idle supply is also rising fast. PC Gamer counted **54 idle games released in a single week**, **4,314 games** carrying the idler tag, and "the vast majority" of that week's releases carrying AI disclosures and looking "almost uncannily similar" ([PC Gamer](https://www.pcgamer.com/gaming-industry/steam-week-in-review-54-idle-games-released-on-steam-last-week-and-many-look-eerily-similar/)). The lane is proven, and it is also getting crowded with low-effort entries.

### Checking the user's examples

| Game | User's claim | What the sources show | Verdict |
|---|---|---|---|
| **Scritchy Scratchy** (Lunch Money Games / Funday, 18 Mar 2026, $6.99) | ~94% on ~15K reviews; $2–4M gross | **94% of 15,131 reviews**. **~335K Steam copies, ~$2M gross** (Raijin, "medium confidence") ([Raijin](https://raijin.gg/app/3948120/Scritchy_Scratchy)). Developers report **750K+ units across PC and mobile** ([Threads, citing Steam page](https://www.threads.com/@knoebelnews/post/DXOk0U0DIGp/scritchy-scratchy-has-sold-over-copies)). Notebookcheck reported 16K+ reviews in week one, which conflicts slightly with Raijin's total ([Notebookcheck](https://www.notebookcheck.net/Steam-surprise-hit-This-quirky-scratch-off-idle-game-is-delighting-thousands.1258716.0.html)) | Reviews confirmed. Revenue: **Steam alone is ~$2M**; $3–4M only with unverified mobile/Switch |
| **Dealer's Life** (Abyte) | Comparable hit | DL1 (Jan 2019): **93% of 1,215 reviews** ([Steam](https://store.steampowered.com/app/982270/Dealers_Life/)). DL2: **~127K units, ~$1.1M** at $14.99 ([Sensor Tower VGI](https://app.sensortower.com/vgi/game/dealer-s-life-2)); English reviews 82% of 288 ([stmstat](https://stmstat.com/app/1343670/reviews)) | Well liked but a **modest earner**, not a breakout |
| **Cookie Clicker** (Steam, Sept 2021, $4.99) | Genre benchmark | **96% of 93,214 reviews**; ~2.6–2.8M copies; gross estimates range from **$8M to $22M** depending on the tracker ([Raijin](https://raijin.gg/app/1454400/Cookie_Clicker); [Games-Stats](https://games-stats.com/steam/game/cookie-clicker/)) | Confirmed as the long-tail ceiling |
| **Needle In A Haystack Simulator** (Studio Bitdot, Q4 2026) | ~23K playtest players | **~23,000 August playtesters** (developer-reported); the dev's clip on X drew **~50M views** ([Wikipedia](https://en.wikipedia.org/wiki/Needle_In_A_Haystack_Simulator); [PC Gamer](https://www.pcgamer.com/gaming-industry/steam-week-in-review-great-haystack-slop-is-a-thing-now/)) | Confirmed (developer figure) |
| **Needle In A Haystack** (NoGlyph, co-op) | 47% positive, released 29 Sept | Released **29 Sept 2026**, **Mixed, 47% of 17 reviews**; its demo had 60% of 100 ([Steam](https://store.steampowered.com/app/5085740/Needle_In_A_Haystack/)) | Confirmed; the sample is too small to mean much |
| **A Needle In A Haystack: Sorting Game** (Thinflow) | Released 25 Sept | Released **25 Sept 2026** with a 20% launch discount ([Steam](https://store.steampowered.com/app/5223690/A_Needle_In_A_Haystack_Sorting_Game/)); PC Gamer reportedly credits a different developer | Date confirmed; developer attribution disputed |
| **Find The Needle** | 300+ upgrades | **300+ upgrade tech tree**, Factorio-style automation, demo released 10 Sept, launch Q4 2026 ([Steam](https://store.steampowered.com/app/5160800/Find_The_Needle/)) | Confirmed |
| **Balatro** (LocalThunk, solo, $14.99) | Genre-defining hit | **5M copies by Jan 2025** (official); **98% of 104K+ reviews**; launched with **208,401 wishlists** after Next Fest ([Game Developer](https://www.gamedeveloper.com/business/balatro-sells-5-million-copies-after-end-of-year-spike); [PCGamesN](https://www.pcgamesn.com/balatro/steam-reviews); [GameDev Report](https://gamedevreport.beehiiv.com/p/how-balatro-was-made-and-make-30k-in-one-day)) | Confirmed; the "7M" claim has no primary source |
| **Vampire Survivors** (poncle, ~$3 at launch) | Genre-defining hit | Under 20 concurrent players until creator videos pushed it to **27K CCU**; **27M+ players** across platforms ([VICE](https://www.vice.com/en/article/how-vampire-survivors-went-from-obscurity-to-27000-people-playing-at-once/); [The Game Business](https://www.thegamebusiness.com/p/the-vampire-survivors-developer-is)) | Confirmed; no official Steam unit count |
| **Liar's Bar** (Curve Animation, $6.99) | Social hit | **113,798 peak CCU**; **~2.2M copies / ~$13.3M** (estimate); 88% overall but **79% recent** ([Game World Observer](https://gameworldobserver.com/2024/10/21/liars-bar-100k-ccu-steam-curve-animation-turkey-success); [Raijin](https://raijin.gg/app/3097560/Liars_Bar); [Steam](https://store.steampowered.com/app/3097560/Liars_Bar/)) | Confirmed; "5M sold" is unverified |
| **Lethal Company** (Zeekerss, solo, $9.99) | Social hit | **~10M estimated**, **~240K peak CCU** ([Game Developer](https://www.gamedeveloper.com/business/lethal-company-sold-an-estimated-10-million-copies); [Wikipedia](https://en.wikipedia.org/wiki/Lethal_Company)) | Confirmed (estimate) |
| **R.E.P.O.** (semiwork, $9.99) | Social hit | **230K+ peak CCU**, Overwhelmingly Positive on 91K+ reviews; unit estimates range from **1.5M to 17.6M** ([Newsweek](https://www.newsweek.com/entertainment/video-games/what-repo-viral-horror-video-game-explained-2046020); [PC Gamer](https://www.pcgamer.com/games/horror/repo-literally-saved-semiwork-as-a-studio-according-to-a-new-video-published-by-developers/); [App2Top](https://app2top.com/news/sales-of-the-indie-horror-game-r-e-p-o-may-have-exceeded-3-million-copies-with-revenue-reaching-25-million-278659.html)) | Confirmed as a hit; the size is highly uncertain |

Two notes on Scritchy Scratchy's revenue. A simple check (335K copies × $6.99 ≈ $2.34M before discounts and regional pricing) agrees with the ~$2M estimate. The review-multiplier method (15,131 reviews × 30–60 sales per review) implies **450K–900K copies**, which is higher. The honest answer is **"$2M+ on Steam, probably more across all platforms"**. Tracker estimates carry real error: Gamalytic's own study found only 77% of estimates land within 30% of real sales ([Gamalytic](https://gamalytic.com/blog/how-to-accurately-estimate-steam-sales)).

### Why the winners won

The evidence points to four common causes. First, **price low enough for an impulse buy**. Cookie Clicker costs $4.99, Scritchy $6.99, and CloverPit $10. Vampire Survivors launched at about $3 because its creator wanted the price "fair" rather than "smart" ([PC Gamer](https://www.pcgamer.com/vampire-survivors-saved-its-creator-from-working-on-mobile-gambling-games/)). Second, **a tactile reveal that reads clearly**: scratching, a slot reel, a shotgun shell, a pack flip. Third, **the fantasy of gambling with no money at stake**. Kotaku's headline sold Scritchy as scratch-offs "without feeling terrible" ([Kotaku](https://kotaku.com/new-hit-steam-game-lets-me-enjoy-scratch-off-lotto-tickets-without-feeling-terrible-and-i-love-it-2000682652)). Fourth, **creators rather than ads**. Balatro spread from Next Fest demo streams to Northernlion. CloverPit, made by **two Italian developers**, sold **750K copies in two weeks with no paid ads or sponsorships** and kept its refund rate at **6.4% against a 9.5% median** ([GameDiscoverCo](https://newsletter.gamediscover.co/p/real-data-how-cloverpit-hit-750k)).

The gap between solo and social games matters for positioning. Social co-op titles post far bigger spikes because each buyer pulls in friends and voice chat produces endless clips. Schedule I peaked at **459K CCU** ([TweakTown](https://www.tweaktown.com/news/104474/schedule-hits-459k-peak-players-the-most-by-solo-developer-in-steam-history/index.html)) and PEAK passed **11M copies** on a budget under $200K ([GamesRadar](https://www.gamesradar.com/games/co-op/after-a-few-months-of-work-led-to-11-million-copies-sold-on-steam-peak-devs-embrace-what-many-companies-refuse-to-learn-were-not-going-to-continually-have-a-graph-go-up/); [Game Developer](https://www.gamedeveloper.com/production/how-co-op-climbing-hit-peak-achieved-2-million-sales-for-less-than-200-000-)). Solo games like Balatro, Vampire Survivors and CloverPit spread more slowly and earn longer tails. Balatro sold about **1.5M copies in five weeks, ten months after launch**, on the back of awards ([Game Developer](https://www.gamedeveloper.com/business/balatro-sells-5-million-copies-after-end-of-year-spike)). A buy-once incremental game is solo-first by nature. The notes found **no case of an idle/incremental game reaching friendslop-style virality**, so a co-op layer would be an experiment, not a proven path.

### What players love, and what they punish

Praise is consistent across the benchmarks. Players love tactile feedback: Scritchy's hand-scratching "creates a more tactile and satisfying gameplay loop" than typical idlers ([GamingHQ](https://gaminghq.eu/2026/04/01/scritchy-scratchy-review-idle-game/)). They love the escalation from manual play to automation, and they love short sessions at a low price. The complaints are just as consistent, and each one maps onto a design decision for the container game:

- **Too short, then padded.** Scritchy is "really fun but way too short" ([itch.io](https://funday-games.itch.io/scritchy-scratchy/comments?after=0)). One critic called its requirement to "die four times before you can reach the actual end game" "a contemptuous attempt to stall the player" ([The GAP](https://thegapodcast.com/2026/04/02/scritchy-scratchy-review/)). The developers admitted they "ran out of time" for more manual-scratching and automation upgrades.
- **Repetition after the first hours.** Dealer's Life 2 is engaging for about six hours and then "becomes extremely repetitive" ([Softpedia](https://www.softpedia.com/reviews/games/pc/dealer-039-s-life-2-review-534955.shtml)).
- **RNG that feels rigged.** Balatro players complain that key Jokers never appear across hundreds of rerolls ([Steam discussions](https://steamcommunity.com/app/2379780/discussions/0/4346607305580318419/?ctp=2)).
- **Slow updates after success.** Lethal Company fell from about 200K to about 70K players in a month amid "same maps, same monsters" complaints ([zleague](https://www.zleague.gg/theportal/lethal-company-gamers-speak-out-on-the-top-issues/)).
- **Cheaters in public lobbies.** Cheating pushed Liar's Bar's recent reviews down to 79% ([Steam discussions](https://steamcommunity.com/app/3097560/discussions/0/4635989156416201199/)).
- **A weak solo experience in co-op games.** Solo players say R.E.P.O. shuts them out ([Steam discussions](https://steamcommunity.com/app/3241660/discussions/0/838375928581081182/)).

A rough rule emerges from these games. At $5–10, a 5–7 hour arc with a satisfying climax earns 90%+ positive reviews despite "too short" complaints. Scritchy's main content runs about 5–7 hours, with 15–20 hours for full completion ([Scritchy wiki](https://scritchyscratchy.wiki/faq/)). CloverPit's median playtime is ~6 hours ([GameDiscoverCo](https://newsletter.gamediscover.co/p/real-data-how-cloverpit-hit-750k)). At $14.99, repetition costs more review points. **Players forgive shortness far more readily than padding.**

### What the haystack wave teaches

The 2026 Needle-in-a-Haystack wave is a live lesson in copycats. One solo developer's satirical clip drew about 50M views. Within 48 hours there were **14 Roblox copies**, and before the original shipped there were **8 Steam lookalikes** ([GamesRadar](https://www.gamesradar.com/games/simulation/the-steam-ripoff-market-is-so-bad-that-viral-game-needle-in-a-haystack-simulator-is-facing-8-copycats-before-release-and-has-slapped-original-on-itself-to-clarify/)). Studio Bitdot responded by stamping "original" on its key art. Journalists observed that many clones rely on generative AI, and PC Gamer called the wave "haystack slop" ([Dexerto](https://www.dexerto.com/gaming/needle-in-a-haystack-simulator-dev-apologizes-to-steam-for-the-flood-of-rip-offs-his-game-inspired-3411907/); [PC Gamer](https://www.pcgamer.com/gaming-industry/steam-week-in-review-great-haystack-slop-is-a-thing-now/)). The clones have mostly failed. "A Time For Goats" sold **~1,000 copies in its first week**, and NoGlyph sits at Mixed. **Riding a meme brings visibility, but it does not turn that visibility into sales, and the original keeps most of the attention.** A buyable original with depth the clones can't copy quickly, as Find The Needle is attempting with its 300+ upgrade tree, is the defensible position.

## Anticipation, not the payout, drives the loop

### Uncertainty peaks right before the lid lifts

The neuroscience says the build-up is the product. Dopamine neurons signal **reward prediction error**: the gap between what was expected and what arrived, not the reward itself. Once a cue reliably predicts a reward, the dopamine burst moves to the cue ([Schultz, Dayan & Montague 1997](https://www.science.org/doi/10.1126/science.275.5306.1593)). Fiorillo, Tobler and Schultz found a second, slower signal that **ramps up until the moment of potential reward and peaks when the odds are 50/50**. It is weaker at 25% and 75% and absent at 0% and 100% ([Fiorillo et al. 2003](https://www.pdn.cam.ac.uk/system/files/documents/2003-fiorillo-science.pdf)). In human imaging studies, anticipating a reward activates the nucleus accumbens separately from receiving it ([Knutson et al. 2001](https://www.jneurosci.org/content/21/16/RC159)).

For the container game, three things follow. The seconds between winning the bid and seeing the cargo deserve the most polish. Each container should carry real uncertainty about whether it turns a profit. Rare outcomes should beat expectations, because only surprises produce large positive prediction errors. Buckshot Roulette shows this balance working: players have "enough information to make an educated guess, yet never enough to feel completely safe" ([Noisy Pixel](https://noisypixel.net/buckshot-roulette-review-perfect-for-streamers-2024/)). That is the target state for a doorway peek before bidding.

### Near-misses and disguised losses mark where honesty ends

Two gambling mechanics show where effective design turns exploitative.

**Near-misses.** In Clark et al.'s slot study, near-misses felt **less pleasant** than clear losses but **increased the desire to keep playing**. They activated the ventral striatum and insula, the same regions that respond to wins ([Clark et al. 2009, Neuron](https://www.cell.com/neuron/fulltext/S0896-6273(09)00037-3)). The response is amplified in problem gamblers ([van Holst et al. 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4987843/)). Slot makers learned to produce near-misses more often than chance would through "virtual reel" weighting ([Harrigan 2008](https://link.springer.com/article/10.1007/s11469-007-9066-8)). Nevada later banned secondary algorithms that pick a "near miss" display after a loss has already been decided ([Harrigan, via ResearchGate](https://www.researchgate.net/publication/225824549_Slot_Machines_Pursuing_Responsible_Gaming_Practices_for_Virtual_Reels_and_Near_Misses)).

**Losses disguised as wins.** When a multi-line slot pays out less than the stake but plays winning sounds, players' skin-conductance arousal matches that of real wins ([Dixon et al. 2010](https://uwaterloo.ca/reasoning-decision-making-lab/sites/default/files/uploads/files/DixFugetal_10c.pdf)). Changing the sound helps players recognise these outcomes as losses ([Dixon et al. 2015](https://lumsa.it/sites/default/files/pdf/DIXON_2015.pdf)).

The container game has an exact analogue: paying $40K for a container and "celebrating" an $18K find. The ethical fix is also good design. **Decide the outcome first, animate it truthfully, and scale the fanfare to net profit.** Near-misses are most defensible where skill matters, because "I almost read that bidder right" is real feedback. In a pure-chance roll the same feeling is false.

**Loss aversion** (median λ ≈ 2.25, meaning losses weigh about twice as much as equal gains) and **sunk-cost** effects ([Arkes & Blumer via Coglode](https://www.coglode.com/research/sunk-cost-effect)) argue against expiring streaks and decaying items. In a game with no microtransactions they bring no benefit, only goodwill risk.

### Collections, number-go-up and prestige run on well-understood math

Two findings on completion drive hold up in field studies.

- **Endowed progress.** Car-wash cards given with two of ten stamps pre-filled were completed **34% of the time, against 19%** for blank eight-stamp cards requiring the same effort ([Nunes & Drèze 2006, via ResearchGate](https://www.researchgate.net/publication/23547282_The_Endowed_Progress_Effect_How_Artificial_Advancement_Increases_Effort)).
- **Goal gradient.** Effort speeds up as a goal gets closer ([Kivetz et al. 2006, via Wharton](https://knowledge.wharton.upenn.edu/article/the-lowdown-on-customer-loyalty-programs-which-are-the-most-effective-and-why/)).

The folk claim that unfinished tasks are *remembered* better (the Zeigarnik effect) does not replicate reliably. The tendency to *resume* interrupted tasks (the Ovsiankina effect) is robust ([Ghibellini & Meier 2025](https://www.nature.com/articles/s41599-025-05000-w)). So a partly filled cargo catalog works, but its final entries must be reachable. Sessions should end on a goal the player *wants* to resume, not on a penalty for leaving.

The canonical idle-game economy sets each purchase's cost to **base × rate^owned**; AdVenture Capitalist's first generator uses a rate of **1.07**. Production grows only linearly or polynomially, so every run eventually hits a wall ([Pecorella, Math of Idle Games I](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i)). New tiers, milestone multipliers and prestige break the wall. AdVenture Capitalist's prestige currency is **150·√(lifetime earnings / 10¹⁵)**, so doubling it takes four times the previous run's earnings ([Pecorella, Part III](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii)). Prestige feels good because early content replays at superhuman speed, and that surprise produces a large positive prediction error. It feels bad when the reset reads as a loss. The fix is to preview the gain before the player commits, and to make sure resets unlock new systems rather than repeat old ones. Scritchy's "die four times" complaint shows what happens otherwise.

### Juice sells the reveal only when it tells the truth

"Juice" means layered, redundant feedback on simple actions: easing, screen shake, particles and sound. Jonasson and Purho's talk "Juice It or Lose It" demonstrated it by transforming a plain Breakout clone ([GDC Vault](https://gdcvault.com/play/1016789/Juice-It-or-Lose)). Swink defines game feel as real-time control "with interactions emphasised by polish" ([Wikipedia: Game feel](https://en.wikipedia.org/wiki/Game_feel)). Two rules follow. Keep the biggest effects rare so they don't wear off with repetition, and offer a fast-reveal option for repeat play. Every anticipatory cue, such as a rarity glow through the door gap, must come from the true outcome. Slot-machine patents treat suspense timing as a tunable lever ([US9659445B2](https://patents.google.com/patent/US9659445B2/en)), which is why a fake-out glow reads as a casino trick.

Session design should aim for flow ([Chen 2007](https://dl.acm.org/doi/10.1145/1232743.1232769)) without "dark flow". Avoid the temporal dark patterns catalogued by Zagal et al., such as grinding and playing by appointment ([Zagal, Björk & Lewis 2013](https://www.diva-portal.org/smash/get/diva2:1043332/FULLTEXT01.pdf)).

## Viral clips need a two-second "paid versus found" punchline

### Clips spread when the stakes and the result are both on screen

Short-form platforms punish any setup. About 71% of TikTok users decide within 1–3 seconds whether to keep watching ([Teleprompter.com](https://www.teleprompter.com/blog/tiktok-3-second-rule)). Clip-editing guidance calls openings on menus or inventory screens "a death sentence": "viewers don't want setup, they want the moment" ([Eklipse](https://blog.eklipse.gg/beginner-guide-2/stream-hook-strategy-first-two-seconds.html)). Both are vendor blogs, so treat the exact figures loosely. GameDiscoverCo adds that TikTok's audience is the youngest and most mainstream, where "nobody knows as much about what you're talking about" ([GameDiscoverCo](https://newsletter.gamediscover.co/p/everything-you-want-to-know-about)).

The breakouts share a pattern: a **readable stake, a short suspense beat, and a binary or big-number outcome that makes someone react**.

- **TCG Card Shop Simulator**, by a solo developer, sold **100K copies in three days** against a goal of 100K in a year. It passed **3.5M copies** before 1.0 on "joyful responses after drawing ultra-rare cards", and viewers donated to make streamers open more packs ([GameDiscoverCo](https://newsletter.gamediscover.co/p/tcg-card-shop-simulator-the-second); [GamesRadar](https://www.gamesradar.com/games/simulation/tcg-card-shop-simulator-finally-hits-1-0-on-steam-after-4-million-players-96-percent-positive-reviews-and-2-years-in-early-access/)).
- **Buckshot Roulette** was called "an almost perfect game for streamers". It runs about 15–20 minutes, and chat helps choose moves ([Noisy Pixel](https://noisypixel.net/buckshot-roulette-review-perfect-for-streamers-2024/)). It passed **8M copies** ([GameDaily](https://gamedaily.com/news/buckshot-roulette-started-off-free-now-its-sold-over-8-million-copies)).
- **Schedule I** had no marketing budget and "had TikTok". Its hidden mix effects made viewers ask "what else can you make?" ([80.lv](https://80.lv/articles/walter-white-simulator-schedule-i-becomes-steam-s-most-popular-indie-game-of-2025); [TheGamer](https://www.thegamer.com/schedule-1-tiktok-streamer/)).

**Failure comedy spreads as well as jackpots do.** Buckshot clips are as often about dying as winning. "Paid $40K, found a shipping pallet of rubber ducks" is the container game's natural punchline.

### Storage Wars and unboxing culture supply a ready-made format

People watch reveals for four reasons: curiosity about what's hidden ([Mental Floss](https://www.mentalfloss.com/article/72336/why-are-we-obsessed-unboxing-videos)), the thrill of gambling without spending their own money, a treasure-hunt fantasy mixed with snooping into strangers' lives, and the host's reaction. Lost-luggage hauls "attract millions of views" from people who want a peek into a stranger's life ([Fast Company](https://www.fastcompany.com/91394939/lost-luggage-hauls-are-the-internets-strangest-new-trend)). Storage Wars turned this into a format built on a limited look, competitive bidding, a reveal and an appraisal, with rival bidders viewers root for or against ([Looper](https://www.looper.com/381542/what-you-need-to-know-about-auctions-on-storage-wars/)). Bidders see the unit only from the doorway, which makes it essentially a **common-value auction under uncertainty** ([Cornell INFO 2040](https://blogs.cornell.edu/info2040/2012/09/25/dominant-bidding-strategies-in-storage-wars/)). That is a genuine skill problem to design around. Case opening shows the scale of audience demand:

- A single CS2 case-opening stream drew **294K peak viewers** ([Streams Charts](https://streamscharts.com/news/ultimate-counter-strike-case-opening)).
- Nadeshot's average audience roughly tripled when he opened cases ([Gaming Amigos](https://www.gamingamigos.com/post/nadeshot-top-cs2-streamer-40k-case-openings)).
- Twitch's Pokémon TCG viewership grew **3,000%+** in under a year ([Game Rant](https://gamerant.com/pokemon-trading-card-twitch-rise-popularity/)).

That same case-opening culture is what makes regulators and critics nervous (see risks).

### No one owns the container niche yet, but a close rival is coming

| Competitor | Status | Reception / sales | What it tells us |
|---|---|---|---|
| **Storage Hunter Simulator** (Raccoons / astragon) | 1.0 in Nov 2025, $24.99 | **78% of 1,833 reviews**; developer-confirmed **250K sales** by May 2025 | The leader. The core loop is "genuinely addictive", but it becomes "repetitive and painful after 2 hours"; AI bidders have hidden random caps; threads call bidding "rigged" |
| **Salvage Shop Simulator** | Mar 2026, $7.99 | **40% of 106**; ~2.3K copies (estimate) | A 10-second-peek container auction attached to a clean-and-repair chore loop failed; a low price did not save a weak loop |
| **What's in the box?** (PALINI / Polden) | 2026, TBA | Unreleased | **The closest threat**: a first-person container incremental with a crowbar, 100+ upgrades and collections |
| **Container Hunter Simulator** | Coming soon | Unreleased | Salvaging containers from the ocean floor, then auctioning them |
| **Unboxathon** | Dec 2025 | 77% of 257 | Mystery-box incremental praised as "addictive" and "soothing", with a thin endgame |
| **Mystery Box Simulator** (PlayWay) | 2026 | Unreleased | A mass-market "X Simulator" entry |

Sources: [Storage Hunter Steam](https://store.steampowered.com/app/1442430/Storage_Hunter_Simulator/); [Gaming Amigos 250K](https://www.gamingamigos.com/post/storage-hunter-simulator-hits-250-000-sales-in-early-access); [Softpedia review](https://www.softpedia.com/reviews/games/pc/storage-hunter-simulator-review-538023.shtml); [Steam thread "Bidding is rigged"](https://steamcommunity.com/app/1442430/discussions/0/601891926086555561/); [Gaming.net](https://www.gaming.net/reviews/storage-hunter-simulator-review-pc/); [Salvage Shop Steam](https://store.steampowered.com/app/3555500/Salvage_Shop_Simulator/); [What's in the box? Steam](https://store.steampowered.com/app/4271720/Whats_in_the_box/); [Container Hunter Steam](https://store.steampowered.com/app/4555760/Container_Hunter_Simulator/); [Unboxathon Steam](https://store.steampowered.com/app/3565100/Unboxathon/); [Mystery Box Simulator Steam](https://store.steampowered.com/app/4588070/Mystery_Box_Simulator/).

Storage Hunter's complaints are a design brief for this game:

- Units look nearly identical.
- "You can predict a unit's contents by debris placement alone."
- AI bidders "fight over literal trash like it's a Rembrandt", so "auction strategy feels random rather than skill-based" ([Gamermelts](https://gamermelts.com/storage-hunter-simulator-bargains-busts-breakdown/); [Gaming.net](https://www.gaming.net/reviews/storage-hunter-simulator-review-pc/)).

One data caveat: 1,833 reviews looks low for 250K confirmed sales. That is about 136 sales per review, against a typical 30–60, so either the review snippet is stale or many sales came through bundles or keys. The research also found **no Steam game built around buying lost luggage** and **no well-made, clip-first shipping-container reveal game**. The open position is minutes-long runs, readable and beatable rival bidders, memorable heavy-tailed cargo, and on-screen numbers built for clips.

## Wishlists before Next Fest decide the outcome, and the median game earns almost nothing

### The conversion math

The planning figures from GameDiscoverCo:

- **Wishlist conversion.** Median first-week sales are **0.17× launch wishlists** for games with 10K+ wishlists and 0.15× above 25K, but only **0.10× for games priced over $10** ([GameDiscoverCo](https://newsletter.gamediscover.co/p/the-state-of-steam-wishlist-conversions)).
- **Seasonality.** February and August convert best; December converts worst.
- **Wishlist age.** Old wishlists convert as well as new ones ([HTMAG](https://howtomarketagame.com/2025/01/27/do-wishlists-get-old/)), so opening the Steam page early carries no penalty.
- **Early pages.** Games whose Coming Soon page went up six or more months before launch sold about **300% more** than those that opened about 30 days out ([Zukowski ebook](https://howtomarketagame.com/wp-content/uploads/2023/05/Zukowski_60MistakesEbookV1.pdf)).
- **Visibility threshold.** About **7,000 wishlists in a compressed window** gets a game onto Popular Upcoming ([HTMAG Benchmarks](https://howtomarketagame.com/benchmarks/)).
- **Reviews to lifetime sales.** Lifetime units run about **30× Steam reviews** (working range 20–40×, higher for popular games) ([GameDiscoverCo](https://newsletter.gamediscover.co/p/steam-sales-estimates-why-game-popularity)).

### Next Fest amplifies momentum; it does not create it

In the February 2026 Next Fest (3,449 entries), the **median game gained just 806 wishlists**, the 95th percentile gained 13,461, and the top game gained 57,074. No top-tier game entered with fewer than 3,000 wishlists ([HTMAG Feb 2026](https://howtomarketagame.com/2026/04/13/making-sense-of-the-february-2026-steam-next-fest/)). Two findings from the same analysis matter most. The number of wishlists a game had before the fest is the strongest predictor of what it gains during it (Spearman r = **0.825**) ([HTMAG](https://howtomarketagame.com/2025/03/26/benchmarks-how-many-wishlists-can-i-get-from-steam-next-fest/)). Demos released **more than a month before the fest earned ~2.5×** the wishlists of demos launched during it. Top-earning demos held players for 80 minutes to 3 hours, against a ~14-minute median ([Steam Page Analyzer](https://www.steampageanalyzer.com/blog/how-long-should-a-steam-demo-be); secondary source). That suits an incremental game whose demo can let players reach the first real automation or prestige beat.

A few supporting tactics:

- Put a playable build on itch.io or the web first. It lets the team test before spending Steam's one-time "demo released" notification to wishlisters ([HTMAG](https://howtomarketagame.com/2024/07/31/what-steams-big-demo-update-means-for-your-marketing-strategy/)).
- Steam Playtest runs on a separate app ID, away from the main page's reviews ([Game Launch Guide](https://www.gamelaunchguide.com/blog/steam-playtest-launch-risk-filter/)).
- Localize: 46% of February 2026 Next Fest entries shipped in Simplified Chinese.

The calendar is fixed. **October 2026 registration closed on 31 August**. **February 2027 runs 22 Feb–1 Mar**, with registration by about 10 January ([Steamworks](https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest/feb_2027)). **June 2027 runs 14–21 June**, with registration by about 25 April ([Steamworks](https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest/june_2027)). The demo must be submitted at least 3–5 weeks before a fest. Starting from 30 September 2026, February is a stretch because the page would have only about four months to build wishlists. **June 2027 is the realistic target**, with the Steam page live this autumn, a demo out by April–May, and launch in July–September; August converts well. Whether a game can enter Next Fest only once was not re-verified, so check Steamworks before choosing which fest to use.

### Pricing and what a copy actually earns

Winning prices in this lane cluster at **$4.99–$9.99**. Staying under $10 avoids the conversion penalty. Launch discounts of 10–20% are standard: the haystack games launched at 15% and 20% off. Valve's suggested regional pricing should be on from day one ([Steam Page Analyzer pricing](https://www.steampageanalyzer.com/blog/steam-regional-pricing-guide); secondary source). Net revenue per copy is much lower than the list price:

- Valve takes 30% up to $10M.
- Refunds are available within 14 days for any game played under 2 hours ([Steam Refunds](https://store.steampowered.com/steam_refunds/)).
- VAT and refunds come off before Valve's share is calculated.

Developers typically keep **35–57% of list** ([Immutable](https://www.immutable.com/guides/how-much-does-steam-take)). On that basis a **$7.99 game nets roughly $3.50–$4.20 per copy** before discounts and regional pricing pull it lower (an estimate). The refund rule has a design consequence: the game must hold players past two hours before anyone could feel "done".

### Realistic outcomes

Revenue on Steam is extremely skewed. Secondary aggregations suggest about **two-thirds of games earn under $1,000** and about **0.5% cross $1M** ([Steam Page Analyzer](https://www.steampageanalyzer.com/blog/indie-game-revenue-data)). These figures swing heavily depending on whether shovelware is counted, and the same site's median estimates range from $249 to $5K–15K. The bands below are **planning estimates** built from the conversion ratios above at roughly $4 net per copy:

| Scenario | Launch wishlists | First-week units | Lifetime units | Net revenue |
|---|---|---|---|---|
| Weak | <3K | ~300–500 | ~1–3K | ~$4K–12K |
| Solid | ~10K | ~1,000–1,700 | ~5–10K | ~$20K–40K |
| Strong ("Gold") | 30–50K | ~4–8K | ~30K+ (~1,000 reviews) | ~$120K+ |
| Breakout (CloverPit / Scritchy tier) | 100K+ plus streamer virality | tens of thousands | hundreds of thousands | $1M+ |

On the evidence, the gap between tiers comes less from production value than from three things: **a store page opened early, a demo that streamers can play months before the fest, and a hook that recent hits have already proven.**

## Conclusion

The research changes the framing of the project in one important way. The hard problem is not the theme. The container fantasy is proven by Storage Wars, case openings, luggage hauls and Storage Hunter's 250K sales. The hard problem is keeping the loop honest and interesting after the first two hours, which is where every comparable game loses reviews. Storage Hunter failed on predictable units and opaque AI bidding. Dealer's Life 2 went repetitive at six hours. Scritchy's critics punished forced resets. The container game's real edge is **a bidding layer that rewards reading the room**. It turns a gambling-shaped reveal into a skill-and-information game, which improves the near-miss ethics, the age-rating position and the clip value all at once. The second insight is strategic. Viral concepts in this space get cloned within days, and the clones fail. So distinctiveness (a trademarkable name, hand-directed art, deep systems) and an early playable demo protect the game better than speed of release does. That matters doubly for a team using AI developers, in a market where "AI slop" is now a headline category.

## Design principles for the container game

1. **Make the door opening the centrepiece.** The player cuts the seal, hauls the doors open, and sweeps a flashlight across the cargo in a 0.5–2 second anticipation beat. Anticipation carries most of the reward signal, so this sequence gets the most polish budget. Any rarity glow leaking through the gap must come from the true contents.
2. **Put "Paid / Found / Profit" on screen at once.** Large, legible numbers let a 9:16 clip read in under two seconds. A final tally card doubles as the thumbnail.
3. **Keep every container a genuine coin-flip on profit.** Peek tools (the doorway look, manifest fragments, weight readings, an X-ray upgrade) should narrow uncertainty without removing it. Anticipation peaks near 50/50 odds, and fully "solved" containers kill the tension.
4. **Make bidding a skill with readable rivals.** Give AI bidders named personalities, visible tells, budgets that can be bluffed, and consistent logic. There should be no hidden random maximums, and AI bids should not scale with the player's upgrades, which is Storage Hunter's most-hated flaw. Losing a bid by misreading a rival then becomes an honest near-miss the player can learn from.
5. **Celebrate net profit, not the item.** Fanfare scales with profit and rarity relative to price paid. Losses get their own comic "dud" animation and sound, never a win jingle. This avoids losses disguised as wins, and the disaster reveals become shareable failure comedy.
6. **Fill containers with stories and a heavy tail.** Themed cargo tells a story: a touring band's lost gear, a collector's estate, a smuggler's decoy. Add absurd jackpots and comic junk, and make cargo impossible to predict from debris. Voyeurism and the treasure-hunt fantasy are why people watch unboxings.
7. **Make the hands-on work satisfying before you automate it.** Cutting locks, prying crates and appraising by hand should feel good first. Cranes, forklifts, hired appraisers and auto-bidders arrive as upgrades. Scritchy won on tactile scratching and was criticised for having too few upgrades to manual play.
8. **Run an exponential economy with visible next goals.** Container classes (20ft, 40ft, reefer, ship-lot, whole-vessel) cost about base × rate^tier, while upgrades raise income. Always show one purchase that is nearly affordable and one aspirational one. New ports or vessel classes break through each wall.
9. **Give each session a clock and a quota.** An "auction day" or season of 10–20 minutes ends with rent, a loan payment or a yard lease due, following Lethal Company's quota and CloverPit's debt. This gives each run a goal, a fail state and a natural stopping point.
10. **Add Joker-style modifiers that bend the rules of value.** Examples: buyer contracts, set bonuses for matching cargo, market events ("electronics +300% this week"), and specialist appraisers. These produce Balatro-style "aha" synergies and absurd numbers.
11. **Make prestige a deterministic conversion that unlocks new systems.** "Sell the yard" converts lifetime earnings into a permanent reputation multiplier on a square-root curve, with a preview of the gain before confirming. The first prestige should come within the first session or two. Never require repeated identical resets to reach the ending.
12. **Build a cargo catalog with a head start and reachable completion.** Pre-fill starter entries and show progress like "37/40". Let duplicates convert toward a chosen missing item, add pity timers, and never gate the final entries behind 0.1% drops.
13. **Size the content to the price.** Aim for a 5–7 hour main arc and a 15–20 hour completionist tail at $6.99–$7.99. Introduce a new system roughly every hour, and make sure nobody could feel "done" inside the two-hour refund window. Plan the first post-launch content drops (new ports, cargo sets) before launch.
14. **Be transparent about odds.** Publish rarity tiers per container class, keep a reveal history log, and resolve outcomes before animating them. Transparency removes the deception that makes chance mechanics exploitative, and it answers "rigged" accusations before they start.
15. **Theme the game on the docks, not the casino.** Use industrial port iconography with no reels, "jackpot" signage or double-or-nothing bets of earned money. Pledge publicly that the game will never sell containers or randomness for real money. PEGI keeps an 18 rating for casino-style simulation, and Australia requires R18+ for simulated gambling.
16. **Build streamer features in.** Candidates include chat votes on bid-or-fold, chat predictions of container value, chat acting as a rival bidder, an automatic replay of the session's best and worst container, a streamer mode that stays legible at 720p, and a fast-reveal toggle.
17. **Keep social features optional and friends-only.** If the team adds multiplayer, add friends-only "auction nights" where friends bluff-bid against each other, after a complete solo game ships. Avoid public lobbies, which bring cheaters as they did for Liar's Bar. No evidence yet shows friendslop virality transferring to incrementals.
18. **Own the name and ship a playable build early.** Choose a distinctive, trademarkable title and art style, and get a Steam page up this autumn. Put a web or itch prototype out first, then a Steam demo more than a month before the June 2027 Next Fest (February if the build is ready). Aim for 10K+ wishlists before the fest.

## Risks

1. **A near-identical competitor launches first.** "What's in the box?" (a crowbar container incremental with 100+ upgrades, due in 2026) and Container Hunter Simulator could define the category before this game ships. Watch their pages and differentiate on bidding skill and clip-first reveals.
2. **Being seen as "AI slop".** Idle-game launches are flooding Steam with AI-disclosed lookalikes, and AI-disclosed games were reported to underperform at the June 2026 Next Fest ([Recognizing Patterns](https://recognizingpatterns.substack.com/p/steam-next-fest-june-2026-communities)). A team that builds with AI developers needs a hand-directed, distinctive visual identity and a store page that shows craft.
3. **Gambling perception and age ratings.** Balatro was briefly rated PEGI 18 and delisted over imagery alone ([Game Developer](https://www.gamedeveloper.com/business/gambling-fears-get-balatro-delisted-after-ratings-board-mixup)). CS-style reveal strips or casino language could trigger ratings or "gambling simulator for kids" backlash.
4. **The two-hour cliff.** The benchmarks lose reviews at the point where repetition sets in: Storage Hunter after about 2 hours, Dealer's Life 2 after about 6. Shortness is forgiven, but padding and forced resets are not.
5. **Clones after a viral moment.** Expect lookalikes within 1–3 weeks of any clip that takes off, as happened with the haystack games. An unreleased game with viral reach hands its search traffic to copycats.
6. **Discovery math.** The median Next Fest entrant gains about 800 wishlists, and most Steam games earn under a few thousand dollars. Without early page traction and creator pickup, the solid scenario (about $20K–40K net) is the realistic ceiling.
7. **Uncertain data.** Most figures in this report are tracker estimates read from search snippets. Individual sales numbers can be off by 50% or more, and a few claims (Scritchy's mobile revenue, Liar's Bar's 5M, Balatro's 7M) have no primary source.
