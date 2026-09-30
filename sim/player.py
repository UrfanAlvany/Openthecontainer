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
from engine import (RARITIES, Mulberry32, auction_outcome, nice_round, auction_setup, compute_stats, crew_income_per_sec,
                    expected_value, generate, open_time, prestige_stars, requirements_met, upgrade_cost)

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
        self.auctions = 0
        self.auctions_won = 0
        self.paid_ratio = []
        self.contracts = []
        self.contract_income = 0.0
        self.fill_contracts()

    # -------------------------------------------------------------- port contracts (same rules as the game)
    def fill_contracts(self):
        cfg = self.d.contracts
        s = self.stats() if hasattr(self, "levels") else None
        access = s["tierAccess"] if s else 1
        best = [c for c in self.d.buyable_containers() if c["tier"] <= access][-1]
        while len(self.contracts) < cfg["active"]:
            taken = [c["tpl"]["id"] for c in self.contracts]
            free = [t for t in cfg["templates"] if t["id"] not in taken]
            t = free[int(self.rng.next() * len(free))]
            self.contracts.append({"tpl": t, "progress": 0, "class": best["id"],
                                   "amount": nice_round(best["price"] * t.get("profitGuideMult", 0)),
                                   "reward": nice_round(best["price"] * t["rewardGuideMult"])})

    def contract_event(self, kind, **kw):
        changed = False
        for c in self.contracts:
            t = c["tpl"]
            if t["type"] != kind:
                continue
            hit = (kind == "find_rarity" and RARITIES.index(kw["rarity"]) >= RARITIES.index(t["rarity"])) or \
                  (kind == "condition" and kw["condition"] == t["condition"]) or \
                  (kind == "open_class" and kw["container"] == c["class"]) or \
                  (kind == "profit" and kw["profit"] >= c["amount"]) or kind == "file"
            if hit:
                c["progress"] = min(t["n"], c["progress"] + kw.get("count", 1))
                changed = True
        if not changed:
            return 0.0
        done = [c for c in self.contracts if c["progress"] >= c["tpl"]["n"]]
        self.contracts = [c for c in self.contracts if c["progress"] < c["tpl"]["n"]]
        paid = sum(c["reward"] for c in done)
        if done:
            self.fill_contracts()
        return paid

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
            seed = int(self.rng.next() * 2**32)
            g = generate(self.d, c, s["luck"], seed)
            paid = c["price"]
            if paid > 0 and c["sale"] == "auction":
                # Bid at auction up to (a little over) expected value; walk away otherwise.
                a = self.d.auction
                setup = auction_setup(self.d, c, g, seed, s["luck"])
                value = expected_value(self.d, c["id"], s["luck"]) * s["sellTotal"]
                won, price = auction_outcome(setup, min(self.money, value * a["simOverbid"]))
                self.t += a["simSecondsPerLot"] / self.human_speed
                self.auctions += 1
                if not won:
                    continue
                paid = price
                self.auctions_won += 1
                self.paid_ratio.append(price / c["price"])
            dt = open_time(self.d, c, s) / self.human_speed
            self.money -= paid
            found = 0.0
            kept_value = 0.0
            bonus = 0.0
            filed = 0
            for it in g["items"]:
                r = it["rarity"]
                if paid > 0:
                    bonus += self.contract_event("find_rarity", rarity=r)
                    bonus += self.contract_event("condition", condition=it["condition"])
                if r not in self.first_rarity:
                    self.first_rarity[r] = self.t + dt
                    if r in ("epic", "legendary"):
                        self.events.append((self.t + dt, "first_" + r, it["id"]))
                col = self.d.collection_of_item.get(it["id"])
                if col and it["id"] not in self.collected:
                    self.collected.add(it["id"])
                    filed += 1
                    self._check_collection(col)
                    kept_value += it["value"] * s["sellTotal"]
                    continue
                found += it["value"] * s["sellTotal"]
            if paid > 0:
                bonus += self.contract_event("open_class", container=c["id"])
                bonus += self.contract_event("profit", profit=found + kept_value - paid)
            if filed and paid > 0:
                bonus += self.contract_event("file", count=filed)
            self.contract_income += bonus
            crew = crew_income_per_sec(self.d, s) * dt
            self.t += dt
            self.money += found + bonus + crew
            self.lifetime += found + bonus + crew
            self.containers_opened[c["id"]] = self.containers_opened.get(c["id"], 0) + 1
            if paid > 0:
                # Same definition as the in-game tally: kept items count at their value.
                self.profit_by_tier.setdefault(c["id"], []).append(found + kept_value - paid)

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
        self.contracts = []
        self.fill_contracts()


def expected_ratio(data, container_id, stats):
    c = data.container_by_id[container_id]
    return expected_value(data, container_id, stats["luck"]) * stats["sellTotal"] / c["price"]
