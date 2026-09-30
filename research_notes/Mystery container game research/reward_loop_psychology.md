# Psychology and Game-Design Science of Reward-Loop, Reveal and Incremental Games (with an Ethical Lens for a Buy-Once, No-Real-Money-Randomness Game)

Research note: many primary pages (Kongregate blog, Game Developer, GDC Vault, pegi.info, classification.gov.au, reedsmith.com, Stanford GSB) were blocked by the network egress proxy during this session. Where that happened, findings rest on search-result extracts of those pages (flagged "via search extract"). Treat exact wording as close paraphrase and verify before quoting.

---

## 1. Variable-ratio reinforcement and reward prediction error: why the moment before a reveal is the most exciting

### Takeaway
Dopamine neurons signal reward prediction error (RPE), meaning the gap between expected and actual reward, not reward itself. Once a cue predicts a reward, the dopamine burst moves to the cue. Under uncertainty, a separate slow ramp of dopamine activity builds before the outcome and peaks when the odds are 50/50. In humans, the nucleus accumbens responds to anticipating a reward, as distinct from receiving it. Together these explain why the pre-reveal build-up (the spin, the lid lifting) carries so much of the excitement.

### Cited Findings
- Schultz, Dayan & Montague (Science, 14 Mar 1997) proposed the RPE theory of dopamine. Over learning, phasic dopamine firing shifts from delivery of the reward to the first cue that predicts it. A fully predicted reward no longer activates the neuron, and an omitted expected reward depresses firing. — [Schultz et al. 1997, Science](https://www.science.org/doi/10.1126/science.275.5306.1593); [PDF](https://www.its.caltech.edu/~jkenny/nb250c/papers/Schultz-1997.pdf)
- Fiorillo, Tobler & Schultz (Science 299:1898–1902, 2003) found two dopamine responses. (a) The phasic response to a cue scaled with reward probability. (b) A newly observed sustained activation "consisted of a gradual increase in activity until the potential time of reward". It was maximal at P = 0.5, weaker at P = 0.25 and 0.75, and absent at P = 0 and 1. At P = 0.5, 29% of 188 neurons showed significant increases before the potential reward and only 3% showed decreases. The authors interpret this as coding uncertainty, since variance, SD and entropy all peak at P = 0.5. — [Fiorillo et al. 2003 PDF](https://www.pdn.cam.ac.uk/system/files/documents/2003-fiorillo-science.pdf); [Science](https://www.science.org/doi/10.1126/science.1077349)
- Caveat: whether that ramp is true "uncertainty coding" or an artefact of TD errors propagating backwards has been debated. A follow-up paper argues delay-period activity reflects uncertainty rather than backpropagating TD errors. — [Fiorillo et al., Behav Brain Funct (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1182345/); [Niv et al. "Dopamine, uncertainty and TD learning"](https://link.springer.com/article/10.1186/1744-9081-1-6)
- Knutson, Adams, Fong & Hommer (J Neurosci, 15 Aug 2001) used the Monetary Incentive Delay task. Anticipating increasing monetary reward selectively recruited the nucleus accumbens (NAcc). Anticipatory NAcc activation "is not strongly influenced by prior outcomes". This establishes a neural separation between anticipation and outcome. — [Knutson et al. 2001, J Neurosci](https://www.jneurosci.org/content/21/16/RC159)
- Reward variability and frequency have been reviewed as "engineered highs" that may drive problematic engagement in gambling and gaming products. — [Engineered highs, Addictive Behaviors 2023](https://www.sciencedirect.com/science/article/pii/S0306460323000217)

### Inferences
- The most arousing part of a reveal is the interval in which the outcome is uncertain and imminent: the ramp. The payoff itself produces a large signal only when it beats expectation. Designers should therefore invest in the build-up (staged reveal steps, rising audio, slow-down) and make sure some outcomes truly exceed expectation. Rare, surprising, high-value outcomes produce the largest positive RPE.
- Fiorillo's P = 0.5 peak suggests anticipation is strongest when the player really cannot guess the outcome. A reveal whose content is near-certain produces little anticipation. A container game should keep meaningful uncertainty on each reveal, for example about rarity tier or specific item, even when the player's long-run expected value is fixed and fair.
- Because the dopamine response migrates to predictive cues, the audiovisual "tell" that a good item is coming (a rarity-coloured glow, for example) itself becomes rewarding. That is powerful, and it is also exactly the lever that turns manipulative when cues are made to lie (see near-misses and LDWs below).
- Variable-ratio schedules (reward after an unpredictable number of actions) are the classic operant basis for persistent responding. I did not retrieve a primary Skinner/Ferster source this session (see Gaps).

### Gaps
- No primary citation retrieved for Ferster & Skinner (1957) schedules of reinforcement or for the extinction-resistance of variable-ratio schedules. Standard textbook material, but unsourced here.
- Berridge & Robinson's "wanting vs. liking" distinction (dopamine mediates incentive salience or "wanting", not hedonic "liking") is highly relevant to anticipation vs. receipt. No primary source was retrieved this session.
- No quantitative human study was found that directly compares self-reported excitement before vs. after an in-game reveal.

---

## 2. Near-miss effects: evidence, why rigged near-misses are manipulative and regulated, and how to make honest ones

### Takeaway
Near-misses (a loss that looks close to a win) feel worse than clear losses yet increase the desire to keep playing. They recruit win-related reward circuitry, more strongly in problem gamblers. Slot makers learned to inflate near-miss frequency beyond chance with weighted "virtual reels". Nevada ruled in 1989 that algorithms deliberately creating payline near-misses were unacceptable. An honest near-miss is one whose frequency and appearance follow directly from the real, disclosed odds, with no secondary rule that picks a "tease" outcome after a loss is decided.

### Cited Findings
- Reid, R. L. (1986), "The psychology of the near miss," *Journal of Gambling Behavior* 2:32–39. Near-misses are widely believed to encourage continued play even when win probability is constant. Some commercial gambling products (instant lotteries, slot machines) are "contrived to ensure a higher frequency of near misses than would be expected by chance alone." Reid explained the effect via frustration theory or cognitive regret. — [Reid 1986 PDF (Berkeley)](https://www.stat.berkeley.edu/~aldous/157/Papers/near_miss.pdf); [Semantic Scholar](https://www.semanticscholar.org/paper/The-psychology-of-the-near-miss-Reid/0354b802ddb721407b5e3c7f71dd9fbf4275d81c)
- Clark, Lawrence, Astley-Jones & Gray (Neuron, 2009) compared near-misses (reel stops one position from the chosen icon) with full-misses in a slot-machine task. Near-misses were rated **less pleasant** than full-misses but **increased desire to play**. They produced significantly greater BOLD signal in bilateral ventral striatum and anterior insula, the same regions activated by unpredictable monetary wins. Insula response to near-misses correlated positively with "How much do you want to continue to play?" The authors propose an illusion-of-control mechanism, in which near-misses are read as evidence of skill acquisition. — [Clark et al. 2009, Neuron](https://www.cell.com/neuron/fulltext/S0896-6273(09)00037-3); [PubMed 19217383](https://pubmed.ncbi.nlm.nih.gov/19217383/)
- Chase & Clark (J Neurosci 2010): gambling severity predicts midbrain response to near-miss outcomes. — [J Neurosci 30(18):6180](https://www.jneurosci.org/content/30/18/6180)
- van Holst et al. (Neuropsychopharmacology 2016): amplified striatal responses to near-misses in pathological gamblers. — [PMC4987843](https://pmc.ncbi.nlm.nih.gov/articles/PMC4987843/); [Nature NPP](https://www.nature.com/articles/npp201643)
- Near-miss effects on real betting have also been examined in casino rapid roulette. — [Judgment and Decision Making (Cambridge)](https://www.cambridge.org/core/journals/judgment-and-decision-making/article/impact-of-nearmiss-events-on-betting-behavior-an-examination-of-casino-rapid-roulette-play/FAD84ADB84012818CEA31FA9F6E91E60)
- **How slots manufacture near-misses.** Inge Telnaes' US Patent 4,448,419 (May 1984) introduced "virtual reel mapping". Each visible reel stop maps to many invisible positions in memory, so symbols need not be equiprobable. Making the blank directly above or below a jackpot symbol more frequent inflates near-misses on the payline's edges. — via search extract of [Harrigan, "Slot Machine Structural Characteristics: Creating Near Misses Using High Award Symbol Ratios" (IJMHA 2008)](https://link.springer.com/article/10.1007/s11469-007-9066-8); [Telnaes patent US4448419A](https://patents.google.com/patent/US4448419A/en)
- **Regulation.** A 1989 Nevada Gaming Commission ruling held that a manufacturer's proprietary algorithms creating a high number of near-misses *on the payline* were "unacceptable". Virtual-reel mapping that creates near-misses above or below the payline stayed acceptable. After the 1988–89 Universal Distributing controversy, Nevada explicitly banned secondary decision algorithms that choose a "near miss" stop after a losing outcome has already been determined. — via search extract of [Harrigan, "Slot Machines: Pursuing Responsible Gaming Practices for Virtual Reels and Near Misses"](https://www.researchgate.net/publication/225824549_Slot_Machines_Pursuing_Responsible_Gaming_Practices_for_Virtual_Reels_and_Near_Misses) (secondary; verify against Nevada Gaming Commission Regulation 14 before quoting)

### Inferences
- **Why rigged near-misses are manipulative:** (1) they make losses look closer to wins than the odds justify; (2) Clark's data show they motivate continued play while being less pleasant, which is engagement at the expense of enjoyment; (3) in pure-chance games the illusion-of-control reading ("I almost had it") is false by construction. Regulators drew the line at *post-hoc outcome selection*: the tease is chosen after the loss is decided.
- **Honest near-miss design for a container/reveal game:**
  - Resolve the outcome first, then animate it truthfully. Whatever the player sees "almost" happening must have been a real possibility with its stated odds. Never pick a teaser frame after the result is known.
  - Do not over-represent top-rarity items in the "scroll past" strip. If a CS-style reel shows neighbouring items, sample the neighbours from the real distribution.
  - Near-misses are most defensible where skill or information matters. In a skill-based appraisal or bidding mechanic, "almost" is real feedback the player can learn from, unlike in pure chance.
  - Publish odds in-game (drop tables, rarity %) and optionally show a history log. Transparency removes the deception that makes near-misses exploitative.
  - Consider the "bad-luck protection" / pity-timer pattern, which caps droughts rather than dangling false closeness.
- In a game with no real money at stake, the harm stakes are lower. Players and critics still recognise slot-style teasing, and it feeds the "gambling simulator" reputation risk (Section 9).

### Gaps
- Could not retrieve Clark et al. 2009 sample sizes or effect sizes (I believe the paper had a behavioural and an fMRI sample, but this is unconfirmed here).
- Could not confirm the current text of Nevada Regulation 14 or UK Gambling Commission remote technical standards on near-miss/"false near-miss" rules as of 2026.

---

## 3. Loss aversion, sunk cost, and "losses disguised as wins"

### Takeaway
Losses weigh about twice as much as equivalent gains (median λ ≈ 2.25). People keep investing in what they have already paid for, whether money or time (sunk cost). Multi-line slots exploit perceptual framing: celebrating a "win" smaller than the stake (a loss disguised as a win, LDW) produces arousal similar to real wins. For an ethical game this implies celebrations must be proportional to the true net outcome, and the design should not rely on players' reluctance to "waste" prior investment.

### Cited Findings
- Tversky & Kahneman (1992, cumulative prospect theory) reported a median loss-aversion coefficient λ = 2.25. It was elicited from 25 graduate students in three unincentivized sessions, so the small, unpaid sample is a known limitation. — via search extract; [Merkle, "Financial Loss Aversion Illusion" (AEA 2017)](https://www.aeaweb.org/conference/2017/preliminary/paper/rt29dbkt). A 2024 meta-analysis of loss aversion in risky contexts gives updated estimates: [J. Econ. Psychology 103 (2024) 102740](https://www.sciencedirect.com/science/article/pii/S0167487024000485) (exact pooled λ not retrieved).
- Arkes & Blumer (1985), "The Psychology of Sunk Cost," *OBHDP*. In a field experiment at Ohio University's theatre, patrons randomly given full-price season tickets attended more plays in the first half of the season (≈4.11 vs ≈3.3) than those given discounts. The authors attribute the effect to "the desire not to appear wasteful". — via search extract; [Coglode summary](https://www.coglode.com/research/sunk-cost-effect); [Arkes & Ayton review PDF](https://www.researchgate.net/profile/Hal-Arkes/publication/228471310_The_Sunk_Cost_and_Concorde_Effects_Are_Humans_Less_Rational_Than_Lower_Animals/links/0c96051dac2e285464000000/The-Sunk-Cost-and-Concorde-Effects-Are-Humans-Less-Rational-Than-Lower-Animals.pdf)
- Dixon, Harrigan, Sandhu, Collins & Fugelsang (2010, *Addiction*), "Losses disguised as wins in modern multi-line video slot machines". 40 novices played a multi-line slot while skin conductance response (SCR) and heart rate were measured. SCR amplitudes for **wins and LDWs were similar**, and both were significantly larger than for regular losses. In LDWs the payout is below the spin wager but still comes with the reinforcing sights and sounds of winning. — [Dixon et al. 2010 PDF (UWaterloo)](https://uwaterloo.ca/reasoning-decision-making-lab/sites/default/files/uploads/files/DixFugetal_10c.pdf); [Wiley](https://onlinelibrary.wiley.com/doi/10.1111/j.1360-0443.2010.03050.x)
- Follow-up: "Using Sound to Unmask Losses Disguised as Wins" (Dixon et al., 2015, J Gambling Studies) showed that sound design contributes to players miscategorising LDWs as wins. Removing or changing win sounds on LDWs helps players identify them as losses. — [Dixon 2015 PDF](https://lumsa.it/sites/default/files/pdf/DIXON_2015.pdf); [ResearchGate](https://www.researchgate.net/publication/258336797_Using_Sound_to_Unmask_Losses_Disguised_as_Wins_in_Multiline_Slot_Machines)
- LDWs also affect which slot games players choose. — [ResearchGate: "LDWs Affect Game Selection on Multiline Slots"](https://www.researchgate.net/publication/324974439_Losses_Disguised_as_Wins_Affect_Game_Selection_on_Multiline_Slots). Multiline slots are also linked to "dark flow" and depression. — [Dixon et al., J Gambl Stud (Springer)](https://link.springer.com/article/10.1007/s10899-017-9695-1)

### Inferences
- **The in-game-currency analogue of an LDW:** if a container costs 1,000 coins and yields an item worth 400, full fanfare on that reveal is an LDW. Ethical options: show net result (−600) next to the item; scale celebration to *net* value or to rarity relative to cost; reserve big fanfare for true profit or genuinely rare items.
- Loss aversion supports "keep your streak" or "don't lose your progress" pressure. In a buy-once game, avoid mechanics where inactivity destroys value (decaying items, expiring streaks). Those are the "Playing by Appointment" temporal dark pattern (Section 8).
- Sunk cost in a buy-once game mostly concerns time, not money. A prestige system that throws away many hours can trigger sunk-cost resistance. Frame resets as conversions, not losses (Section 5).

### Gaps
- No evidence found on whether LDW-like framing with fictional currency (no real money) produces the same arousal as with money. The Dixon studies used monetary or credit stakes.
- Exact pooled λ from the 2024 meta-analysis was not retrieved.

---

## 4. Collection and completion drive: Zeigarnik, endowed progress, goal-gradient

### Takeaway
The goal-gradient and endowed-progress effects are well supported in field studies. People speed up as a goal nears, and giving an artificial head start raised completion from 19% to 34% in a car-wash field experiment. The popular Zeigarnik "unfinished tasks are remembered better" claim does **not** replicate reliably (2025 meta-analysis). The related Ovsiankina effect, a tendency to resume interrupted tasks, is more robust. Collection logs with visible, partially filled progress bars are therefore grounded in evidence. The "Zeigarnik" justification for cliffhangers should be restated as Ovsiankina/resumption.

### Cited Findings
- **Endowed progress:** Nunes & Drèze (2006), *Journal of Consumer Research* 32(4):504–512. 300 car-wash loyalty cards were given out, each requiring 8 paid washes for a free one. **34%** completed a 10-stamp card that came with 2 stamps pre-filled, vs **19%** of those with an empty 8-stamp card. The effort required was identical. — via search extract; [Silicon Canals summary](https://siliconcanals.com/t-car-wash-loyalty-cards-endowed-progress/); [ResearchGate: The Endowed Progress Effect](https://www.researchgate.net/publication/23547282_The_Endowed_Progress_Effect_How_Artificial_Advancement_Increases_Effort)
- **Goal-gradient:** Kivetz, Urminsky & Zheng (2006), *Journal of Marketing Research*, revived Hull's goal-gradient hypothesis for humans. Coffee-card members bought coffee more frequently as they approached the free reward. Effort depends on *relative* progress toward the goal rather than absolute progress. — via search extract; [Wikipedia: Goal pursuit](https://en.wikipedia.org/wiki/Goal_pursuit); [Wharton Knowledge](https://knowledge.wharton.upenn.edu/article/the-lowdown-on-customer-loyalty-programs-which-are-the-most-effective-and-why/)
- **Collection sets in retail:** "Collect them all!" (J. Academy of Marketing Science, 2021) studies using collectible sets to increase cross-category purchasing. — [Springer](https://link.springer.com/article/10.1007/s11747-021-00835-6)
- **Zeigarnik replication failure:** Ghibellini & Meier (2025), *Humanities and Social Sciences Communications*, meta-analysed the Zeigarnik and Ovsiankina effects. Excluding Zeigarnik's original 1927 data, interrupted tasks made up almost exactly half of recalled tasks. Fewer than a third of 44 replication attempts found a memory advantage for interrupted tasks. The authors conclude the Zeigarnik effect's "replicability... remains questionable". The **Ovsiankina effect (tendency to resume interrupted tasks) appears to be a general tendency**. — [Ghibellini & Meier 2025, Nature HSSC](https://www.nature.com/articles/s41599-025-05000-w)

### Inferences
- Collection books and "catalogue" screens exploit goal-gradient: show "37/40", and near completion players accelerate. Put the final items within realistic reach. If the last item needs a 0.1% drop, the goal-gradient turns into frustration and invites grinding complaints.
- Endowed progress: start the collection log with a few entries pre-filled (starter items, tutorial finds) so players never face an empty 0/N screen.
- "Unfinished business" hooks should be designed around *resumption* (Ovsiankina): end a session with a visible, partially complete goal the player *wants* to resume, not an anxiety-inducing obligation.
- Ethical line: making completion possible with in-game play alone (no paid shortcuts, which a buy-once game naturally avoids) and deterministic completion aids (pity timers, trading duplicates for a chosen missing item) keep collection drive from becoming a compulsion trap.

### Gaps
- No game-specific experimental data found on the effect of collection-log UI on retention.

---

## 5. "Number go up": incremental/idle game math and pacing

### Takeaway
The canonical model (Anthony Pecorella, Kongregate, "The Math of Idle Games" Parts I–III, 2016, and the GDC Europe 2016 talk "Quest for Progress") makes each generator's cost grow **exponentially** with units owned (cost = base × rate^owned) while production grows **linearly or polynomially**. Every purchase therefore takes a bit longer than the last, and the game slows until a new system, a milestone multiplier or a prestige reset restores the pace. Chains of generators that produce other generators create derivative (polynomial, t^n/n!) growth that approaches, but never matches, exponential cost growth.

### Cited Findings
- Core cost formula: **cost_next = cost_base × (rate_growth)^owned**. In AdVenture Capitalist, Lemonade Stands have cost_base = 4, rate_growth = **1.07**, and production_base = 1.67/sec. With 10 owned, the next costs 4 × 1.07^10 ≈ 7.87. — via search extract of [Pecorella, "The Math of Idle Games, Part I" (Game Developer / Kongregate)](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i); mirror [sirpinski.com](https://www.sirpinski.com/the-math-of-idle-games-part-i/)
- "Idle games typically have costs grow exponentially while production grows at a linear or polynomial rate." — same source (via search extract).
- Part II covers "alternative growth models and generator relevancy". With derivative-based generator chains (Gen4 → Gen3 → … → currency), four tiers starting from one Gen4 make currency grow ~x⁴/24, and total generators at time t = 1 + t + t²/2 + t³/6. "Setting up a chain of generators starts to approach exponential growth." Because generators are finite, "you'll still always eventually lag behind actual exponential growth, so costs (at exponential levels) will still outpace production." Generator cost is based on the number *purchased*, not the number owned, so generated units don't inflate prices. — via search extract of [Pecorella, "The Math of Idle Games, Part II"](https://www.gamedeveloper.com/game-platforms/the-math-of-idle-games-part-ii)
- Pecorella's GDC Europe 2016 talk "Quest for Progress: The Math and Design of Idle Games" and a public set of idle-game model spreadsheets exist. — [GDC slides PDF](https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf) (blocked; not read); [Idle Game Models and worksheets, archive.org](https://archive.org/details/idlegameworksheets)
- A practitioner post-mortem on balancing an idle game (Idle Idol) exists on Game Developer. — [Balancing Tips: How We Managed Math on Idle Idol](https://www.gamedeveloper.com/design/balancing-tips-how-we-managed-math-on-idle-idol) (not read)

### Inferences
- **Pacing mechanics.** Exponential cost vs. sub-exponential income produces a natural "wall". Designers break walls with (a) new tiers of generators, (b) milestone multipliers (e.g. ×2 production at 25/50/100 owned — a common AdVenture Capitalist-style pattern, not verified this session), (c) upgrades, and (d) prestige. The rhythm of hitting a wall and then breaking through it is the core loop.
- **Choosing growth rates.** Lower rates (≈1.07) let players buy many units with frequent small wins. Higher rates concentrate purchases and make each one feel weightier. Mixing rates across tiers creates varied decision points.
- **"Next goal always visible".** Design folk wisdom, not found in a retrieved primary source: always show at least one affordable-soon purchase and one aspirational goal, and show the time or cost to reach them. This is the goal-gradient (Section 4) applied continuously. A cost that is 80% affordable pulls harder than one that is 5% affordable.
- **For a container/reveal game.** Number-go-up can be layered as rising container tiers, where higher-value containers cost exponentially more while appraisal or sell income grows via upgrades and multipliers, with occasional new container classes as wall-breakers.

### Gaps
- Could not read Pecorella's originals directly (Kongregate, Game Developer and GDC Vault blocked). Clicker Heroes' commonly cited growth rate (1.15) and AdVenture Capitalist's milestone thresholds were not verified.
- No peer-reviewed empirical data found on retention vs. growth-rate choices.

---

## 6. Prestige loops: why resetting for a multiplier feels good; formulas and timing

### Takeaway
Prestige converts accumulated progress into a permanent multiplier. Prestige currency is typically a **sub-linear (square-root or similar) function of lifetime or max earnings**. In AdVenture Capitalist, p = 150·√(earnings/10¹⁵), so doubling prestige currency takes **4×** the previous run's earnings. The design keeps the game from exploding while giving each new run a faster, more powerful start. The "feel good" comes from replaying early content at superhuman speed (a large positive prediction error vs. the first run), from mastery, and from framing the reset as a gain, not a loss.

### Cited Findings
- AdVenture Capitalist prestige ("angel investors") formula: **p = 150·√(c_L / 10¹⁵)**, where c_L is lifetime (max) currency earned. "Since this formula is based on the square root of the max currency earned, to double prestige currency a player would need to earn 4 times as much as the previous run." — via search extract of [Pecorella, "The Math of Idle Games, Part III"](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii); [Kongregate mirror](https://www.kongregate.com/en/pages/the-math-of-idle-games-part-iii)
- The same series notes that exponential costs combined with polynomial production eventually stall a run. Prestige is the structural release valve. — [Part I](https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i) and [Part II](https://www.gamedeveloper.com/game-platforms/the-math-of-idle-games-part-ii) (via search extract)

### Inferences
- **Why it feels good:** (1) the second run through early content is dramatically faster than expected, a strong positive RPE (Section 1); (2) the permanent multiplier is endowed progress for the next run (Section 4); (3) prestige gives a clear stopping and restarting point, which supports healthy session design (Section 8); (4) it turns a stalled wall into a decision point, which gives the player agency.
- **Timing:** with a √ formula, prestige gain grows slowly relative to earnings. The best time to reset is when the *rate* of prestige-currency gain per minute starts to fall, i.e. when the current run is stalling. Commonly the first prestige is designed to be available and clearly beneficial within the first session or two, with later resets progressively longer. This is a standard design heuristic, not verified from a primary source this session.
- **Formula choices:** √ (AdCap), cube-root, or log. The steeper the concavity, the more each subsequent prestige requires, which lengthens runs over time. Log-based formulas make gains feel very flat late-game. Pick one that keeps "time to double multiplier" roughly steady or slowly rising.
- **Sunk-cost mitigation:** show a preview ("Reset now: +37 Stars → ×1.37 all income; you'll regain current progress in ~4 min"). That turns the loss into a visible gain and counters loss aversion honestly.
- **For a container game:** prestige could convert a collection or warehouse into a permanent appraisal bonus, luck-transparency tier or new container classes. Prestige rewards should be deterministic, not random, to keep the core meta-progression free of chance.

### Gaps
- Could not verify prestige formulas for other titles (Clicker Heroes Hero Souls, Egg Inc Soul Eggs, Realm Grinder) or Pecorella's recommended first-prestige timing. Sources were blocked.
- No academic study found on player-perceived value of prestige resets.

---

## 7. Game feel / "juice": screen shake, particles, sound, anticipation

### Takeaway
"Juice" means over-the-top, redundant feedback (tweening/easing, screen shake, particles, sound, squash-and-stretch) layered onto simple actions. The canonical demonstration is Jonasson & Purho's 2012 talk "Juice It or Lose It", which transforms a plain Breakout clone. Steve Swink's *Game Feel* (2008) defines game feel as "real-time control of virtual objects in a simulated space, with interactions emphasised by polish". Juice is what makes reveals feel physical and rewarding. The same audiovisual cues are what make LDWs deceptive (Section 3), so juice must be *truthful*: proportional to real value.

### Cited Findings
- Jonasson & Purho, "Juice It or Lose It" (2012 talk, GDC Vault). Taking a basic Atari-Breakout clone, they add tweening (easing curves), camera/screen shake synced to the same curves, particles, and sound, turning it into something far more satisfying. The original "Juicy Breakout" was made in Flash and its source was shared. — [GDC Vault](https://gdcvault.com/play/1016789/Juice-It-or-Lose); [YouTube](https://www.youtube.com/watch?v=Fy0aCDmgnxg); summary via [alakajam](https://alakajam.com/post/232/juice-up-your-games)
- Swink (2008), *Game Feel: A Game Designer's Guide to Virtual Sensation*: "real-time control of virtual objects in a simulated space, with interactions emphasised by polish." The three components are real-time control (responsiveness), simulated space, and polish (art, sound and animation that sell the interaction). — [Wikipedia: Game feel](https://en.wikipedia.org/wiki/Game_feel); [Goodreads](https://www.goodreads.com/book/show/3385050-game-feel); [Liz England review](https://lizengland.com/blog/review-game-feel-by-steve-swink/)
- Academic surveys: "Designing Game Feel. A Survey" (Pichlmair & Johansen, arXiv 2020) and an empirical study of impact-feedback features in action games (arXiv 2022). — [arXiv 2011.09201](https://arxiv.org/pdf/2011.09201); [arXiv 2208.06155](https://arxiv.org/pdf/2208.06155)
- Sound specifically drives misperception of LDWs as wins (Dixon et al. 2015). — [Dixon 2015 PDF](https://lumsa.it/sites/default/files/pdf/DIXON_2015.pdf)
- A slot-machine patent explicitly engineers a "variable suspense factor" (tunable suspense in reel stops), showing the industry treats anticipation timing as a tunable lever. — [US9659445B2](https://patents.google.com/patent/US9659445B2/en)

### Inferences
- **Reveal-sequence recipe (ethical juice):** (1) player-initiated input (click, drag the lid) for agency and real-time control; (2) a short anticipation phase (0.5–2 s) with rising pitch or shake and hints *derived from the true outcome*, such as a rarity-coloured glow shown only when that rarity is present; (3) payoff with particles, sound and screen shake scaled to real rarity/value; (4) quick settle and clear info (value, net gain/loss).
- **Tiered intensity:** keep the biggest effects rare so they retain prediction-error value. If every reveal explodes, the signal habituates. Offer a skip or fast-reveal option for repeat play. Players widely expect one, and it respects their time.
- **Honesty guardrail:** no "fake-out" animations (build to a legendary glow, then downgrade) unless the mechanic truly has that possibility and its odds are shown.

### Gaps
- No controlled study found quantifying how much juice increases enjoyment or retention in a reveal context. The arXiv surveys may contain some. Not retrieved in detail.

---

## 8. Flow and session design: short sessions, stopping points, "one more" hooks

### Takeaway
Flow (Csikszentmihalyi), applied to games by Jenova Chen (2007), requires challenge matched to skill, with difficulty adapting to keep players in the channel between boredom and anxiety. Reward-loop games hit flow-like absorption easily. The ethical risk is "dark flow", the trance-like absorption seen in multiline slot players and linked to depression. Zagal, Björk & Lewis (2013) catalogue "temporal dark patterns" (grinding, playing by appointment) that exploit time. Good session design gives natural stopping points and makes "one more" a choice, not a compulsion.

### Cited Findings
- Chen (2007), "Flow in games (and everything else)," *Communications of the ACM*. Applies Csikszentmihalyi's flow (deep, enjoyable absorption) to game design. Argues for adapting challenge to player skill, including player-driven difficulty adjustment (as in flOw). — [ACM DL](https://dl.acm.org/doi/10.1145/1232743.1232769); [PDF](http://www.ccs.neu.edu/home/lieber/courses/cs4500/sp09/resources/p31-chen-flow-in-games.pdf); [jenovachen.com](https://www.jenovachen.com/flowingames/)
- Dixon et al. link multiline slot play to "dark flow" (absorbed, trance-like play) and depression. — [Dark Flow, Depression and Multiline Slot Machine Play, J Gambl Stud](https://link.springer.com/article/10.1007/s10899-017-9695-1)
- Zagal, Björk & Lewis (2013), "Dark Patterns in the Design of Games" (FDG 2013). Defined as designs "used intentionally by a game creator to cause negative experiences for players which are against their best interests and likely to happen without their consent". Three categories: temporal, monetary and social-capital. Named patterns include Grinding, Playing by Appointment, Pay-to-Skip, Pre-Delivered Content, Monetized Rivalries, Social Pyramid Schemes and Impersonation. — [Zagal et al. 2013 (DiVA PDF)](https://www.diva-portal.org/smash/get/diva2:1043332/FULLTEXT01.pdf); [CORE](https://core.ac.uk/reader/301007767)
- A CHI 2022 late-breaking paper, "A Game of Dark Patterns: Designing Healthy, Highly-Engaging Mobile Games", discusses keeping engagement healthy. — [ACM](https://dl.acm.org/doi/fullHtml/10.1145/3491101.3519837)
- An empirical study of the harmfulness of game dark patterns was published in 2025. — [ResearchGate PDF](https://www.researchgate.net/profile/Nabson-Silva/publication/390235729_Dark_Patterns_in_Games_An_Empirical_Study_of_Their_Harmfulness/links/67e54cd7f966c17052a7999a/Dark-Patterns-in-Games-An-Empirical-Study-of-Their-Harmfulness.pdf) (findings not retrieved)

### Inferences
- **Session units:** design a 5–15 minute "loop of loops" (buy container → reveal → appraise/sell → upgrade) that closes cleanly. Prestige or "day end" beats serve as natural stopping points. Resumption hooks (Ovsiankina) should be visible goals, not penalties for leaving.
- **Avoid in a buy-once game** (no monetisation reason to use them): energy timers, daily-login streaks that reset, offline-earnings caps that force check-ins (Playing by Appointment), and grind walls designed to push paid skips.
- **Healthy "one more":** "one more because I want to see the next tier" is fine. "One more because I'll lose something if I stop" is loss-aversion coercion.
- Optional wellbeing features (session timer, "you've been playing 60 min" nudge, auto-pause) are cheap goodwill signals. There is no evidence here on their effectiveness in games.

### Gaps
- No quantitative data retrieved on ideal session length for incremental or reveal games.
- The 2025 dark-pattern harmfulness study's results were not retrieved.

---

## 9. Ethics and regulation: simulated gambling ratings (PEGI, ESRB, IARC, Australia 2024) and player backlash

### Takeaway
Regulators now separate three things: (1) **real gambling** (real-money stakes), (2) **paid chance** (loot boxes bought with real money), and (3) **simulated gambling** (casino-style wagering with no real money). A buy-once game with no real-money randomness avoids (1) and (2). It can still attract a "simulated gambling" rating if it depicts or simulates casino gambling: R18+ in Australia since 22 Sep 2024, T or higher with a descriptor under ESRB, and PEGI 12–18 depending on how closely it mimics casino gambling after the 2025 Balatro ruling. Chance mechanics that cannot be bought with real money are **not** caught by Australia's loot-box rule. The practical risk is thematic: slot-machine or casino-style presentation of the reveal. A "mystery container" theme should avoid casino iconography, wagering language and slot reels.

### Cited Findings
**Australia (National Classification Scheme):**
- New mandatory minimum classifications took effect **22 September 2024**:
  - Games containing **simulated gambling** (e.g. social casino games) get a minimum **R18+**, which is legally restricted to adults.
  - Games containing **in-game purchases linked to elements of chance** (e.g. paid loot boxes) get a minimum **M**, a non-legally-restricted advisory (not recommended under 15).
  - The rules apply to games classified from that date, with no retroactive reclassification unless modified or revoked. — [Australian Classification: New mandatory minimum classifications](https://www.classification.gov.au/about-us/media-and-news/news/new-mandatory-minimum-classifications-for-gambling-games-content) (blocked; via search extract); [Pocket Gamer.biz](https://www.pocketgamer.biz/australia-sets-new-rules-for-video-games-with-gambling-like-content/); [Press Start](https://press-start.com.au/news/2023/09/26/the-aussie-governments-loot-box-and-gambling-classification-reforms-have-been-approved/); [Yogonet](https://www.yogonet.com/international/news/2024/09/18/79118-australia-tightens-rules-on-loot-boxes-gamblinglike-features-in-video-games/)
  - **Exemption relevant to this project:** "games with chance-based mechanics or rewards, where real-world currency cannot be used to obtain those rewards, are not subject to the new classification rules" (i.e. the M loot-box minimum). — via search extract (aggregated from the sources above; confirm wording on the Classification site)
  - Loot boxes remained common in kids' mobile games a year on, suggesting uneven compliance. — [The Conversation, 2025](https://theconversation.com/loot-boxes-are-still-rife-in-kids-mobile-games-despite-ban-on-gambling-like-features-266226)

**ESRB / IARC:**
- ESRB "Simulated Gambling": the player can gamble without betting or wagering real cash or currency. "Real Gambling" (real-money wagers) forces an AO rating. Simulated gambling can appear in T-rated games. — [ESRB Ratings Guide](https://www.esrb.org/ratings-guide/)
- ESRB declined in 2017 to classify loot boxes as gambling. — [PlayStation LifeStyle](https://www.playstationlifestyle.net/2017/10/11/esrb-wont-classify-game-loot-boxes-gambling/)
- IARC issues simultaneous multi-territory ratings for digital storefronts (e.g. Google Play, Nintendo eShop, Microsoft) through a single questionnaire, applying each regional authority's criteria, gambling descriptors included. Compliance with loot-box presence labels has been found unsatisfactory. — [Xiao et al., "Beneath the label" (ResearchGate)](https://www.researchgate.net/publication/369588493_Beneath_the_label_unsatisfactory_compliance_with_ESRB_PEGI_and_IARC_industry_self-regulation_requiring_loot_box_presence_warning_labels_by_video_game_companies)

**PEGI and the Balatro precedent:**
- Balatro, a buy-once poker-themed roguelike with no real-money gambling and no loot boxes, was re-rated from PEGI 3 to **PEGI 18** over gambling imagery. It was briefly delisted from some stores. — [PC Gamer](https://www.pcgamer.com/games/card-games/poker-themed-deckbuilder-balatro-gets-delisted-from-some-stores-after-its-pegi-rating-absurdly-jumps-from-3-to-18-over-gambling-imagery/); [Vice](https://www.vice.com/en/article/balatro-receives-an-18-pegi-rating-unlike-games-that-feature-actual-gambling/)
- In February 2025 the PEGI Complaints Board changed **Balatro** and **Luck Be a Landlord** (a slot-machine-themed roguelike) to **PEGI 12**. Reasoning: although Balatro explains poker hands and has a slot-machine mechanic, it has "mitigating fantastical elements" and "no specific transferable gambling skills". PEGI's Experts Group committed to "a more granular set of classification criteria to handle gambling themes and the simulation, teaching and glamorisation of gambling". That set now includes PEGI 12 while keeping **PEGI 18 for games that simulate gambling typically played in casinos and betting halls**. — [PEGI news](https://pegi.info/news/pegi-complaints-board-amends-classifications-balatro-and-luck-be-landlord-pegi-12) (blocked; via search extract); [Push Square](https://www.pushsquare.com/news/2025/02/balatro-wins-appeal-against-pegi-after-being-accused-of-including-gambling); [GameSpot](https://www.gamespot.com/articles/balatros-confusing-rating-finally-changed-leads-to-europe-changing-how-it-rates-gambling-games/1100-6529673/); [PC Gamer](https://www.pcgamer.com/games/card-games/balatro-finally-escapes-its-silly-18-age-rating-pegi-promises-a-more-granular-set-of-classification-criteria-for-gambling-themed-games-in-the-future/)
- PEGI has since announced a broader overhaul with "interactive risk categories", covering age ratings for loot boxes, in-game spending and communication features. — [Reed Smith: "PEGI launches 'interactive risk categories'; overhauls age ratings for loot boxes, in-game spending and communication features"](https://www.reedsmith.com/articles/pegi-launches-interactive-risk-categories-overhauls-age-ratings-for-loot-boxes-in-game-spending-and-communication-features/) (headline only; page blocked, details and effective date unverified)

**Evidence on simulated gambling harms (why regulators care):**
- A 2026 integrative review in *Current Addiction Reports* covers links between simulated gambling games (social casino, practice games, games with gambling mini-games) and monetary gambling. — [Springer, Curr Addict Rep 2026](https://link.springer.com/article/10.1007/s40429-026-00784-6)
- Longitudinal findings (via search extract of the review and related studies):
  - An Australian cohort found adolescents who played social casino games at 16–17 were ~40% more likely to gamble with money at 18–19.
  - A German school study found the predictive link held only for simulated → real poker.
  - "Order of first-play" research finds forward (simulated → monetary) gateway effects are more common than reverse. — [Hayer et al., "Do Simulated Gambling Activities Predict Gambling with Real Money During Adolescence?" J Gambl Stud](https://link.springer.com/article/10.1007/s10899-018-9755-1); [Dussault et al., "Transition from Playing with Simulated Gambling Games to Gambling with Real Money"](https://www.researchgate.net/publication/318152965_Transition_from_Playing_with_Simulated_Gambling_Games_to_Gambling_with_Real_Money_A_Longitudinal_Study_in_Adolescence); [Order of first-play (J Behav Addict, PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10786233/); [Gainsbury et al., "Migration From Social Casino Games to Gambling"](https://www.researchgate.net/publication/303180222_Migration_From_Social_Casino_Games_to_Gambling_Motivations_and_Characteristics_of_Gamers_Who_Gamble)
  - These are associations; causality is not established.

**Developer stance and player backlash:**
- Balatro creator LocalThunk: "Gambling to me, it preys on a misunderstanding of probabilities" and "I think it's very predatory to hijack people's brains to make money off them." He wrote into his will that the Balatro IP "may never be sold or licensed to any gambling company or casino". He said he has no microtransactions because such games make him "want to put my computer in the dishwasher". He also criticised PEGI for rating Balatro 18+ while EA Sports FC (with paid random packs) got a PEGI 3 rating. — [PCGamesN](https://www.pcgamesn.com/balatro/gambling); [PC Gamer (microtransactions)](https://www.pcgamer.com/games/card-games/balatro-doesnt-have-microtransactions-for-a-very-good-reason-it-makes-me-want-to-put-my-computer-in-the-dishwasher-and-set-it-to-pots-and-pans-localthunk-says/); [PC Gamer (PEGI/EA FC)](https://www.pcgamer.com/games/roguelike/balatro-dev-swings-at-pegi-for-rating-it-18-because-of-its-evil-playing-cards-jokes-that-he-should-add-microtransactions-like-ea-sports-fc-25-to-lower-that-rating-to-a-3/); [Dexerto](https://www.dexerto.com/ea-sports-fc/balatro-creator-blasts-18-rating-says-ea-fc-deserves-the-same-for-gambling-3008990/)
- Explicit "gambling simulator" games on Steam (e.g. *KEEP GAMBLING*, case-opening, slots and substance-use sims) draw ironic reviews that also reference addiction: "I lost my house, wife and kids to keep gambling", and comments about it feeding gambling habits. The overall rating was ~74% positive of ~974 reviews at the time of search. — [Steam: KEEP GAMBLING](https://store.steampowered.com/app/3720460/KEEP_GAMBLING/); [SteamDB](https://steamdb.info/app/3720460/info/)
- Valve has banned skins-gambling/case-opening site sponsorship at its events, reflecting industry sensitivity to case-opening culture. — [HLTV](https://www.hltv.org/news/43421/valve-bans-skins-gambling-case-opening-sites-from-jerseys-and-events-in-tor)

### Inferences
- **Classification risk ladder for a "mystery container" buy-once game:**
  1. Lowest risk: no real-money purchase of chance items, no casino/slot visuals, no wagering of accumulated currency on chance outcomes. Likely no gambling descriptor, though PEGI/IARC questionnaires on "gambling themes" still need honest answers.
  2. Medium: slot-style reels, "jackpot" language, double-or-nothing wagers of in-game currency. These could trigger "Simulated Gambling" (ESRB), PEGI 12+ gambling themes, or Australian review as simulated gambling.
  3. High: casino-game simulation (roulette, blackjack, slots) as core content. PEGI 18 and Australia R18+ are likely.
- **Any future DLC or IAP that sells random containers** would trigger Australia's M minimum and PEGI's paid-random-item rules and would badly damage the "buy-once, no gambling" trust position. Commit publicly to never doing this; LocalThunk's stance is the reputational model.
- **Mitigations that also improve design:** displayed odds; deterministic pity/collection completion; skill or knowledge elements (appraisal, deduction) so "near-misses" are real feedback; celebrations proportional to net value (no LDWs); no betting of earned currency on binary coin-flips; reveal presentation themed around discovery (storage units, shipping containers, archaeology) rather than casino.
- **Backlash patterns to anticipate:** "this is just a loot-box/gambling simulator for kids", especially for CS-style case-opening visuals. Store-page and marketing copy should foreground the buy-once, no-microtransactions nature.

### Gaps
- Could not read the Australian Classification Board page or PEGI pages directly to confirm exact exemption wording and the new PEGI criteria (effective date, the 12/16/18 thresholds for paid random items). These should be verified before publication.
- ESRB and IARC 2025–2026 updates on loot boxes (e.g. any new descriptors beyond "In-Game Purchases (Includes Random Items)") were not verified this session.
- Player backlash evidence is anecdotal (Steam reviews, press). No systematic study of review sentiment toward "gambling simulator" games was found.
