"""Game rules shared with the web prototype (web/js/core/*).

Everything here must match the JavaScript implementation exactly for the same seed;
`sim/test_parity.py` checks this. Numbers come from data/*.json — never hard-code them.
"""
import json
import math
import os
from functools import lru_cache

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
RARITIES = ["junk", "common", "rare", "epic", "legendary"]


# ---------------------------------------------------------------- random numbers
class Mulberry32:
    """Same generator as web/js/core/rng.js (mulberry32)."""

    def __init__(self, seed):
        self.a = seed & 0xFFFFFFFF

    def next(self):
        self.a = (self.a + 0x6D2B79F5) & 0xFFFFFFFF
        a = self.a
        t = _imul(a ^ (a >> 15), 1 | a)
        t = ((t + _imul(t ^ (t >> 7), 61 | t)) & 0xFFFFFFFF) ^ t
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296


def _imul(a, b):
    return (a * b) & 0xFFFFFFFF


def weighted_index(weights, u):
    total = sum(weights)
    x = u * total
    last = 0
    for i, w in enumerate(weights):
        if w <= 0:
            continue
        last = i
        x -= w
        if x < 0:
            return i
    return last


def round_half_up(x):
    return int(math.floor(x + 0.5))


# ---------------------------------------------------------------- data
class Data:
    def __init__(self, data_dir=DATA_DIR):
        def load(name):
            with open(os.path.join(data_dir, name), encoding="utf-8") as f:
                return json.load(f)

        self.config = load("config.json")
        self.containers = load("containers.json")["containers"]
        self.items = load("items.json")["items"]
        up = load("upgrades.json")
        self.base_stats = up["baseStats"]
        self.upgrades = up["upgrades"]
        self.collections = load("collections.json")["collections"]
        self.container_by_id = {c["id"]: c for c in self.containers}
        self.item_by_id = {i["id"]: i for i in self.items}
        self.upgrade_by_id = {u["id"]: u for u in self.upgrades}
        self.collection_of_item = {}
        for col in self.collections:
            for iid in col["items"]:
                self.collection_of_item[iid] = col["id"]

    def pool(self, container):
        t = container["itemTier"]
        return [i for i in self.items if i["tiers"][0] <= t <= i["tiers"][1]]

    def buyable_containers(self):
        return [c for c in self.containers if not c.get("safetyNetOnly")]


# ---------------------------------------------------------------- rules
def rarity_weights(data, container, luck):
    cfg = data.config["luck"]
    out = []
    for r in RARITIES:
        mult = max(cfg["minMult"], 1 + luck * cfg["perLevel"][r])
        out.append(container["rarityWeights"][r] * mult)
    return out


def generate(data, container, luck, seed):
    """Fill the container grid with items. Returns {'cells': [...], 'items': [...]}.

    cells[i] is the index into items of the item covering cell i.
    """
    rng = Mulberry32(seed)
    cols, rows = container["cols"], container["rows"]
    n = cols * rows
    order = list(range(n))
    for i in range(n - 1, 0, -1):
        j = int(rng.next() * (i + 1))
        order[i], order[j] = order[j], order[i]

    pool = data.pool(container)
    weights = rarity_weights(data, container, luck)
    conditions = data.config["conditions"]
    cond_weights = [c["weight"] for c in conditions]
    cells = [-1] * n
    items = []

    def fits(x, y, w, h):
        if x + w > cols or y + h > rows:
            return False
        for dy in range(h):
            for dx in range(w):
                if cells[(y + dy) * cols + (x + dx)] != -1:
                    return False
        return True

    for cell in order:
        if cells[cell] != -1:
            continue
        x, y = cell % cols, cell // cols
        rarity = RARITIES[weighted_index(weights, rng.next())]
        cands = [it for it in pool if it["rarity"] == rarity and fits(x, y, it["w"], it["h"])]
        item = cands[weighted_index([it.get("weight", 1) for it in cands], rng.next())]
        cond = conditions[weighted_index(cond_weights, rng.next())]
        idx = len(items)
        items.append({"id": item["id"], "x": x, "y": y, "w": item["w"], "h": item["h"],
                      "rarity": rarity, "condition": cond["id"], "value": item["value"] * cond["mult"]})
        for dy in range(item["h"]):
            for dx in range(item["w"]):
                cells[(y + dy) * cols + (x + dx)] = idx
    return {"cells": cells, "items": items}


def upgrade_cost(upgrade, level):
    """Cost to go from `level` to `level + 1`."""
    c = upgrade["cost"]
    if "list" in c:
        return c["list"][level]
    return round_half_up(c["base"] * c["growth"] ** level)


def requirements_met(upgrade, levels):
    return all(levels.get(r["id"], 0) >= r["level"] for r in upgrade.get("requires", []))


def compute_stats(data, levels, completed_collections=(), stars=0):
    s = dict(data.base_stats)
    for u in data.upgrades:
        lv = levels.get(u["id"], 0)
        if lv:
            s[u["stat"]] += u["perLevel"] * lv
    for col in data.collections:
        if col["id"] in completed_collections:
            s[col["reward"]["stat"]] += col["reward"]["add"]
    s["sellTotal"] = s["sellMult"] + stars * data.config["prestige"]["sellBonusPerStar"]
    return s


def prestige_stars(data, lifetime_earnings):
    p = data.config["prestige"]["earningsPerStarSquared"]
    return int(math.floor(math.sqrt(max(0.0, lifetime_earnings) / p)))


def open_time(data, container, stats):
    """Seconds for a typical player to scrape a container fully (simulator model)."""
    sc = data.config["scraping"]
    tiles = container["cols"] * container["rows"]
    hits = tiles * math.ceil(container["rustHp"] / stats["scrapePower"])
    brush = min(int(stats["brush"]), len(sc["brushEfficiency"]) - 1)
    rate = sc["simHumanHitsPerSec"] * sc["brushEfficiency"][brush] + stats["autoScrape"]
    return hits / rate + sc["simOverheadSec"]


def expected_value(data, container_id, luck, samples=None):
    """Mean raw value (before sell multipliers) of a container. Deterministic, and equal
    to the JavaScript value (same seeds, same sample count from config.evSamples)."""
    return _ev_cached(id(data), data, container_id, luck, samples or data.config["evSamples"])


@lru_cache(maxsize=None)
def _ev_cached(_data_key, data, container_id, luck, samples):
    c = data.container_by_id[container_id]
    total = 0.0
    for s in range(samples):
        g = generate(data, c, luck, 1_000_003 + s)
        for it in g["items"]:
            total += it["value"]
    return total / samples


def crew_income_per_sec(data, stats):
    if stats["crew"] <= 0:
        return 0.0
    tier = int(min(stats["crewTier"], stats["tierAccess"]))
    c = next(c for c in data.buyable_containers() if c["tier"] == tier)
    profit = expected_value(data, c["id"], stats["luck"]) * stats["sellTotal"] - c["price"]
    return stats["crew"] * max(0.0, profit) / data.config["crew"]["secondsPerContainer"]
