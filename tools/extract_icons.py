"""Extract the game-icons.net icons the game uses into web/vendor/game-icons-subset.json.

The full set comes from the npm package @iconify-json/game-icons (CC BY 3.0):
    cd /tmp && npm pack @iconify-json/game-icons && tar xzf iconify-json-game-icons-*.tgz
    python3 tools/extract_icons.py /tmp/package/icons.json

Every `art` field in data/*.json and config.uiArt must name an icon from that set.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def wanted():
    names = set()
    d = lambda n: json.load(open(os.path.join(ROOT, "data", n + ".json"), encoding="utf-8"))
    names.update(i["art"] for i in d("items")["items"])
    up = d("upgrades")
    names.update(u["art"] for u in up["upgrades"])
    names.update(c["art"] for c in up["categories"])
    names.update(r["art"] for r in d("rivals")["rivals"])
    names.update(c["art"] for c in d("collections")["collections"])
    names.update(d("config")["uiArt"].values())
    return names


def main(src):
    full = json.load(open(src, encoding="utf-8"))
    icons = full["icons"]
    need = sorted(wanted())
    missing = [n for n in need if n not in icons]
    if missing:
        sys.exit("missing icons: " + ", ".join(missing))
    out = {
        "license": "Icons from game-icons.net by Lorc, Delapouite and contributors, CC BY 3.0 "
                   "(https://creativecommons.org/licenses/by/3.0/). Extracted from @iconify-json/game-icons.",
        "size": full.get("width", 512),
        "icons": {n: icons[n]["body"] for n in need},
    }
    path = os.path.join(ROOT, "web", "vendor", "game-icons-subset.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, separators=(",", ":"))
    print(f"wrote {len(need)} icons to {os.path.relpath(path, ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/tmp/claude-0/gi/package/icons.json")
