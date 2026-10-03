# Why "work" simulators and management games are fun, and how they sustain play

Researcher notes, 2026-10-03. Scope: the psychology and design mechanisms behind fun in mundane-work games, the loop and progression structures that keep players going past the first hours, cheap ways to test fun before production, and what makes sims clip well.

Source labels used below:
- **[primary]**: the developer, the paper's authors, or the platform itself.
- **[secondary]**: a summary, wiki, guide or aggregator. Use with care.
- **[search snippet]**: a claim seen only in a search-engine summary; the page itself was not fetched or could not be fetched. Treat as unverified.
- **[background, not fetched]**: a well-known claim from the literature that I did not re-retrieve this session. Verify before quoting.

---

## 1. Why are chores satisfying in a game when they aren't in real life?

### Takeaway
Game chores satisfy because the game strips out what makes real chores unpleasant (stakes, tedium with no visible result, obligation, friction) and amplifies what is pleasant about them (instant, legible, exaggerated before/after change; clean completion beats; low-stakes mastery; freedom over when and how). Research backs three mechanisms: (a) need satisfaction, especially competence and autonomy (self-determination theory); (b) effectance, the feeling that your input visibly changes the world; and (c) curiosity and uncertainty-reduction about whether an action worked. Feedback that is tied to real success beats feedback that is merely loud.

### Cited Findings

**Self-determination theory (SDT) and effectance (academic, primary)**
- Ryan, Rigby & Przybylski (2006), *Motivation and Emotion*, four studies: perceived in-game autonomy and competence were associated with enjoyment, game preference and changes in well-being. The SDT needs (autonomy, competence, relatedness) independently predicted enjoyment and future play. [primary] — [Springer](https://link.springer.com/article/10.1007/s11031-006-9051-8)
- Klimmt, Hartmann & Frey (2007), *CyberPsychology & Behavior* 10(6): 845–848. Online experiment with 500 participants using a Breakout-style game. In the "reduced effectance" version the controls failed one-third of the time, and those players reported significantly less enjoyment. Effectance means perceived influence on the game world. The paper argues games produce effectance through the *immediacy* and *disproportionality* of output relative to input. [primary abstract via index] — [ResearchGate](https://www.researchgate.net/publication/5762707_Effectance_and_Control_as_Determinants_of_Video_Game_Enjoyment); [PubMed index](https://neuro.unboundmedicine.com/medline/citation/18085976/Effectance_and_control_as_determinants_of_video_game_enjoyment_)
- Kao et al. (CHI 2024), "How does Juicy Game Feedback Motivate? Testing Curiosity, Competence, and Effectance". Pre-registered online experiment (n = 1,699) with a purpose-built action RPG and a 2×2+control design that varied feedback amplification, success-dependence and variability. Measures were self-reported motives and enjoyment, plus free-choice playtime.
  - Curiosity was the strongest predictor of enjoyment and the only predictor of playtime.
  - Success-dependent feedback raised all three motives.
  - Amplification alone unexpectedly *reduced* them, possibly by harming players' sense of agency.
  - The authors conclude that motivation comes from "reducing uncertainty over action success," which depends on legible, differentiated amplified feedback.
  
  [primary abstract] — [ACM DL](https://dl.acm.org/doi/10.1145/3613904.3642656); [author PDF](https://people.csail.mit.edu/dkao/pdf/3613904.3642656.pdf); [co-author page](https://nickballou.com/publication/2024-kao-et-al-juicy/)
- Raph Koster, *A Theory of Fun*: "fun is just another word for learning." Fun comes from mastering patterns. Once the brain "chunks" a pattern into routine, the activity becomes boring. Games get boring when the pattern is fully learned (too easy) or can't be found (too hard). [secondary summaries] — [Lost Garden review by Daniel Cook](https://lostgarden.com/2005/05/08/book-raph-kosters-theory-of-fun-for-game-design/); [Game Studies wiki](https://game-studies.fandom.com/wiki/A_Theory_of_Fun_for_Game_Design)
- Salen & Zimmerman, *Rules of Play*: the goal of game design is "meaningful play," which happens when "the relationship between actions and outcomes in a game are both discernable and integrated into the larger context of a game." Discernable means the player can perceive that something changed. Integrated means the action also matters later. [secondary] — [Wikipedia: Meaningful play](https://en.wikipedia.org/wiki/Meaningful_play)

**PowerWash Simulator (FuturLab), designer statements [primary quotes via press]**
- The idea came from watching satisfying power-washing videos and timelapses. The goal was to reproduce the satisfaction of *watching those videos*, not to simulate power washing realistically. [search snippet summarising FuturLab interviews] — [Noisy Pixel interview](https://noisypixel.net/powerwash-simulator-interview-futurlab-dlc-sequel/)
- Origin story: during a brainstorm about simplifying first-person shooters, a team member was browsing a power-washing subreddit. Joshua Brown (Senior Community Manager): "It was almost a light bulb eureka moment. We have to make a power washing first-person shooter game." — [Shacknews](https://www.shacknews.com/article/131441/powerwash-simulator-developer-interview)
- Dan Chequer (Design Director):
  - "It became apparent to the team very early on that the act of cleaning was going to be fun."
  - "The one word we hear more than any other in our feedback is 'Satisfying', which is exactly what we were aiming for."
  - "enemy threats and time limits are deliberately absent. We wanted to create an experience that players could relax with and approach at their own pace."
  
  — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
- To make the simple act into a fuller game, the team "added layers of complexity to dirt": nozzle choice, detergents and dirt toughness. — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
- Chequer on contrast and completion:
  - "nothing is more important than the contrast between the clean and dirty state." A patio table was recoloured from dark grey to creamy white because grime didn't read against it.
  - Each fully cleaned element gives "a visual and audible acknowledgement" (a white flash and a "ding").
  - "we wanted to keep the friction of the experience to a minimum… we didn't want the puzzle aspect of the game to get in the way of the relaxing, satisfying experience." This is why there is no power or pipe management.
  
  — [80.lv, Level Design of PowerWash Simulator](https://80.lv/articles/level-design-of-powerwash-simulator)
- Objects are broken into sections that are meaningful to the player. Section names matter late in a level, when the player is hunting the last patches of dirt. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)

**Unpacking (Witch Beam) [primary quotes via Game Developer and GDC]**
- The three design pillars are Contemplation, Discovery and Expression. Wren Brier (Creative Director): "Subtractive design is all about strengthening the core of a game by removing anything that isn't serving the core ideas." The game has no scores, no fail states and no negative consequences. It has one simple, polished, versatile mechanic: placing belongings. It is playable by ages 5–75. 14% of players flushed every toilet in the game. — [Game Developer](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)
- GDC talk "'Unpacking' Zen: Designing a Game Without Fail States or Scores". Unpacking sold over a million copies and won over 20 awards. It has no scores, time limits, fail states, consequences to choices or dialogue, and the talk argues it is better for omitting them. — [GDC Vault](https://gdcvault.com/play/1029400/-Unpacking-Zen-Designing-a)
- The game has about 1,000 household items across 7 life stages. Tim Dawson (Technical Director): "Through handling items players are forced to consider each one." The team's principles: "mechanics shape story, item progression is character progression," and "every item in your game's environment sends a message whether intended or not." They called the approach "empathy through detective work." — [Game Developer, GDC 2022](https://gamedeveloper.com/gdc2022/gdc-2022-unpacking-a-narrative-through-1-000-household-items)

**Cozy design: safety, abundance, softness (Project Horseshoe 2017, Daniel Cook et al.) [primary]**
- Coziness is how strongly a game evokes a fantasy of:
  - **Safety**: "an *absence* of danger and risk"; activities are voluntary and opt-in.
  - **Abundance**: lower Maslow needs are met, "providing space to work on higher needs".
  - **Softness**: "gentle and comforting stimulus, where players have a lower state of arousal but can still be highly engaged".
- Intrinsically rewarding, repetitive activities (gathering, fishing, organising) "occupy hands while freeing the mind."
- Coziness breakers: extrinsic, transactional rewards; danger; mandatory responsibility; notifications that remove control over attention; intense stimuli; deception; opulence and social comparison.

— [Lost Garden, "Cozy Games"](https://lostgarden.com/2018/01/24/cozy-games/); [Project Horseshoe 2017 report section 3 (PDF)](https://projecthorseshoe.com/reports/featured/Project_Horseshoe_2017_report_section_3.pdf)

**Stardew Valley**
- Eric Barone has acknowledged some people call the game "Chores: The Game": you get up, water crops and talk to people, with no grand adventure. [search snippet; NPR page returned 403, so not verified] — [Houston Public Media / NPR, Jan 2025](https://www.houstonpublicmedia.org/npr/2025/01/24/g-s1-44510/the-legacy-and-future-of-the-farming-game-stardew-valley/)
- Barone wanted players to have multiple ways to pursue goals. If you didn't want to farm, you could spend the day in the mines or fishing. [search snippet] — [Cheerful Ghost interview](https://cheerfulghost.com/jdodson/posts/1005/interview-w-eric-barone-creator-of-stardew-valley)

**Job-sim appeal (genre framing)**
- Job sims focus on doing occupational tasks rather than management strategy. Per GameSpot's Michael Piantini, players enjoy experiencing "aspects of occupations they do not perform themselves or variations on jobs with which they are already familiar." [secondary] — [Wikipedia: Job simulation game](https://en.wikipedia.org/wiki/Job_simulation_game)

**"Oddly satisfying" content (weak evidence base)**
- Popular-science explanations for "oddly satisfying" videos cite order, completion, predictability and relief from incompleteness. One cited study, in the *Journal of Behavior Therapy and Experimental Psychiatry* (2017), interrupted participants mid-list and found the feeling of incompleteness bothered them. [search snippet; Live Science page could not be extracted] — [Live Science](https://www.livescience.com/62091-oddlysatisfying-videos-satisfying.html)
- **Do not use:** search results also claimed "Stanford psychologists in 2024" showed dopamine release and "UCL 2025: 54% of ASMR viewers…". These came from low-quality aggregator and possibly AI-written pages ([calmsage](https://www.calmsage.com/psychology-behind-oddly-satisfying-videos/), [influencers-time](https://www.influencers-time.com/oddly-satisfying-why-its-2025s-viral-content-phenomenon/)) with no traceable study. I treat them as unreliable.

### Inferences
- **Chores become play when five subtractions and four additions are both present.**
  - Subtract: stakes, time pressure, obligation, friction (setup and logistics), and invisible results.
  - Add: exaggerated contrast, granular completion beats (PowerWash's per-part ding), freedom over order and pace (autonomy), and a skill to get better at (competence).
  - PowerWash and Unpacking both openly describe this as *subtractive* design.
- **Juice has to be honest.** Kao et al. found amplification without success-dependence hurt motivation, while feedback that clearly signals *whether the action worked* helped. For Dockside this fits "honest randomness": reveal feedback should scale with what was actually found (real glints, real partial shapes), not fire identically on every tile.
- **Curiosity is the playtime driver**, and it is the strongest single predictor in the 2024 study. A tile-by-tile reveal of an unknown container is mechanically a curiosity engine. Each scrape should reduce uncertainty a little and visibly.
- **The "before/after" is the product.** PowerWash's contrast rule (recolour the table so dirt reads) is directly transferable: every reveal surface needs a high-contrast hidden/revealed state, and completion of a meaningful sub-unit (a crate, a pallet) should get its own beat.
- Unpacking shows that judging and arranging found objects ("what is this, where does it go, what does it say about the owner?") is engaging on its own, even with no score. That is relevant to sorting finds from a container.

### Gaps
- I could not retrieve a primary Eric Barone design talk on why farming chores feel good. The "Chores: The Game" line is unverified (NPR page blocked).
- I found no peer-reviewed study specifically on why *job/cleaning* sims are enjoyable. The evidence is general (SDT, effectance, curiosity) plus developer testimony.
- I did not retrieve primary text for Csikszentmihalyi's flow or Sweetser & Wyeth's GameFlow (2005). [background, not fetched]: flow requires clear goals, immediate feedback and challenge matched to skill. Verify before citing.
- I did not retrieve a Jesse Schell primary source (e.g. "Lens of the Toy" in *The Art of Game Design*). The closest primary equivalent I found is Gabler et al.'s "build the toy first" (see section 5).
- Live Science's researcher quotes on "oddly satisfying" couldn't be extracted, so the 2017 incompleteness study is unverified.

---

## 2. What is a strong core loop for a business sim (micro / meso / macro), and how do the best ones layer hands-on action, decisions and long-term goals?

### Takeaway
Strong business and job sims stack three loops on different timescales:
- **Micro** (seconds): a tactile, juicy hands-on verb.
- **Meso** (minutes): a decision cycle about money, stock, pricing and risk that converts micro output into spendable resources.
- **Macro** (hours): expansion, new tiers, automation and prestige that change the micro and meso loops themselves.

The best examples put the satisfying physical act in the micro loop, real trade-offs in the meso loop, and *changes to how you play* in the macro loop. Loops are repeatable systems you master over time. "Arcs" are one-off content you consume. Long life comes from loops; arcs are expensive.

### Cited Findings
- **Timescale definitions**: micro loop = seconds (moment-to-moment feel); meso = minutes (clear a room, finish a run); macro = hours or across sessions (unlock a new biome, beat a boss). Vampire Survivors example: micro = dodge while auto-attacking; meso = survive 30 min and level weapons; macro = unlock characters and stages between runs. [secondary blog] — [The Design Lab, "Designing with Loops"](https://thedesignlab.blog/2025/05/05/designing-with-loops-why-your-game-isnt-working-yet/)
- **Loops vs arcs (Daniel Cook) [primary]**:
  - Loops are repeatable: mental model → action → system feedback → updated model. They are fractal, existing at many levels.
  - "An arc is a broken loop you exit immediately." Arcs are one-time content.
  - Loops build "wisdom" through "a thousand branches, successes, failures and nuances," but players can still exhaust them.
  - What keeps loops alive: "interrelated actions that trigger multiple loops," "crisply defined cause and effect," and "functional feedback."
  
  — [Lost Garden, "Loops and Arcs"](https://lostgarden.com/2012/04/30/loops-and-arcs/)
- An academic treatment of loops vs metagames: Sicart, "Loops and Metagames: Understanding Game Design Structures" (FDG 2015). Not read in full. — [FDG 2015 PDF](http://www.fdg2015.org/papers/fdg2015_paper_22.pdf)
- **Supermarket Simulator layering [primary platform + secondary]**: players install shelves and furniture, order stock and set prices — hands-on stocking and checkout plus pricing and ordering decisions. — [Game World Observer](https://gameworldobserver.com/2024/03/05/supermarket-simulator-viral-success-40k-ccu-turkish-devs)
  - Steam achievement data shows the macro arc: hands-on checkout (manual cashier), then licences for new product categories, loans, hiring staff (automation of your own micro loop), and store expansions. — [Steam global achievements, Supermarket Simulator](https://steamcommunity.com/stats/2670630/achievements)
- **Schedule I layering [secondary]**: production (grow or cook), then dealing (sell to NPCs; mix ingredients to raise value "and create comedic effects"), then expansion (hire dealers, cooks and botanists; buy properties). — [Wikipedia](https://en.wikipedia.org/wiki/Schedule_I_(video_game))
- **Dealer's Life layering [primary]**:
  - Micro and meso: a haggling engine where NPCs counter-offer, accept, reject, get angry or impose final offers. "The goods' real value is never shown anywhere. It's up to you and your client… to estimate the value."
  - Macro: skills (spotting fakes, persuasion), reputation that shapes random events, and risky shortcuts.
  
  — [Abyte Entertainment, Dealer's Life](https://www.abyteentertainment.com/dealers-life)
  - Dealer's Life 2 macro: start in a rundown shack. Shop upgrades increase how many customers come and the quality of their items. Hire a restorer, treasure hunter, forger, experts and more. Auctions. [secondary] — [Codex Gamicus / search summary](https://gamicus.fandom.com/wiki/Dealer's_Life_2); [Abyte launch post](https://abyteentertainment.com/2022/02/15/dealers-life-2-now-available-2/)
- **Scritchy Scratchy layering [primary + secondary]**:
  - Micro: you "physically drag your mouse across the scratch zone" ([scritchyscratchy.wiki](https://scritchyscratchy.wiki/game/), [secondary]).
  - Meso: choose which tickets to buy; some tickets carry penalties or bankruptcy risk ([Steam page](https://store.steampowered.com/app/3948120/Scritchy_Scratchy/), [primary]).
  - Macro: automation (Scratch Bot), then prestige for "Jack Points" with permanent upgrades "that reshape strategy" ([Steam](https://store.steampowered.com/app/3948120/Scritchy_Scratchy/)).
  - A reviewer summarises the arc as "You go from a desperate gambler to a casino manager." — [NeonLightsMedia review](https://www.neonlightsmedia.com/blog/scritchy-scratchy-review)
- **PowerWash's meso and macro are deliberately thin.** Friction is cut to protect the micro loop: no pipe or power management. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator). Depth is added by layering the *micro* loop: nozzles, detergents and dirt types. — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
- **Chris Zukowski (howtomarketagame) on "crafty buildy strategy simulation" games:**
  - They are "systems based games instead of content based," where "gameplay emerges from the interactions among various gameplay elements."
  - "Players can spend 5 hours building one possible solution but are still excited to try to solve the goal many other ways."
  - Adding elements scales replayability cheaply.
  
  — [How To Market A Game](https://howtomarketagame.com/2024/12/27/what-are-crafty-buildy-strategy-simulation-games/)

### Inferences
- **A template for a container/auction business sim (inference, built from the examples above):**
  - Micro: scrape or reveal tiles. Must be tactile and high-contrast, with a beat per sub-unit.
  - Meso: bid, then reveal, then decide to sell, keep or restore. This is where risk and judgement live: how much to bid on partial information, and when to sell versus hold.
  - Macro: new container types, ports, customers and tools that *change the micro and meso rules*, plus automation of earlier micro work. Prestige sits on top.
- **Automation of the micro loop is a macro-progression beat in itself.** Supermarket Simulator (hire cashiers and restockers), Scritchy Scratchy (Scratch Bot) and Dealer's Life 2 (employees) all turn "I used to do this by hand" into "now I manage it." It works only if a *new* hands-on verb replaces the automated one. Otherwise the game drifts toward idle play.
- Dealer's Life's hidden "real value" is the clearest model for a meso decision under uncertainty. That maps directly onto bidding for a sealed container.

### Gaps
- I found no GDC talk or postmortem that explicitly uses "micro / meso / macro" for a business or tycoon sim. The definitions come from a secondary design blog.
- I could not find a primary interview with Abyte (Dealer's Life) about how the haggling engine was designed.
- I did not find a primary source from Nokta Games (Supermarket Simulator) on their loop design.

---

## 3. What keeps players past the "2-hour cliff"?

### Takeaway
The 2-hour mark is a real commercial threshold: Steam refunds games played under two hours within 14 days. Achievement data from sims shows steep drop-off after the first loop, so most players never see the late game. What carries players past it:
- systems that combine in new ways (loops over arcs);
- unlocks that change *how* you play;
- automation that hands you a new role;
- prestige resets that compress earlier progress;
- optional, varied goals.

Pure content (arcs) and pure number growth are the weakest retainers. Pecorella's line, "the novelty of big numbers on their own is largely gone," sums it up.

### Cited Findings
- **Steam refund rule**: refunds are available "within two weeks of purchase and with less than two hours of playtime." [primary] — [Steam Refunds](https://store.steampowered.com/steam_refunds/)
- **Drop-off evidence from Steam achievements** [primary platform data, fetched 2026-10-03; percentages are Steam's global unlock rates]:
  - *Supermarket Simulator*:
    - Hands-on loop: 91.5% "Completed 50 checkouts"; 87.9% "100 checkouts all on your own."
    - Mid-game: 28.8% own 4 product licences; 24.7% took a bank loan; 20.4% paid off a loan; 9.7% hired 4 restockers.
    - Late game: 4.6% "Purchased all expandings"; 3.0% hired 4 cashiers.
    
    — [Steam](https://steamcommunity.com/stats/2670630/achievements)
  - *PowerWash Simulator*: 82.2% earned 5 career stars; 43.6% earned 50; 35.2% earned 100; 25.0% earned 150; 19.5% completed career mode; 7.6% earned one Challenge Mode gold. — [Steam](https://steamcommunity.com/stats/1290000/achievements)
  - Caveat: Steam's denominator for these percentages is not spelled out on the page. Treat these as relative drop-off, not exact retention.
- **Demo playtime benchmarks** (Chris Zukowski's surveys of 2022 Next Fests):
  - Median demo playtime across all demos is about 14 minutes (mean 19.75). The bottom 30th percentile averages about 10 minutes; the 70th percentile about 22.
  - The demos of top Next Fest wishlist earners had *median playtime of 80 minutes to 3 hours*.
  - Common advice: design 30–90 minutes of demo content.
  
  [secondary summary of Zukowski data] — [Steam Page Analyzer](https://www.steampageanalyzer.com/blog/how-long-should-a-steam-demo-be); see also [How To Market A Game, Feb 2026 Next Fest](https://howtomarketagame.com/2026/04/13/making-sense-of-the-february-2026-steam-next-fest/)
- **Systems beat content for longevity**: crafty-buildy games are "systems based games instead of content based." New elements multiply possible playtime without proportional cost. — [How To Market A Game](https://howtomarketagame.com/2024/12/27/what-are-crafty-buildy-strategy-simulation-games/)
- **Loops vs arcs**: arcs are consumed once; loops build mastery but can be exhausted unless they interrelate. Cook suggests management games explore "loops of player expression," "loops of economics and politics" or "mastery loops." — [Lost Garden](https://lostgarden.com/2012/04/30/loops-and-arcs/)
- **Anthony Pecorella (Kongregate) on idle and incremental design [primary]**:
  - Prestige creates "ladder climbing," giving players "the ability to reset with a huge boost that gives a sense of power and progress." It also reins growth into manageable numbers.
  - "When designing your game, determine where the 'fun' is and focus on that. Is it unfolding new features? Collecting tons of achievements? Optimizing the prestige loop? **The novelty of big numbers on their own is largely gone**, but there are still many opportunities for surprising and delighting players."
  
  — [Game Developer, "The Math of Idle Games, Part III"](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii); talk slides: [GDC Europe 2016, "Quest for Progress"](https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf)
- **Prestige compresses earlier content**: in Scritchy Scratchy, "a run that took you five hours on your first attempt might take thirty minutes on your second." Credits come at 7–10 hours. The reviewer notes "hardcore idle fans might be disappointed by the lack of an endless, months long grind." — [NeonLightsMedia](https://www.neonlightsmedia.com/blog/scritchy-scratchy-review)
- **Optional goals and multiple paths**: Stardew lets players farm, mine or fish to pursue goals ([search snippet](https://cheerfulghost.com/jdodson/posts/1005/interview-w-eric-barone-creator-of-stardew-valley)). Cozy design calls for "broad optional content" that can be ignored without penalty ([Lost Garden](https://lostgarden.com/2018/01/24/cozy-games/)).
- **Counter-example, a game that lost its reviewer after a couple of hours.** Dealer's Life 2 became "pretty lifeless after a couple of hours":
  - the haggling AI was exploitable, so "most of the clickable buttons are useless";
  - money had few meaningful sinks: "some house upgrades… that do nothing";
  - "I'd be able to sell an item for several million dollars and find that there was no real reason for me to have done so."
  
  [primary review, one critic's opinion] — [GameGrin](https://www.gamegrin.com/reviews/dealers-life-2-review/)
- **Retention as a kill criterion**: Supercell killed Smash Land in beta because "It just wasn't a game you'd play for years and years, beta targets were not met, there was a lack of content… updates started to feel cluttered." — Jonathan Dower, [Game Developer](https://www.gamedeveloper.com/business/quality-is-worth-killing-for-supercell-s-ruthless-approach-to-production)

### Inferences
- **Design target**: by about the 90-minute mark, a player should have (a) mastered the first micro loop; (b) seen at least one unlock that *changes the rules*, not just the numbers; (c) seen a visible next goal that needs a new kind of decision; and (d) automated or delegated something they used to do by hand. Steam's 2-hour refund window and the steep drop-off in achievement data make the first two hours the commercially critical stretch.
- **"A new system every ~hour" is better framed as "a new decision every tier."** The Dealer's Life 2 review shows what happens when money keeps growing but there is nothing new to decide or spend it on: hollow progression.
- **Prestige works when the replay is faster *and* different.** Scritchy's 5-hours-to-30-minutes compression keeps the early loop fresh because the player now has meta-upgrades that change strategy ("permanent upgrades that reshape strategy," per the Steam page).

### Gaps
- No public retention curve (D1/D7, hours-played distribution) for a job sim was found. Achievement percentages are a proxy only.
- I found no primary designer talk using the phrase "2-hour cliff." The framing here is mine, anchored to the Steam refund rule.
- I found no source quantifying the effect of "new system every hour" pacing on retention.

---

## 4. Progression design (director's extra focus): tiers that change how you play, two kinds of getting better, risk and loss, visible next goals, and why "bigger numbers" alone feels empty

### Takeaway
In the strongest examples (Balatro, Scritchy Scratchy, Dealer's Life at its best), each new tier changes the *rules and verbs*: boss blinds that alter how you must play, tickets "with unique rulesets" and downsides, customers with traits you must read. Bigger numbers alone are dull because, in Koster's terms, a pattern you have already "chunked" teaches you nothing new. Pecorella says the novelty of big numbers is gone. Dealer's Life 2's reviewer found millions of dollars meaningless without new decisions.

Progression feels earned when two kinds of growth run together: the player's own skill (reading customers, building a scoring engine, choosing tickets) and the shop's or character's power. It also needs real loss on the table: a failed blind ends a Balatro run, and a bad Scritchy ticket can bankrupt you. And it needs a visible, named next goal: the next ante's score, the next catalogue's price, the "Final Chance" ticket.

### Cited Findings

**(1) Each tier changes HOW you play**
- **Balatro antes and blinds [secondary wiki of game data]**:
  - Each ante has three blinds: Small (1× base chips), Big (1.5×) and Boss (usually 2× plus a special rule).
  - Base requirements by ante: 300 / 800 / 2,000 / 5,000 / 11,000 / 20,000 / 35,000 / 50,000.
  - Boss blinds change the rules, for example:
    - The Wheel: "1 in 7 cards get drawn face down";
    - The Manacle: "-1 Hand Size";
    - The Psychic: "Must play 5 cards".
  - Small and Big blinds can be skipped for Tags. "Boss Blinds must always be played."
  - Higher stakes (Green, Purple, etc.) are difficulty tiers that raise requirements.
  
  — [Balatro Wiki, Blinds and Antes](https://balatrowiki.org/w/Blinds_and_Antes)
  - Endless mode scaling grows faster than super-exponential, roughly x^(x²) in the ante number. [secondary] — [Balatro Fandom wiki](https://balatrogame.fandom.com/wiki/Blinds_and_Antes); [Guide: Scaling](https://balatrowiki.org/w/Guide:_Scaling)
- **Balatro's design history [primary, LocalThunk]**:
  - The December 2021 prototype had "no Jokers, there were no blinds to select, the upgrade system consisted of randomly choosing a card from the deck and slapping a weird 'enhancement' on it."
  - Jokers and "different boss blinds" were added in February 2022.
  - The skip-tag system came in July 2023.
  - In other words, the rule-changing layers were added on top of a plain scoring core.
  
  — [LocalThunk, "The Balatro Timeline"](https://localthunk.com/blog/balatro-timeline-3aarh)
- **Scritchy Scratchy catalogues [primary + secondary]**:
  - The Steam description promises "a growing collection of scratchers, each with its own quirks, surprises, and sometimes downsides." Upgrades include "new card variants with unique rulesets." "Some cards offer high payouts with penalties; others threaten entire runs with bankruptcy." Players build their own "luck engine": "Slow and steady, wildly explosive, or pure chaos." — [Steam store page](https://store.steampowered.com/app/3948120/Scritchy_Scratchy/) [primary]
  - A guide lists 17 tickets across 4 catalogues, each catalogue mixing risk profiles. [secondary guide; ticket rules not detailed]
    - Catalogue 1: Two Win ($10, "safe starting point"), Mini Scratch, Apple Tree, Quick Cash ($10,000), Lucky Cat ($300,000, "high-risk, manual-scratch only"), Final Chance ($50M, "run-ending prestige card").
    - Catalogue 2: Sand Dollars ($20M, medium-risk automation option), plus "very high-risk" Scratch My Back, Snake Eyes and The Bomb.
    - Catalogue 3: Bank Break, Xmas Countdown, Thrift Store, Berry Picking.
    - Catalogue 4: Trick Or Treat, Booster Pack, To The Moon, Slot Machine.
    - One rule: "Never let Mondu scratch a Final Chance card. If it lands as a losing ticket, Mondu dies permanently."
    
    — [games.gg ticket guide](https://games.gg/scritchy-scratchy/guides/scritchy-scratchy-scratch-tickets-guide/)
  - In the demo, tickets level up with use, "increasing the value of the rewards on the scratchcards, the money you get from your day job, and more." Final Chance was $10M in the demo (the guide lists $50M for the full game). — [Adventure Gamers](https://adventuregamers.com/article/scritchy-scratchy-game)
  - Core upgrades are Scratch Luck, Scratch Size and Scratch Coin. Size and Coin change how fast you clear a card; Luck changes outcomes. [secondary guide] — [TheGamer](https://www.thegamer.com/scritchy-scratchy-best-upgrades-guide/)
  - The role shift: "You go from a desperate gambler to a casino manager" as manual scratching gives way to automation and hired assistants. — [NeonLightsMedia](https://www.neonlightsmedia.com/blog/scritchy-scratchy-review)
  - Commercial context:
    - Released 18 March 2026 (Lunch Money Games / Funday Games). Steam shows 94% positive on 8,626 reviews; recent 30 days 87% of 1,175. [primary] — [Steam](https://store.steampowered.com/app/3948120/Scritchy_Scratchy/)
    - Third-party estimates: about 361K copies, about $2M gross, all-time peak 23,780 CCU. [secondary estimate; another tracker cites 16,429 reviews, which conflicts with Steam's own count and may include all languages] — [Raijin](https://raijin.gg/app/3948120/Scritchy_Scratchy/sales-revenue); [Steambase](https://steambase.io/games/scritchy-scratchy/info)
- **Dealer's Life: new customers and new verbs [primary]**:
  - "thousands of unique customers, with ever-changing behaviors and traits" who "act differently during negotiations according to their specific psychological traits, which are reflected in their appearance."
  - Skills unlock new reads ("spotting fakes," "identifying items with potential") and new negotiation moves ("persuade your customer to get a better deal").
  
  — [Abyte](https://www.abyteentertainment.com/dealers-life)
  - In Dealer's Life 2, new *staff roles* add new verbs: the restorer raises value, the treasure hunter sources rare items, and the forger turns a genuine item into a more valuable fake. Auctions add buy and sell modes with rarity prerequisites. [secondary] — [Codex Gamicus](https://gamicus.fandom.com/wiki/Dealer's_Life_2)
- **Horizontal vs vertical progression [secondary]**:
  - Vertical progression adds power (more damage or health). Horizontal progression adds possibilities (new tools, mechanics, characters, rule modifiers).
  - "Players need to feel that every run moves them forward in a way that changes how they play, not just how strong they are."
  
  — [Bugnet, "How to Design a Roguelite Meta-Progression"](https://bugnet.io/blog/how-to-design-a-roguelite-meta-progression)

**(2) Two kinds of getting better: player skill and character/shop power**
- Roguelites have "in-iteration power based on skill and decisions within a single run" and "meta-power progression with permanent upgrades." If permanent upgrades are too strong they "undermine skill"; too weak and players feel stuck. [secondary] — [Bugnet](https://bugnet.io/blog/how-to-design-a-roguelite-meta-progression)
- The player-side critique: stat-based meta-progression lets players "fail upward," winning by accumulated stats without deliberately improving. [forum opinion; secondary] — [ResetEra thread](https://www.resetera.com/threads/im-starting-to-feel-that-stat-based-meta-progression-is-starting-to-ruin-roguelites-generally-speaking.1509337/)
- Dealer's Life pairs *player skill* (estimating value that "is never shown anywhere"; reading traits from appearance) with *character skill* (a Competence skill that improves the value estimate; persuasion abilities). — [Abyte](https://www.abyteentertainment.com/dealers-life)
- When the two kinds of growth come apart, play goes flat. GameGrin found that careful reading of customers became unnecessary ("skip about half of these steps and instead just go with the flow"), and that hired "expert" employees still failed at spotting fakes. Skill growth stopped mattering and the game went "lifeless." — [GameGrin](https://www.gamegrin.com/reviews/dealers-life-2-review/)
- Balatro's skill side: the score target per ante is fixed and published, so a better player gets further on the same deck by building a better scoring engine. Score is multiplicative ("CHIP X MULT… seemed very natural for a scoring system"). — [LocalThunk](https://localthunk.com/blog/balatro-timeline-3aarh). Stakes then raise the bar for players whose skill has outgrown the base game. — [Balatro Wiki](https://balatrowiki.org/w/Blinds_and_Antes)
- PowerWash's skill side is subtle. Late-game efficiency comes from choosing nozzles and detergents and knowing where dirt hides; element names help "track down the final patches of dirt." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator); [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
- Koster: once a pattern is "chunked" it runs on autopilot and becomes boring. Players need new patterns to learn as their skill grows. [secondary] — [Game Studies wiki](https://game-studies.fandom.com/wiki/A_Theory_of_Fun_for_Game_Design)

**(3) Risk and loss make progression feel earned**
- Balatro: "Failing to meet a blind's score requirement results in run loss." — [Balatro Wiki](https://balatrowiki.org/w/Blinds_and_Antes)
- Scritchy Scratchy: some cards "threaten entire runs with bankruptcy" ([Steam](https://store.steampowered.com/app/3948120/Scritchy_Scratchy/)). In the demo, bankruptcy triggers a prestige reset ([Adventure Gamers](https://adventuregamers.com/article/scritchy-scratchy-game)). A helper can die permanently on a losing Final Chance ticket ([games.gg](https://games.gg/scritchy-scratchy/guides/scritchy-scratchy-scratch-tickets-guide/)). Lucky Cat is high-risk and manual-only.
- Dealer's Life: "Making more money will always come with some risks and consequences dictated by the integrity of your choices." Customers can get angry and impose final offers, and fakes can catch you out. — [Abyte](https://www.abyteentertainment.com/dealers-life)
- Supercell describes the opposite problem, a game without enough at stake: "it just didn't feel right." — [Game Developer](https://www.gamedeveloper.com/business/quality-is-worth-killing-for-supercell-s-ruthless-approach-to-production)
- General claim that "a game with no risk turns into a chore, and progress has no emotional weight." [secondary blog, low authority] — [Blueprint Review](https://blueprintreview.co.uk/2025/10/why-gambling-logic-works-so-well-in-game-progression-design/)
- **Tension with cozy design**: Project Horseshoe lists danger and threat as coziness breakers and wants opt-in activities. — [Lost Garden](https://lostgarden.com/2018/01/24/cozy-games/). PowerWash deliberately has no threats or time limits. — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
  - Resolution in the examples: risk is *opt-in and bounded*. Balatro's risk is the run, not your save. Scritchy's riskiest tickets are choices, and prestige turns a bust into permanent progress.

**(4) Visible next goals**
- Balatro shows the next blind's exact score target and the boss blind's rule before you play it. Boss blinds "must always be played," so the player can plan for a known obstacle. — [Balatro Wiki](https://balatrowiki.org/w/Blinds_and_Antes)
- Scritchy Scratchy puts a named, priced end goal on the menu from the start: the Final Chance ticket ($10M in the demo, $50M per the full-game guide). In the demo, a phone call tells you that you need more luck. — [Adventure Gamers](https://adventuregamers.com/article/scritchy-scratchy-game); [games.gg](https://games.gg/scritchy-scratchy/guides/scritchy-scratchy-scratch-tickets-guide/)
- Upgrades "gradually unlock as you progress through the game, earn more money, and level up." [secondary] — [TheGamer](https://www.thegamer.com/scritchy-scratchy-best-upgrades-guide/)
- PowerWash shows remaining dirt by named element, with a per-element completion beat. The goal of each level is always visible. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- LocalThunk designed the collection screen deliberately: a new symbol was invented for The Flint to "bring the total number of blinds from 29 to 30 for a neat Collection screen." [secondary, quoting LocalThunk's Discord] — [search result summary of Balatro wiki](https://balatrogame.fandom.com/wiki/Blinds_and_Antes)

**Why "bigger numbers" alone feels empty**
- Pecorella: "The novelty of big numbers on their own is largely gone." — [Game Developer](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii)
- Koster: boredom sets in when nothing new is left to learn. — [Lost Garden review](https://lostgarden.com/2005/05/08/book-raph-kosters-theory-of-fun-for-game-design/)
- Dealer's Life 2: millions in profit with "no real reason for me to have done so." — [GameGrin](https://www.gamegrin.com/reviews/dealers-life-2-review/)
- Salen and Zimmerman: an action must be "integrated" — it has to affect later play — to be meaningful. A number that only grows, and opens no new decisions, isn't integrated. — [Wikipedia: Meaningful play](https://en.wikipedia.org/wiki/Meaningful_play)
- Kao et al.: amplification without success-dependence reduced motivation. Spectacle that isn't tied to what the player achieved doesn't motivate. — [ACM DL](https://dl.acm.org/doi/10.1145/3613904.3642656)

### Inferences
- **Rule of thumb for each tier**: every new tier should add at least one of: a new *verb* (restore, appraise, auction, forge, automate), a new *constraint* (a boss-blind-style twist), a new *customer or opponent type* to read, or a new *risk profile* to choose. "Same thing, ×10 value" should never be the only change.
- **Dockside mapping (inference, for the director)**:
  - Container classes could act like Scritchy catalogues or Balatro antes. Each class brings its own reveal rule: refrigerated containers that spoil if slow, customs-sealed boxes with partial manifests, damaged boxes where scraping can break items.
  - Port contracts work as visible next goals, like the next blind's score.
  - Rival bidders and buyers work as Dealer's Life customers, with readable traits and tells.
  - Prestige should unlock *strategy-changing* perks, not only multipliers.
  - **These are suggestions, not tested.**
- **Two-track growth for Dockside**:
  - Player skill: reading partial reveals, judging bid ceilings, reading rivals, choosing sell timing.
  - Shop power: tools, scrape size, appraisal and expert hires.
  - Keep shop power from *replacing* player judgement. Dealer's Life 2's reviewer stopped reading customers once the game no longer required it.
- **Risk should be opt-in, bounded and honest.** Losing money on a bad container is the stake, but bankruptcy should feed prestige, as in Scritchy, rather than wipe the player out. Under CLAUDE.md's honest-randomness rule, odds are published and near-misses come from real partial reveals. Balatro's published targets are a good model.

### Gaps
- No primary developer interview from Lunch Money Games (Scritchy Scratchy) was found. The details of each ticket's unique mechanic were not available in the guides I fetched.
- No primary Abyte interview on haggling design. The GameGrin review is one critic's opinion and may not match the wider player base; I didn't check Steam review sentiment for Dealer's Life 2.
- I didn't get a primary LocalThunk statement on *why* antes scale as they do, or on the design intent behind run loss.
- No academic study isolating "rule-changing tiers vs number-scaling tiers" was found. The case rests on designer testimony and theory (Koster, Pecorella, Salen and Zimmerman).

---

## 5. How do designers prototype and test "is this fun?" cheaply before full production?

### Takeaway
The established cheap methods:
- Timebox tiny prototypes (days to weeks), built by one person or a small cell.
- Build the "toy" (the core verb) first, before goals and content.
- Make it juicy early, because feedback is part of the fun being tested.
- Subtract anything that doesn't serve the core.
- Kill fast and celebrate the kill.
- Iterate in public with a small trusted tester group, then a demo.

Useful signals: unprompted "it's fun" from the team early (PowerWash), testers playing far beyond what was asked (a Balatro friend played the beta "for dozens of hours"), free-choice playtime after the required session (the SDT lab standard used by Kao et al.), and demo median playtime against Zukowski's benchmarks.

### Cited Findings
- **Gabler, Gray, Kucic & Shodhan, "How to Prototype a Game in Under 7 Days" (Experimental Gameplay Project, 2005; GDC 2006) [primary]**:
  - Setup: four grad students, one semester. Each game made in under 7 days, by exactly one person, around a shared theme. [secondary summary] — [Escapist](https://www.escapistmagazine.com/prototype-making-games-in-seven-days-or-less/); [GDC Vault](https://www.gdcvault.com/play/1013294/How-to-Prototype-a-Game)
  - Rules:
    - "Failure is ok! That's what prototyping is for."
    - "More Time != More Quality."
    - "Build the Toy First."
    - "Make It Juicy": "constant and bountiful user feedback."
    - "Quickly recognize dead-end game ideas, cut your losses and move on."
    - "Fake It": a drop shadow instead of lighting.
    - Aesthetics enhance a good design but cannot save a bad one.
    - Games with creation features had the most replay value.
    - "We knew before touching a line of code that the idea was solid, because we had run a simulation of the game as a little thought experiment."
    - "Not a single one was the result of sitting down as a group for a brainstorm session."
  
    — [Gamasutra article mirror](https://www.cs.hmc.edu/~markk/SWE_copies/gabler_prototyping.html)
  - Tower of Goo, made in under a week by one person, was downloaded over 100,000 times within months. It became World of Goo. — [Escapist](https://www.escapistmagazine.com/prototype-making-games-in-seven-days-or-less/)
- **Supercell's cells and kill culture [primary quotes via press]**:
  - Of their last 10 games at the time of the article: 7 killed in prototype, 2 at soft launch, 1 launched globally (Clash Royale).
  - Teams are 3–15 people. Teams make kill decisions themselves.
  - "Financial goals are secondary to quality." — Jonathan Dower
  
  — [Game Developer](https://www.gamedeveloper.com/business/quality-is-worth-killing-for-supercell-s-ruthless-approach-to-production)
  - A first prototype usually takes several weeks. Then a small internal playtest, then company-wide testing, then a limited-country beta. Kills are celebrated with champagne. [secondary] — [Corporate Rebels](https://www.corporate-rebels.com/blog/failure-sessions-supercell)
- **Balatro's path from prototype to demo [primary, LocalThunk]**:
  - Bare prototype in December 2021; jokers and boss blinds added in February 2022.
  - February 2023: friends' reaction to a new build. One "has played the beta for dozens of hours."
  - June 2023: a 50-round demo with "10-20 concurrent players."
  - September 2023: switched to a content-limited demo where "players can play as much as they want, which is much more sensible."
  - Before launch: a private server of community testers chosen for "an exceptional ability to give feedback, understand the vision of the game, and analyze the flaws." This began "a more player-focused development strategy… instead of just listening to my gut all the time."
  - Wishlists: 94,212 in December 2023, 208,401 at launch. 119,000 units sold on launch day.
  
  — [LocalThunk blog](https://localthunk.com/blog/balatro-timeline-3aarh)
  - On the demo: "This game really became the strategy game it is now because of the iteration I was able to do with the community over time." — [TouchArcade interview](https://toucharcade.com/2024/03/18/balatro-interview-mobile-port-localthunk-dlc-plans-updates-new-jokers-demo-feedback/)
- **PowerWash's early fun signal**: "It became apparent to the team very early on that the act of cleaning was going to be fun" (Chequer). — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502). The concept itself came from a brainstorm on simplifying FPS mechanics. — [Shacknews](https://www.shacknews.com/article/131441/powerwash-simulator-developer-interview)
- **Goat Simulator came from a one-month internal game jam** at Coffee Stain (January 2014):
  - Alpha footage got over 1 million YouTube views in two days, which drove the decision to ship.
  - The team kept non-crash bugs and capped development at four weeks to preserve the prototype's charm.
  - Results: over 2.5 million copies across platforms by January 2015; about $12M revenue by 2016.
  
  [secondary] — [Wikipedia](https://en.wikipedia.org/wiki/Goat_Simulator)
- **Unpacking**: subtractive design, "removing anything that isn't serving the core ideas." The game was born from a real-life observation (Brier and her partner moving in together) that unpacking had "game-like" qualities. — [Game Developer](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)
- **Greyboxing**: use primitive shapes as stand-ins so a mechanic can be playtested without new assets. [secondary] — [Video Game Workshop, "Greybox Your Game"](https://videogameworkshop.substack.com/p/greybox-your-game)
- **Measurable signals**:
  - Free-choice playtime after the required session is a standard behavioural measure of intrinsic motivation; Kao et al. used it alongside surveys. — [ACM DL](https://dl.acm.org/doi/10.1145/3613904.3642656)
  - Demo median playtime: about 14 minutes across all demos vs 80 minutes to 3 hours for top wishlist earners. [secondary summary of Zukowski data] — [Steam Page Analyzer](https://www.steampageanalyzer.com/blog/how-long-should-a-steam-demo-be)
  - Supermarket Simulator had 33,000+ wishlists before launch, gaining about 2,000 a day. — [Game World Observer](https://gameworldobserver.com/2024/03/05/supermarket-simulator-viral-success-40k-ccu-turkish-devs)

### Inferences
- **A cheap "fun test" protocol for a small team** (synthesised from the sources above):
  1. Build the toy in days: the scrape or reveal verb, greyboxed but juicy. Ask whether testers keep scraping with no goal at all. That is PowerWash's "fun very early on" signal.
  2. Add one meso decision, such as a bid on partial information. Run a paper or spreadsheet simulation of the economy first (Gabler's "thought experiment"; Dockside already has `sim/run.py`).
  3. Playtest with five to ten people. Measure free-choice playtime after a set 15-minute session, plus unprompted "one more" behaviour. Ask what they wanted to unlock next.
  4. Kill or keep by pre-agreed thresholds, Supercell-style.
  5. Then a content-limited demo (Balatro's lesson), tracked against Zukowski's demo playtime benchmarks.
- **Test progression with a "tier swap" paper prototype**: describe tier 2's new rule on a card and have testers play tier 1 and tier 2 by hand. If tier 2 only changes numbers, testers won't notice a difference. That is the Koster and Pecorella failure mode.
- Signals worth logging in the web prototype: time to first voluntary second container, sessions that continue past a natural stopping point, and how many players reach the first rule-changing unlock.

### Gaps
- No primary FuturLab account of PowerWash's prototype phase: length, prototype tools, or how many testers.
- I didn't retrieve primary sources on paper prototyping for economy sims specifically, such as Machinations or Joris Dormans' work.
- No published threshold of the form "if X% of testers play Y minutes, proceed" from any studio. Supercell's beta "targets" are not public.
- I didn't find a Witch Beam source describing Unpacking's prototype or jam origins in detail.

---

## 6. What makes simulator games clip well on TikTok/YouTube?

### Takeaway
Sims clip well when one short clip shows:
- a clear, satisfying transformation (dirty to clean, sealed to revealed);
- an emotional reaction from the player (surprise, frustration, laughter);
- absurdity or chaos from systems (physics glitches, odd customers, comedic item mixes);
- a premise anyone understands instantly (a familiar, often blue-collar, job).

Streamer play is the main amplifier for recent hits (Supermarket Simulator, Schedule I). Co-op and chat-friendly pacing help further.

### Cited Findings
- **Supermarket Simulator** (Nokta Games, a team of four, Early Access 20 February 2024):
  - Peak 38,056 CCU on 4 March 2024. 4.2M hours watched on Twitch; peak 141,000 Twitch viewers on 3 March.
  - Top streaming languages: Spanish, French, English, German, Russian.
  - YouTube: MM7Games' video reached 576K views in 12 days; Kuplinov Play's passed 2M.
  - It beat PlayWay's job sims: Car Mechanic Simulator 2021 (22.5K CCU), House Flipper 2 (18.1K), House Flipper (15.9K).
  
  [primary data compiled by trade press] — [Game World Observer](https://gameworldobserver.com/2024/03/05/supermarket-simulator-viral-success-40k-ccu-turkish-devs)
- **What works on livestreams**: viewers respond to "an emotional response from the streamer — whether it's nervousness, excitement, frustration, surprise, or fear." Co-op lets streamers team up, and then "the graphics and storyline often become secondary," creating "joking, trolling, emotions, and relationship drama." Chained Together (2024) streams by IShowSpeed and Kai Cenat hit 200K+ concurrent viewers per channel. Supermarket Simulator drew CaseOh, Auronplay and Ironmouse. — [Streams Charts](https://streamscharts.com/news/what-makes-game-successful-livestreaming) [secondary analytics firm]
- **Schedule I** (TVGS, Early Access 24 March 2025) "gained popularity from being livestreamed on Twitch and TikTok." An analyst said it "proves how important TikTok and streamers are for a game's success." Mixing drugs with ingredients creates "comedic effects," a built-in clip generator. [secondary] — [Wikipedia](https://en.wikipedia.org/wiki/Schedule_I_(video_game))
- **Zukowski on sims, streamers and demos [search snippets]**:
  - "Steam fans really like simulating a job, particularly if it is blue collar." ([The hit games of early 2025](https://howtomarketagame.com/2025/04/11/the-hit-games-of-early-2025/))
  - Streamers often prefer laid-back games where they can stop and chat.
  - A perpetually live demo lets streamers find a game and play it across several streams.
  
  [search snippets; full articles not fetched]
- **Goat Simulator**: physics chaos is the content. Alpha footage got 1M+ YouTube views in two days, and the developers kept non-crash bugs because the glitches were "really hilarious." [secondary] — [Wikipedia](https://en.wikipedia.org/wiki/Goat_Simulator)
- **PowerWash** was built to recreate *watching* satisfying power-washing videos. Its source material was already a viral genre. [search snippet] — [Noisy Pixel](https://noisypixel.net/powerwash-simulator-interview-futurlab-dlc-sequel/); [Shacknews](https://www.shacknews.com/article/131441/powerwash-simulator-developer-interview)
- **House Flipper** (PlayWay, 2018): many YouTubers and streamers made content around it. [search snippet] — [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper)
- **Unpacking**: 14% of players flushed every toilet, an example of playful, shareable micro-interactions in a calm game. — [Game Developer](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)

### Inferences
- **For a container-opening game, the clip is the reveal.** The prototype should make a 10–20 second sequence readable without sound or context: a sealed door, a partial glint, a scrape, and a big find or a comic dud. Before/after contrast (the PowerWash rule) and a clear value counter make the stakes legible to a viewer.
- Absurd *finds* and absurd *rival bidders and buyers* are the container-game equivalent of Schedule I's comedic mixes and Supermarket Simulator's customers. Systemic variety beats hand-authored jokes because streamers need fresh moments every session.
- Honest odds help clips: a real rare find is more credible, and more shareable, than a rigged one. Viewers notice rigging. (Inference; no source tested this.)
- A perpetually live demo and laid-back pacing that leaves room for streamer chat favour a reveal-and-sell loop with natural pauses.

### Gaps
- I found no first-party developer postmortem that attributes a sim's success to *specific* clip mechanics with data (e.g. "feature X drove N TikTok views").
- No TikTok-specific analytics (view counts by game or hashtag) from a reliable source. TikTok tag pages returned no usable data.
- The Zukowski streamer claims are search snippets; the full articles weren't fetched.
- No data on whether "big reveal" moments specifically drive clips, as opposed to streamer personality. Streams Charts emphasises streamer emotion and co-op.
