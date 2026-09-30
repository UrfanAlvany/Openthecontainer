---
name: check-ui
description: Verify the web prototype visually and functionally in a real browser (Playwright/Chromium) at desktop and phone sizes. Use after any UI, feel or gameplay change to web/.
---
# Check the UI

1. Run the smoke test (it starts its own static server):
   ```bash
   node web/tests/smoke.mjs
   ```
   It plays through buy → scrape → reveal → sell → upgrade with a fixed seed and saves
   screenshots to `web/tests/out/` at 1280×800 and 390×844.
2. Open the screenshots with the Read tool and actually look at them. Check:
   - Nothing overlaps or overflows; text readable on the phone size.
   - The current money, the next goal and the main action are obvious in 2 seconds.
   - Rarity colours are consistent between tiles, item cards and the log.
3. Check the browser console output the script prints: zero errors allowed.
4. If something looks off, fix it and re-run before committing.
