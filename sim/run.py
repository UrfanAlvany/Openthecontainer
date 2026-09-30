"""Run the economy simulation and write sim/out/report.html.

    python3 sim/run.py                     # 60 players, 120 minutes
    python3 sim/run.py --seeds 200 --minutes 120
    python3 sim/run.py --check             # exit 1 if a target fails (for CI)
"""
import argparse
import html
import math
import os
import statistics
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import Data, compute_stats, expected_value, prestige_stars  # noqa: E402
from player import Run, expected_ratio  # noqa: E402

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

# Targets from GAME_DESIGN.md → "Economy targets". (name, key, low, high, unit)
TARGETS = [
    ("First upgrade bought", "first_upgrade", None, 60, "s"),
    ("Longest gap without a purchase, first 60 min (median player)", "max_gap_60", None, 180, "s"),
    ("Longest gap without a purchase, first 60 min (unluckiest 10%)", "max_gap_60_p90", None, 300, "s"),
    ("Starter container EV / price, no upgrades (small player edge)", "ev_ratio_start", 1.05, 1.20, "×"),
    ("Starter container EV / price after 3 Haggling", "ev_ratio_early", 1.05, None, "×"),
    ("Starter container: chance a container turns a profit", "p_profit_rusty", 0.35, 0.70, ""),
    ("First Epic find (median)", "first_epic", 120, 900, "s"),
    ("First Legendary find (median)", "first_legendary", 600, 1500, "s"),
    ("Standard 20ft unlocked (median)", "license_1", 90, 420, "s"),
    ("Premium 40ft unlocked (median)", "license_2", 480, 1500, "s"),
    ("Sealed Military unlocked (median)", "license_3", 1500, 3300, "s"),
    ("First prestige star available (median)", "prestige", 2100, 3600, "s"),
    ("Three prestige stars available — worth taking (median)", "prestige3", 3000, 4800, "s"),
]


def pct(values, p):
    if not values:
        return float("nan")
    v = sorted(values)
    k = (len(v) - 1) * p
    lo, hi = math.floor(k), math.ceil(k)
    return v[lo] + (v[hi] - v[lo]) * (k - lo)


def median_or_nan(values):
    return statistics.median(values) if values else float("nan")


def analyse(data, runs):
    m = {}
    m["first_upgrade"] = median_or_nan([r.purchase_times[0] for r in runs if r.purchase_times])
    gaps = []
    for r in runs:
        times = [0.0] + [t for t in r.purchase_times if t <= 3600] + [3600.0]
        gaps.append(max(b - a for a, b in zip(times, times[1:])))
    m["max_gap_60"] = median_or_nan(gaps)
    m["max_gap_60_p90"] = pct(gaps, 0.9)

    base = compute_stats(data, {})
    m["ev_ratio_start"] = expected_ratio(data, "rusty", base)
    m["ev_ratio_early"] = expected_ratio(data, "rusty", compute_stats(data, {"haggle": 3}))

    profits = [p for r in runs for p in r.profit_by_tier.get("rusty", [])]
    m["p_profit_rusty"] = sum(1 for p in profits if p > 0) / len(profits) if profits else float("nan")

    for rar in ("rare", "epic", "legendary"):
        m["first_" + rar] = median_or_nan([r.first_rarity[rar] for r in runs if rar in r.first_rarity])
        m["share_" + rar] = sum(1 for r in runs if rar in r.first_rarity) / len(runs)

    for lvl in range(1, 5):
        ts = []
        for r in runs:
            for (t, kind, detail) in r.events:
                if kind == "upgrade" and detail == f"Auction License → {lvl}":
                    ts.append(t)
                    break
        m[f"license_{lvl}"] = median_or_nan(ts)
        m[f"license_{lvl}_share"] = len(ts) / len(runs)

    pts = []
    for r in runs:
        for (t, kind, _d) in r.events:
            if kind == "prestige_available":
                pts.append(t)
                break
    m["prestige"] = median_or_nan(pts)
    p3 = [t for r in runs for (t, kind, d) in r.events if kind == "prestige3"]
    m["prestige3"] = median_or_nan(p3)
    m["prestige_share"] = len(pts) / len(runs)
    return m


def fmt_value(v, unit):
    if isinstance(v, float) and math.isnan(v):
        return "never"
    if unit == "s":
        return f"{int(v // 60)}m {int(v % 60):02d}s"
    if unit == "×":
        return f"{v:.2f}×"
    return f"{v:.0%}" if v <= 1 else f"{v:.2f}"


def check_targets(m):
    rows = []
    for name, key, lo, hi, unit in TARGETS:
        v = m[key]
        ok = not (isinstance(v, float) and math.isnan(v))
        if ok and lo is not None and v < lo:
            ok = False
        if ok and hi is not None and v > hi:
            ok = False
        want = (f"≥ {fmt_value(lo, unit)}" if hi is None else
                f"≤ {fmt_value(hi, unit)}" if lo is None else
                f"{fmt_value(lo, unit)} – {fmt_value(hi, unit)}")
        rows.append((name, fmt_value(v, unit), want, ok))
    return rows


def container_table(data):
    base = compute_stats(data, {})
    rows = []
    for c in data.buyable_containers():
        ev = expected_value(data, c["id"], 0)
        rows.append((c["name"], c["price"], ev, ev / c["price"],
                     c["cols"] * c["rows"], c["rustHp"]))
    return rows, base


# ------------------------------------------------------------------ report (inline SVG)
def svg_money_chart(runs, minutes, width=760, height=300):
    pad_l, pad_b, pad_t, pad_r = 60, 30, 10, 10
    step = 30
    ts = list(range(0, int(minutes * 60) + 1, step))

    def money_at(r, t):
        last = r.samples[0][1] if r.samples else 0
        for (st, mo, _i) in r.samples:
            if st > t:
                break
            last = mo
        return max(1.0, last)

    series = {"p10": [], "p50": [], "p90": []}
    for t in ts:
        vals = [money_at(r, t) for r in runs]
        series["p10"].append(pct(vals, 0.1))
        series["p50"].append(pct(vals, 0.5))
        series["p90"].append(pct(vals, 0.9))
    ymax = max(series["p90"]) * 1.2
    lmin, lmax = 0, math.log10(ymax)

    def x(t):
        return pad_l + (width - pad_l - pad_r) * t / (minutes * 60)

    def y(v):
        return pad_t + (height - pad_t - pad_b) * (1 - (math.log10(v) - lmin) / (lmax - lmin))

    parts = [f'<svg viewBox="0 0 {width} {height}" class="chart" role="img" aria-label="Cash over time">']
    for e in range(0, int(lmax) + 1):
        yy = y(10 ** e)
        parts.append(f'<line x1="{pad_l}" x2="{width - pad_r}" y1="{yy:.1f}" y2="{yy:.1f}" class="grid"/>')
        parts.append(f'<text x="{pad_l - 6}" y="{yy + 4:.1f}" class="tick" text-anchor="end">${10 ** e:,.0f}</text>')
    for mnt in range(0, minutes + 1, 15):
        xx = x(mnt * 60)
        parts.append(f'<text x="{xx:.1f}" y="{height - 8}" class="tick" text-anchor="middle">{mnt}m</text>')
    band = " ".join(f"{x(t):.1f},{y(v):.1f}" for t, v in zip(ts, series["p90"]))
    band += " " + " ".join(f"{x(t):.1f},{y(v):.1f}" for t, v in reversed(list(zip(ts, series["p10"]))))
    parts.append(f'<polygon points="{band}" class="band"/>')
    line = " ".join(f"{x(t):.1f},{y(v):.1f}" for t, v in zip(ts, series["p50"]))
    parts.append(f'<polyline points="{line}" class="line"/>')
    parts.append("</svg>")
    return "".join(parts)


def svg_purchase_strip(runs, minutes, width=760, height=150):
    """Dots for every purchase of the first 12 players: shows gaps at a glance."""
    pad_l, pad_r = 60, 10
    rows = runs[:12]
    row_h = (height - 20) / max(1, len(rows))
    parts = [f'<svg viewBox="0 0 {width} {height}" class="chart" role="img" aria-label="Purchases over time">']
    for i, r in enumerate(rows):
        yy = 10 + i * row_h + row_h / 2
        parts.append(f'<text x="{pad_l - 6}" y="{yy + 3:.1f}" class="tick" text-anchor="end">P{i + 1}</text>')
        for t in r.purchase_times:
            if t > minutes * 60:
                break
            xx = pad_l + (width - pad_l - pad_r) * t / (minutes * 60)
            parts.append(f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="2.2" class="dot"/>')
        for (t, kind, _d) in r.events:
            if kind in ("first_legendary",) and t <= minutes * 60:
                xx = pad_l + (width - pad_l - pad_r) * t / (minutes * 60)
                parts.append(f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="4" class="leg"/>')
    parts.append("</svg>")
    return "".join(parts)


def write_report(data, runs, m, checks, minutes, path):
    crow, _ = container_table(data)
    passed = sum(1 for c in checks if c[3])
    esc = html.escape
    rows_t = "".join(
        f"<tr><td>{esc(n)}</td><td class='num'>{esc(v)}</td><td class='num'>{esc(w)}</td>"
        f"<td class='{'ok' if ok else 'bad'}'>{'PASS' if ok else 'FAIL'}</td></tr>"
        for n, v, w, ok in checks)
    rows_c = "".join(
        f"<tr><td>{esc(n)}</td><td class='num'>${p:,.0f}</td><td class='num'>${ev:,.0f}</td>"
        f"<td class='num'>{r:.2f}×</td><td class='num'>{tiles}</td><td class='num'>{hp}</td></tr>"
        for n, p, ev, r, tiles, hp in crow)
    opened = {}
    for r in runs:
        for k, v in r.containers_opened.items():
            opened[k] = opened.get(k, 0) + v
    rows_o = "".join(
        f"<tr><td>{esc(data.container_by_id[k]['name'])}</td><td class='num'>{v / len(runs):.0f}</td></tr>"
        for k, v in sorted(opened.items(), key=lambda kv: data.container_by_id[kv[0]]["tier"]))
    doc = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Economy Report</title>
<style>
:root {{ --bg:#fbfaf7; --fg:#1d1f23; --muted:#6a6f78; --line:#e3e1dc; --accent:#e07a1f; --ok:#1f8a4c; --bad:#c23b2e; --band:rgba(224,122,31,.18); }}
@media (prefers-color-scheme: dark) {{ :root {{ --bg:#15171a; --fg:#eceae6; --muted:#9aa0a8; --line:#2c2f34; --band:rgba(224,122,31,.25); }} }}
body {{ background:var(--bg); color:var(--fg); font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif; margin:0; padding:24px 16px; }}
main {{ max-width:820px; margin:0 auto; }}
h1 {{ font-size:22px; margin:0 0 4px; }} h2 {{ font-size:17px; margin:28px 0 8px; }}
p.sub {{ color:var(--muted); margin:0 0 16px; }}
table {{ border-collapse:collapse; width:100%; font-size:14px; }}
td, th {{ border-bottom:1px solid var(--line); padding:6px 8px; text-align:left; }}
td.num {{ text-align:right; font-variant-numeric:tabular-nums; }}
.ok {{ color:var(--ok); font-weight:600; }} .bad {{ color:var(--bad); font-weight:600; }}
.chart {{ width:100%; height:auto; }} .grid {{ stroke:var(--line); }}
.tick {{ fill:var(--muted); font-size:11px; }} .band {{ fill:var(--band); }}
.line {{ fill:none; stroke:var(--accent); stroke-width:2.5; }}
.dot {{ fill:var(--muted); }} .leg {{ fill:#ffb020; stroke:var(--fg); stroke-width:.8; }}
.wrap {{ overflow-x:auto; }}
</style></head><body><main>
<h1>Economy report</h1>
<p class="sub">{len(runs)} simulated players × {minutes} minutes · targets passed: <b>{passed}/{len(checks)}</b></p>
<h2>Targets</h2><div class="wrap"><table><tr><th>Metric</th><th>Result</th><th>Target</th><th></th></tr>{rows_t}</table></div>
<h2>Cash over time</h2><p class="sub">Median player (line) and 10th–90th percentile (band), log scale.</p>
{svg_money_chart(runs, minutes)}
<h2>Every purchase, first 12 players</h2><p class="sub">Each dot is an upgrade; gold dots mark the first Legendary. Long empty stretches are boring stretches.</p>
{svg_purchase_strip(runs, minutes)}
<h2>Containers (no upgrades)</h2><div class="wrap"><table><tr><th>Container</th><th>Price</th><th>Expected value</th><th>EV / price</th><th>Tiles</th><th>Rust HP</th></tr>{rows_c}</table></div>
<h2>Containers opened per player</h2><div class="wrap"><table>{rows_o}</table></div>
</main></body></html>"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(doc)


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--seeds", type=int, default=60)
    ap.add_argument("--minutes", type=int, default=120)
    ap.add_argument("--check", action="store_true", help="exit 1 if any target fails")
    args = ap.parse_args(argv)

    data = Data()
    runs = [Run(data, 7919 * (i + 1), minutes=args.minutes).play() for i in range(args.seeds)]
    m = analyse(data, runs)
    checks = check_targets(m)
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, "report.html")
    write_report(data, runs, m, checks, args.minutes, path)

    w = max(len(c[0]) for c in checks)
    for name, v, want, ok in checks:
        print(f"{'PASS' if ok else 'FAIL'}  {name:<{w}}  {v:>10}   target {want}")
    print(f"\nLegendary found by {m['share_legendary']:.0%} of players; "
          f"prestige available for {m['prestige_share']:.0%}; "
          f"license 4 reached by {m['license_4_share']:.0%}.")
    print(f"Report: {os.path.relpath(path)}")
    if args.check and not all(c[3] for c in checks):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
