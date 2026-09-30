// Browser smoke test: plays buy → scrape → reveal → tally → sell → upgrade at desktop and
// phone sizes, saves screenshots to web/tests/out/, fails on any console error.
//   node web/tests/smoke.mjs
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(here, "..");
const outDir = path.join(here, "out");
await mkdir(outDir, { recursive: true });

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };
const server = createServer(async (req, res) => {
  const p = path.join(webRoot, decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/\/$/, "/index.html"));
  try { res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(await readFile(p)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, r));
const url = `http://127.0.0.1:${server.address().port}/index.html`;

const launchOpts = {};
try { launchOpts.executablePath = playwright.chromium.executablePath(); } catch { /* default */ }
const browser = await playwright.chromium.launch();
const errors = [];

async function scrapeAll(page) {
  // Drag across every row of the grid until the container is done.
  for (let pass = 0; pass < 40; pass++) {
    const done = await page.evaluate(() => { const c = window.dockside.game.s.current; return !c || c.done; });
    if (done) return;
    await page.locator(".grid").scrollIntoViewIfNeeded();
    const box = await page.locator(".grid").boundingBox();
    const { rows, cols } = await page.evaluate(() => {
      const g = window.dockside.game, c = g.d.containerById[g.s.current.containerId];
      return { rows: c.rows, cols: c.cols };
    });
    for (let r = 0; r < rows; r++) {
      const y = box.y + (r + 0.5) * box.height / rows;
      await page.mouse.move(box.x + 2, y);
      await page.mouse.down();
      for (let c = 0; c < cols; c++) await page.mouse.move(box.x + (c + 0.5) * box.width / cols, y, { steps: 2 });
      await page.mouse.up();
    }
  }
  const hp = await page.evaluate(() => JSON.stringify(window.dockside.game.s.current.hp));
  throw new Error("container never finished, hp " + hp);
}

for (const vp of [{ name: "desktop", width: 1280, height: 800 }, { name: "phone", width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", m => { if (m.type() === "error" && !/fonts\.(googleapis|gstatic)/.test((m.location() && m.location().url) || "")) errors.push(`[${vp.name}] ${m.text()}`); });
  page.on("pageerror", e => errors.push(`[${vp.name}] ${e.message}`));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   // offline-safe
  await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto(url);
  await page.waitForSelector(".lot");
  await page.screenshot({ path: path.join(outDir, `${vp.name}-1-auction.png`), fullPage: true });

  // Buy the cheapest affordable lot.
  await page.locator(".lot .buy:not([disabled])").last().click();
  await page.waitForSelector(".grid");
  await page.locator(".grid").scrollIntoViewIfNeeded();
  const grid = await page.locator(".grid").boundingBox();
  await page.mouse.move(grid.x + 5, grid.y + grid.height / 2);
  await page.mouse.down();
  await page.mouse.move(grid.x + grid.width * 0.6, grid.y + grid.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.screenshot({ path: path.join(outDir, `${vp.name}-2-scraping.png`), fullPage: true });

  await scrapeAll(page);
  await page.waitForSelector(".tally .card", { timeout: 5000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `${vp.name}-3-tally.png`), fullPage: true });
  const before = await page.evaluate(() => window.dockside.game.s.money);
  await page.click("#tally-continue");
  await page.waitForSelector(".lot");
  const after = await page.evaluate(() => window.dockside.game.s.money);
  if (!(after >= before)) errors.push(`[${vp.name}] money went down after selling: ${before} → ${after}`);

  // Give cash and buy an upgrade through the UI.
  await page.evaluate(() => { window.dockside.game.s.money += 5000; });
  await page.waitForTimeout(350);
  const upBtn = page.locator(".up .btn:not([disabled])").first();
  await upBtn.click();
  const levels = await page.evaluate(() => Object.values(window.dockside.game.s.levels).reduce((a, b) => a + b, 0));
  if (levels < 1) errors.push(`[${vp.name}] upgrade purchase did not register`);
  await page.screenshot({ path: path.join(outDir, `${vp.name}-4-after-upgrade.png`), fullPage: true });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) errors.push(`[${vp.name}] page scrolls horizontally`);
  await ctx.close();
}

await browser.close();
server.close();
if (errors.length) { console.error("FAIL\n" + errors.join("\n")); process.exit(1); }
console.log("PASS — screenshots in web/tests/out/");
