# Hands-on "satisfying work" simulators: how they play moment to moment, and why players love or quit them

Scope: PowerWash Simulator (1 and 2), House Flipper (1 and 2), Car Mechanic Simulator 2021, Cooking Simulator, plus three 2024–2026 hits: Crime Scene Cleaner (cleaning), Supermarket Simulator (hands-on retail with staff) and TCG Card Shop Simulator (pack opening with shop; the closest to Dockside's reveal loop). Current as of 3 October 2026.

Sales already covered in `../Mystery container game research/` (Supermarket Simulator, TCG Card Shop) are not repeated in depth. Here those two games are used only for the hands-on versus automation question.

---

## 1. Per-game breakdown: verbs, loops, money, playtime, reviews, sales, team

### Takeaway
Every successful game here is built on one physical verb that changes something you can see (spray, scrape, paint, unbolt, stock, rip open). Each also has a clear "this part is done" signal and a money loop that buys a faster or stronger version of the same verb. The winners (PowerWash 96%, Crime Scene Cleaner 98%, CMS 2021 96%, TCG Card Shop 96%) keep friction low. The weakest (Cooking Simulator 85%, and its sequel, which launched "Mixed") put fiddly physics between the player and the result.

### Cited Findings

#### Data method and caveats (read first)
- **Review scores** were pulled live from Steam's review API on 2026-10-03, covering all languages and all purchase types, e.g. [PowerWash Simulator reviews API](https://store.steampowered.com/appreviews/1290000?json=1&language=all&purchase_type=all&num_per_page=0).
- **Reviewer playtime and complaint themes** come from the 100 most-helpful English negative and 100 most-helpful positive reviews of all time for each game, also via the Steam review API (e.g. [CMS 2021 negative sample](https://store.steampowered.com/appreviews/1190000?json=1&language=english&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100)).
  - Most-helpful reviews lean toward engaged, long-playing players, so treat the hours as indicative, not as population medians.
  - Theme percentages come from crude keyword matching (e.g. "repetit", "boring", "bug") over those 100 negative reviews.
- **Achievement funnels** come from Steam global achievement percentages (`steamcommunity.com/stats/<appid>/achievements`).
  - The base for each percentage is roughly all Steam owners, including people who barely played.
  - DLC-only achievements are depressed because few players own the DLC.
- **No playtime data from SteamSpy or Gamalytic.** SteamSpy now returns 0 for playtime ([SteamSpy API](https://steamspy.com/api.php?request=appdetails&appid=1290000)), and Gamalytic's API now needs a paid key ([Gamalytic API](https://api.gamalytic.com/game/1290000)). Playtime comes instead from developer statements, HowLongToBeat, reviewer playtime and achievement funnels.

#### Summary table (Steam data as of 2026-10-03)

| Game | Steam release | Developer, team, engine | US price | Steam reviews | Sales (label) | Playtime signal |
|---|---|---|---|---|---|---|
| PowerWash Simulator | EA 19 May 2021; 1.0 14 Jul 2022 | FuturLab (UK), about 20 staff when work began; Unity | $24.99 | Overwhelmingly Positive, 96.4% of 58,847 | 17M+ "players" on all platforms (dev, includes Game Pass); "over 10 million units" (press) | HLTB: 33h main, 50.5h completionist |
| PowerWash Simulator 2 | 23 Oct 2025 | FuturLab, self-published | $24.99 | Very Positive, 91.3% of 11,979 | ~352K Steam copies, ~$5.3M gross (third-party estimate, unverified) | 200K players day one incl. Game Pass |
| House Flipper | 17 May 2018 | Empyrean; pub. Frozen District + PlayWay | $24.99 | Very Positive, 94.0% of 112,213 | 2.1M PC + 430K console (PlayWay-era report, date unclear); "10M+ players" (dev, 2026) | Reviewer medians 23–60h |
| House Flipper 2 | 14 Dec 2023 | Frozen District, team "more than doubled" vs HF1, new code base | $39.99 | Very Positive, 87.4% of 20,153 | 131K in 3 days; 1M Steam copies by Feb 2026 (dev) | Reviewer medians 16–78h |
| Car Mechanic Simulator 2021 | 11 Aug 2021 | Red Dot Games; pub. PlayWay | $24.99 | Overwhelmingly Positive, 95.7% of 38,853 | 132K PC in 3 days (pub); $8.11M gross in 60 days (pub); ~1.2M Steam (estimate, unverified) | Reviewer medians 16–68h |
| Cooking Simulator | 6 Jun 2019 | Big Cheese Studio (PL); PlayWay-published; Unity | $19.99 | Very Positive, 84.6% of 19,730 | 4M+ copies incl. DLC (dev) | Reviewer medians only 6–13h |
| Crime Scene Cleaner | 14 Aug 2024 | President Studio (PlayWay majority-owned); budget PLN 1.4M (~$356K) | $29.99 | Overwhelmingly Positive, 98.1% of 34,606 | 355K units / $5.44M gross in 60 days; 874K Steam copies later (pub) | Median playtime 11h37m (pub, at 60 days) |
| Supermarket Simulator | EA Feb 2024; 1.0 19 Jun 2025 | Nokta Games | $19.99 | Very Positive, 92.0% of 84,335 | 3.4M+ copies, $45M+ (AppMagic estimate, see other notes) | Reviewer medians 27–70h |
| TCG Card Shop Simulator | EA Sep 2024; Steam 1.0 date shows 14 Sep 2026 | OPNeon Games | $19.99 | Overwhelmingly Positive, 96.4% of 50,379 | 3.5M+ (see other notes) | Reviewer medians 19–59h |

Sources for the table:
- **Review scores, prices, release dates, developer and publisher fields:** Steam store and review APIs, e.g. [PWS app details](https://store.steampowered.com/api/appdetails?appids=1290000), [HF2](https://store.steampowered.com/app/1190970/), [CMS 2021](https://store.steampowered.com/app/1190000/), [Cooking Simulator](https://store.steampowered.com/app/641320/), [Crime Scene Cleaner](https://store.steampowered.com/app/1040200/), [Supermarket Simulator](https://store.steampowered.com/app/2670630/), [TCG Card Shop](https://store.steampowered.com/app/3070070/).
- **PowerWash Simulator:**
  - Unity engine and early access date: [Wikipedia, PowerWash Simulator](https://en.wikipedia.org/wiki/PowerWash_Simulator)
  - "around 20 or so people when work on PowerWash Simulator started", with the team growing "significantly" since: [TouchArcade interview with Dan Chequer](https://toucharcade.com/2023/03/02/powerwash-simulator-interview-lead-designer-final-fantasy-7-dlc-midgar-next-game-ios-port-switch-gyro-support-ps5-dualsense/)
  - 17M players, and that success let FuturLab self-publish the sequel: [FuturLab](https://www.futurlab.co.uk/news/thank-you-for-17-million-powerwash-simulator-players)
  - "sold over 10 million units", excluding DLC: [GamesRadar](https://www.gamesradar.com/games/simulation/theres-a-ravenous-sense-that-people-want-to-wash-more-stuff-powerwash-simulator-2s-devs-are-rolling-out-the-red-carpet-for-cleaning-sickos-and-theyve-already-got-big-plans-for-2026/)
  - HLTB 33h / 50.5h: [HowLongToBeat on X, Jan 2023](https://x.com/HowLongToBeat/status/1611022459225997312)
- **PowerWash Simulator 2:**
  - ~352K copies / $5.3M: search-result snippet attributed to third-party trackers ([SteamCharts](https://steamcharts.com/app/2968420), [Raijin](https://raijin.gg/app/2968420/PowerWash_Simulator_2)). **Unverified; treat as a rough estimate.**
  - 200K players day one: [Noisy Pixel](https://noisypixel.net/powerwash-simulator-2-200k-players-game-pass-launch/)
- **House Flipper:**
  - 2.1M PC, 140K Xbox One, 190K PS4, 100K Switch; Garden Flipper DLC 570K on PC; HGTV DLC 340K on PC: [Gamepressure](https://www.gamepressure.com/newsroom/house-flipper-reports-exceptional-sales-figures/za32a4) (article date not captured; likely about 2020)
  - "more than 10 million players … on both PC and consoles" over 8 years: [Frozen District via Games Press, 2026](https://www.gamespress.com/Steam-players-get-a-chance-to-grab-House-Flipper-for-free-and-join-the). These are players, not sales.
  - A search summary also claimed "8.5 million copies sold across platforms". **I found no primary source; unverified.**
- **House Flipper 2:**
  - Team doubled, new code base: [Wikipedia, House Flipper 2](https://en.wikipedia.org/wiki/House_Flipper_2)
  - 131K units in 3 days, 4% refunds, 850K wishlists at launch, ~$2M dev cost, ~$330K ad spend, profitable after 3 days: PlayWay CEO via [GameDiscoverCo](https://newsletter.gamediscover.co/p/house-flipper-2-how-the-sequel-cleaned)
  - 1M Steam copies on 13 Feb 2026: [Games Press](https://www.gamespress.com/House-Flipper-2-1-million-copies-sold-on-Steam-a-brand-new-Japanese-DL)
- **Car Mechanic Simulator 2021:**
  - 132K PC copies in 3 days, 270K wishlists at release: PlayWay via [GameDiscoverCo](https://newsletter.gamediscover.co/p/data-dive-inside-a-successful-sequel)
  - $8.11M gross in the first 60 days: [Game World Observer](https://gameworldobserver.com/2024/10/14/crime-scene-cleaner-revenue-5-4-million-sales)
  - 1.2M Steam units: search snippet from [VG Insights](https://vginsights.com/game/car-mechanic-simulator-2021). **Estimate, unverified.**
- **Cooking Simulator:**
  - Unity, 80+ recipes, 140+ ingredients, Metacritic 64: [Wikipedia, Cooking Simulator](https://en.wikipedia.org/wiki/Cooking_Simulator)
  - "sold over 4 million copies worldwide (including DLCs)": [Big Cheese via Games Press](https://www.gamespress.com/Sequel-to-the-cult-game-is-coming-soon-Cooking-Simulator-2-Prologue-to)
- **Crime Scene Cleaner:**
  - 355K units / $5.44M gross in 60 days, PLN 1.4M budget, median playtime 11h37m, 15.5K DAU, 13.5K peak CCU: PlayWay CEO via [Game World Observer](https://gameworldobserver.com/2024/10/14/crime-scene-cleaner-revenue-5-4-million-sales)
  - 874K Steam copies, from the IPO presentation: [WN Hub](https://wnhub.io/news/legal/item-48032)

#### Achievement funnels (where players stop): Steam global percentages, 2026-10-03
- **PowerWash Simulator** ([achievements](https://steamcommunity.com/stats/1290000/achievements/)):
  - 82.2% earned 5 stars in Career.
  - 35.2% earned 100 stars.
  - **19.5% completed Career Mode** (about 33h by HLTB).
  - Under 10% completed DLC jobs.
- **PowerWash Simulator 2** ([achievements](https://steamcommunity.com/stats/2968420/achievements/)):
  - 94.0% did the first job.
  - 37.8% own a full medium-duty washer set; 22.0% own all washers and attachments.
  - 15.3% completed the "Living Room" job; 11.1% the "Tree House" job.
  - Licensed DLC (Star Wars) jobs: 8–11%.
- **House Flipper** ([achievements](https://steamcommunity.com/stats/613100/achievements/)):
  - 90.1% completed the first job.
  - 8.5% sold 10 houses; 4.0% sold 20; 1.1% sold 50.
  - 5.0% earned their first million.
  - **1.5% "Finish the game"**; 4.5% "Complete every job all the way".
- **House Flipper 2** ([achievements](https://steamcommunity.com/stats/1190970/achievements/)):
  - 87.3% "First steps".
  - 48.3% unlocked all tools in Story Mode.
  - 31.6% earned 1,000,000.
  - 26.8% finished every suburb job.
  - **12.9% sold 5 houses.**
  - 11.0% unlocked all perks.
- **Car Mechanic Simulator 2021** ([achievements](https://steamcommunity.com/stats/1190000/achievements/)):
  - 74.6% finished 1 order.
  - 54.1% reached level 5; 25.5% level 20; 5.9% level 50.
  - 21.2% renovated and sold 1 car; 1.9% sold 50.
  - **6.2% finished 100 orders.**
- **Cooking Simulator** ([achievements](https://steamcommunity.com/stats/641320/achievements/)):
  - 75.9% served a dish; 66.5% earned a first Cookbuck.
  - 11.0% unlocked 5 recipes.
  - **1.9% finished 7 days of work.**
  - 0.2% reached level 15.
- **Crime Scene Cleaner** ([achievements](https://steamcommunity.com/stats/1040200/achievements/)):
  - 97.1% washed a first blood stain; 80.7% completed mission 1.
  - 54.4% completed "Modern Art".
  - 46.9% "Steal $50,000".
  - About 14% completed the late missions "Circle of Friends" and "Town too Small".
  - 24.5% maxed the pressure-washer skill tree.
- **Supermarket Simulator** ([achievements](https://steamcommunity.com/stats/2670630/achievements/)):
  - 91.5% did 50 checkouts; **87.9% did 100 checkouts "all on your own"**.
  - Only 9.7% hired 4 restockers and 3.0% hired 4 cashiers.
  - 4.6% bought all store expansions.
- **TCG Card Shop Simulator** ([achievements](https://steamcommunity.com/stats/3070070/achievements/)):
  - Packs opened: 76.0% opened 100; **41.1% opened 1,000; 11.2% opened 10,000**; 1.3% opened 25,000.
  - Workers hired: 65.9% hired 1; 21.7% hired 4; 8.6% hired 8.
  - 32.7% manually checked out 1,000 customers.
  - Shop level: 55.5% reached 20; 6.3% reached 100.

#### Reviewer playtime (helpful-review samples, hours)
The pattern: early bounces (under 2h) are common for physics-heavy or story games, and late burnouts (50h+) are common for open-ended games.

| Game | Median hours at negative review | Lifetime hours, positive reviewers (median) | Negative reviewers under 2h | Negative reviewers 50h+ |
|---|---|---|---|---|
| PowerWash Simulator | 22.9 | 80.9 | 21% | 33% |
| PowerWash Simulator 2 | 7.9 | 60.7 | 29% | 4% |
| House Flipper | 23.3 | 59.5 | 2% | 25% |
| House Flipper 2 | 15.9 | 77.9 | 10% | 25% |
| Car Mechanic Simulator 2021 | 15.7 | 67.8 | 24% | 15% |
| Cooking Simulator | 5.5 | 13.2 | 28% | 6% |
| Crime Scene Cleaner | 8.5 | 37.9 | 33% | 4% |
| Supermarket Simulator | 35.6 | 69.6 | 3% | 41% |
| TCG Card Shop Simulator | 18.7 | 59.0 | 3% | 26% |

Source: Steam review API samples described above (e.g. [Cooking Simulator negatives](https://store.steampowered.com/appreviews/641320?json=1&language=english&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100)).

#### Complaint themes in the 100 most-helpful negative reviews (keyword share)
| Game | Strongest themes |
|---|---|
| PowerWash Simulator | price/DLC 52%, tedious 15%, content 14%, repetitive 9% |
| PowerWash Simulator 2 | bugs 44%, price/DLC 26%, physics/controls 21% |
| House Flipper | price/DLC 69%, bugs 32%, content 28%, repetitive 20%, boring 17% |
| House Flipper 2 | price/DLC 46%, content 31%, story 21%, bugs 20% |
| Car Mechanic Simulator 2021 | price/DLC 41%, bugs 19%, physics/controls 18%, repetitive 14% |
| Cooking Simulator | bugs 50%, physics/controls 45% |
| Crime Scene Cleaner | bugs 35%, story 19%, boring 10% |
| Supermarket Simulator | price/DLC 48%, bugs 29%, content 22%, staff/automation 20% |
| TCG Card Shop Simulator | repetitive 17%, boring 14%, grind 13%, staff/automation 13%, late game 12% |

Source: same Steam review API samples.

#### PowerWash Simulator (FuturLab)
- **Core verbs:** aim the spray, pick a nozzle (narrow to wide), pick a range, sweep across a surface, move a ladder or scaffold, swap soap, hunt for the last specks. Players manage "a small power washing business and take on jobs … in the form of levels." The career has 38 jobs plus bonus jobs. There are progress bars for the whole level and for each object, and "the player can press a button to highlight any dirt remaining." Money buys tool upgrades and cosmetics. Co-op supports 2 players in career and 6 in free play. — [Wikipedia](https://en.wikipedia.org/wiki/PowerWash_Simulator)
- **Design targets:** "We agreed on an 8/10 for the realism of how you clean but a 4/10 for the realism of what was cleaned." "Rather than trying to actually simulate the act of power washing, instead our goal was to replicate the satisfaction of watching those videos." — Dan Chequer, [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Progression lever:** "The multilayer dirt system was a breakthrough moment … it provided a need for the player to upgrade their washing equipment in order to combat new increasingly tough dirt types … hidden beneath the all-encompassing easier dirt." Washer power scales with level size. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **The "ding":** "the now iconic 'DING' noise was originally intended as a placeholder … The ultimately satisfying distribution of DINGs is something that is now foundational in the design of every new job." — Kirsty Rigden, [FuturLab](https://www.futurlab.co.uk/news/world-intellectual-property-day-how-did-powerwash-simulator-come-to-be)
- **Feedback:** "The one word we hear more than any other in our feedback is 'Satisfying'." They wanted something players "could relax with and approach at their own pace." An update revamped soap "to ensure players weren't wasting their in-game funds on excessive amounts of detergent." — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502)
- **Origin:** watching "satisfying videos and timelapses of people powerwashing"; development "became a challenge of getting the washing mechanics to be as supremely satisfying as possible." — Nick McCarthy, [Noisy Pixel](https://noisypixel.net/powerwash-simulator-interview-futurlab-dlc-sequel/)
- **Praise:** "It's satisfying, and it calms the brain down." Other players report 200h and 838h. — [Steam discussion](https://steamcommunity.com/app/1290000/discussions/0/3452591533721317533). Another player: "This game has that nice balance where you get the fun of seeing everything get cleaned up without the more realistic but tedious chores." — [Steam discussion](https://steamcommunity.com/app/1290000/discussions/0/5277681174358444224)
- **Complaints:**
  - "about 80% of the levels suck, having extremely tedious parts to wash, like fences you have to hit at 360 different angles. The final level in the game is EXTREMELY lon[g]" (44h). — [Steam review](https://steamcommunity.com/profiles/76561198035503422/recommended/1290000/)
  - "A pixel-hunting game … Frustration over relaxation" (35h). — [Steam review](https://steamcommunity.com/profiles/76561198074041282/recommended/1290000/)
  - Late game, plus "locking of 100% completion behind DLC paywalls" (52h). — [Steam review](https://steamcommunity.com/profiles/76561198320742186/recommended/1290000/)
  - A 1h reviewer says objects auto-finish at "about 90% completion" but the remaining effort still annoys. This is a reviewer claim and I have not verified the exact threshold. — [Steam review](https://steamcommunity.com/profiles/76561198162235689/recommended/1290000/)

#### PowerWash Simulator 2 (FuturLab, Oct 2025)
- **Same core loop with these changes:**
  - Soap is now unlimited and works on all surfaces.
  - New tools: a circular surface cleaner, a scissor lift and abseiling gear.
  - Split-screen co-op.
  - 38 base jobs.
  - **Multi-stage jobs:** "finish cleaning available objects before the next set are revealed", e.g. a restroom's exterior before its interior.
  - **A home base hub** where you clean furniture to decorate it. Mementos on a shelf let you replay jobs.
  - Money and "PowerWash Points" buy equipment, cosmetics and furniture.
  - Paid licensed DLC: Adventure Time (Apr 2026), Star Wars (Jul 2026), Barbie (Q4 2026).
  - Metacritic PS5 82. IGN praised free soap as a mechanic "tweaked" the right way.
  - — [Wikipedia, PWS2](https://en.wikipedia.org/wiki/PowerWash_Simulator_2)
- **Feedback design:** "a range of dirt particles that correspond with that dirt's texture/colour – this really helps … give feedback on whether dirt still remains." The design and art teams place dirt "for the most satisfying contrast dirty to clean." — McCarthy, [Xbox Wire](https://news.xbox.com/en-us/2025/10/23/powerwash-simulator-2-how-futurlab-built-a-sparking-sequel/)
- **Complaints:**
  - Levels "balanced for 4 players making them just too large and tedious for a single player" (25h). — [Steam review](https://steamcommunity.com/profiles/76561197961466852/recommended/2968420/)
  - "way less content … The furniture mechanics are boring and pointless" (88h). — [Steam review](https://steamcommunity.com/profiles/76561198147606104/recommended/2968420/)
  - New tools "so weak" that by the endgame one nozzle remains "the way to go, no matter what you're cleaning" (28h). — [Steam review](https://steamcommunity.com/profiles/76561197967678796/recommended/2968420/)
  - Cosmetic skins that are near-identical recolours (37h). — [Steam review](https://steamcommunity.com/profiles/76561198163588724/recommended/2968420/)

#### House Flipper (Empyrean / Frozen District, 2018)
- **Core verbs:** "painting, laying down tiles, cleaning, installations, and demolition".
  - Tools "can be upgraded to perform them faster".
  - Jobs arrive by email and pay "depending on the size of the job and how well it is completed".
  - You then buy and resell houses; buyers with different needs "compete for the house in an auction, bidding depending on how much it suits their needs".
  - — [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper)
- **Critics:**
  - Metacritic: "mixed or average", with "fixing up the homes is satisfying while questioning its long-term playability".
  - Kotaku: "Manifesting your vision of a decent, sellable house onto these garbage heaps feels amazing—especially because it happens on such a granular scale."
  - PC Gamer: "a definite satisfaction in taking a gross room and making it look nice … but I just don't find the act of slowly and mechanically painting and cleaning much fun."
  - — [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper)
- **Players and mods:** 50,000+ Steam Workshop items from players. — [Games Press](https://www.gamespress.com/Steam-players-get-a-chance-to-grab-House-Flipper-for-free-and-join-the)
- **Praise:** "overwhelmingly theraputic. Day after I bought it, I tackled my room" (5h). — [Steam review](https://steamcommunity.com/profiles/76561197994150701/recommended/613100/)
- **Complaints:**
  - "just point and click. Which is so repetative at times it makes it so boring … have to grind by doing work for clients" (26h). — [Steam review](https://steamcommunity.com/profiles/76561198114576862/recommended/613100/)
  - "you will grow bored with after you've done up all the houses" (59h). — [Steam review](https://steamcommunity.com/profiles/76561198060315806/recommended/613100/)

#### House Flipper 2 (Frozen District, Dec 2023)
- **Modes:**
  - **Story:** tasks completed in sequence.
  - **Assembly mode:** "build and install items in the house manually, rather than simply clicking them into place, which rewards them with discounts on purchases".
  - **Sandbox:** design a house from scratch.
  - GamesRadar said sandbox "can feel overwhelming for players used to being given goals".
  - — [Wikipedia, HF2](https://en.wikipedia.org/wiki/House_Flipper_2)
- **Pricing:** set at $40 because "the replayability of House Flipper is huge, and adding the Sandbox Mode helped it even more". At launch there were "complaints over insufficient content". — [GameDiscoverCo](https://newsletter.gamediscover.co/p/house-flipper-2-how-the-sequel-cleaned)
- **Complaints:**
  - From a 621h HF1 veteran: changed mechanics mean "can't see what I even did, which was half the fun and satisfaction." — [Steam review](https://steamcommunity.com/profiles/76561198025287309/recommended/1190970/)
  - "I can open the first house flipper game and lose 8 hours, here it feels like a chore to play for 2 hours" (4h). — [Steam review](https://steamcommunity.com/profiles/76561198395264796/recommended/1190970/)
  - "You automatically start with the best window scraper tool with no upgrade options, making every window clean in like 3-5 swi[pes]". The upgrade system "may as well be removed" (10h). — [Steam review](https://steamcommunity.com/profiles/76561197992297217/recommended/1190970/)

#### Car Mechanic Simulator 2021 (Red Dot Games / PlayWay)
- **Core verbs:** "Repair, fix, test, paint, tune and rebuild cars". The game advertises "4000+ unique parts and over 72 cars".
  - Car sources: an auction house, and barn finds where "Some of them might have hidden gems – if you can find them".
  - Work: "An infinitely generated number of orders" plus hand-made story missions.
  - — [Steam store](https://store.steampowered.com/app/1190000/Car_Mechanic_Simulator_2021/)
- **Sequel:** Car Mechanic Simulator 2026 is listed with co-op, 150+ cars and 8,000+ parts. A Dec 31, 2026 date appeared in search results. **Unverified; the game is unreleased as of this writing.** — [Steam](https://store.steampowered.com/app/2692660/Car_Mechanic_Simulator_2026/)
- **Complaints:**
  - New minigames "feel like a chore … The repair minigame makes repairing … take forever" (9h). — [Steam review](https://steamcommunity.com/profiles/76561197961543607/recommended/1190000/)
  - "The minigames are fun at first but they become tedious quickly, an option to disable them would be nice" (23h). — [Steam review](https://steamcommunity.com/profiles/76561197992857150/recommended/1190000/)
  - "ECU Tuning is matching bars together" (29h). — [Steam review](https://steamcommunity.com/profiles/76561198069055117/recommended/1190000/)

#### Cooking Simulator (Big Cheese Studio, 2019)
- **Core verbs:** physics-driven slicing, pouring, seasoning, heating and plating, using "over 80 recipes using more than 140 ingredients".
  - Career: "earning fame and experience by serving dishes according to orders". Sandbox has no time limits.
  - PC Games criticised "difficult controls, unengaging career mode and performance issues".
  - — [Wikipedia](https://en.wikipedia.org/wiki/Cooking_Simulator)
- **Complaints:**
  - "it just gets painfully boring near the 10th hour" (12h). — [Steam review](https://steamcommunity.com/profiles/76561198044849755/recommended/641320/)
  - Wants auto-cutting into even parts, but "I don't want to take away all the feeling of getting in there with your hands" (13h). — [Steam review](https://steamcommunity.com/profiles/76561198034372590/recommended/641320/)
  - Judging is "hit or miss … even if I did the exact same things" (42h). — [Steam review](https://steamcommunity.com/profiles/76561198871942514/recommended/641320/)
- **Sequel:** Cooking Simulator 2: Better Together launched 31 March 2026. Game8 scored it 68, citing bugs and soft-locks. Search snippets say Steam reviews were Mixed (~42–49% positive). Those figures are a snapshot I could not re-verify because Steam rate-limited my requests. — [Game8](https://game8.co/articles/reviews/cooking-simulator-2-better-together-review), [Steam](https://store.steampowered.com/app/2455360/Cooking_Simulator_2_Better_Together/)

#### Crime Scene Cleaner (President Studio / PlayWay, 2024)
- **Core verbs:** mop, pressure-wash and scrub blood; bag trash and haul it to the van; search for and dispose of evidence; pocket valuables.
  - Store pitch: "Switch between tools, combine their strengths, and plan your moves carefully". "Search every corner for evidence, collect what's valuable … if some expensive watch goes missing, no one should care". — [Steam store](https://store.steampowered.com/app/1040200/Crime_Scene_Cleaner/)
  - Structure: story missions plus skill trees (General, Pressure Washer, Water).
- **Praise:** "no time limit, no enemies, just you and your cleaning supplies … relax, put on some music" (17h). — [Steam review](https://steamcommunity.com/profiles/76561198067966325/recommended/1040200/)
- **Complaints:**
  - "hide and seek with small items scattered around massive areas. The final few levels are a tedious waste of 1-2 hours each, and the ending was a massive disappointment" (15h). — [Steam review](https://steamcommunity.com/profiles/76561198064336743/recommended/1040200/)
  - The repetitive "carrying trash bags all the way to the truck in the early game" (20h). — [Steam review](https://steamcommunity.com/profiles/76561199387692993/recommended/1040200/)
  - "feels pretty short" despite large final levels (42h, positive review). — [Steam review](https://steamcommunity.com/profiles/76561198083702174/recommended/1040200/)

#### Supermarket Simulator (Nokta Games) and TCG Card Shop Simulator (OPNeon Games)
- **Supermarket Simulator verbs:** "Order stock using an in-game computer. Unpack goods, organize them in your storage room and place them on shelves … Scan items, take cash and credit card payments"; set prices; hire staff; expand. — [Steam store](https://store.steampowered.com/app/2670630/Supermarket_Simulator/)
- **GameSpew review:**
  - There is "a degree of early game grind … you'll sit at the till and check customers out". This is "less tedious than it sounds … every penny … is going into your pocket".
  - "Your restockers will fill the shelves, but they'll never order products on your behalf". It "still boggles my mind that there's no way to completely automate stock ordering".
  - "It's seriously satisfying to see your store go from strength to strength".
  - — [GameSpew](https://www.gamespew.com/2025/11/supermarket-simulator-review/)
- **Supermarket Simulator complaints:**
  - "The game gets *very* tedious about 10 hours in" (61h). — [Steam review](https://steamcommunity.com/profiles/76561198044516494/recommended/2670630/)
  - A cleaning mechanic was added "without even the option to hire an employee to do it for you" (51h). — [Steam review](https://steamcommunity.com/profiles/76561198849003521/recommended/2670630/)
  - "Fun for a few hours. Gets repetitive", plus paid-DLC anger (77h). — [Steam review](https://steamcommunity.com/profiles/76561198409938670/recommended/2670630/)
- **TCG Card Shop praise:** "I did, however, spend almost 50 hours in 3 days opening boxes of cards", and without spending real money on loot boxes. — [Steam review](https://steamcommunity.com/profiles/76561198029693287/recommended/3070070/)
- **TCG Card Shop complaints:**
  - "it's just a pack opening simulator, which gets insanely boring after opening thousands of booster packs. Let me hire someone to rip open packs" (16h). — [Steam review](https://steamcommunity.com/profiles/76561197999029630/recommended/3070070/)
  - "a slow grind to level up your shop just to buy an overpriced license" (18h). — [Steam review](https://steamcommunity.com/profiles/76561198379578513/recommended/3070070/)

### Inferences
- **Approval ranking.** Steam approval tracks how directly the verb produces a visible result: Crime Scene Cleaner 98%, then PWS, TCG and CMS21 at 96%, then Supermarket 92%, then HF2 87% and Cooking 85%. Cooking Simulator's physics hands make the verb itself a source of failure, and nearly half its most-helpful negative reviews cite physics or controls.
- **Two quit shapes.**
  - Finite, story-led games (Crime Scene Cleaner, Cooking Sim, PWS2) lose unhappy players early (25–33% of negative reviewers under 2h). Their happy players finish in about 10–40h and leave.
  - Open-ended, economy-led games (Supermarket, TCG, HF1, PWS1) lose people late (25–41% of negative reviewers past 50h). These players liked the game but ran out of novelty or reward.
- **Few people "finish".** Only about 20% finish PWS's career, about 1.5% "finish" HF1, and about 6% reach CMS21 level 50. These games sell because the first 5–20 hours are good, not because people complete them.

### Gaps
- No reliable median playtime for most games: SteamSpy no longer reports it, and the Gamalytic and VG Insights APIs need a key. Crime Scene Cleaner (11h37m, publisher) and PWS (HLTB) are the only solid figures.
- I found no team-size or engine statement for House Flipper 1, CMS 2021, Supermarket Simulator or TCG Card Shop. Many PlayWay-family games use Unity, but I did not confirm this for each game.
- Lifetime House Flipper 1 sales: the 8.5M figure is unverified, and the dated PlayWay breakdown is probably from about 2020.
- A GDC talk on PowerWash Simulator's design: none found.
- The exact PowerWash auto-complete threshold: only a reviewer's "about 90%" claim.
- Reddit could not be reached directly (blocked), so player voice comes from Steam reviews and Steam forums.

---

## 2. What exact moment-to-moment interaction makes each one compulsive? Why does scrubbing dirt or fixing a car feel good?

### Takeaway
The compulsion comes from a continuous visible before/after, broken into many small named pieces that each "complete" with a sound. Players see the next piece almost done and anticipate its ding. Realism matters only in how the tool feels, not in what gets cleaned. Feedback has to be unambiguous: high clean/dirty contrast, particles that show dirt is still there, and a highlight for leftovers.

### Cited Findings
- **Watching transformation is the product.** FuturLab aimed to "replicate the satisfaction of watching those videos" rather than simulate washing. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Micro-completions.** Levels are "broken down into separate washable elements. Each time one of those elements is completely cleaned the player is rewarded with a visual and audible acknowledgement." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Anticipation of the ding.** "Players also tend to anticipate when they think a part is going to be completed while cleaning it, and that anticipation and payoff contribute a great deal to the satisfaction experienced." So surfaces are split "along edges that match the player's expectations" to avoid "frustrating hunts for dirt hidden over unexpected edges." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **The ding's distribution is designed.** "The ultimately satisfying distribution of DINGs is something that is now foundational in the design of every new job." It started as a placeholder. — [FuturLab](https://www.futurlab.co.uk/news/world-intellectual-property-day-how-did-powerwash-simulator-come-to-be)
- **Contrast is the top readability rule.** "nothing is more important than the contrast between the clean and dirty state". A dark grey patio table was repainted creamy white, "vastly increasing the satisfaction of cleaning it". — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Feedback particles.** In PWS2, dirt particles match the dirt's colour and texture "to give feedback on whether dirt still remains on the surface currently being washed." — [Xbox Wire](https://news.xbox.com/en-us/2025/10/23/powerwash-simulator-2-how-futurlab-built-a-sparking-sequel/)
- **Low friction on purpose.** "we wanted to keep the friction of the experience to a minimum … we didn't want the puzzle aspect of the game to get in the way of the relaxing, satisfying experience." Challenge was "normally a byproduct of the inherent size and/or complexity of a level and rarely something deliberately added." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Mild tactical choice.** "The relationships between pressure, range, and coverage formed the core of the game's design." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Rumble and power.** Washing a patio is "satisfying enough in its own right, but combined with the feeling of power flowing through your hands, simulated by your controller's rumble motor". FuturLab also "does away with the tool's usual cord restrictions". — [Film Stories](https://filmstories.co.uk/features/job-simulators-find-magic-in-the-mundane/)
- **Gradual change as the genre's core.** "This idea of gradual change, where the state of an environment or item evolves as a result of your actions, is where the true gratification from the job simulation genre truly lies." Also: "Taking a known, relatable practice and engaging in it entirely at your own pace … reduce[s] life's complexities down to a single task, that in a job simulator you have total control over." — [Film Stories](https://filmstories.co.uk/features/job-simulators-find-magic-in-the-mundane/)
- **Psychology (self-determination theory: competence and autonomy).** Job games "remove the worst of the uncertainty, helplessness, ambiguity, and consequences for failure that come with those real world jobs … They give players clear goals, unambiguous feedback, winnable challenges, and predictable rewards." Simulator fans most often cite "verisimilitude and relaxation" and the absence of "any real failstates". — Jamie Madigan, [Psychology of Games](https://www.psychologyofgames.com/2017/08/why-do-people-play-jobs/)
- **House Flipper's granular transformation.** It "feels amazing—especially because it happens on such a granular scale". — Kotaku via [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper). An HF veteran's main complaint about HF2: "can't see what I even did, which was half the fun and satisfaction." — [Steam review](https://steamcommunity.com/profiles/76561198025287309/recommended/1190970/)
- **Car Mechanic Simulator's hidden finds.** Its hook includes a hidden-value reveal: barn cars where "Some of them might have hidden gems – if you can find them". — [Steam store](https://store.steampowered.com/app/1190000/Car_Mechanic_Simulator_2021/)
- **Money as direct feedback.** In Supermarket Simulator the checkout grind is tolerable because "every penny (or cent) is going into your pocket." — [GameSpew](https://www.gamespew.com/2025/11/supermarket-simulator-review/)
- **The reveal loop at its purest.** In TCG Card Shop, 76% of owners opened 100+ packs and 41% opened 1,000+. — [Steam achievements](https://steamcommunity.com/stats/3070070/achievements/). One player: "almost 50 hours in 3 days opening boxes of cards". — [Steam review](https://steamcommunity.com/profiles/76561198029693287/recommended/3070070/)
- **Naming the verb sells the game.** "much of the game's success comes from the core game mechanic being so clearly implied by the game's name". — Chequer, [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)

### Inferences
- **For Dockside's tile-by-tile scraping,** the PWS recipe transfers almost one to one:
  - Split each container into named sub-parts (door, panel, corner cast, crate) that each complete with a distinct sound.
  - Make the next almost-finished part visible, so the player anticipates the ding.
  - Maximise contrast between rust/paint and the revealed surface.
  - Give "something still here" particles.
  - Provide a highlight-remaining button so the last 1% never becomes a pixel hunt.
- **Realism belongs in the tool feel, not the content.** PWS's 8/10 for how you clean and 4/10 for what you clean fits Dockside: scraping should feel physical, while the contents can be playful.
- **Fiddly physics is anti-satisfying.** Cooking Simulator and HF2's assembly or furniture mechanics drew "chore" complaints. Dockside should not add physics between the input and the reveal.

### Gaps
- No published audio or haptics specification (frequencies, timing of the ding) from FuturLab.
- No controlled study of why power washing specifically is satisfying, beyond developer and journalist explanations and general self-determination-theory writing.

---

## 3. How do they avoid (or fail to avoid) repetition? Where is the "I'm done" point?

### Takeaway
Variety comes from what you work on, not from the verb. PWS made every job a new shape; CMS changes cars and parts; TCG changes pack tiers. Tools, tougher dirt and new venues are spaced out to refresh the same action. The "I'm done" point arrives when one of four things happens:
- Rewards stop (CMS21 after levels 20–30; HF1 after all houses are done).
- Money stops mattering (CMS21 "level 20 and 100K").
- The last 1% turns into hunting (PWS fences, Crime Scene Cleaner's small items).
- A mastered manual chore cannot be delegated (Supermarket ordering, TCG pack-ripping by the thousand).

For finite games, the funnel shows about 20% finishing (PWS) and as little as 1.5–2% (House Flipper, Cooking Simulator).

### Cited Findings
- **Variety through objects.** "As the cleaning process itself would remain quite uniform throughout the experience, it was essential that variety was provided through what was being cleaned, so the fundamental rule for the levels was that each one needed to feature something unique in terms of its shape and form." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Over-the-top targets.** "The things that you get to clean became the focus for where the variety was going to be, so we made sure that the jobs went beyond what you would realistically expect to power-wash in real life" (e.g. a Mars rover). — Chequer, [Film Stories](https://filmstories.co.uk/features/job-simulators-find-magic-in-the-mundane/)
- **Escalating dirt.** Tougher dirt hidden under easy dirt forces upgrades. The vintage car introduced rust, "and this tougher dirt variant informed the level's position in the career campaign." — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **Player-found variety.** During early access many players preferred "'parkouring' around the levels", so FuturLab added parkour routes. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
- **PWS2's new variety levers:** multi-stage reveals (exterior, then interior), the home base hub, furniture decoration and licensed DLC. — [Wikipedia, PWS2](https://en.wikipedia.org/wiki/PowerWash_Simulator_2). Some players found the new tools pointless because one nozzle still dominates the endgame. — [Steam review](https://steamcommunity.com/profiles/76561197967678796/recommended/2968420/)
- **PowerWash Simulator "done" points:**
  - 19.5% complete the career. — [achievements](https://steamcommunity.com/stats/1290000/achievements/)
  - Fences, the long final level and pixel hunting are the main complaints. — [Steam review](https://steamcommunity.com/profiles/76561198035503422/recommended/1290000/), [Steam review](https://steamcommunity.com/profiles/76561198074041282/recommended/1290000/)
  - FuturLab names each element so that in the end-game hunt the player "can deduce their location". — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
  - There is also a highlight-remaining-dirt button. — [Wikipedia](https://en.wikipedia.org/wiki/PowerWash_Simulator)
- **Car Mechanic Simulator 2021 "done" points (Steam forums):**
  - "I dont see a point past level 13, by then you can buy junk cars and renovate them for massive profits … THen it's just rinse and repeat." Another player at level 103 says, "if it wasn't for modder's adding new car I would have stopped a long time ago." — [Steam discussion](https://steamcommunity.com/app/1190000/discussions/0/3039354546886972322)
  - "When you reached level 20 and have more than 100K money you can remove the game from your computer because nothing more to do". — [Steam discussion](https://steamcommunity.com/app/1190000/discussions/0/5503948370881709179)
  - "they don't give you anything after like level 30 something anyway". — [Steam discussion](https://steamcommunity.com/app/1190000/discussions/0/3037104113135801622)
  - Expert mode's 2x XP lets players "rocket to level 50 and lots of cash with no real risk of any failure". — [Steam discussion](https://steamcommunity.com/app/1190000/discussions/0/3037104113120401641)
  - Funnel: 25.5% reach level 20; 5.9% reach level 50. — [achievements](https://steamcommunity.com/stats/1190000/achievements/)
- **CMS21 minigames added to break repetition backfired:** "fun at first but they become tedious quickly, an option to disable them would be nice". — [Steam review](https://steamcommunity.com/profiles/76561197992857150/recommended/1190000/)
- **House Flipper "done" point:** "you will grow bored with after you've done up all the houses" (59h). — [Steam review](https://steamcommunity.com/profiles/76561198060315806/recommended/613100/). Only 8.5% sell 10 houses. — [achievements](https://steamcommunity.com/stats/613100/achievements/). Critics questioned "long-term playability". — [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper)
- **House Flipper 2 lost the upgrade curve:** the best scraper is given at the start "with no upgrade options". — [Steam review](https://steamcommunity.com/profiles/76561197992297217/recommended/1190970/). Sandbox suits self-directed players, but "can feel overwhelming for players used to being given goals". — [Wikipedia, HF2](https://en.wikipedia.org/wiki/House_Flipper_2)
- **Cooking Simulator:** "it just gets painfully boring near the 10th hour". — [Steam review](https://steamcommunity.com/profiles/76561198044849755/recommended/641320/). Only 1.9% finish 7 work days. — [achievements](https://steamcommunity.com/stats/641320/achievements/)
- **Crime Scene Cleaner:** the publisher reports a median playtime of 11h37m. — [Game World Observer](https://gameworldobserver.com/2024/10/14/crime-scene-cleaner-revenue-5-4-million-sales). The final levels are "a tedious waste of 1-2 hours each" with "hide and seek with small items". — [Steam review](https://steamcommunity.com/profiles/76561198064336743/recommended/1040200/)
- **Supermarket Simulator:** "very tedious about 10 hours in" (61h). — [Steam review](https://steamcommunity.com/profiles/76561198044516494/recommended/2670630/)
- **TCG Card Shop:** "insanely boring after opening thousands of booster packs" (16h). — [Steam review](https://steamcommunity.com/profiles/76561197999029630/recommended/3070070/). The funnel falls from 41% at 1,000 packs to 11% at 10,000. — [achievements](https://steamcommunity.com/stats/3070070/achievements/)
- **Who stays long.** Long-term PWS players treat it as background play: "I did it while finishing half a season of anime on my other monitor" on a ~2h achievement run. — [Steam discussion](https://steamcommunity.com/app/1290000/discussions/0/4700161534026742855)

### Inferences
- **Typical quit window: 10–30 hours.** The repetition wall in premium hands-on sims sits there (Cooking ~10h, Supermarket ~10h, CSC ~12h median, CMS21 levels 13–30, PWS mid-career). A $15–25 game that delivers 10–20 great hours is reviewed well even if few finish it.
- **The deadliest moment is when the economy stops pushing.** CMS21's "level 20 + 100K" is when money no longer buys anything new. Dockside's prestige and upgrades should keep a meaningful purchase in view. This is already in the project's "no dead zones" rule.
- **The last 1% needs a tool.** PWS (highlight button, element names) and CSC (no equivalent, and complaints) show the end-of-job hunt is the main source of frustration. Dockside should auto-complete or highlight the last tiles.
- **Thousands of reveals get boring unless the reveal changes.** TCG's falloff after about 1,000 packs suggests repeated reveals need escalation: new container classes, rarer outcomes, collection goals, and eventually delegation.

### Gaps
- No developer telemetry on retention curves or day-7 or day-30 retention was published for any of these games.
- Achievement percentages count all owners, so they cannot separate "never started" from "quit later".

---

## 4. How do they mix hands-on labour with management/automation?

### Takeaway
The best-loved pattern is hands-on first, then automate the boring part and keep the satisfying part manual. The trouble comes from both directions:
- **Delegation missing:** players hate that ordering (Supermarket), cleaning (Supermarket) and pack-ripping at scale (TCG) cannot be handed off.
- **Labour forced:** players hate mandatory minigames (CMS21) and fiddly physics (Cooking Simulator).

PWS avoids the issue by having no automation at all. Its management layer is only "spend money on better tools", which works for a finite game of about 30 hours.

### Cited Findings
- **PWS's thin management layer.** You "manage a power washing business" but the only economy is earning money per job to buy upgrades and cosmetics. — [Wikipedia](https://en.wikipedia.org/wiki/PowerWash_Simulator). FuturLab even removed a soap cost that made players waste funds. — [Kotaku](https://kotaku.com/powerwash-sim-devs-on-making-cleaning-fun-advanced-cro-1847319502). PWS2 made soap unlimited, which IGN praised. — [Wikipedia, PWS2](https://en.wikipedia.org/wiki/PowerWash_Simulator_2)
- **House Flipper's two layers.** A labour layer (client jobs paid by quality and size) and a trading layer (buying houses and selling to bidding buyers with different needs). — [Wikipedia](https://en.wikipedia.org/wiki/House_Flipper). HF2's assembly mode lets players trade labour for money: building furniture by hand "rewards them with discounts". — [Wikipedia, HF2](https://en.wikipedia.org/wiki/House_Flipper_2)
- **CMS21 layers labour on top of trading.** Orders sit alongside auction, barn and junkyard cars that you restore and flip. Players found car flipping dominant from level 13, which made orders pointless. — [Steam store](https://store.steampowered.com/app/1190000/Car_Mechanic_Simulator_2021/), [Steam discussion](https://steamcommunity.com/app/1190000/discussions/0/3039354546886972322)
- **Supermarket Simulator's partial automation:**
  - "Your restockers will fill the shelves, but they'll never order products on your behalf … there's no way to completely automate stock ordering." — [GameSpew](https://www.gamespew.com/2025/11/supermarket-simulator-review/)
  - 87.9% of owners did 100 checkouts by hand, but only 9.7% hired 4 restockers and 3.0% hired 4 cashiers. — [achievements](https://steamcommunity.com/stats/2670630/achievements/)
  - 20% of the most-helpful negative reviews mention staff or automation. — [Steam review API sample](https://store.steampowered.com/appreviews/2670630?json=1&language=english&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100)
  - One review: cleaning was added "without even the option to hire an employee to do it for you". — [Steam review](https://steamcommunity.com/profiles/76561198849003521/recommended/2670630/)
  - A positive reviewer asks for "Cashier gets faster as your store level goes up". — [Steam review](https://steamcommunity.com/profiles/76561198054656434/recommended/2670630/)
- **TCG Card Shop's progression.** Hiring workers is a common progression step (65.9% hire 1 worker, 21.7% hire 4), yet 32.7% still manually check out 1,000 customers. — [achievements](https://steamcommunity.com/stats/3070070/achievements/). Players want the reveal itself delegated once it gets old: "Let me hire someone to rip open packs and sell cards, I'll ring people [up]". — [Steam review](https://steamcommunity.com/profiles/76561197999029630/recommended/3070070/)
- **Cooking Simulator's partial-automation wish:** "a perk that eventually lets you cut things into even parts … automatically? … I don't want to take away all the feeling of getting in there with your hands". — [Steam review](https://steamcommunity.com/profiles/76561198034372590/recommended/641320/). The sequel added an "intelligent, automated shopping list" that suggests ingredient needs. — [Games Press](https://www.gamespress.com/Sequel-to-the-cult-game-is-coming-soon-Cooking-Simulator-2-Prologue-to)
- **CMS21 mandatory minigames:** "an option to disable them would be nice". — [Steam review](https://steamcommunity.com/profiles/76561197992857150/recommended/1190000/)
- **Growth is the payoff.** In Supermarket Simulator "It's seriously satisfying to see your store go from strength to strength". — [GameSpew](https://www.gamespew.com/2025/11/supermarket-simulator-review/). Film Stories argues "the true job sim aspect comes from watching your business build and grow over time". — [Film Stories](https://filmstories.co.uk/features/job-simulators-find-magic-in-the-mundane/)

### Inferences
- **For Dockside:**
  - Keep the reveal (scraping and opening) hands-on for as long as it is fresh.
  - Let players buy automation for the logistics around it: hauling, selling commons, sorting.
  - Later, offer optional auto-scrape for low-tier containers, so manual play stays focused on high-value boxes.
  - This mirrors what TCG and Supermarket players explicitly ask for.
- **Automation should be a purchase the player chooses, not a feature that is missing.** Supermarket Simulator's low hiring rates alongside complaints suggest staff are underpowered or poorly explained, not unwanted.
- **Avoid the CMS21 trap,** where a trading shortcut (junk-car flipping) makes the hand-labour loop economically pointless. Manual scraping should keep a value edge, such as finding hidden items an auto-scrape misses. Per Dockside's rules, any such edge must come from real, published odds.

### Gaps
- No developer interviews found on Nokta's or OPNeon's reasoning for what they left un-automated.
- No data on how hiring affects session length or retention.

---

## 5. How much content (levels, jobs) did they need, and how was it structured?

### Takeaway
There are two working models:
- **Hand-made finite campaigns:** PWS has 38 career jobs (about 33h by HLTB), then years of free bonus jobs and licensed DLC. PWS2 also has 38. Crime Scene Cleaner has roughly a dozen-plus story missions (about 12h median) on a ~$356K budget.
- **Systemic or procedural loops:** CMS21 has 72+ cars, 4,000+ parts and "infinitely generated" orders. Supermarket and TCG are open-ended shops. These get longer tails but more "repetitive" complaints.

Most franchises then live on DLC (HF1 Garden Flipper sold 570K on PC) and on mods or Workshop content (HF1 has 50K+ items; CMS players credit modded cars).

### Cited Findings
- **PowerWash Simulator:**
  - 38 career jobs plus bonus jobs; 2-player co-op career; 6-player free play; a challenge mode with limited water or time. — [Wikipedia](https://en.wikipedia.org/wiki/PowerWash_Simulator)
  - "a list of levels was formed along with their intended progression order, and that list remained remarkably stable throughout the game's entire early access development cycle". — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
  - Built for traversal: "all levels were to be accessed vertically with the use of navigational equipment: a stool, a ladder, and scaffolding", with sizes set relative to those tools. — [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
  - Early access began 19 May 2021 and 1.0 shipped 14 Jul 2022 (about 14 months in EA), with an itch.io prototype first. — [Wikipedia](https://en.wikipedia.org/wiki/PowerWash_Simulator), [80.lv](https://80.lv/articles/level-design-of-powerwash-simulator)
  - 15 DLCs on Steam. — [Steam app details](https://store.steampowered.com/api/appdetails?appids=1290000). Licensed packs include Tomb Raider (Croft Manor) and Final Fantasy VII (Midgar). — [FuturLab](https://www.futurlab.co.uk/news/world-intellectual-property-day-how-did-powerwash-simulator-come-to-be)
- **PowerWash Simulator 2:** 38 base jobs, multi-stage jobs, free bonus jobs and paid licensed DLC through 2026. — [Wikipedia, PWS2](https://en.wikipedia.org/wiki/PowerWash_Simulator_2). Players complain of "way less content" than PWS1 with its DLC. — [Steam review](https://steamcommunity.com/profiles/76561198147606104/recommended/2968420/)
- **House Flipper:**
  - Content grew mostly through DLC (Garden Flipper, HGTV, Luxury and others) and the Workshop.
  - 8 DLC launches in 8 years; 50,000+ Workshop items. — [Games Press](https://www.gamespress.com/Steam-players-get-a-chance-to-grab-House-Flipper-for-free-and-join-the)
  - DLC sales on PC: Garden Flipper 570K, HGTV 340K. — [Gamepressure](https://www.gamepressure.com/newsroom/house-flipper-reports-exceptional-sales-figures/za32a4)
  - In-game House Flipper 2 promotion brought in "a couple of thousand [HF2] wishlists" a day. — [GameDiscoverCo](https://newsletter.gamediscover.co/p/house-flipper-2-how-the-sequel-cleaned)
- **House Flipper 2:** story mode, sandbox and multiple regions (Pinnacove Suburbs, Coralroot Forest, Crayfish Coast) per achievement names, plus licensed DLC (Scooby-Doo) and themed DLC (Sakura, Pets). — [achievements](https://steamcommunity.com/stats/1190970/achievements/), [Games Press](https://www.gamespress.com/House-Flipper-2-1-million-copies-sold-on-Steam-a-brand-new-Japanese-DL)
- **Car Mechanic Simulator 2021:**
  - 72+ cars, 4,000+ parts, infinitely generated orders and story missions. — [Steam store](https://store.steampowered.com/app/1190000/Car_Mechanic_Simulator_2021/)
  - 21 DLCs on Steam. — [Steam app details](https://store.steampowered.com/api/appdetails?appids=1190000)
  - Prior entry CMS 2018: median owner estimate 2.63M and $8.7M net (GameDiscoverCo estimate). — [GameDiscoverCo](https://newsletter.gamediscover.co/p/data-dive-inside-a-successful-sequel)
  - CMS 2026 is listed at 150+ cars and 8,000+ parts (search snippet, unverified). — [Steam](https://store.steampowered.com/app/2692660/Car_Mechanic_Simulator_2026/)
- **Cooking Simulator:** 80+ recipes, 140+ ingredients and many modes (Career, Sandbox, Cooking School, Pizza, Cakes and Cookies, Shelter, challenges). — [Wikipedia](https://en.wikipedia.org/wiki/Cooking_Simulator). 302 achievements. — [achievements](https://steamcommunity.com/stats/641320/achievements/)
- **Crime Scene Cleaner:** mission-based story with nightmare-mode variants of missions, skill trees and collectibles (cassettes), on a PLN 1.4M (~$356K) budget. — [achievements](https://steamcommunity.com/stats/1040200/achievements/), [Game World Observer](https://gameworldobserver.com/2024/10/14/crime-scene-cleaner-revenue-5-4-million-sales). Players: "feels pretty short". — [Steam review](https://steamcommunity.com/profiles/76561198083702174/recommended/1040200/)
- **PlayWay's model behind CMS, Cooking Simulator, Crime Scene Cleaner and House Flipper:**
  - It is "centered on quickly creating a bunch of Steam pages for half-baked game concepts", and has 29 games in the top 1,000 wishlisted.
  - The demand categories it identified include "Building and Vehicle rehab simulators".
  - — [How To Market A Game](https://howtomarketagame.com/2023/12/22/what-i-respect-about-playway/)
- **Pricing.** HF2's $40 price was justified by replayability and sandbox, and the Chinese price was cut from ¥182 to ¥136 to lift sales. — [GameDiscoverCo](https://newsletter.gamediscover.co/p/house-flipper-2-how-the-sequel-cleaned)

### Inferences
- **About 35–40 hand-made jobs** seems to be the proven size for a "satisfying" finite campaign of roughly 30h at $25: PWS and PWS2 both used 38. Each job needs a unique silhouette, a new dirt or tool twist every few jobs, and a stable progression list decided early.
- **Systemic content scales cheaper but tires sooner.** CMS21 and TCG last longer but collect more "rinse and repeat" complaints. Dockside's containers are systemic (procedural contents from published odds), so it needs PWS-style variety in the container itself (type, origin, damage, layers) plus collection goals to break the loop.
- **Licensed or themed DLC packs of a few jobs are the long-tail engine** for PWS and HF. Paid DLC is also the top complaint category in several of these games (PWS 52%, HF1 69%, Supermarket 48% of most-helpful negatives). This fits Dockside's buy-once stance: free content updates avoid that backlash.

### Gaps
- No exact mission count for Crime Scene Cleaner (achievements suggest about 12–15 base missions; not confirmed).
- No public development cost for PWS, CMS21 or the TCG and Supermarket games. HF2 (~$2M) and Crime Scene Cleaner (~$356K) are the only disclosed budgets found.
- No breakdown of how much of PWS's 17M players came from Game Pass versus sales.
