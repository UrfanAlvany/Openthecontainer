# Dockside (working title)

An incremental "open-the-box" game about mystery shipping containers.
Bid on sealed containers at the port auction, scrape them open tile by tile, find junk
or treasure, sell or collect, upgrade, and grow the biggest salvage empire at the port.

**Business model:** free demo → buy-once Steam release. No real-money randomness.

## Documents
- [`RESEARCH.md`](RESEARCH.md): why these games hook players, what sells, and our design principles
- [`GAME_DESIGN.md`](GAME_DESIGN.md): the game design
- [`DECISIONS.md`](DECISIONS.md): every decision, with dates and reasons
- [`CLAUDE.md`](CLAUDE.md): how the developers (Claude/Codex) work in this repo

## Layout
```
data/      game content (JSON), shared by simulator, prototype and Unity
sim/       Python economy simulator
web/       browser prototype
.claude/   agents and skills used by Claude Code
```

## Play the prototype locally
```bash
cd web && python3 -m http.server 8000
# open http://localhost:8000
```

## Run the economy simulator
```bash
python3 sim/run.py   # writes sim/out/report.html
```

## Roadmap
0. Research → `RESEARCH.md`
1. Design + economy simulation → `GAME_DESIGN.md`, `sim/`
2. Playable prototype (browser)
3. Fun pass (juice, reveal moment)
4. Content and depth (items, collections, events, prestige)
5. Look and sound
6. Public demo + metrics
7. Full game on Steam (Unity)

## Credits
- Icons: [game-icons.net](https://game-icons.net) by Lorc, Delapouite and contributors,
  licensed [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The subset used is in
  `web/vendor/game-icons-subset.json` (regenerate with `tools/extract_icons.py`).
- Fonts: Big Shoulders Display / Stencil and Barlow Semi Condensed (Google Fonts, OFL).
