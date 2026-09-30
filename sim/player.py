"""A simulated player who plays the economy with a simple, human-like policy.

Policy (deliberately simple; real players are at least this smart):
  1. Buy upgrades while keeping cash for three containers; save up when a license is
     within ~5 minutes of income.
     Access (licenses) first, then the cheapest useful upgrade.
  2. Open the class with the best profit per second they can afford twice over,
     falling back to anything affordable, then to the free scrap pile.
  3. Keep the first copy of every collection item; sell everything else.
  4. Prestige when the reputation gain reaches `prestige_at_stars` (optional).
"""
from engine import (Mulberry32, compute_stats, crew_income_per_sec, expected_value, generate,
                    open_time, prestige_stars, requirements_met, upgrade_cost)

# Upgrades that only change information/feel. The simulated player buys them only
# when they are cheap relative to cash, like a real player would.
FEEL_ONLY = {"appraiser", "peek", "xray"}


class Run:
    def __init__(self, data, seed, minutes=120, prestige_at_stars=0, human_speed=1.0):
        self.d = data
        self.rng = Mulberry32(seed)
        self.seed = seed
        self.limit = minutes * 60.0
        self.prestige_at_stars = prestige_at_stars
        self.human_speed = human_speed
        self.t = 0.0
        self.money = float(data.config["startMoney"])
        self.lifetime = 0.0          # earnings in the current prestige run
        self.levels = {}
        self.collected = set()       # item ids kept for collections (persist)
        self.completed = set()       # completed collection ids (persist)
        self.stars = 0
        self.events = []             # (t, kind, detail)
        self.samples = []            # (t, money, income_rate)
        self.containers_opened = {}
        self.first_rarity = {}
        self.purchase_times = []
        self.profit_by_tier = {}
        self._last_sample = -1e9

    # -------------------------------------------------------------- helpers
    def stats(self):
        return compute_stats(self.d, self.levels, self.completed, self.stars)

    def log(self, kind, detail):
        self.events.append((self.t, kind, detail))

    def container_choice(self, s):
        options = [c for c in self.d.buyable_containers() if c["tier"] <= s["tierAccess"]]
        options.sort(key=lambda c: -c["tier"])
        # Among classes the player can bankroll twice, pick the best profit per second,
        # preferring the bigger class when it is within 10% of the best (it's more fun).
        rated = [(self._profit_rate(c, s), c) for c in options if self.money >= 2 * c["price"]]
        if rated:
            best = max(r for r, _ in rated)
            for r, c in rated:
                if r >= best * 0.9:
                    return c
        for c in options:
            if self.money >= c["price"]:
                return c
        return self.d.container_by_id[self.d.config["safetyNet"]["containerId"]]

    def buy_upgrades(self):
        bought = True
        while bought:
            bought = False
            s = self.stats()
            reserve = 3 * self.container_choice(s)["price"]
            cands = []
            for u in self.d.upgrades:
                lv = self.levels.get(u["id"], 0)
                if lv >= u["maxLevel"] or not requirements_met(u, self.levels):
                    continue
                cost = upgrade_cost(u, lv)
                if u["id"] in FEEL_ONLY and cost > 0.1 * self.money:
                    continue
                if u["id"] == "crew_training" and s["crewTier"] >= s["tierAccess"]:
                    continue
                priority = 0 if u["id"] == "license" else 1
                cands.append((priority, cost, u))
            cands.sort(key=lambda x: (x[0], x[1]))
            # Saving up: when the next license is within ~5 minutes of income, a real
            # player stops spending on small stuff that delays it.
            lic = next((c for c in cands if c[0] == 0), None)
            saving = lic is not None and lic[1] <= self.income_estimate(s) * 300
            for priority, cost, u in cands:
                if saving and priority == 1 and cost > 0.05 * lic[1]:
                    continue
                # Licenses may use the reserve: the player can keep playing the old tier.
                limit = self.money - reserve / 3 if priority == 0 else self.money - reserve
                if cost <= limit:
                    self.money -= cost
                    self.levels[u["id"]] = self.levels.get(u["id"], 0) + 1
                    self.purchase_times.append(self.t)
                    self.log("upgrade", f"{u['name']} → {self.levels[u['id']]}")
                    bought = True
                    break

    def _profit_rate(self, c, s):
        profit = expected_value(self.d, c["id"], s["luck"]) * s["sellTotal"] - c["price"]
        return profit / open_time(self.d, c, s)

    def income_estimate(self, s):
        """Expected $/s from opening the chosen container class plus the crew."""
        c = self.container_choice(s)
        if c["price"] <= 0:
            return crew_income_per_sec(self.d, s)
        profit = expected_value(self.d, c["id"], s["luck"]) * s["sellTotal"] - c["price"]
        return max(0.0, profit) / open_time(self.d, c, s) + crew_income_per_sec(self.d, s)

    def sample(self, s):
        if self.t - self._last_sample >= 10:
            self.samples.append((self.t, self.money, crew_income_per_sec(self.d, s)))
            self._last_sample = self.t

    # -------------------------------------------------------------- main loop
    def play(self):
        first_star_logged = False
        while self.t < self.limit:
            self.buy_upgrades()
            s = self.stats()
            self.sample(s)
            c = self.container_choice(s)
            dt = open_time(self.d, c, s) / self.human_speed
            self.money -= c["price"]
            seed = int(self.rng.next() * 2**32)
            g = generate(self.d, c, s["luck"], seed)
            found = 0.0
            for it in g["items"]:
                r = it["rarity"]
                if r not in self.first_rarity:
                    self.first_rarity[r] = self.t + dt
                    if r in ("epic", "legendary"):
                        self.events.append((self.t + dt, "first_" + r, it["id"]))
                col = self.d.collection_of_item.get(it["id"])
                if col and it["id"] not in self.collected:
                    self.collected.add(it["id"])
                    self._check_collection(col)
                    continue
                found += it["value"] * s["sellTotal"]
            crew = crew_income_per_sec(self.d, s) * dt
            self.t += dt
            self.money += found + crew
            self.lifetime += found + crew
            self.containers_opened[c["id"]] = self.containers_opened.get(c["id"], 0) + 1
            if c["price"] > 0:
                self.profit_by_tier.setdefault(c["id"], []).append(found - c["price"])

            gain = prestige_stars(self.d, self.lifetime)
            if gain >= 3 and not any(k == "prestige3" for (_t, k, _d) in self.events):
                self.log("prestige3", f"{gain} stars")
            if gain >= 1 and not first_star_logged:
                self.log("prestige_available", f"{gain} star(s)")
                first_star_logged = True
            if self.prestige_at_stars and gain >= self.prestige_at_stars:
                self._prestige(gain)
                first_star_logged = False
        return self

    def _check_collection(self, col_id):
        col = next(c for c in self.d.collections if c["id"] == col_id)
        if col_id not in self.completed and all(i in self.collected for i in col["items"]):
            self.completed.add(col_id)
            self.log("collection", col["name"])

    def _prestige(self, gain):
        self.stars += gain
        self.log("prestige", f"+{gain} stars (total {self.stars})")
        self.money = float(self.d.config["startMoney"])
        self.lifetime = 0.0
        self.levels = {}


def expected_ratio(data, container_id, stats):
    c = data.container_by_id[container_id]
    return expected_value(data, container_id, stats["luck"]) * stats["sellTotal"] / c["price"]
