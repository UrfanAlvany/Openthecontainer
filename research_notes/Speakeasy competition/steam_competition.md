# Steam competition: first-person 1920s speakeasy business sim

Researched 17 Oct 2026 for D-021 (café front by day, secret bar at night, haggle with smugglers, fakes and poison, raids, bribes, gangs).

**Method.**
- **Search.** Steam store search pages, Steam tag searches (Crime + Historical; Crime + First-Person + Simulation, coming soon; Historical + Simulation, coming soon; "bar" + First-Person + Simulation, coming soon), the `storesearch` API, `appdetails` (US prices), `appreviews` (`language=all&purchase_type=all`), the Steam News API and web search. Search terms: speakeasy, prohibition, bootlegger, moonshine, 1920s, 1930s, roaring, gangster, mob, mobster, mafia simulator, mafia bar, gangster bar, capone, chicago 1920, whiskey, booze, rum runner, smuggler, distillery, bar simulator, bartender, nightclub simulator, jazz club, tavern simulator, gatsby, money laundering, 禁酒, and mafia (coming soon).
- **Followers.** I read these from each app's official Steam community group (`steamcommunity.com/games/<appid>/memberslistxml/?xml=1`, the `groupDetails/memberCount` field). This should be the same group SteamDB reports as "followers", but SteamDB returned HTTP 403, so I could not cross-check. Treat the counts as approximate.
- **Sales.** Gamalytic (403) and VG Insights (JS-only) were unreachable. Every sales number here is a **review-multiplier estimate (30–60 copies per Steam review)**, the same method as `Why job simulator games are fun/shop_business_sims.md`. Gross figures ignore discounts, refunds, VAT and Steam's cut.
- **Prices** are US base prices from the Steam API. The store search pages rendered in CHF and are not used for prices.

---

## 1. Direct competitors: a 1920s (or bootlegging) business you run in first person

| Game (appid) | Dev / publisher | Status | Price | View | Reviews (% positive) | Followers | What it is |
|---|---|---|---|---|---|---|---|
| **Speakeasy Simulator** (3883070) | Arcana Games (2-person team per GameSpew) / Bluelily Games | Released 1.0 on **15 Jan 2026** (no Early Access); last patch 10 Apr 2026 | $11.99 | First-person | **67 (91%)**, Very Positive | ~503 | Distil booze from ingredients, design the bar and lab, serve per glass or bulk-sell to the mafia, decorate, police patrols outside. "8 to 12 hours". **1 player online** at check time |
| **Silent Spirits** (3790580) | Coderator Games (UK) | Coming soon; free Prologue out since 11 Feb 2026 (0 reviews) | TBA | First-person (tags) | – | ~33 | Run a speakeasy: craft by day, serve in the evening, deliver at midnight. Mafia protection quotas, police patrols, loud patrons risk raids, a 15-year Prohibition timeline |
| **Prohibition Panic!** (3568070) | SAE IT Games | Early Access **Q4 2026** (EA runs to end 2027) | TBA | First-person, cartoony, co-op 1–4 | – | ~14 | Party game: mix drinks, vet patrons at the door for informants, keep cops out, restore a faded speakeasy. Modes: story, survival "Rum Run", relaxed, competitive |
| **Buns, Booze & Bucks Simulator** a.k.a. "Mafia Bakery" (3579280) | RootGame | Coming soon; **0 news posts** | TBA | First-person (tags), online co-op | – | ~194 | **Closest structural clone.** Legal bakery out front ("Fresh bread on the outside, strong alcohol on the inside"), bootleg brewing behind it, inspectors among the customers, smuggling to the pier, bribing gangs, informants. Set in "1920s London during Prohibition" |
| **Prohibition** (3921210) | Stebor Games | TBA | TBA | First-person action-adventure | – | ~41 | "Alkopunk" dystopia: craft forbidden alcohol, run a gang, seize districts. Combat-led |
| **Moonshiner Simulator** (4179280) | Goosix Games | EA 20 May 2026; 1.0 planned 3 Nov 2026 | $17.99 | First-person, co-op up to 8 | 153 (86%) | ~1,928 | **Modern setting.** Spirits production, sell hand to hand, then build distribution. A suspicion meter leads to police raids, seizures and fines; casino and property side content |
| **Mulerun – Retro Bootlegger Sim** (3687830) | CristianGames | Coming soon (2026) | TBA | First-person, co-op 1–4 | – | ~348 | 1980s tropical island moonshine logistics under CIA watch |
| Winter Batch (5369490) | Infinity Entertainment | 2027 | TBA | First-person | – | not checked | Illegal still in a 1988 Czechoslovak village |
| Bootlegger's Bar (4603640) | Team3Studio | 24 Jun 2026 | $4.99 | 2D puzzle incremental | 4 (100%) | not checked | Drop ingredients into glasses. Not a sim |

**Answer to Q3 (an announced first-person 1920s speakeasy or bootlegger sim?): yes, several.** One has shipped (Speakeasy Simulator). Three are announced: Silent Spirits (solo), Prohibition Panic! (co-op party) and Buns, Booze & Bucks (legal front plus bootleg back, first person). I found no Steam app titled "Bootlegger Simulator", "Prohibition Simulator", "Mob Bar", "Gangster Bar" or "Roaring 20s" sim. "Moonshine Inc" exists (2022, top-down).

**None of them has traction.** The biggest follower count for a direct first-person 1920s entry is ~503 (Speakeasy Simulator, after launch); the biggest upcoming one is ~194. For scale: Saloon Simulator, a first-person period bar, has ~8,612.

## 2. Same era, different genre (strategy, action, narrative)

| Game (appid) | Dev / publisher | Status | Price | Reviews (% pos) | Followers | Notes |
|---|---|---|---|---|---|---|
| **Silent Authority: Blood & Bourbon** (3907570) | Complex Universe | **EA 12 Nov 2026** | TBA | – | **~1,185** (largest upcoming in the theme) | Top-down tactics plus empire: **17 front-business types** with 10 upgrade levels, bootlegging to bars, 14 rival families, police raids that scale with crime level, bribery/diplomacy. Discloses AI-generated music/SFX |
| Empire of Vice: Chicago (3753640) | Artifex Parvus | EA 27 Jan 2026 | $16.99 | 11 (82%) | ~227 | Turn-based: speakeasies, casinos, smuggling, corruption |
| Bourbon Empire (954320) | Disorganized Media | TBA (old appid, long in development) | TBA | – | ~304 | RTS: rackets, speakeasies, heat, bribed police |
| Wiseguys: The Commission (3134740) | FreeRiding Games | TBA | TBA | – | ~114 | 2D top-down, 1930s NY, five families, laundering |
| Mafia Boss Simulator (4650800) | magicprostudio | Q1 2027 | TBA | – | ~85 | Third-person action: 1920s Sicily to 1950s NY; speakeasies, gambling dens, bribery |
| Racketeers (2463550) | Silent S Studios | TBA | TBA | – | ~53 | Crime RPG: bootlegging, brothels, laundering through small businesses |
| Mob Boss Simulator (3541740) | Void Chamber | TBA | TBA | – | ~40 | Capone/Luciano-inspired strategy |
| Streetlight Syndicate (4058190) | BeagleGuy | 27 Jul 2026 | $6.99 | 17 (82%) | – | Prohibition NY incremental, 20 rackets |
| Mafia Hero: Streets of Survival (4882360) | ZediNu | 10 Aug 2026 | $6.99 | 4 | – | Survivors-like with speakeasy/distillery income |
| PROHIBEAST (3503790) | SUPER AC | 3 Jun 2026 | $34.99 | 142 (63%) Mixed | – | Stealth tactics as Eliot Ness |
| Bootleg Steamer (2492410) | Team Junkfish | 25 Apr 2024 | $14.99 | 33 (82%) | – | Roguelite boat smuggling, 1920–33 |
| Moonshine Inc. (1066760) | Klabater | 1 Dec 2022 | $19.99 | 215 (64%) Mixed | – | Top-down Appalachian moonshine production, arrests, story |
| Bootlegger: Moonshine Empire (2596650) | Choice of Games | 26 Sep 2024 | $5.99 | 21 (81%) | – | Text interactive novel |
| Bootlegger's Mafia Racing Story (2475390) | – | 2 Jan 2024 | $12.99 | 28 (36%) Mostly Negative | – | Racing |
| Chicago 1930: The Prohibition (623920) | – | 11 Sep 2017 | $4.99 | 176 (70%) | – | Old stealth/strategy |
| **Best Served Cold** (3218530) | Rogueside | 5 May 2025 | $17.99 | **755 (88%)** | – | Bartender murder mystery in an alternate-history speakeasy |
| Silas' Speakeasy (4786570) | Nightleder | Q1 2027 | TBA | – | ~3 | First-person horror |
| Bar of Betrayal (3590570) | Vexos | TBA | TBA | – | ~14 | 4–10 player social deduction in a 1927 speakeasy, including "trigger raids" |
| The Money Man (4705010) | Fenyx Digital | 2027 | TBA | – | not checked | Inspect cash for counterfeits in a speakeasy backroom ("Papers, Please" style) |
| Speakeasy (2423070) / Speakeasy (2893310) | Open Late / Team 3 | 2024 | $19.99 / F2P | – | – | Erotic otome visual novel / free arcade shooter |

## 3. Legal front plus illegal back (any era), and period bars

| Game (appid) | Status | Price | View | Reviews (% pos) | Followers | Notes |
|---|---|---|---|---|---|---|
| Internet Cafe Simulator (1136160) | 25 Oct 2019 | $9.99 | First-person | 10,373 (72.6%) | – | Director's reference. Optional illegal work |
| Internet Cafe Simulator 2 (1563180) | 7 Jan 2022 | $19.99 | First-person | 13,258 (73.4%) | – | Mafia protection money, drug dealing, gambling, bombs, guards, go legit or "completely illegal" |
| **Saloon Simulator** (1876930) | EA since 15 Jul 2025 | $18.99 | First-person | **1,015 (89.9%)** | **~8,612** | Wild West bar: drinks, food, staff, gambling, story NPCs, criminal side quests (bootlegging, pickpocketing). Peak 996 CCU (Jul 2025); about 25 average CCU over the last 30 days |
| **Cafe Life Simulator** (4280690) | EA **March 2027** | TBA | First-person | – | ~118 | **Modern café by day, "the city's underworld at night"**, mafia extortion, nightclub expansion, loans, street racing |
| What The Cafe? (4176920) | Coming soon | TBA | Co-op 4 | – | ~16 | Modern café plus mafia protection, laundering jobs, police raids |
| Mafia Pizza: Family Business (5051750) | Q2 2027 | TBA | Strategy | – | ~7 | "Perfectly legitimate pizza business" as cover |
| Man in the Mocha (3108030) | 15 Dec 2026 | TBA | Incremental | – | – | Coffee shop front, hack customers' Wi-Fi |
| Weed Shop 3 (1182110) | 20 Apr 2022 | $19.99 | – | 4,146 (93.6%) | – | Dispensary with street dealing and cartels |
| Black Market INC. (5081480) | 12 Nov 2026 | TBA | First-person | – | ~5 | Modern contraband factory sandbox |
| Bar Owner Simulator (5203240) | 12 Nov 2026 | TBA | First-person | – | – | Modern legal bar (pool, karaoke) |
| On the Rocks (4149640) | EA Q4 2026 | TBA | Third-person (per API) | – | ~397 | Post-apocalyptic bar: scavenge, brew, serve |
| Haunted Bar Simulator (4288130) | Coming soon | TBA | Co-op | – | – | Modern bar by day, horror by night (the day/night split) |

## 4. How the closest games actually play, and what players say

### Speakeasy Simulator (released, the exact concept)
- **Play.** First person. Buy ingredients, then mash, distil and age. Shelves, bar service and per-customer demands for type, quantity and quality. Bulk-sell to the mafia for quick cash. Decorate to raise reputation. Police patrol outside, mostly while you move contraband at night. Updates added a recruitable bartender (Jan), new spirits, cocktails and "Mafia Missions" (Feb), and female NPCs plus more distillers (Mar). No haggling, no raids inside the bar, no front business. ([store](https://store.steampowered.com/app/3883070/), [news API](https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3883070&count=15))
- **What players love.** "I enjoyed all the crafting of the different alcohols." "real cocktails + real home made booze." "Planning when I was going to open the bar, make booze, or just run my product to the mafia is fun." Many call it cozy: "fun relaxing management", "not stressful at all", "really scratches that cozy-simulator itch". One says "one of the few first-person sims I found myself actually enjoying." ([reviews API](https://store.steampowered.com/appreviews/3883070?json=1&language=english&filter=recent&num_per_page=100))
- **What players complain about.** "competent if unpolished and paper thin job sim" (2.7h, negative). A long-play positive review (45h) caps its praise at "competent", reports stutter late in the game, and says you "can literally outrun" the police. Others: "too fast pace for me", brewers giving low quality "despite appropriate ingredients", "have to buy everything from odd and distant places", and "Abandoned?" (no patch since 10 Apr 2026).
- **Commercial signal (estimate, review multiplier).** About 67 reviews in 9 months gives roughly 2,000–4,000 copies, or about $24k–$48k gross at $11.99. About 503 followers. 1 concurrent player on 17 Oct 2026 (Steam API snapshot).

### Silent Spirits (announced, solo, first person)
- **Play** (store page, prologue only). Three phases a day: daytime crafting, evening service, midnight deliveries past police patrols. The mafia sets annual quotas for protection. Recipes progress over a 15-year Prohibition timeline. No haggling, staff, band or front business mentioned. ([store](https://store.steampowered.com/app/3790580/))
- No reviews on the free prologue (0), and ~33 followers eight months after it went up. The page shows little momentum.

### Prohibition Panic! (announced, co-op)
- **Play.** First-person, cartoony co-op chaos in the Overcooked/party mould: pour drinks, **vet patrons at the door** to keep out informants, and keep cops "out of the know". Developed for about 18 months per the dev. It overlaps our door-check and raid ideas but plays as a party game, not a business ladder. ([store](https://store.steampowered.com/app/3568070/), [community](https://steamcommunity.com/app/3568070))
- ~14 followers. "SAE IT Games" may be a student team (SAE Institute). **Unverified.**

### Buns, Booze & Bucks Simulator (announced, structural clone)
- **Play** (store text). Two parallel businesses where "One process should not interfere with the other". The bakery front has customers ("housewives, workers, inspectors, competitors") and bread quality to keep up. Behind it you experiment with fermentation (batches can explode or spoil), smuggle to the pier past customs, negotiate with gangs, pay bribes and handle informants. First-person and co-op tags. ([store](https://store.steampowered.com/app/3579280/))
- ~194 followers, no news posts, no date. **This is the one to watch, because it is our pitch with bread instead of coffee.**

### Saloon Simulator (released EA, the best-performing analogue)
- **Play.** First person behind the counter, with physical drink-making ("liquid physics are very good"), food, staff, gambling and room rentals. Story NPCs, some voiced. Criminal side quests: bootlegging and pickpocketing. ([store](https://store.steampowered.com/app/1876930/))
- **What players love.** "The bartending is amazing its the best part of the game." "Characters are awesome (omg Cheyenne's voice acting)." "story is pretty well written especially for a Sim Game." The dev team is seen as responsive.
- **What players complain about.** Staff: "can't hire anyone other than the first employee and he sucks"; "They're slow as balls". Repetition: "very repetitive and progression is slow"; "Tedium is not content". EA thinness: "feels like a longer demo"; "only about 10 to 13 hours worth of content". Bugs and softlocks: "my entire bootlegger supply just vanishing on reload". The criminal side feels bolted on: "Why risk that for lowlevel income??" ([reviews API](https://store.steampowered.com/appreviews/1876930?json=1&language=english&filter=recent&num_per_page=100))
- **Signal (estimate, review multiplier).** 1,015 reviews gives roughly 30k–61k copies; ~8,612 followers. Concurrent players peaked at 996 at launch and have held around 25–55 average for a year ([SteamCharts](https://steamcharts.com/app/1876930)).

### Moonshiner Simulator (released EA, modern bootlegging)
- **Play.** First-person production chain (mash to whiskey and liqueurs), hand-to-hand sales growing into distribution, assistants, co-op up to 8. A suspicion meter: at 100%, police raid your property, seize alcohol and fine you.
- **What players love.** "high-police-presence city runs keeps the gameplay loop engaging." "There are a LOT of different receipes to discover." "I brew she sell's and we're killing it" (co-op couple).
- **What players complain about.** "The cops don't have a vision cone, they have an invisible circle around them... they will still somehow know." "the worker is utterly useless. you still have to do all the work." "Slow burn, slow money grind." "ai generated shovelware slop copying everything about schedule 1." ([reviews API](https://store.steampowered.com/appreviews/4179280?json=1&language=english&filter=recent&num_per_page=100))

### Silent Authority: Blood & Bourbon (EA 12 Nov 2026, the strongest upcoming title in the theme)
- **Play.** Top-down strategy-RPG, not first person: crews of up to 10 in real-time tactical fights, 17 front-business types, bootlegging supply chains, raids that scale with crime, diplomacy and bribes. ~1,185 followers. It will draw "Prohibition" attention on Steam in November but competes for strategy players, not first-person sim players. ([store](https://store.steampowered.com/app/3907570/))

### Cafe Life Simulator (EA March 2027, modern café front)
- **Play.** First person: run a café, hire staff, take online orders, expand into a nightclub; "earn respect in the city's underworld at night"; mafia extortion; loans; a light GTA-style open city (racing, taxi, gym). ~118 followers. It shares our day/night, legal/illegal structure but is modern and sprawling. ([store](https://store.steampowered.com/app/4280690/))

### The reference games (already researched in `research_notes/Why job simulator games are fun/shop_business_sims.md`)
- **Internet Cafe Simulator 2.** Players love the jank-comedy chaos and the build-up. Complaints: bugs, lost saves, abandonment.
- **Dealer's Life 1/2.** Players love the haggling, the hidden real value and the characters. Complaints: it becomes "numbers go up" once upgrades replace skill.
- **Schedule I.** Players love hands-on minigames and the early money squeeze. Complaints: an empty endgame. One player asked for "bribing the police otherwise you get raided".
- **Drug Dealer Simulator 2.** "raids are shocking police are OP" and "why have doors if they don't use them and take everything"; crashes; customers that "turn into leaves" ([reviews API](https://store.steampowered.com/appreviews/1708850?json=1&language=english&num_per_page=100)).
- **Best Served Cold.** Players love the writing and characters ("best-written video game I have EVER played"). Complaints: the drink mixing is "a 2 second mini game" ([reviews API](https://store.steampowered.com/appreviews/3218530?json=1&language=english&num_per_page=60)).
- **Empire of Sin.** "Running a criminal empire shouldn't get this boring"; save-breaking bugs; abandoned. Paradox said it was "not satisfied" ([GameWatcher](https://www.gamewatcher.com/paradox-interactive-empire-of-sin-not-satisfied), [PC Gamer](https://www.pcgamer.com/games/strategy/after-4-years-of-silence-one-of-the-most-disappointing-games-of-2020-gets-a-surprise-expansion/)).

## 5. Theme demand signals

| Game | Release | Price | Reviews | % positive | Read |
|---|---|---|---|---|---|
| Mafia: Definitive Edition | 24 Sep 2020 | $39.99 | 111,882 | 86.9% | The 1930s gangster look sells at AAA scale |
| Mafia: The Old Country | 7 Aug 2025 | $49.99 | 30,945 | 73.1% | Same (1900s Sicily) |
| Empire of Sin | 1 Dec 2020 | $39.99 | 6,300 | 48.0% | Prohibition **management** with a famous studio and publisher underperformed |
| City of Gangsters | 9 Aug 2021 | $29.99 | 1,566 | 73.1% | Niche |
| Best Served Cold | 5 May 2025 | $17.99 | 755 | 88.1% | A speakeasy setting plus strong writing does fine |
| Moonshine Inc. | 1 Dec 2022 | $19.99 | 215 | 64.2% | Weak |
| PROHIBEAST | 3 Jun 2026 | $34.99 | 142 | 62.7% | Weak |
| Speakeasy Simulator | 15 Jan 2026 | $11.99 | 67 | 91.0% | **The exact concept: liked by its few buyers, but almost nobody bought it** |
| Schedule I | EA 24 Mar 2025 | $19.99 | 320,207 | 97.8% | The illegal-business sim breakout (modern drugs, co-op) |
| Drug Dealer Simulator | 16 Apr 2020 | $19.99 | 21,065 | 86.1% | Strong |
| Drug Dealer Simulator 2 | Jun 2024 (prior notes) | $24.99 | 5,952 | 69.7% | A sequel that fell behind Schedule I |
| Internet Cafe Simulator 2 | 7 Jan 2022 | $19.99 | 13,258 | 73.4% | The legal + illegal structure works |
| Weed Shop 3 | 20 Apr 2022 | $19.99 | 4,146 | 93.6% | Legal shop + street deals |
| Weed Shop 4: Highland | – | $19.99 | 221 | 56.6% | The sequel flopped |
| Dealer's Life 2 | 15 Feb 2022 | $14.99 | 4,240 | 84.9% | Haggling core |
| The Boss Gangster (EA) | 31 Oct 2025 | $18.99 | 472 | 83.7% | Modern crime sandbox |
| Saloon Simulator (EA) | 15 Jul 2025 | $18.99 | 1,015 | 89.9% | Period first-person bar with story works at mid-indie scale |

**Reading.** People like the 1920s gangster aesthetic (Mafia), and illegal-business sims can explode (Schedule I). But no Prohibition management or business game has broken out on Steam. The one that matches our pitch most closely shipped nine months ago and sold an estimated low thousands. The theme alone will not carry the game. The setting is a wrapper; the verbs have to sell it.

## 6. Verdict

**Crowded at the bottom, empty at the top. Not open, not owned.**
- **Not open.** The literal pitch, "first-person speakeasy: make or buy booze, serve, dodge police", already exists (Speakeasy Simulator). Three more are announced: Silent Spirits, Prohibition Panic! and Buns, Booze & Bucks, and the last one is even our legal-front variant. A modern café-by-day, underworld-by-night first-person sim is due in March 2027 (Cafe Life Simulator). We would be about the fifth.
- **Not owned.** Every direct competitor is tiny: 3–503 followers, at most 67 reviews. The released one has gone quiet since April, and one reviewer calls it "paper thin". None does Dealer's Life-style haggling with characters, booze inspection for fakes or poison, or in-venue raids as a set piece. Players' main complaints about the genre all point the same way: shallow loops, police you can outrun or that cheat with invisible circles, useless staff, criminal sides that feel bolted on, and 8–13 hours of content.

**Angles that would make ours distinct** (none of the competitors I checked has these):
1. **Smuggler haggling plus booze inspection** as the core skill: Dealer's Life's hidden value, plus "Papers, Please"-style checks for fakes and poison (smell, colour, label, seal, test). Our earlier theme map ranked inspection and "spot the impostor" as the strongest demand-to-competition gap.
2. **The flip.** A physical, timed, first-person transformation in which the café becomes a bar and back again (a hidden bar wall, bottles into the floor, the band switching tunes) when the lookout signals. This is the shareable clip that no competitor has.
3. **Characters with arcs** (smugglers, the cop on the take, regulars, rival gang). This is what earns praise in Saloon Simulator and Best Served Cold, and in Dealer's Life before it.
4. **Systemic, fair police**: a heat level built from visible causes, informants among customers, and raids you can prepare for. This answers the "outrun them" and "invisible circle" complaints.

**Risks beyond competition:**
- **Name and store-page confusion.** "Speakeasy Simulator", "Speakeasy", "Prohibition", "Silent Spirits" and "Bootlegger's Bar" are taken. A capsule that reads as "another speakeasy sim" invites a direct comparison with a cheaper released game.
- **Weak theme pull** (section 5). We need a hook that sells without the setting.
- **Same-asset look.** We plan to buy Asset Store packs, and small competitors probably use the same 1920s bar packs. "Asset flip" and AI-art accusations already hit Moonshine Inc. and Moonshiner Simulator in reviews.
- **Casino tables and simulated gambling.** Since 22 Sep 2024, Australia gives an automatic **R18+** to newly classified games with simulated gambling ([IGEA](https://igea.net/2024/09/changes-to-australian-classification-system-from-22-september-2024/), [Minister's release](https://minister.infrastructure.gov.au/rowland/media-release/new-mandatory-minimum-classifications-gambling-games-content)). This matters for console ports. **Unverified** whether it binds a Steam PC release. Keep gambling optional or late, not core.
- **Alcohol, poison and violence** are fine under Steam rules, but expect higher age ratings. The Silent Spirits prologue already carries a 12+ for "scenes of customers drinking".
- **Representation.** 1920s mob and ethnic stereotypes (Italian-, Irish- and Jewish-American gangs) and segregation in jazz-age clubs are a reputational risk, not a Steam-rule risk. This needs deliberate writing.
- **Timing.** Silent Authority (12 Nov 2026) and Prohibition Panic! (Q4 2026) launch before we could. If either breaks out, the theme gets either a halo or a "done that" reaction.

## What this means for our game
1. **Test the haggle-and-inspect verb before anything else.** Greybox one smuggler deal with 3 booze types, where 1 in 4 crates is fake or poisoned and the tells are real (honest odds, rule 3). Pass if Urfan plays 20 deals and asks for more, and if a skilled player beats a naive one on poison detection by at least 25 percentage points. Upgrades may only speed checks up, never replace the judgement (the Dealer's Life failure).
2. **Prototype the raid flip as the signature moment.** A 30–60 second timed first-person conversion from bar to café after a lookout warning. Pass if a raw screen recording of it is something we would post as a trailer beat, and if testers fail it sometimes (around 20–40% on first tries) but never feel cheated.
3. **Police must be readable and impossible to outrun.** Heat comes from visible causes (noise, a tipped informant, a bad bribe, poisoned customers). Every raid must be traceable to something the player did or skipped. Test: after a raid, the tester can say why it happened.
4. **Scope a 15–25 hour arc with a new verb every tier** (café, back room, smuggler network, band, still, gambling), against Speakeasy Simulator's 8–12 hours and "paper thin". Staff must take real load off the player (the top complaint in Saloon and Moonshiner reviews). Run it through `sim/` for dead zones.
5. **Ship 5–8 named recurring characters before content breadth.** Test: after a 1-hour session, the tester can name at least 3 characters and wants to know what happens to one of them.
6. **Make the store page impossible to confuse with Speakeasy Simulator.** No "Speakeasy" or "Prohibition" in the title. The first 5 seconds of the trailer show the day-to-night flip and a face-to-face haggle. Give the bought packs a distinctive look (lighting, palette, custom hero props) before any public screenshot.
7. **Re-check the watch list monthly** (Buns, Booze & Bucks; Silent Spirits; Prohibition Panic!; Silent Authority; Cafe Life Simulator; any Speakeasy Simulator sequel). If any passes about 5,000 followers before we announce, or adds smuggler haggling, revisit D-021 (log it in `DECISIONS.md`).

## Could not verify
- **Followers** come from Steam community group XML, not SteamDB (403). They should match SteamDB "followers" but were not cross-checked. Followers were not collected for every listed game (marked "not checked" or "–"). **Wishlist counts and trailer view counts were not collected** (no public source; YouTube was not checked).
- **Sales** are review-multiplier estimates only. Gamalytic was 403 and VG Insights was not readable.
- **Some perspectives were inferred** from store tags or descriptions through a summariser: Silent Spirits, Buns, Booze & Bucks and Prohibition Panic! as first person; On the Rocks as third person, although press calls it "first-person". Confirm by watching trailers.
- Speakeasy Simulator's "two-person team" comes from GameSpew only. Its store page showed "88% of 50" (language-filtered); the API all-language figure is 61/67.
- "SAE IT Games" being a student team is a guess.
- Drug Dealer Simulator 2's release month comes from our earlier notes; I did not re-check it this time. Weed Shop 4's release date was not fetched.
- **Coverage limits.** Steam search mostly matches titles and tags, so a 1920s bar sim with an unrelated name and no matching tags could be missed. Tag sweeps reduce this risk but do not remove it. Non-Steam projects (itch.io jams, Kickstarter) and console-only announcements were not swept.
- Whether Australia's R18+ simulated-gambling rule binds a Steam PC release.

## Sources
- Steam store and API pages: [Speakeasy Simulator](https://store.steampowered.com/app/3883070/), [its reviews](https://store.steampowered.com/appreviews/3883070?json=1&language=all&purchase_type=all), [its news](https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3883070&count=15), [current players](https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=3883070); [Silent Spirits](https://store.steampowered.com/app/3790580/); [Prohibition Panic!](https://store.steampowered.com/app/3568070/); [Buns, Booze & Bucks Simulator](https://store.steampowered.com/app/3579280/); [Prohibition](https://store.steampowered.com/app/3921210/); [Moonshiner Simulator](https://store.steampowered.com/app/4179280/); [Mulerun](https://store.steampowered.com/app/3687830/); [Winter Batch](https://store.steampowered.com/app/5369490/); [Bootlegger's Bar](https://store.steampowered.com/app/4603640/); [Silent Authority](https://store.steampowered.com/app/3907570/); [Empire of Vice: Chicago](https://store.steampowered.com/app/3753640/); [Bourbon Empire](https://store.steampowered.com/app/954320/); [Wiseguys: The Commission](https://store.steampowered.com/app/3134740/); [Mafia Boss Simulator](https://store.steampowered.com/app/4650800/); [Racketeers](https://store.steampowered.com/app/2463550/); [Mob Boss Simulator](https://store.steampowered.com/app/3541740/); [Streetlight Syndicate](https://store.steampowered.com/app/4058190/); [Mafia Hero](https://store.steampowered.com/app/4882360/); [PROHIBEAST](https://store.steampowered.com/app/3503790/); [Bootleg Steamer](https://store.steampowered.com/app/2492410/); [Moonshine Inc.](https://store.steampowered.com/app/1066760/); [Bootlegger: Moonshine Empire](https://store.steampowered.com/app/2596650/); [Best Served Cold](https://store.steampowered.com/app/3218530/); [Silas' Speakeasy](https://store.steampowered.com/app/4786570/); [Bar of Betrayal](https://store.steampowered.com/app/3590570/); [The Money Man](https://store.steampowered.com/app/4705010/); [Saloon Simulator](https://store.steampowered.com/app/1876930/); [Cafe Life Simulator](https://store.steampowered.com/app/4280690/); [What The Cafe?](https://store.steampowered.com/app/4176920/); [Mafia Pizza](https://store.steampowered.com/app/5051750/); [Man in the Mocha](https://store.steampowered.com/app/3108030/); [Black Market INC.](https://store.steampowered.com/app/5081480/); [Bar Owner Simulator](https://store.steampowered.com/app/5203240/); [On the Rocks](https://store.steampowered.com/app/4149640/); [Haunted Bar Simulator](https://store.steampowered.com/app/4288130/); [Empire of Sin](https://store.steampowered.com/app/604540/); [Mafia: Definitive Edition](https://store.steampowered.com/app/1030840/); [Mafia: The Old Country](https://store.steampowered.com/app/1941540/); [City of Gangsters](https://store.steampowered.com/app/1386780/); [Schedule I](https://store.steampowered.com/app/3164500/); [Drug Dealer Simulator](https://store.steampowered.com/app/682990/); [Drug Dealer Simulator 2](https://store.steampowered.com/app/1708850/); [Internet Cafe Simulator](https://store.steampowered.com/app/1136160/); [Internet Cafe Simulator 2](https://store.steampowered.com/app/1563180/); [Weed Shop 3](https://store.steampowered.com/app/1182110/); [Weed Shop 4](https://store.steampowered.com/app/2631140/); [Dealer's Life](https://store.steampowered.com/app/982270/); [Dealer's Life 2](https://store.steampowered.com/app/1343670/); [The Boss Gangster](https://store.steampowered.com/app/2774040/).
- Store searches: [speakeasy](https://store.steampowered.com/search/?term=speakeasy), [prohibition](https://store.steampowered.com/search/?term=prohibition), [bootlegger](https://store.steampowered.com/search/?term=bootlegger), [Crime + Historical tags](https://store.steampowered.com/search/?tags=6378%2C3987&category1=998), [Crime + First-Person + Simulation, coming soon](https://store.steampowered.com/search/?tags=6378%2C3839%2C599&filter=comingsoon), [mafia, coming soon](https://store.steampowered.com/search/?term=mafia&filter=comingsoon), [money laundering](https://store.steampowered.com/search/?term=money%20laundering).
- Follower XML, for example [Speakeasy Simulator group](https://steamcommunity.com/games/3883070/memberslistxml/?xml=1) and [Silent Authority group](https://steamcommunity.com/games/3907570/memberslistxml/?xml=1).
- [SteamCharts: Saloon Simulator](https://steamcharts.com/app/1876930).
- Press: [GameSpew on Speakeasy Simulator](https://www.gamespew.com/2026/01/speakeasy-simulator-release-window/); [Games Press launch release](https://www.gamespress.com/Speakeasy-Simulator-Out-Now-on-Steam); [gg.deals snapshot](https://gg.deals/game/speakeasy-simulator/); [Capsule Computers on On the Rocks](https://www.capsulecomputers.com.au/2026/04/first-person-survival-bar-management-on-the-rocks-coming-to-pc-via-steam-early-access-in-2026/); [GameWatcher on Empire of Sin](https://www.gamewatcher.com/paradox-interactive-empire-of-sin-not-satisfied); [PC Gamer on Empire of Sin](https://www.pcgamer.com/games/strategy/after-4-years-of-silence-one-of-the-most-disappointing-games-of-2020-gets-a-surprise-expansion/); [IGEA on Australian classification changes](https://igea.net/2024/09/changes-to-australian-classification-system-from-22-september-2024/).
