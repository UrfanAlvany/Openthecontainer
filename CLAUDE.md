# Mystery Container Game — working notes for Claude

Working title: **Dockside** (not final). An incremental "open-the-box" game: buy sealed
shipping containers at a port auction, scrape them open tile by tile, sell or collect
the finds, upgrade, prestige. Buy once on Steam. No real-money randomness, ever.

## People
- **Urfan — Director.** Owns the vision and every final call. Plays every build.
- **Claude (and Codex) — lead developers and researchers.** Research, propose, simulate,
  build, test. Bring Urfan results to play or measure, not questions we can answer ourselves.

## Where things live
| Path | What |
|---|---|
| `RESEARCH.md` | Phase 0 research and the design principles that come out of it |
| `GAME_DESIGN.md` | The design: loop, containers, items, upgrades, collections, prestige |
| `DECISIONS.md` | Log of every decision: date, what, why, who. Append, never rewrite history |
| `data/` | **Single source of truth** for game content (JSON): containers, items, upgrades, collections. The simulator, the web prototype and the future Unity build all read these files |
| `sim/` | Python economy simulator (standard library only) |
| `web/` | Browser prototype (Phases 2–3). Plain HTML/CSS/JS, no build step |
| `unity/` | Unity project (later phases; Unity cannot run in the cloud container) |
| `reports/`, `research_notes/` | Raw research output behind `RESEARCH.md` |

## Rules
1. **Content goes in `data/*.json`, never hard-coded.** If the prototype needs a number,
   it reads it from data. Balance changes happen in data, then re-run the simulator.
2. **Any change to `data/` must be followed by `python3 sim/run.py`** and a look at the
   report. Don't ship a balance change the simulator says is broken.
3. **Honest randomness.** Every roll uses the published odds. Near-misses come from real
   partial reveals (shapes, glints), never from rigged outcomes.
4. **Log decisions** in `DECISIONS.md` (see the `log-decision` skill) whenever we choose
   between real alternatives, change scope, or Urfan gives a ruling.
5. **UI quality matters.** The reveal moment is the product. Every UI change is checked in
   a real browser (Playwright screenshots at desktop and phone widths) before it ships.
6. **Simplest version first**, playtest, then improve.
7. Unity: never hand-edit `.meta` files; Unity generates them on Urfan's laptop and they
   must be committed from there.

## Commands
```bash
python3 sim/run.py                 # run economy simulation, writes sim/out/report.html
python3 -m unittest discover sim   # simulator tests
cd web && python3 -m http.server 8000   # serve the prototype locally
node web/tests/smoke.mjs           # Playwright smoke test + screenshots (web/tests/out/)
python3 web/build.py               # export data for the web game + single-file build
```

## Workflow between cloud and laptop
- Cloud sessions: build, test, commit, push to the working branch.
- Urfan's laptop (evenings): `git pull`, play, and report back. For Unity work, commit and
  push the `.meta` files Unity generates.
- Always pull before starting, push before stopping.

## Definition of done for a build
- Simulator tests pass; economy report shows no dead zones (no wait > 3 min without a
  next purchase in the first hour).
- Prototype smoke test passes; screenshots reviewed at 1280×800 and 390×844.
- `DECISIONS.md` updated if anything was decided.

## Tests (run all before pushing)
```bash
python3 -m unittest discover sim   # data sanity + Python/JS parity
node web/tests/game.test.js        # game logic
python3 web/build.py               # regenerate web/js/data.js + web/dist/dockside.html
node web/tests/smoke.mjs           # real browser, desktop + phone screenshots
```
