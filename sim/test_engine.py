"""Rules and data sanity checks."""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import RARITIES, Data, compute_stats, generate, prestige_stars, upgrade_cost  # noqa: E402


class DataTest(unittest.TestCase):
    d = Data()

    def test_every_container_has_a_1x1_item_for_every_rarity_it_can_roll(self):
        for c in self.d.containers:
            pool = self.d.pool(c)
            for r in RARITIES:
                if c["rarityWeights"][r] > 0:
                    self.assertTrue(any(i["rarity"] == r and i["w"] == 1 and i["h"] == 1 for i in pool),
                                    f"{c['id']} has no 1x1 {r} item")

    def test_references_exist(self):
        for col in self.d.collections:
            for iid in col["items"]:
                self.assertIn(iid, self.d.item_by_id, col["id"])
            self.assertIn(col["reward"]["stat"], self.d.base_stats)
        for u in self.d.upgrades:
            self.assertIn(u["stat"], self.d.base_stats, u["id"])
            for r in u.get("requires", []):
                self.assertIn(r["id"], self.d.upgrade_by_id, u["id"])
            if "list" in u["cost"]:
                self.assertEqual(len(u["cost"]["list"]), u["maxLevel"], u["id"])

    def test_items_fit_their_containers(self):
        for c in self.d.containers:
            for it in self.d.pool(c):
                self.assertLessEqual(it["w"], c["cols"])
                self.assertLessEqual(it["h"], c["rows"])

    def test_container_prices_increase_with_tier(self):
        buyable = sorted(self.d.buyable_containers(), key=lambda c: c["tier"])
        for a, b in zip(buyable, buyable[1:]):
            self.assertLess(a["price"], b["price"])


class RulesTest(unittest.TestCase):
    d = Data()

    def test_generation_covers_every_cell_once_and_is_deterministic(self):
        for c in self.d.containers:
            for seed in range(20):
                g = generate(self.d, c, 3, seed)
                self.assertNotIn(-1, g["cells"])
                covered = [0] * (c["cols"] * c["rows"])
                for idx, it in enumerate(g["items"]):
                    for dy in range(it["h"]):
                        for dx in range(it["w"]):
                            cell = (it["y"] + dy) * c["cols"] + it["x"] + dx
                            covered[cell] += 1
                            self.assertEqual(g["cells"][cell], idx)
                self.assertEqual(set(covered), {1})
                self.assertEqual(g, generate(self.d, c, 3, seed))

    def test_luck_improves_value(self):
        c = self.d.container_by_id["premium"]
        base = sum(sum(i["value"] for i in generate(self.d, c, 0, s)["items"]) for s in range(300))
        lucky = sum(sum(i["value"] for i in generate(self.d, c, 10, s)["items"]) for s in range(300))
        self.assertGreater(lucky, base)

    def test_costs_grow(self):
        for u in self.d.upgrades:
            costs = [upgrade_cost(u, lv) for lv in range(u["maxLevel"])]
            self.assertEqual(costs, sorted(costs), u["id"])

    def test_stats_and_prestige(self):
        s = compute_stats(self.d, {"haggle": 2}, {"kitchen"}, stars=1)
        per = self.d.config["prestige"]["sellBonusPerStar"]
        self.assertAlmostEqual(s["sellTotal"], 1 + 0.2 + 0.03 + per)
        p = self.d.config["prestige"]["earningsPerStarSquared"]
        self.assertEqual(prestige_stars(self.d, p * 4 - 1), 1)
        self.assertEqual(prestige_stars(self.d, p * 4), 2)


if __name__ == "__main__":
    unittest.main()
