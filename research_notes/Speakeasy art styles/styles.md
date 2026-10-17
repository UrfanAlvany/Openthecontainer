# Speakeasy art styles: picture board and options

Research date: 17 Oct 2026. For: Urfan (Director). Goal: pick the art style by eye.

**Open these first:**
- `board.jpg`: all four styles, one strip each.
- `style_A.jpg` … `style_D.jpg`: one contact sheet per style. Each image is numbered and captioned, and the source list is at the bottom.
- `images/`: every source image at full size. The index is at the end of this file.

All prices are list prices on the product pages on 17 Oct 2026, in USD, before VAT. "Verified" means I read it on the source page. **[unverified]** means a lead or my own judgement.

---

## TL;DR

1. **The sims that look "better" than Synty did not use better store characters.** They used semi-realistic proportions, photo-based (PBR) textures and warm, heavy lighting and post-processing.
   - The Unity store sims (Supermarket Simulator, TCG Card Shop Simulator, probably Internet Cafe Simulator 2) bought Asset Store characters and props. The TCG developer says so in writing.
   - The better-looking period sims (Saloon Simulator, Drug Dealer Simulator 2, Gas Station Simulator) are Unreal games with in-house 3D artists.
   - None of these games credits Daz, Rocketbox, UMA or Sidekick. Character Creator is documented in one sim, Police Simulator: Patrol Officers.
2. **Four styles:**
   - **A:** Synty POLYGON blocky.
   - **B:** premium stylised (smooth stylised, like Schedule I or Empire of Sin).
   - **C:** semi-realistic (ICS2, Supermarket Simulator or Saloon Simulator level).
   - **D:** realistic (Mafia or DDS2 level).
3. **Recommendation: style C.** Build the period cast from one seller (Paul N.: Humanoid rig, URP, Unity 6, $25–29 per pack). Use dark-wood PBR bar interiors, and spend real effort on URP lighting and post-processing. Starter budget: **about $280**, plus about $54 to test one 1920s woman.
   - Keep Character Creator 5 as the upgrade path for hero characters and women. It needs a Windows PC, and the licence must be confirmed in writing first.
   - Don't try D with a tiny team.
   - Choose B only if you prefer its look, because it means commissioning 1920s outfits.
4. **Before buying the whole kit, do a ~$78 look test.** Buy Gentleman Modular, Old Private Casino and Irish Pub. Build one bar corner in Unity 6.3 URP and put screenshots next to a Synty version of the same corner. Then decide by eye, in-engine, not from store renders.

---

## 1. How the reference games got their look

| Game | Engine | Characters | Environments | Confidence |
|---|---|---|---|---|
| Internet Cafe Simulator 2 (Cheesecake Dev) | Unity (strong indication: Unity save path in a dev post) | **Unknown.** Two low-vote reviews call it a "unity asset flip" but name no pack | Unknown | Low |
| Supermarket Simulator (Nokta Games) | Unity (strong indication) | Store assets, but **which pack is not verified**. Changelogs: "Added new customer and NPC models". The suited men look like Microsoft Rocketbox business males **[unverified, visual only]** | Asset Store props shared with clones. Reviews: "Uses the exact same Unity Asset Store pack as a dozen other games". The dev admitted AI art and promised to replace it (May 2025) | Medium for store assets, low for which pack |
| TCG Card Shop Simulator (OPNeon, solo dev) | Unity (verified) | **Asset Store customer models, verified.** The dev wrote: "I am using assets from unity assetstore for stuff like the packaging box, shelves, buildings and customer models". Players complain the NPCs feel "uncanny valley" | Asset Store; card art commissioned | High |
| Schedule I (TVGS) | Unity | **Custom stylised avatar system** with an in-game character creator. TVGS hired a technical artist in 2026 and is doing a consistency pass on the art. Origin of the base meshes unknown | Custom stylised | Medium-high |
| Drug Dealer Simulator 2 (Byterunners) | Unreal Engine 5 (dev FAQ) | In-house 3D artists ("Meet the devs" posts). Players allege Unreal marketplace NPCs **[unverified]**. Criticised for static NPCs that "loop one animation" | Realistic UE5 | Medium |
| Gas Station Simulator (DRAGO) | Unreal Engine 4 (PCGamingWiki) | All NPCs replaced in the April 2025 "New Pretty Characters Update". Source not stated | Realistic | Medium (engine); character source unknown |
| Saloon Simulator (Glivi Games) | Unreal (crash logs) | **Custom, by in-house 3D artists (verified):** customers, staff and mix-and-match outfits. "Right now, we have only male customers" (2024). Reviews criticise faces, lip-sync and animation | Custom | High |
| Speakeasy Simulator (Arcana Games, our closest competitor) | Probably UE5 **[unverified]** | Unknown; female NPCs added only in patch 1.3.0, two months after launch | Unknown | Low |
| Mafia: Definitive Edition (Hangar 13) | Proprietary Fusion engine | Custom AAA: actor likenesses, voice and motion capture | Custom | High |
| Empire of Sin (Romero Games) | Unity (PCGamingWiki) | Custom stylised | Custom | Medium |
| The Sinking City (Frogwares) | Unreal Engine 4 | Custom | Procedural city from period-architecture assets | Medium |
| Police Simulator: Patrol Officers (Aesir) | Unreal Engine 4 | **Reallusion Character Creator + Headshot + SkinGen, with marketplace outfits as modular parts randomised at runtime** (Reallusion's own interview with the devs) | – | High (vendor showcase) |

**Pattern:**
- **Unity store sims sell on the gameplay loop with store kits.** They are realistic enough, but players notice reuse ("asset flip"), AI art and dead-eyed NPCs.
- **The best-looking period sims use their own artists on top of base bodies, and still get criticised for faces, lip-sync and looping idles.** Character fidelity costs a lot and pays back little in reviews.
- **Women and period clothing come late even for funded teams.** Saloon Simulator started with male customers only, and Speakeasy Simulator shipped women two months after launch. We must plan 1920s women from day one.
- **Lighting carries the "commercial" look** **[judgement]**: warm practical lights, ambient occlusion, bloom, colour grading, and dense, consistent props. Saloon Simulator and Speakeasy Simulator look rich mostly because of light and materials.
- **Character Creator is the documented route for realistic sim crowds**: modular CC heads plus marketplace outfits, randomised.

**Could not verify:**
- The exact character pack in ICS2, Supermarket Simulator and TCG Card Shop Simulator.
- Any use of Daz, Rocketbox, UMA, Mixamo or Synty Sidekick in these games.
- Reddit threads (blocked).

---

## 2. The four styles

### A. Synty POLYGON (blocky low poly) → `style_A.jpg`
- **Look:** faceted low poly, flat palette colours, dot-like faces. This is the "lego guys" look you rejected. Example game: Cafe Life Simulator (EA 2027); whether it uses Synty is **[unverified]**.
- **Products:** see the earlier notes, `../Speakeasy competition/art_packs.md`.
  - Interior: POLYGON Nightclubs **$25** (75% off $99.99) and Horror Mansion **$25**.
  - Characters: Western $24.89, Gang Warfare $24.99, Heist $29.99. Casino ($149.99) has the best formal cast.
  - Street: City $20.
  - All Synty characters use the Humanoid rig, and the packs support URP.
- **Starter budget:** about $150 (or about $255 with the gangster and idle-animation packs).
- **Licence:** Asset Store EULA, or Synty's perpetual licence if bought on their store. Avoid SyntyPass: after you cancel, you can't use the assets in new projects.
- **Risks:**
  - Technical risk is low, and this is the cheapest and most complete kit.
  - But the look is the most common on Steam, it reads as "cheap indie", and you have already said no.
- **Verdict:** keep only for greyboxing.

### B. Premium stylised (smooth, hand-crafted look) → `style_B.jpg`
- **Look:** smooth stylised shapes, painted or toon-PBR materials, expressive faces. This is a look of its own rather than a cheaper version of realism. It ages well, and the uncanny valley isn't a risk.
- **Example games:** Schedule I (custom avatar system, Unity), Empire of Sin (custom, Unity, 1920s Chicago).
- **Characters:**
  - **No stylised character system covers the 1920s.** None of these has fedoras, pinstripes, flapper dresses or cloche hats.
  - Synty **Sidekick Modern Civilians** ($199.99): Humanoid, ARKit face blendshapes, URP. Modern clothes only; Fortnite-like.
  - **BoZo** Base + Professions ($40 + $40): 5.0 rating from 33 reviews, URP. Modern.
  - **Stephanie Maslen** Ultimate Stylized Business Men and Women ($30 each). Waistcoats and bow ties, no hats; Sims-like.
  - **Mafioso** (Dary Palasky, $35): 3 gangsters with Tommy guns, from 2021. URP support **[unverified]**.
- **Interiors and props:**
  - **Lowpoly Art Deco Interior** (Evgenia, $25, URP package): the best period match.
  - Stylized Cafe (StylArts, $39.99).
  - Stylized Victorian Mansion (JustCreate, $49.99; pipeline **[unverified]**).
  - Stylized Downtown Street ($20).
  - Bartender Animation Pack ($18.99).
- **Starter budget:** about $250–320 in assets, **plus commissioned 1920s outfits.** I couldn't get a price for those; a freelance stylised outfit set is maybe several hundred dollars each **[unverified estimate]**.
- **Licence:** standard Asset Store EULA on every item checked.
- **Risks:**
  - Packs from different publishers don't match: different proportions, faces and shaders.
  - We would have to commission or kitbash 1920s outfits.
  - The look depends on a strong art direction (Schedule I and Empire of Sin both have their own artists).
  - Technical risk is medium; art-direction risk is high.

### C. Semi-realistic (ICS2, Supermarket Simulator, Saloon Simulator level) → `style_C.jpg`
- **Look:** real proportions and photo-based textures, with game-level faces and simple animation. It reads as "a real commercial sim" at a normal play distance. Close up, faces are the weak point, as in TCG and Supermarket Simulator.
- **Example games:** Supermarket Simulator, TCG Card Shop Simulator, ICS2 (Unity); Saloon Simulator, Moonshiner Simulator, Speakeasy Simulator.
- **Characters (verified on the product pages):**

| Product | Price | What you get | Tech |
|---|---|---|---|
| [Gentleman Modular](https://assetstore.unity.com/packages/3d/characters/gentleman-modular-306716) (Paul N.) | $29 | Edwardian suits, bowler hats, flat caps. The seller pitches it as a "Great Depression gangster". **Best match for 1920s men** | Humanoid; Built-in/URP/HDRP; Unity 6000.0; 29k triangles, 4K textures; walk + 2 idles. No reviews |
| Victorian Working Class Men (Paul N.) | $29 | Workers and gang members | Unity 6000.0, modular |
| [Victorian Working Class Women](https://assetstore.unity.com/packages/3d/characters/humanoids/humans/victorian-working-class-women-359266) (Paul N.) | $24.99 | Long dresses and aprons: kitchen and cellar staff, **not flappers** | Humanoid; URP included; Unity 6000.0 |
| Old Gangster (Maksim Bugrimov) | $39.99 | Overcoat, fedora, Tommy gun | Humanoid, all pipelines; 133k triangles, so hero characters only |
| UMA | free | Runtime modular humans for crowd variety | URP; Asset Store EULA. Its only period wardrobe is a weak Victorian add-on |

- **Interiors and props:**
  - [Old Private Casino](https://assetstore.unity.com/packages/3d/environments/old-private-casino-modular-309395) ($19, **URP, Unity 6**): a green-and-red back room with a bar. **The best speakeasy match.**
  - Irish Pub Pack ($29.99, Built-in): dark wood bar.
  - Victorian Interior ($4.99, 5/5 from 69 ratings).
  - 1930s Office Pack ($38.89).
  - Modular 1920s Buildings ($4.99, all pipelines).
  - Monte Carlo Style Casino ($29.99).
  - New York City 1940s ($89.99, URP).
- **Animations:** Mixamo (free), Vendors and Customers ($39.99: bar-stool drinking), Bartender ($18.99), Charleston Solo Dances ($69.99).
- **Starter budget, about $280:**
  - Characters about $123: Gentleman, Working Class Men and Women, Old Gangster.
  - Interiors about $98: Casino, Pub, Victorian Interior, 1930s Office, 1920s Buildings.
  - Animations about $59.
  - Add about $54 to test one 1920s woman (Evin 3D Mafia Girl, see D).
  - **Gaps:** 1920s women (flapper and cloche outfits), 1920s police, waiters, and realistic 1920s cars (not researched).
- **Licence:** Asset Store EULA (commercial games OK).
- **Risks:**
  - Faces close up: TCG players called its NPCs uncanny.
  - Packs from different sellers won't match, so buy the core cast from one seller.
  - Built-in-only packs need Unity's Render Pipeline Converter. Custom shaders may not convert.
  - Each 29k-triangle character with 4K textures needs simpler LOD versions for crowds.
  - Players may see it as an "asset flip" if we use the same packs as everyone else. The cure is our own lighting, props and recolours.
  - Overall risk: medium.

### D. Realistic (Mafia, Drug Dealer Simulator 2 level) → `style_D.jpg`
- **Look:** scanned-looking faces, detailed skin, hair and cloth, cinematic light. It makes the best screenshots, and it is the style players criticise most once the faces move.
- **Example games:** Mafia: Definitive Edition, Mafia: The Old Country (AAA), Drug Dealer Simulator 2 (UE5), Police Simulator (Character Creator), The Sinking City.
- **Store-bought characters:**
  - **Evin 3D Store Studio** (Asset Store): 11 period characters at **$54 each ($594 for all 11)**, including Al Capone, Mafia Boss 1–4, Mafia Girl 1–4 (incl. Bonnie Parker), a worker and a police officer.
    - Correct pinstripes and fedoras; 12–29k vertices, 4K textures, 10–11 animations each.
    - **Built-in pipeline only, built on Unity 2022.1, no reviews.**
    - The same set is on Fab as FBX under the Standard licence.
- **Character Creator 5 (Reallusion):**
  - Price: **$299 Standard / $479 Deluxe** (verified); Headshot 3 is $199.
  - Unity link: free CC/iC Unity Tools, for Unity 2022.3–6000.5 and all render pipelines.
  - **Windows 10/11 only, needs an 8 GB graphics card and is online-only. Urfan's machine is a Mac.**
  - 1920s outfit packs on the Reallusion store: **[unverified]**.
- **Daz Studio** (free) + Genesis 8/9:
  - The best 1920s wardrobe of any source: Mobster Outfit, Underbelly Gangster Bundle, 1920s Evening Gown, Flapper Dress, Speakeasy Hair, Waiter, Police, Bonnie 8.1 Roaring Twenties.
  - **Each item needs a $50 Interactive (game) licence on top of its ~$26 price** (verified on two items). Some items offer no game licence and so can't be used.
  - The Daz to Unity bridge has had no stable release since Aug 2023.
- **MetaHuman:** free under $1M yearly revenue, and the licence now allows other engines (per a fork's quote; I could not reload the page). But the face rig and hair don't carry over to Unity cleanly. **Highest effort.**
- **Microsoft Rocketbox** (MIT, free): 115 characters, but modern clothes only, and the project has been archived since 2022.
- **Starter budget:**
  - Store route: **about $430–750** (5 to 11 Evin 3D characters plus the C interiors and animations).
  - Character Creator route: $300–700+ for software, plus a Windows PC, plus outfits.
  - Daz route: about $75 per outfit with the game licence.
- **Licences:** see section 3.
- **Risks (high):**
  - Uncanny valley without facial animation, blinking and lip-sync, which Mixamo doesn't provide.
  - One seller with zero reviews for the whole period cast.
  - Built-in-only packs to convert to URP.
  - Heavy meshes for crowds.
  - Hair and cloth quality in URP.
  - Hours per NPC variant for a tiny team.

---

## 3. Licence notes (commercial Steam game)

- **Unity Asset Store:** the Standard EULA allows use in commercial games. Product pages show "Extension Asset" even on art packs, which seems to be a site quirk **[unverified reading]**; the licence is per seat either way. Every item above was the standard EULA, with no custom licences.
- **Synty Store:** perpetual standard licence. **SyntyPass:** don't use it (you lose rights in new projects after cancelling).
- **Reallusion** ([policy](https://www.reallusion.com/license/content.html)): the page contradicts itself, so get written confirmation before buying.
  - The 1 Aug 2025 update says the Standard licence "now grants you full rights to: Export content to any external software or game engine; Reuse purchased assets across unlimited characters and projects … game titles".
  - The FAQ on the same page still says: "Extended Licenses are required for CC Components such as ccAvatar, ccProject, ccSlider, ccHair, ccCloth … if they are used on characters in games".
  - The cheaper iContent licence (30% of the price) never allows export.
  - **Budget the Extended price as the worst case** for any clothing or hair used on many NPCs.
- **Daz:** "An Interactive License is required when using or distributing 3D content from the Daz 3D store … in video games" ([source](https://www.daz3d.com/interactive-license-info)). The licence is $50 per item on the two items checked, it is per item and non-refundable, and items with no game licence are unusable.
- **MetaHuman:** usable in other engines with no royalties; an Unreal seat licence is needed above $1M yearly revenue ([metahuman.com/license](https://www.metahuman.com/license); quoted by a research fork, as I couldn't reload the page).
- **Rocketbox:** MIT. **UMA:** Asset Store EULA. **Renderpeople:** allows video games, but not files players can extract. **Mixamo:** royalty-free for games (not re-checked today).
- **Fab:** Standard-licence listings with FBX files can be used in Unity. Listings marked Unreal-only, or under the old marketplace licence, can't. The 1920s Fab packs found (Noir/Mafia Characters, Speakeasy Bar Jazz Syndicate, "Ultimate 1920s Mafia Speakeasy", which is also "AI-enhanced") are Unreal-only.

---

## 4. Comparison

| | A Synty blocky | B Premium stylised | C Semi-realistic | D Realistic |
|---|---|---|---|---|
| Looks like | Cheap indie / mobile | Distinct indie hit (Schedule I) | Commercial store sim (ICS2, Supermarket Sim, Saloon Sim) | AAA screenshots |
| 1920s men, off the shelf | Partial (Casino, Gang Warfare) | Almost none | **Yes** (Paul N.) | Yes (Evin 3D) |
| 1920s women, off the shelf | Partial | None | **No** (Victorian staff only) | Yes (Evin 3D Mafia Girls, Daz) |
| Starter budget | ~$150 | ~$250–320 + commissions | **~$280** (+$54 test) | ~$430–750+ |
| URP / Unity 6 | Yes | Mostly | Mostly (convert a few Built-in packs) | Evin 3D Built-in only; CC Tools OK |
| Animation demands | Low | Low-medium | Medium | High (faces, lip-sync) |
| Uncanny risk | None | None | Medium | High |
| Effort for a tiny team | Low | High (art direction) | **Medium** | Very high |

---

## 5. Recommendation

**Go with C, made consistent.** It is the look you pointed at, it has off-the-shelf 1920s men in URP and Unity 6, and it costs about $280 to start. The reference games show that light, materials and dense props sell the look more than face fidelity does.

How to keep C from looking like a cheap asset flip:
1. **One seller for the core cast** (Paul N.), so faces, proportions and shading match. Recolour suits and add hats to get variety.
2. **One lighting recipe:** warm practical lights, Adaptive Probe Volumes, SSAO, bloom and one colour grade across every scene. This hides seams between packs.
3. **Solve women early:**
   - First buy one Evin 3D Mafia Girl ($54) and test URP conversion and the look next to Paul N.
   - If it clashes, ask Paul N. about a 1920s women's pack, or use Character Creator 5 on a Windows PC once Reallusion confirms the licence in writing.
   - Daz flapper outfits ($26 + $50 each) are a fallback.
4. **Faces at a distance:** use first-person framing at bar distance, and add idle variety (blinks and look-at if the rigs allow; whether Paul N. has face blendshapes is **[unverified]**).
5. **Don't mix in Synty or stylised props.**

**Next step (one evening, ~$78):** buy Gentleman Modular ($29), Old Private Casino ($19) and Irish Pub ($29.99). Build a bar corner in Unity 6.3 URP, light it, and drop in two Paul N. men. Next to it, place the same corner built in POLYGON Nightclubs ($25, already shortlisted). Screenshot both at 1920×1080 and choose by eye.

If you prefer B after seeing the board, the plan changes: hire one stylised character artist for a modular 1920s outfit set. Do it before buying anything else, because off-the-shelf B has no period cast.

---

## 6. Could not verify
- The character packs used in ICS2, Supermarket Simulator and TCG Card Shop Simulator, and whether Supermarket Simulator uses Rocketbox (the resemblance is visual only).
- The engine of Speakeasy Simulator, and where its characters come from.
- Reallusion 1920s outfit packs and their Extended prices, and which Reallusion licence actually applies (the page contradicts itself).
- Whether Daz Studio runs on macOS today, and exact Daz polygon counts.
- Face blendshapes on Paul N. characters.
- Whether Mafioso and the Stylized Victorian Mansion support URP, and whether the Bartender pack uses a Humanoid rig.
- What commissioned stylised outfits would cost.
- Realistic 1920s car packs for style C/D (not researched).
- Fab prices in USD (Fab shows Swiss francs).

---

## 7. Sources
- **Steam store API** (screenshots and developer names): `store.steampowered.com/api/appdetails?appids=<id>`. App IDs: 1563180, 2670630, 1876930, 3070070, 3164500, 1708850, 1149620, 3883070, 1030840, 1941540, 604540, 750130, 3579280, 3907570, 4179280, 4280690, 997010.
- **TCG Card Shop Simulator:**
  - Developer post on store assets: https://steamcommunity.com/app/3070070/discussions/0/4422059016572099355/
  - Interview: https://80.lv/articles/solo-developer-on-creating-a-simulation-game-about-a-local-game-store
- **Supermarket Simulator:**
  - AI-art post: https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1799088287795384
  - Asset-reuse thread: https://steamcommunity.com/app/2670630/discussions/0/572668324079666856/
- **Schedule I** hiring post: https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1819386365124991
- **Internet Cafe Simulator 2** news (Unity save path): https://store.steampowered.com/news/app/1563180
- **Police Simulator** and Character Creator: https://magazine.reallusion.com/2022/07/06/aesir-interactive-studios-talks-about-procedural-npcs-in-police-simulator-using-character-creator/
- **Reallusion** licence: https://www.reallusion.com/license/content.html. Character Creator 5 prices: https://www.reallusion.com/character-creator/. Unity tools: https://github.com/soupday/CCiC-Unity-Tools
- **Daz** game licence: https://www.daz3d.com/interactive-license-info. Licence prices: https://www.daz3d.com/mobster-outfit-for-genesis-3-male-s, https://www.daz3d.com/dforce-1920s-evening-gown-outfit-for-genesis-8-females. Bridge: https://www.daz3d.com/daz-to-unity-bridge
- **MetaHuman** licence: https://www.metahuman.com/license. **Rocketbox:** https://github.com/microsoft/Microsoft-Rocketbox
- **Asset Store product data:** product pages plus the store's GraphQL endpoint (price, version, Unity version, description): Gentleman Modular 306716, Victorian Working Class Women 359266, Mafia Gangster Al Capone 337334, Old Private Casino 309395, POLYGON Nightclubs 216721, POLYGON Casino 252731, Sidekick Modern Civilians 339714. The other product URLs are in the sections above and in the image index below.
- **Earlier Synty research:** `../Speakeasy competition/art_packs.md`.

---

## Image index (file → source)

Files used in a contact sheet are marked with the sheet letter. Steam images: `store_item_assets/steam/apps/<appid>/…`. Crops are cut from the named full screenshot.

- `A_game_cafelife_1.jpg` [sheet A]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4280690/4912361fb168bc8094fb567250a0a98ec67611dc/ss_4912361fb168bc8094fb567250a0a98ec67611dc.1920x1080.jpg
- `A_game_cafelife_2.jpg` [sheet A]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4280690/455aa1584bf6671c52be9507b14d4e110ed8dc5c/ss_455aa1584bf6671c52be9507b14d4e110ed8dc5c.1920x1080.jpg
- `A_game_cafelife_3.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4280690/1ec6a88d8675503cc54e512a20e392fe4be7c3e8/ss_1ec6a88d8675503cc54e512a20e392fe4be7c3e8.1920x1080.jpg
- `A_synty_casino_1.jpg` [sheet A]: https://cdn.shopify.com/s/files/1/2231/6843/products/casino_Finals_047_0003.png?v=1684193658
- `A_synty_gangwarfare_1.jpg` [sheet A]: https://cdn.shopify.com/s/files/1/2231/6843/products/ScreenShot_05_df59b3b2-7e04-405f-9fde-26aa704fa712.png?v=1578114275
- `A_synty_nightclubs_1.jpg` [sheet A]: https://cdn.shopify.com/s/files/1/2231/6843/products/screenshot_009.png?v=1685508370
- `A_synty_nightclubs_2.jpg` [sheet A]: https://cdn.shopify.com/s/files/1/2231/6843/products/screenshot_003.png?v=1685508370
- `A_synty_western_1.jpg` [sheet A]: https://cdn.shopify.com/s/files/1/2231/6843/products/Screenshot_04_01f510eb-598d-41d7-9871-64259c5f4cd7.png?v=1578114328
- `B_game_empireofsin_1.jpg` [sheet B]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/604540/ss_e59176302689fc410e178f523c123c8ca87f7515.1920x1080.jpg
- `B_game_empireofsin_2.jpg` [sheet B]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/604540/ss_453746da49ef739f4b0c86b90af191f5aec7b8ed.1920x1080.jpg
- `B_game_schedule1_1.jpg` [sheet B]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3164500/ss_74961b6f52d7694b12c272c37d69551fc08a1ccb.1920x1080.jpg
- `B_game_schedule1_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3164500/cf6f4630aec1f9065da3352532e5094613b35975/ss_cf6f4630aec1f9065da3352532e5094613b35975.1920x1080.jpg
- `B_game_schedule1_3.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3164500/ss_a9b00612e3e3bbc111a6dc53a5a861d38b77c9df.1920x1080.jpg
- `B_game_schedule1_4.jpg` [sheet B]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3164500/ss_8117e70a4c107e6c464d9601fb2d98ce6d3152fa.1920x1080.jpg
- `B_pack_artdeco_interior_1.jpg` [sheet B]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/e04dabff-5828-4c23-a667-d1b007c3c3ec_scaled.jpg
- `B_pack_mafioso_1.jpg` [sheet B]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/e78848f9-44c4-4eeb-bb9f-49da11da5c44_scaled.jpg
- `B_pack_maslen_businessmen_1.jpg` [sheet B]: https://assetstorev1-prd-cdn.unity3d.com/key-image/d7f48348-4009-4532-a360-36d9ff368694.jpg
- `B_pack_sidekick_civilians_1.jpg` [sheet B]: https://cdn.shopify.com/s/files/1/2231/6843/files/SCREENSHOT_01_5de5624b-7a3d-481a-9bff-bf7f3d49f568.png?v=1761614081
- `B_pack_stylarts_cafe_1.jpg` [sheet B]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/7a409608-a366-4f5e-9197-bc6f8289cfa2_scaled.jpg
- `B_pack_victorian_mansion_1.jpg` [sheet B]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/b4d998df-045a-4908-bd06-010dfe8cc258_scaled.jpg
- `C_gasstationsim_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1149620/ss_64cdf0eefd186395b17d6f3b51a025222b49ee39.1920x1080.jpg
- `C_gasstationsim_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1149620/ss_7c72b277c7d27b11f037fffed55a21722bc123f0.1920x1080.jpg
- `C_ics2_1.jpg` [sheet C]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1563180/ss_305a761bba7752cac71abc211de6ecdcd1ba5fc3.1920x1080.jpg
- `C_ics2_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1563180/ss_3503de18df462f4b9ff998748762968b957fcb87.1920x1080.jpg
- `C_ics2_3.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1563180/ss_75ac8c8fcc30a59ff7a6bb19aec690915cb01764.1920x1080.jpg
- `C_moonshinersim_1.jpg` [sheet C]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4179280/3a967c6ab53d96319883f5380603ea86ccf7ff43/ss_3a967c6ab53d96319883f5380603ea86ccf7ff43.1920x1080.jpg
- `C_moonshinersim_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4179280/0e99f2a8705d8a49ab3c615757e0476eb7e2a9e3/ss_0e99f2a8705d8a49ab3c615757e0476eb7e2a9e3.1920x1080.jpg
- `C_pack_irishpub_1.jpg` [sheet C]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/13ce4920-3eb9-40d3-b7db-414ddd440158_scaled.jpg
- `C_pack_oldprivatecasino_1.jpg` [sheet C]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/ca81f96b-8f8b-42f3-ae40-2b3bd588f3b1_scaled.jpg
- `C_pack_paulN_gentleman_1.jpg` [sheet C]: https://assetstorev1-prd-cdn.unity3d.com/key-image/26b4b7e2-e15e-4856-a17b-fc976a6f5b19.jpg?v=1
- `C_pack_paulN_gentleman_2.jpg`: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/d98d2f16-4ab6-401e-95b2-e741e1f46b54_scaled.jpg
- `C_pack_paulN_women_1.jpg` [sheet C]: https://assetstorev1-prd-cdn.unity3d.com/key-image/c8b831e8-7a37-411d-bc5e-2dcadd27e604.jpg?v=1
- `C_saloonsim_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1876930/6bbee3c4190d96519f04f3e4d17e2d7e5640f89e/ss_6bbee3c4190d96519f04f3e4d17e2d7e5640f89e.1920x1080.jpg
- `C_saloonsim_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1876930/de798dfd9f6d8385bf8a3614f0b5660b0bbbc276/ss_de798dfd9f6d8385bf8a3614f0b5660b0bbbc276.1920x1080.jpg
- `C_saloonsim_3.jpg` [sheet C]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1876930/1926ef2d67e3781a36bea2cac576a42b6098c4af/ss_1926ef2d67e3781a36bea2cac576a42b6098c4af.1920x1080.jpg
- `C_saloonsim_closeup_1.jpg` [sheet C]: crop of C_saloonsim_1.jpg
- `C_silentauthority_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3907570/3ccc8826e8c36024cde9f2890417a01d6197359e/ss_3ccc8826e8c36024cde9f2890417a01d6197359e.1920x1080.jpg
- `C_silentauthority_2.jpg` [sheet C]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3907570/8d869efb305781afb8335c7aba74dc8e72844967/ss_8d869efb305781afb8335c7aba74dc8e72844967.1920x1080.jpg
- `C_speakeasysim_1.jpg` [sheet C]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3883070/80b6d58a387fb510e6b82ad9eeba98c9a452ae19/ss_80b6d58a387fb510e6b82ad9eeba98c9a452ae19.1920x1080.jpg
- `C_speakeasysim_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3883070/48e477306c379a1b7fb7173fdda5554bd9d5951c/ss_48e477306c379a1b7fb7173fdda5554bd9d5951c.1920x1080.jpg
- `C_supermarketsim_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2670630/d7a5a9f57ed36a5552e2892fffda6aa171f9fe95/ss_d7a5a9f57ed36a5552e2892fffda6aa171f9fe95.1920x1080.jpg
- `C_supermarketsim_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2670630/b0a62c37675c711c85c050bc8e5f96c7ff29b1a4/ss_b0a62c37675c711c85c050bc8e5f96c7ff29b1a4.1920x1080.jpg
- `C_supermarketsim_closeup_1.jpg` [sheet C]: crop of C_supermarketsim_1.jpg
- `C_tcgcardshop_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3070070/ss_3f2209fd8ff2a2eabdaf76764769505a8031297c.1920x1080.jpg
- `C_tcgcardshop_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3070070/ff1ce5336989835a4c5503a65a6d3e0b58f7cc69/ss_ff1ce5336989835a4c5503a65a6d3e0b58f7cc69.1920x1080.jpg
- `C_tcgcardshop_closeup_1.jpg` [sheet C]: crop of C_tcgcardshop_1.jpg
- `D_bunsbooze_1.jpg` [sheet D]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3579280/f6645883a614805a6e8ab135f844ac7441e830bf/ss_f6645883a614805a6e8ab135f844ac7441e830bf.1920x1080.jpg
- `D_bunsbooze_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3579280/dd14f3bc1cda70306f9aa4d29dd692d2b3f0dfb0/ss_dd14f3bc1cda70306f9aa4d29dd692d2b3f0dfb0.1920x1080.jpg
- `D_dds2_1.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1708850/ss_fd8fb574bc726375b725701b09b7df22e5304ccb.1920x1080.jpg
- `D_dds2_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1708850/aa79a92488059878553cdd581dba68cfff696a13/ss_aa79a92488059878553cdd581dba68cfff696a13.1920x1080.jpg
- `D_dds2_3.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1708850/ss_b81f4da7f1a93c762f1fd04b522d58bdd0fa6614.1920x1080.jpg
- `D_dds2_closeup_1.jpg` [sheet D]: crop of D_dds2_2.jpg
- `D_mafiade_1.jpg` [sheet D]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/ss_f531c551d9794deafc1e45421b70e8d4c254aaca.1920x1080.jpg
- `D_mafiade_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/ss_010d8fc827531edf76010106acb78a75188db373.1920x1080.jpg
- `D_mafiaoldcountry_1.jpg` [sheet D]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1941540/ss_3bc232192813ab9250abafd627333f1d8bd53bb9.1920x1080.jpg
- `D_pack_bugrimov_oldgangster_1.jpg` [sheet D]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/45637398-441d-426c-aec0-850ae8614ddf_scaled.jpg
- `D_pack_daz_mobster_iray_1.jpg` [sheet D]: https://gcdn.daz3d.com/p/32487/i/00-daz3d_mobster_outfit_for_genesis_3_male_s_.jpg
- `D_pack_daz_speakeasy_iray_1.jpg` [sheet D]: https://gcdn.daz3d.com/p/72571/i/transforming-speakeasy-00-main-daz3d.jpg
- `D_pack_evin3d_bonnie_1.jpg` [sheet D]: https://assetstorev1-prd-cdn.unity3d.com/key-image/be26409b-80c7-4d9c-bc08-8c74816fdf16.jpg?v=1
- `D_pack_evin3d_capone_1.jpg` [sheet D]: https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/54897841-f51e-4e8d-9cd8-d2cb779dd423_scaled.jpg
- `D_policesim_cc_1.jpg` [sheet D]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/997010/ss_816caba858665d074321afa6b757583482346718.1920x1080.jpg
- `D_policesim_cc_2.jpg`: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/997010/ss_59f1812665d1c83e99660a4763fd460b7f2c1eef.1920x1080.jpg
- `D_sinkingcity_1.jpg` [sheet D]: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/750130/f887feab047e9674bdbac723ebd08e4213848902/ss_f887feab047e9674bdbac723ebd08e4213848902.1920x1080.jpg
