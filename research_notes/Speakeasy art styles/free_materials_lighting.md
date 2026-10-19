# Free / cheap materials, HDRIs, decals and scans for the speakeasy (Unity 6.3, URP 17)

Researched 2026-10-18 (Claude). Goal: a semi-realistic 1920s speakeasy (dark wood, brass,
leather, tiles, brick, wallpaper, glass bottles, night street) that looks "real" through
lighting and materials, for a commercial Steam PC game. Every licence line below was read
from the source site on the date above unless marked UNVERIFIED.

## 1. Poly Haven (polyhaven.com) - VERIFIED 2026-10-18

**Licence (read at https://polyhaven.com/license):** every HDRI, texture and model is CC0.
"You can use our assets for any purpose, including commercial work. You do not need to give
credit or attribution ... You can redistribute them ... or even in a product you sell."
No engine restriction. Verdict: **safe for a commercial Unity game, no credit needed, can
ship inside the build.** (Optional: credit them anyway and/or Patreon.)
- Website ToS forbids scraping without permission. Their Public API README says the API is
  free for any purpose, but *building a product on the live API* needs a "Powered by Poly
  Haven" credit. We only download by hand, so this does not apply to the game.
- Library size today (API): 869 textures, 997 HDRIs (61 tagged night), 521 models.
- Formats: textures ship Diffuse, nor_gl / nor_dx, Rough, AO, Displacement, packed ARM, plus
  blend/gltf/mtlx. Models ship **fbx, gltf, blend, usd**. Use **nor_gl** (Unity is OpenGL
  Y+ normals). URP Lit wants Metallic in R and **Smoothness (= 1 - Roughness) in alpha**, so
  the Rough map must be inverted and packed (one small editor script or Substance/GIMP).

### Poly Haven picks for the speakeasy (all checked to exist via api.polyhaven.com/info)
Textures (max res, real-world tile size):
| Asset | Use | URL |
|---|---|---|
| Herringbone Parquet (16k, 3.4 m) | main bar floor | https://polyhaven.com/a/herringbone_parquet |
| Dark Wood (8k, 2 m) | bar front, panelling | https://polyhaven.com/a/dark_wood |
| Wooden Panels (8k, 2.1 m) | wainscot wall panels | https://polyhaven.com/a/wooden_panels |
| Smoked Walnut Veneer (8k, 1 m) | bar top, counter, cabinets | https://polyhaven.com/a/smoked_walnut_veneer |
| Rosewood Veneer 1 (16k) | luxury trim, back bar | https://polyhaven.com/a/rosewood_veneer1 |
| Walnut Veneer 02 (8k) | furniture | https://polyhaven.com/a/walnut_veneer_02 |
| Wood Floor Worn / Old Wood Floor (8k) | back room, cellar | https://polyhaven.com/a/wood_floor_worn , https://polyhaven.com/a/old_wood_floor |
| Brown Leather (8k, 0.4 m) | booths, bar stools | https://polyhaven.com/a/brown_leather |
| Leather Red 02 (8k) | red booth seats | https://polyhaven.com/a/leather_red_02 |
| Velour Velvet (8k) | curtains, stage drape | https://polyhaven.com/a/velour_velvet |
| Quatrefoil Jacquard / Floral Jacquard (8k) | **wallpaper stand-in** (damask-like pattern) | https://polyhaven.com/a/quatrefoil_jacquard_fabric , https://polyhaven.com/a/floral_jacquard |
| Interior Tiles / Worn Tile Floor / Dirty Tiles / Checkered Pavement Tiles | washroom, entry, kitchen floor | https://polyhaven.com/a/interior_tiles , https://polyhaven.com/a/worn_tile_floor , https://polyhaven.com/a/dirty_tiles , https://polyhaven.com/a/checkered_pavement_tiles |
| Red Brick (16k) / Dark Brick Wall / Painted Brick | exposed brick, alley, cellar | https://polyhaven.com/a/red_brick , https://polyhaven.com/a/dark_brick_wall , https://polyhaven.com/a/painted_brick |
| Worn Plaster Wall / Worn Cracked Plaster / Patterned Plaster Wall | upper walls, ceiling | https://polyhaven.com/a/worn_plaster_wall , https://polyhaven.com/a/worn_cracked_plaster , https://polyhaven.com/a/patterned_plaster_wall |
| Dirty Carpet | back office rug | https://polyhaven.com/a/dirty_carpet |
- Gap: Poly Haven has **no brass / polished metal texture** (its 25 metal textures are mostly
  rusty/industrial). Use ambientCG metals or plain URP Lit (metallic 1, smoothness 0.75,
  albedo ~ #E1C16E brass) plus a smudge/fingerprint roughness map.

HDRIs (night / warm interior; used for reflections and ambient, not as a visible sky indoors):
| Asset | Notes | URL |
|---|---|---|
| Warm Bar | indoor, night, artificial light, 24k | https://polyhaven.com/a/warm_bar |
| Warm Restaurant Night | indoor, night, warm, 24k | https://polyhaven.com/a/warm_restaurant_night |
| Wooden Lounge | indoor, wooden, high contrast | https://polyhaven.com/a/wooden_lounge |
| Billiard Hall | indoor, mixed light | https://polyhaven.com/a/billiard_hall |
| Fireplace | indoor night, high contrast | https://polyhaven.com/a/fireplace |
| Theater 01, Cinema Lobby, Ballroom, Dancing Hall | period-ish interiors | https://polyhaven.com/a/theater_01 , https://polyhaven.com/a/cinema_lobby , https://polyhaven.com/a/ballroom , https://polyhaven.com/a/dancing_hall |
| Cobblestone Street Night (2200 K white balance) | **night street exterior** | https://polyhaven.com/a/cobblestone_street_night |
| Street Lamp, Courtyard Night, Rostock Arches | night street / alley | https://polyhaven.com/a/street_lamp , https://polyhaven.com/a/courtyard_night , https://polyhaven.com/a/rostock_arches |

Models (photoscanned or PBR, fbx available):
| Asset | Polys | URL |
|---|---|---|
| Wine Bottles 01 (glass + fictional labels) | 28.8k | https://polyhaven.com/a/wine_bottles_01 |
| Chandelier 01 / 02 / 03 | 21-29k | https://polyhaven.com/a/Chandelier_01 |
| Brass Candleholders, Brass Goblets | 42k / 9.6k | https://polyhaven.com/a/brass_candleholders , https://polyhaven.com/a/brass_goblets |
| Vintage Oil Lamp, Industrial Wall Sconce, Pull Chain Light Socket | 7-11k | https://polyhaven.com/a/vintage_oil_lamp , https://polyhaven.com/a/industrial_wall_sconce , https://polyhaven.com/a/pull_chain_light_socket |
| Street Lamp 01 / 02 (Hidden Alley collection) | 20-30k | https://polyhaven.com/a/street_lamp_01 |
| Bar Chair Round 01, Arm Chair 01, Sofa 01, Wooden Chair 01, Round Wooden Table 01 | 4-20k | https://polyhaven.com/a/bar_chair_round_01 , https://polyhaven.com/a/ArmChair_01 |
| Vintage Cabinet 01, Classic Console 01, Wooden Bookshelf Worn | 7-61k | https://polyhaven.com/a/vintage_cabinet_01 |
| Ornate Mirror 01, Fancy Picture Frame 01, Mantel Clock 01, Vintage Grandfather Clock 01 | 1-30k | https://polyhaven.com/a/ornate_mirror_01 , https://polyhaven.com/a/mantel_clock_01 |
| Wine Barrel 01, Wooden Crate 01, Vintage Suitcase, Cigarette Pack, Chess Set | 6-77k | https://polyhaven.com/a/wine_barrel_01 , https://polyhaven.com/a/wooden_crate_01 |
- Note: Poly Haven models are film-quality; several are 30-77k tris. Fine on PC for hero
  props; decimate or LOD the chess set / vintage cabinet / candleholders.

## 2. ambientCG (ambientcg.com) - VERIFIED 2026-10-18

**Licence (read at https://docs.ambientcg.com/license/):** "All ambientCG assets are provided
under the Creative Commons CC0 1.0 Universal License ... You can copy, modify, distribute and
perform the assets, even for commercial purposes, all without asking permission. You can
include the raw files in your project, for example a video game." Credit optional
("Created using <asset> from ambientCG.com, licensed under CC0 1.0"). No engine restriction.
Verdict: **safe, no credit needed.**
- Library today (API v2): 2,020 Materials, 433 HDRIs, 127 Decals, 61 Atlases, 210 Substances.
  It has **no real props** (the "3DModel" filter returns materials), so props come from Poly Haven.
- Downloads: 1K/2K/4K/8K in JPG or PNG, Color/NormalGL/NormalDX/Roughness/AO/Displacement.
  Same packing note as Poly Haven (invert Roughness into the Metallic map alpha).
- Fills Poly Haven's gaps: **gold/brass metals, fingerprint and smudge overlays, hex mosaic
  bathroom tiles, black/white checker marble, black marble bar tops, water-leak decals.**

### ambientCG picks (all checked via the API; URL pattern https://ambientcg.com/a/<id>)
| Asset | Tags (from API) | Use |
|---|---|---|
| Metal048B https://ambientcg.com/a/Metal048B | gold, dirty, fingerprints | **brass** bar rail, taps, lamp bodies (tint slightly toward brass) |
| Metal048A / Metal042A / Metal042B | gold clean / shiny / dirty | brass variants |
| Metal058A, Metal057B/C | copper, smudge | copper still, pots, cocktail shakers |
| Fingerprints002 / SurfaceImperfections003 | smudge, smear | roughness overlay on glass, brass, mirrors, bar top (detail map or decal) |
| Wood051 https://ambientcg.com/a/Wood051 | dark, espresso, elegant, furniture, 80 cm | bar front, cabinets |
| WoodFloor064 / WoodFloor008 | dark parquet | floor alternative |
| WoodFloor034 / 035 / 036 / 037 | herringbone parquet | floor alternative |
| Leather037 / Leather030 | dark brown leather | booths, stools |
| Tiles071 https://ambientcg.com/a/Tiles071 | white hexagon mosaic, bathroom | **period-correct washroom / entry floor** |
| Tiles012 https://ambientcg.com/a/Tiles012 | black/white checker marble | entry, back hall |
| Tiles139 / Tiles142 | cream checkered limestone, classic, aged | foyer floor |
| Marble006 / Marble016 | black marble, reflective | **bar top**, table tops |
| Bricks097 | old dirty red factory brick | alley, cellar |
| PaintedPlaster017 | white painted plaster | ceiling |
| Wallpaper001B | damaged woodchip wallpaper | back rooms (no damask in ambientCG; search "damask" = 0) |
| Leaking012A-019C (Decal type) | water drips, leaking | damp streaks on cellar/alley walls |
| Facade009-011 (night windows) | building facade glass night | backdrop buildings on the night street |
| NightEnvironmentHDRI010 (Amsterdam night street), NightEnvironmentHDRI002, IndoorEnvironmentHDRI013 (hotel lobby, evening) | HDRI | alternative night/indoor HDRIs |

