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
        rv = load("rivals.json")
        self.auction = rv["auction"]
        self.rivals = rv["rivals"]
        self.contracts = load("contracts.json")
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


# ---------------------------------------------------------------- auction
MASK = 0xFFFFFFFF


def nice_round(x):
    """Round to 2 significant figures (same as JS niceRound)."""
    if x <= 0:
        return 0
    e = len(str(int(math.floor(x)))) - 2
    if e >= 0:
        step = 10 ** e
        return round_half_up(x / step) * step
    mult = 10 ** (-e)
    return round_half_up(x * mult) / mult


def peek_cells(container, seed, n):
    """Door-crack cells for a lot. The first container['peekTiles'] are what everyone sees;
    Door Crack upgrades reveal the next ones in the same sequence."""
    rng = Mulberry32((seed ^ 0x5BD1E995) & MASK)
    cells = list(range(container["cols"] * container["rows"]))
    out = []
    for _ in range(min(n, len(cells))):
        j = int(rng.next() * len(cells))
        out.append(cells.pop(j))
    return out


def _normal(rng):
    return (rng.next() + rng.next() + rng.next() - 1.5) * 2.0


def auction_setup(data, container, gen, seed, luck=0):
    """Opening bid, increment and each rival's private maximum for one lot.

    The door-crack signal is measured against the average for lots generated at the same
    luck, so a luckier player's lots don't make rivals bid more on average."""
    a = data.auction
    guide = container["price"]
    tiles = container["cols"] * container["rows"]
    base = peek_cells(container, seed, container["peekTiles"])
    avg_tile = expected_value(data, container["id"], luck) / tiles
    seen = 0.0
    for cell in base:
        it = gen["items"][gen["cells"][cell]]
        seen += it["value"] / (it["w"] * it["h"])
    ratio = seen / (avg_tile * len(base)) if base else 1.0
    lo, hi = a["signalClamp"]
    signal = min(hi, max(lo, (ratio - 1) * a["signalScale"]))
    rng = Mulberry32((seed ^ 0x9E3779B9) & MASK)
    pool = [r for r in data.rivals if r["minTier"] <= container["tier"]]
    count = a["minRivals"] + int(rng.next() * (a["maxRivals"] - a["minRivals"] + 1))
    rivals = []
    for _ in range(min(count, len(pool))):
        r = pool.pop(int(rng.next() * len(pool)))
        z = _normal(rng)
        mx = guide * r["mult"] * (1 + r["signalWeight"] * signal) * max(0.3, 1 + r["spread"] * z)
        rivals.append({"id": r["id"], "max": mx})
    return {"opening": nice_round(guide * a["openingRatio"]),
            "increment": nice_round(guide * a["incrementRatio"]),
            "signal": signal, "rivals": rivals}


def next_raiser(setup, next_bid, last):
    """Index of the rival who raises to next_bid, rotating after `last`; -1 if nobody will."""
    n = len(setup["rivals"])
    for k in range(1, n + 1):
        i = (last + k) % n
        if setup["rivals"][i]["max"] >= next_bid:
            return i
    return -1


def auction_outcome(setup, willingness):
    """Play a lot for a player who bids one increment at a time up to `willingness`.
    Returns (won, price)."""
    step = 0
    bid = setup["opening"]
    if willingness < bid:
        return False, None
    last = -1
    while True:
        nxt = setup["opening"] + (step + 1) * setup["increment"]
        i = next_raiser(setup, nxt, last)
        if i < 0:
            return True, bid
        last, step, bid = i, step + 1, nxt
        mine = setup["opening"] + (step + 1) * setup["increment"]
        if mine > willingness:
            return False, bid
        step, bid = step + 1, mine
