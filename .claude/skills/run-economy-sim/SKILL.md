---
name: run-economy-sim
description: Run and read the Python economy simulator after any change to data/*.json or the economy rules. Use before committing balance changes.
---
# Run the economy simulator

```bash
python3 -m unittest discover sim      # rules and data sanity
python3 sim/run.py                    # full simulation → sim/out/report.html + summary
python3 sim/run.py --seeds 200 --minutes 120   # heavier run when tuning
```

Read the printed summary, then check these targets (see GAME_DESIGN.md → Economy targets):

The targets live in `sim/run.py` (`TARGETS`) and are mirrored in GAME_DESIGN.md §9.
The main ones:

| Metric | Target |
|---|---|
| First upgrade bought | < 60 s |
| Starter (Rusty Box) EV/price, no upgrades | 1.05–1.20 (small player edge, D-011) |
| Longest gap without a purchase (first 60 min, median player) | < 180 s (known open issue) |
| First Legendary (median) | 10–25 min |
| Standard / Premium / Military unlocked | 1.5–7 / 8–25 / 25–55 min |
| First ★ available / 3 ★ available | 35–60 / 50–80 min |

If a target fails, change `data/*.json` (not code), re-run, and report a before/after table.
Mention the report file `sim/out/report.html` so Urfan can open the charts.
