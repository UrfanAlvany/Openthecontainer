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

| Metric | Target |
|---|---|
| First upgrade bought | < 60 s |
| Longest gap without an affordable goal (first 60 min) | < 180 s |
| EV/price of the starter container before upgrades | 0.85–0.97 |
| EV/price of the starter container after early upgrades | > 1.05 |
| First legendary (median) | 10–25 min |
| First prestige available (median) | 60–90 min |

If a target fails, change `data/*.json` (not code), re-run, and report a before/after table.
Mention the report file `sim/out/report.html` so Urfan can open the charts.
