"""The web prototype (JavaScript) and the simulator (Python) must build identical
containers from the same seed. Requires Node.js; skipped if it's not installed."""
import json
import os
import shutil
import subprocess
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import Data, Mulberry32, generate, upgrade_cost  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@unittest.skipUnless(shutil.which("node"), "node not installed")
class ParityTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        out = subprocess.run(["node", os.path.join(ROOT, "web", "tests", "parity_dump.js")],
                             check=True, capture_output=True, text=True).stdout
        cls.js = json.loads(out)
        cls.d = Data()

    def test_rng_matches(self):
        rng = Mulberry32(12345)
        self.assertEqual([rng.next() for _ in range(5)], self.js["rng"])

    def test_generation_matches(self):
        for g in self.js["gens"]:
            py = generate(self.d, self.d.container_by_id[g["c"]], g["luck"], g["seed"])
            self.assertEqual(py["cells"], g["cells"], g["c"])
            self.assertEqual([[i["id"], i["x"], i["y"], i["condition"]] for i in py["items"]], g["items"], g["c"])

    def test_costs_match(self):
        for u in self.d.upgrades:
            self.assertEqual([upgrade_cost(u, lv) for lv in range(u["maxLevel"])], self.js["costs"][u["id"]], u["id"])


if __name__ == "__main__":
    unittest.main()
