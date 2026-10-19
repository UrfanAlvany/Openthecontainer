# Speakeasy environments and props: stores other than the Unity Asset Store

Researched 2026-10-18 (Claude). Target: semi-realistic (ICS2 / Supermarket Simulator level, PBR, photo-based textures) for a Unity 6.3 URP PC game.
Already known and not repeated here: Asset Store Old Private Casino ($19), Irish Pub Pack ($29.99), Lowpoly Vintage Car Pack 1920.

Prices are the **Fab "Personal" tier** (buyers with no more than $100k gross revenue in the last 12 months, including funding). Above that, the Professional tier price applies.

## Licence ground rules (verified)

- **Fab Standard License** (fab.com/eula, read 2026-10-18): it does **not** limit Content to Unreal. Only code plugins carry engine conditions. Games may ship Content as long as players can't extract it. Personal tier: up to $100k revenue; Professional tier: above that.
- **"Unreal Engine only" in practice means the file format**: some listings ship only a `.uasset` Unreal project. The licence still allows Unity, but you have to open the project in Unreal Editor (free), export FBX and textures, and rebuild every material in URP. That costs hours per pack, and blueprints, lighting and post-processing don't come across. Below, **"UE-format only"** marks these listings.
- Listings whose format list includes **"unity"** ship a Unity package. The listing rarely says which render pipeline it uses, so treat it as Built-in until proven otherwise and plan on the Render Pipeline Converter.
- **Sketchfab Store**: it closed when Fab launched (Oct 2024). Paid Sketchfab models are now bought on Fab, and old store pages link out to the Fab listing. For example, Zeps3D's "Wine cellar" page links to Fab "Rustic Cellar". Free CC models stay on sketchfab.com.
- **Megascans**: free claiming of the whole library ended on 31 Dec 2024. A "starter" set stays free on Fab under the Standard License ("can be used in any tool or engine", per the Fab transition FAQ).
- One web source (bitsoulhosting.com) says Epic sold Sketchfab and ArtStation to KitBash (the KitBash3D company) on 10 Aug 2026. **[single source, unverified]** Per that source, Fab is unaffected.

## Fab: environment packs that ship a Unity package or FBX

| # | Pack | Seller | Personal price | Formats | What's in it / tech | Style match | Gap filled |
|---|---|---|---|---|---|---|---|
| F1 | [Saloon Interior](https://www.fab.com/listings/57991a62-f98f-4c6a-9b94-a74ec12f242e) | Quixel Megascans | **$0 (free)** | FBX + JPG, Unity scene (2021.x), UE | 73 photoscanned assets: bar, stools, tables, signs, decor; 1K/2K/4K/8K textures; 4.5★ (35 reviews) | **Very high**: photogrammetry is exactly the photo-based look | Dark-wood bar base, stools, tables. Wild West dressing (cowboy signs) must be swapped out |
| F2 | [Art Deco Furniture & Props VOL.1 Chairs](https://www.fab.com/listings/ea30670e-32ec-4ba4-9373-f0416db20392) / [VOL.2 Lighting & Decor](https://www.fab.com/listings/3421b0f5-6c8b-4526-a56c-e4902cb96fc0) / [VOL.3 Tables, Desks, Cabinets](https://www.fab.com/listings/fec1e4e3-d9fa-41d0-87a5-81903fb651d6) / [VOL.4 Furniture](https://www.fab.com/listings/1eb6c39e-6a80-4252-a5a9-10385ef0e04f) | Dekogon Studios | $29.99 / $34.99 / $29.99 / $29.99 (on sale today $20.99 / $24.49 / $20.99 / $20.99) | **UE + Unity** each | 17 / 29 / 70 / 40 meshes, mostly 2048 textures, channel-packed, "realistic AAA quality, optimized for games"; VOL.4 includes mirrors and a fireplace | **High**: realistic AAA props | Deco chairs, sofas, lamps, chandeliers, sconces, clocks, cabinets, mirrors for the secret bar |
| F2x | [Art Deco COMBO (VOL 1-4)](https://www.fab.com/listings/caa8408c-df79-4239-aa5a-e75d18914aec) | Dekogon | $99.99 ($69.99 sale) | **UE-format only** | Same content | — | **Trap**: the bundle has no Unity package, but the single volumes do |
| F3 | [Restaurant and Dive Bar VOL.3 Bar Interiors](https://www.fab.com/listings/44ac4685-149b-42b2-a4fa-b531006dec5d) | Dekogon | $44.99 ($31.49 sale) | UE + Unity | 40+ meshes; textures 22×4K, 47×2K; tagged piano, booth, casino, lounge | Medium-high: realistic, but American dive-bar (later decades) | Bar counter pieces, booths, piano, bottles. VOL.2 "Bar" ($34.99, UE + Unity) is flagged mature, so details are hidden without a login |
| F4 | [Vintage Bar / 35 Assets](https://www.fab.com/listings/8c44e022-4920-4ea4-a035-00c4a4031311) | PackDev | $39.99 | UE + Unity | "PBR pipeline … AAA quality" (thin description; check the screenshots) | Medium-high | A ready vintage bar set |
| F5 | [Mafia Environment / Modular / 35+ Assets](https://www.fab.com/listings/66c4d9d4-3888-4a29-a78f-4d88746fab56) | PackDev | $29.99 | UE + Unity | Seller calls it "stylized PBR"; 5★ (1 review) | Medium (stylised PBR) | Mafia office / back room |
| F5x | [Mafia Hideout Bar / 152 Assets](https://www.fab.com/listings/5abdf73b-674b-4646-8d1e-4d05a2626a86) | PackDev | $29.99 | **UE-format only** | 152 assets | High on theme | Best-themed PackDev pack, but needs the Unreal export route |
| F6 | [Hotel Bar Interior](https://www.fab.com/listings/eeb9014c-985c-4e5e-9c8e-2fc3c1cecdd7) | Artisan 3D Ventures | $49.99 | **Unity only**, with **Built-in, URP and HDRP packages** | 95 prefabs, 2048 textures, clean + aged material versions, colliders | Medium: realistic but a modern wine bar | Wine racks, bar counter, URP-ready from the start |
| F7 | [Ultimate Bar Props 100+](https://www.fab.com/listings/7ed93662-8918-43e7-b161-9e8ffd5ebf6a) | Vicevoxel | $19.99 | FBX + Unity | 100+ props: bottles, glasses, stools, counters, shelves, gramophone, jukebox, signs | Medium (check the screenshots) | Bulk bar clutter |
| F8 | [Modular Vintage Bar Counter Set](https://www.fab.com/listings/327484c4-4691-43bd-b1b0-b4cfc2b7e4e3) | Blackmesh Studio | $13.99 | FBX, Blender, OBJ, UE | 9 modular pieces: dark marble top, **brass footrail**, glass-door back bar, 272 to 9.7k tris each | **High**: realistic dark wood and brass | The hero bar counter and back bar |
| F9 | [Rustic Cellar](https://www.fab.com/listings/a77da59d-6891-446e-86d7-716616a6fb32) (ex-Sketchfab "Wine cellar") | Zeps3D | $8.99 | FBX, GLB, OBJ, Blender | Brick walls, wood floor, shelves, big barrels, card table; ~196k polys as one diorama | Medium-high (diorama-style, so it will need splitting) | Cellar shell |
| F10 | [Moonshine Still Set](https://www.fab.com/listings/8b341796-8bfc-4fa6-a747-a0e1b496e8e5) | Paulie Pray | $17.99 | FBX, Blender, UE | Boiler, condenser coil, two tanks, wooden furniture, bottles, stools; PBR 512/1K/2K | **High**: worn realistic PBR | The moonshine still |
| F11 | [Vintage Hotel Lobby](https://www.fab.com/listings/5044d620-7483-4af6-aeb0-1090de14acb0) | Zeps3D | $15.99 | FBX, GLB, OBJ, Blender | Red carpet, wood panelling, grand staircase, gold accents; 5★ (1 review) | Medium (archviz diorama) | Café-front or lobby dressing |
| F12 | [Art Deco Hall 2.0](https://www.fab.com/listings/6320538d-5714-4075-bfb6-a15f20561bd8) | GreenBugGames | $35.99 | UE + Unity | Hand-made LODs and collision, mostly 4K textures; 5★ (1 review); "modern art deco" | Medium-high | Deco hall / jazz-stage room shell |
| F13 | [New York City – 1940s Vintage Urban America](https://www.fab.com/listings/4b709f99-9475-4d2d-b341-78628e5c436b) | PolyGo Studios | $89.99 (Professional $349.99!) | UE, Unity, Blender, FBX | Modular brick facades, storefronts, awnings, fire escapes, signs, utility poles, crates, barrels | Medium-high | The same pack is on the Asset Store (already known). Note the big Pro-tier jump |
| F14 | [Urban Background Buildings VOL.1](https://www.fab.com/listings/77837eef-25c3-4020-8856-d946f7c38616) | Dekogon | $24.99 ($17.49 sale) | UE + Unity | 13 mid/far buildings with LODs, day/night materials; 5★ (3 reviews) | Medium (modern-ish city) | Distant skyline behind the street |
| F15 | [Street Lights Pack Modular](https://www.fab.com/listings/ea3b9319-8da2-42e2-a6c9-ab2dcc633513) | 32cm | $9.99 | UE + Unity | 5 bases, 11 supports, 3 tops, 9 lights; 4K PBR; 5★ (1 review) | High | Lamp posts |
| F16 | [Antiques in the Attic VOL.2](https://www.fab.com/listings/0013fe74-da4b-4be5-918c-a41b6ffce54d) | Dekogon | $29.99 ($20.99 sale) | UE + Unity | 40+ meshes, mostly 2K; 5★ (1 review) | High | Period clutter for the cellar and back rooms |

UE-format-only packs that fit the theme (licence OK, but the Unreal export route is needed): Mafia Hideout Bar (PackDev $29.99), Jazz club – interior and props (Mixall $29.99), Art Deco Environment Kit (ArtcoreStudios $89.99), The American City: Modular 1920s Buildings (fadnn $9.99), New York streets – Modular city (Mixall $29.99), Noir City Apartment (Dekogon $69.99), KitBash3D Art Deco on Fab ($144.99).

Flagged mature, so details are hidden without a login (alcohol content triggers the flag; check while logged in): Dekogon Dive Bar VOL.2, Vintage Bar & Diner modular (Juka, $70.99, FBX/Blender/UE), Classic Bar Interior (papaya795), Modular Pub Environment (2AwesomeWork), Wine Cellar Pack (lyoshko $3.99, has Unity), Moonshine Still Pack (WonderFuel).

### Fab single props worth noting

- [Opis 1921 Candlestick Telephone](https://www.fab.com/listings/e54c24fa-b940-4084-bc4c-fe2ec2d43eeb), Darksteady, $6.99, FBX, 4K PBR, "optimized for games".
- [MAS Cash Register](https://www.fab.com/listings/01292574-183e-4e2d-acf1-7e7f2f3e38ba), Dekogon, $5.99, FBX, 2K PBR. It looks modern-retro; check whether it reads as 1920s.
- [Antique Gramophone](https://www.fab.com/listings/259cc263-85c8-4447-9544-2d274f102cbc), Kirhl, $14.99, Unity + FBX, game-ready PBR.
- [Gramophone](https://www.fab.com/listings/9d83b73a-9cb2-4b3a-bf14-5f640e04c361), PolyOne, **free** (Personal tier), FBX + Unity, 4K textures. At **197k tris** it needs decimating.
- [Vintage Gramophone Animated](https://www.fab.com/listings/d55fc53a-1044-4f77-b733-ec61fba44c63), Salex, $24.99, FBX, **Unity Built-in/HDRP/URP**, 3 LODs (3.6k / 2.2k / 1k tris), animated.
- [Vintage Cast Iron Street Lamp](https://www.fab.com/listings/62dbb248-272d-4cc4-9efc-81a2e79df2a2), BlenderViz, $1.99, FBX/Blender (archviz-oriented).
- Megascans brick facade and brick wall surfaces, $0–$0.99 each: photoscanned materials for the street walls.

### Fab cars (1920s)

| Car | Seller | Price | Formats | Notes |
|---|---|---|---|---|
| [Vintage cars](https://www.fab.com/listings/9056edfb-9d3c-4ae2-9ab0-7dfa1da9f89a) (3 cars) | DmitriyDryzhak | $29.99 | UE, **Unity**, FBX | 4K textures; 45.8k / 34.4k / 31.3k polys; "move animations"; 4.5★ (2 reviews). Brass-era look, earlier than the 1920s |
| [Generic Vintage Sedan 1920](https://www.fab.com/listings/4ffda95d-7d85-4e5d-928c-010a53a2bb61) | ROH3D | $39.99 | OBJ, FBX | Unbranded enclosed sedan, wooden spoke wheels, PBR. No brand licensing risk |
| [Generic Luxury Phaeton Convertible 1930](https://www.fab.com/listings/6e5a2c8d-42f5-405c-a7ed-9c1d6aa8d47d) | ROH3D | $39.99 | OBJ, FBX | Unbranded 1930 open tourer |
| [Car Model T](https://www.fab.com/listings/fc39e283-6407-43d0-9df2-33521436663a) | AR Initiative | $24.99 | glTF, FBX, 3ds Max | Based on a 1914 Model T |
| [1920s Coupe](https://www.fab.com/listings/66398a22-e46e-4963-a915-2de72f3d13c6) / [Sedan](https://www.fab.com/listings/4bd182f8-1529-4653-b469-1f6dab0e78bc) / [Box Truck](https://www.fab.com/listings/da96f5d4-fca5-4054-9e03-5759c06b8974) + 2 trucks | Signafort | $3.99 each | FBX | Blender + Substance; cheap background traffic. The listings don't state polycount; check the screenshots |
| [Free American Sedans: Taxi, Police, Classic](https://www.fab.com/listings/b34c4162-44f4-4902-bd6f-489943afa4bd) | High Matters | free | FBX + **Unity (Built-in + URP)** | ~10–11k tris, working lights and doors. **1940s–50s shapes, not 1920s**: a trap for the period |
| [Classic Police Car](https://www.fab.com/listings/3ec35b34-dde9-406f-94f4-1735ca53ee17) | matoteus | $9.99 | FBX, Blender | Low poly, 4K body; era unclear |

## Sketchfab (free CC models; paid models now sell on Fab)

Licence: **CC Attribution** allows commercial games but needs a credit line. "Free Standard" means the Sketchfab free standard licence: commercial use allowed, no resale. Avoid NC/ND. All the models below are downloadable now and were verified through the API on 2026-10-18.

| Model | Author | Licence | Faces | Notes / gap |
|---|---|---|---|---|
| [Art Deco Bar](https://sketchfab.com/3d-models/art-deco-bar-385733562f074903ba593ff29359fd4d) | rixx_vr | CC-BY | 15.8k | 1920s deco bar built for VR; taps and shelves are separate meshes, PBR metalness. A free hero bar to try in a look test |
| [Art Deco Chandelier](https://sketchfab.com/3d-models/art-deco-chandelier-2dec4b96bb7b4e4595c69ca001c58afa) | rixx_vr | CC-BY | 8.5k | Pairs with the bar |
| [Speakeasy Modular Kit](https://sketchfab.com/3d-models/speakeasy-modular-kit-56de4e16396a4102b7e8dc01dd5323e7) | ArtByDuckie | CC-BY | 26.7k | "1920's style speakeasy modular kit"; no PBR flag, 2 likes, so quality unknown |
| [1920s Standing Floor Lamps A](https://sketchfab.com/3d-models/1920s-standing-floor-lamps-type-a-ca1cf1c435ec4012b9b6d5128333ad83), [1920s Table Lamps A](https://sketchfab.com/3d-models/1920s-table-lamps-type-a-fb7475ef551c46f9b4b2b28d96d31dfc), [Vintage Art Deco Table Lamps A](https://sketchfab.com/3d-models/vintage-art-deco-table-lamps-type-a-f7edebe430254943a4e5f90f857e755a), [Antique Candlestick Phones A](https://sketchfab.com/3d-models/antique-candlestick-phones-type-a-1511ed02c9144b5185c58d0cfcbaa2e8), [1930s Cathedral Radios B](https://sketchfab.com/3d-models/1930s-cathedral-style-radios-type-b-d506d204efc24ed09cdd60db3252ddbd) | Mad_Lobster_Workshop | CC-BY | 31–67k per set (several variants each) | One author with a consistent realistic PBR period-prop series. **Best free source for small 1920s props** |
| [1928 Chevy Tudor](https://sketchfab.com/3d-models/1928-chevy-tudor-875f36225e0b416e97c49176d1d30c91) / [Ford Model A](https://sketchfab.com/3d-models/ford-model-a-downloadable-a47c505c928c4706b32231ac4c8f802a) | robinmikart | CC-BY | 60k / 38k | Good free period cars, **but they are real brands** (see traps) |
| [Old Ford Model T 1925](https://sketchfab.com/3d-models/old-ford-model-t-1925-c96b97ba24344dd8a0688c9ca756f21c) | maddevil57 | CC-BY | 43.8k | Abandoned/rusty look; brand caveat |
| [Moonshine Still](https://sketchfab.com/3d-models/moonshine-still-68005e9b25bb4030bf84c19384b72d85) | Lazanja | CC-BY | 6.4k | Quick prop, PBR |
| Vodka distillation set (WirtualneMuzea) | museum scan | **CC0** | 236–276k | Real museum scan; needs decimating |
| [Vintage Gramophone Game-Asset](https://sketchfab.com/3d-models/vintage-gramophone-game-asset-e3a21ee0e1004cfea8c13dad50a18034) | Rigdhi | CC-BY | 8.7k | Game-ready |

Old Sketchfab Store items found by the search (Speakeasy Bar Asset Pack by NatPlatt $20, Aman's Jazz Club $3.99, artium3d Art Deco bar cabinets $10–15 each) now sell on Fab where migrated. Aman's Jazz Club is a **modern** Scandinavian-minimal club: wrong era.

## CGTrader (licence: "Royalty Free License (no AI)" = commercial games OK, embedded and not extractable)

The keyword search URL returns 404 through the proxy; tag pages work.

| Item | Seller | Price (sale) | Formats | Tech | Verdict |
|---|---|---|---|---|---|
| [Vintage Bar Interior Environment](https://www.cgtrader.com/3d-models/interior/other/vintage-bar-interior-environment-unreal-engine) | Leartes Studios | $79.99 (on sale $55.99) | **FBX + textures** + UASSET | 85 meshes, LODs (up to 4), collision, 1K/2K textures, 1 review | OK for Unity via FBX. **Victorian** bar (artist Clara Tan), not deco, but dark wood fits the cellar and café |
| [Old Antique Cash Register PBR](https://www.cgtrader.com/3d-models/household/household-tools/old-antique-cash-register-pbr) | MovART | $9.90 | FBX, OBJ, Maya, **unitypackage** | 11.7k polys, 2K PBR, 2 reviews | The best ornate period till found |
| [1920 to 1930 modular car](https://www.cgtrader.com/3d-models/car/antique-car/1920-to-1930-generic-car) | (GRL "La Costa", fictional brand) | $119 (on sale $59.50) | Blender, FBX, **URP + HDRP texture sets** | Customisable body parts | **No brand risk**, URP-ready textures. Best value hero car |
| [1920s Sedan](https://www.cgtrader.com/3d-models/car/antique-car/1920s-sedan) | (Signafort-style unbranded) | $7.99 (on sale $4.00) | FBX | Game-ready, rigged, 1K/2K/4K textures | Cheap unbranded traffic |
| [1923 classic car "Touring"](https://www.cgtrader.com/3d-models/car/antique-car/1923-classic-car-touring) / [1929 "Double A" truck](https://www.cgtrader.com/3d-models/car/antique-car/1929-classic-truck-double-a) | same author | $15 each (on sale $7.50) | FBX | ~12k / 11.5k polys, doors separate | Background cars; the truck fits bootlegger deliveries |
| [Retro Car 1929 Cord L-29](https://www.cgtrader.com/3d-models/car/antique-car/retro-car-1929-cord-l-29) | wugla | $39 (on sale $27.30) | FBX, Blender, OBJ, **unitypackage** | 56.6k polys, 4K PBR | Hero car; Cord is a real marque (brand caveat) |
| [Pot Kettle Stills – Whiskey Distillery](https://www.cgtrader.com/3d-models/industrial/other/pot-kettle-stills-whiskey-distillery) | brady-fitzgerald77 | $38 (on sale $26.60) | OBJ, FBX | 114k polys, 4 reviews | Industrial copper stills: too big for a cellar still |
| [Rustic Moonshine Still Set](https://www.cgtrader.com/3d-models/interior/house-interior/rustic-moonshine-still-set) | piotwal1994 | (price not parsed) | Blender, OBJ, FBX | 26k polys | **Same content** as the Fab Moonshine Still Set (Paulie Pray); buy whichever is cheaper |
| [Art Deco Environment Kit – UE5](https://www.cgtrader.com/3d-models/architectural/other/art-deco-environment-kit-ue5) | ArtcoreStudios | $89.99 (on sale $44.99) | **UASSET only** | 149 meshes, 2K/4K, LODs, 3 reviews | UE-format only (needs the export route) |
| [Vintage gentleman whiskey bar](https://www.cgtrader.com/3d-models/interior/other/vintage-gentleman-whiskey-bar-interior-asset-pack) | ShapeSmith | $21.80 (on sale $15.26) | OBJ, Blender, FBX (V-Ray source) | **12.7M polys** | Trap: an archviz render scene, not a game asset |
| [Art Deco Buildings pack](https://www.cgtrader.com/3d-models/exterior/cityscape/art-deco-buildings-3d-pack-office-buildings-downtown) | Conceptize | $99 | Blender, OBJ, FBX | **6.7M polys** | Skyline towers only; far too heavy for the street |
| Moonshine Still Pack / Vintage Street Lamp Pack / Antique Phonograph Pack | WonderFuel | $18.99–19.99 | FBX, GLB | 20 assets each, all published 14–17 Oct 2026 | **Likely AI-generated**: Fab tags this seller's Art Deco Floor Lamp Pack as AI-generated. Avoid |
