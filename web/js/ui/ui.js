/* DOM presentation for the prototype. Game rules live in js/core; this file only draws
 * and forwards input. */
(function (root) {
  "use strict";
  var DS = root.DS, A = DS.audio;
  var doc = root.document;
  var TIER_COLORS = { 0: "#5b5046", 1: "#8b4a2b", 2: "#1f6f8b", 3: "#a8342b", 4: "#4d5b2e", 5: "#2d3e8f" };
  var TIER_SPEC = { 0: "LOOSE PILE", 1: "10' GP", 2: "20' GP", 3: "40' HC", 4: "20' MIL-SPEC", 5: "40' REEFER" };
  var OWNER = { 0: "----", 1: "RSTU", 2: "STDU", 3: "PRMU", 4: "MILU", 5: "SEAU" };
  var APPRAISE = { 1: ["epic", "legendary"], 2: ["rare", "epic", "legendary"], 3: ["junk", "common", "rare", "epic", "legendary"] };

  function $(sel, el) { return (el || doc).querySelector(sel); }
  function h(tag, attrs, children) {
    var el = doc.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "style") el.setAttribute("style", attrs[k]);
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), attrs[k]);
      else if (k === "text") el.textContent = attrs[k];
      else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c != null) el.appendChild(typeof c === "string" ? doc.createTextNode(c) : c); });
    return el;
  }

  function money(v) {
    var a = Math.abs(v), sign = v < 0 ? "−" : "";
    if (a >= 1e9) return sign + "$" + (a / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return sign + "$" + (a / 1e6).toFixed(2) + "M";
    if (a >= 1e5) return sign + "$" + (a / 1e3).toFixed(0) + "K";
    if (a >= 10) return sign + "$" + Math.round(a).toLocaleString("en-US");
    return sign + "$" + a.toFixed(2);
  }

  /* ISO 6346-style container code with a real check digit. */
  function containerCode(tier, serial) {
    var owner = OWNER[tier] || "DKSU";
    var s = String(serial).padStart(6, "0");
    var vals = {}, v = 10;
    for (var c = 65; c <= 90; c++) { if (v % 11 === 0) v++; vals[String.fromCharCode(c)] = v++; }
    var sum = 0, str = owner + s;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i], n = /[A-Z]/.test(ch) ? vals[ch] : +ch;
      sum += n * Math.pow(2, i);
    }
    var check = (sum % 11) % 10;
    return owner + " " + s + " " + check;
  }

  // ------------------------------------------------------------------ particles
  var fx = { canvas: null, ctx: null, parts: [] };
  function fxInit() {
    fx.canvas = h("canvas", { class: "fx", "aria-hidden": "true" });
    doc.body.appendChild(fx.canvas);
    fx.ctx = fx.canvas.getContext("2d");
    function size() { fx.canvas.width = innerWidth * devicePixelRatio; fx.canvas.height = innerHeight * devicePixelRatio; }
    size(); addEventListener("resize", size);
  }
  function burst(x, y, color, n, speed, life, sizePx, gravity) {
    if (root.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) n = Math.ceil(n / 4);
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, s = speed * (0.4 + Math.random());
      fx.parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - speed * 0.4, life: life, max: life,
                      c: Array.isArray(color) ? color[i % color.length] : color, s: sizePx * (0.5 + Math.random()), g: gravity });
    }
  }
  function fxStep(dt) {
    var c = fx.ctx, k = devicePixelRatio;
    c.clearRect(0, 0, fx.canvas.width, fx.canvas.height);
    for (var i = fx.parts.length - 1; i >= 0; i--) {
      var p = fx.parts[i];
      p.life -= dt;
      if (p.life <= 0) { fx.parts.splice(i, 1); continue; }
      p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      c.globalAlpha = Math.min(1, p.life / p.max * 1.5);
      c.fillStyle = p.c;
      c.fillRect(p.x * k, p.y * k, p.s * k, p.s * k);
    }
    c.globalAlpha = 1;
  }

  // ------------------------------------------------------------------ UI
  function UI(game, rootEl) {
    this.g = game;
    this.d = game.d;
    this.el = rootEl;
    this.tab = "upgrades";
    this.soundOn = true;
    this.pending = [];      // reveal animations waiting on a build-up
    this.build();
    fxInit();
    var self = this;
    game.on(function (type, p) { self.onEvent(type, p); });
    this.renderAll();
  }

  UI.prototype.rarityColor = function (r) {
    for (var i = 0; i < this.d.config.rarities.length; i++) if (this.d.config.rarities[i].id === r) return this.d.config.rarities[i].color;
    return "#fff";
  };
  UI.prototype.rarityName = function (r) {
    for (var i = 0; i < this.d.config.rarities.length; i++) if (this.d.config.rarities[i].id === r) return this.d.config.rarities[i].name;
    return r;
  };

  UI.prototype.build = function () {
    var self = this;
    this.el.innerHTML = "";
    this.moneyEl = h("span", { class: "value", text: "$0" });
    this.crewEl = h("span", { class: "value", text: "$0/s" });
    this.starsEl = h("span", { class: "value", text: "0" });
    this.soundBtn = h("button", { class: "iconbtn", "aria-pressed": "true", onclick: function () {
      self.soundOn = !self.soundOn; A.setEnabled(self.soundOn);
      self.soundBtn.setAttribute("aria-pressed", String(self.soundOn));
      self.soundBtn.textContent = self.soundOn ? "Sound on" : "Sound off";
    } }, ["Sound on"]);
    var top = h("header", { class: "topbar" }, [
      h("div", { class: "brand" }, ["DOCKSIDE", h("small", { text: "PIER 4 · CONTAINER AUCTIONS" })]),
      h("div", { class: "cash" }, [
        h("div", { class: "stat" }, [h("span", { class: "label", text: "Yard crew" }), this.crewEl]),
        h("div", { class: "stat" }, [h("span", { class: "label", text: "Reputation ★" }), this.starsEl]),
        h("div", { class: "stat money" }, [h("span", { class: "label", text: "Cash" }), this.moneyEl]),
        this.soundBtn
      ])
    ]);
    this.stage = h("section", { class: "stage", "aria-live": "polite" });
    this.tabsEl = h("div", { class: "tabs", role: "tablist" });
    this.pane = h("div", { class: "tabpane", role: "tabpanel" });
    var panel = h("aside", { class: "panel" }, [this.tabsEl, this.pane]);
    this.footer = h("footer", { class: "footer" });
    this.el.appendChild(top);
    this.el.appendChild(h("div", { class: "layout" }, [this.stage, panel]));
    this.el.appendChild(this.footer);
    this.flashEl = h("div", { class: "flash" });
    doc.body.appendChild(this.flashEl);
    [["upgrades", "Upgrades"], ["collections", "Collections"], ["log", "Log"]].forEach(function (t) {
      var b = h("button", { role: "tab", id: "tab-" + t[0], "aria-selected": String(self.tab === t[0]), onclick: function () {
        self.tab = t[0]; A.click(); self.renderPanel();
      } }, [t[1]]);
      self.tabsEl.appendChild(b);
    });
  };

  UI.prototype.renderAll = function () { this.renderTop(); this.renderStage(); this.renderPanel(); this.renderFooter(); };

  UI.prototype.renderTop = function () {
    this.moneyEl.textContent = money(this.g.s.money);
    this.crewEl.textContent = money(this.g.crewRate()) + "/s";
    this.starsEl.textContent = String(this.g.s.stars);
  };

  UI.prototype.bumpMoney = function () {
    var el = this.moneyEl;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  };

  UI.prototype.renderFooter = function () {
    var st = this.g.s.stats, best = st.best;
    this.footer.innerHTML = "";
    this.footer.appendChild(h("span", { text: "Containers opened: " + st.opened }));
    this.footer.appendChild(h("span", { text: "Legendaries found: " + st.found.legendary }));
    if (best) this.footer.appendChild(h("span", { text: "Best container: " + money(best.profit) + " profit" }));
    var self = this, armed = false;
    var wipe = h("button", { class: "iconbtn", onclick: function () {
      if (!armed) { armed = true; wipe.textContent = "Tap again to erase your save"; setTimeout(function () { armed = false; wipe.textContent = "New game"; }, 3000); return; }
      self.g.wipe(); self.renderAll();
    } }, ["New game"]);
    this.footer.appendChild(wipe);
  };

  // ------------------------------------------------------------------ stage: auction
  UI.prototype.renderStage = function () {
    if (this.stopScrape) this.stopScrape();
    this.stage.innerHTML = "";
    if (this.g.s.current) this.renderYard();
    else this.renderAuction();
  };

  UI.prototype.oddsBlock = function (c) {
    var st = this.g.stats();
    var w = DS.rules.rarityWeights(this.d, c, st.luck), total = w.reduce(function (a, b) { return a + b; }, 0);
    var self = this, bar = h("div", { class: "odds", "aria-hidden": "true" }), legend = h("div", { class: "odds-legend" });
    DS.rules.RARITIES.forEach(function (r, i) {
      var pct = w[i] / total * 100;
      if (pct <= 0) return;
      bar.appendChild(h("span", { style: "width:" + pct + "%;background:" + self.rarityColor(r) }));
      legend.appendChild(h("span", {}, [h("i", { style: "background:" + self.rarityColor(r) }), self.rarityName(r) + " " + (pct < 1 ? pct.toFixed(2) : pct.toFixed(1)) + "%"]));
    });
    return [h("div", { class: "peek-label", text: "Odds per item" }), bar, legend];
  };

  UI.prototype.renderAuction = function () {
    var self = this, g = this.g;
    var access = g.stats().tierAccess;
    this.stage.appendChild(h("div", { class: "stage-head" }, [
      h("h2", { text: "Today's lots" }),
      h("span", { class: "sub", text: "Peek through the door crack, check the odds, place your bid." })
    ]));
    var lots = h("div", { class: "lots" });
    g.s.lots.forEach(function (lot, i) {
      var p = g.lotPreview(lot), c = p.container;
      var peek = h("div", { class: "peek", style: "grid-template-columns:repeat(" + c.cols + ",1fr)" });
      var seen = {}; p.peek.forEach(function (cell) { seen[cell] = true; });
      var xray = g.stats().xray >= 2;
      for (var k = 0; k < c.cols * c.rows; k++) {
        var it = p.gen.items[p.gen.cells[k]];
        if (seen[k]) {
          peek.appendChild(h("div", { class: "pc seen", style: "--rc:" + self.rarityColor(it.rarity), title: self.rarityName(it.rarity) }, [self.d.itemById[it.id].icon]));
        } else {
          peek.appendChild(h("div", { class: "pc" + (xray && (it.w > 1 || it.h > 1) ? " outline" : "") }));
        }
      }
      var afford = g.canAfford(c.price);
      var card = h("article", { class: "lot" }, [
        h("div", { class: "box", style: "--c:" + TIER_COLORS[c.tier] }, [
          h("div", { class: "code", text: containerCode(c.tier, lot.serial) }),
          h("div", { class: "spec", text: TIER_SPEC[c.tier] + " · " + c.cols * c.rows + " TILES" }),
          h("span", { class: "tierbadge", text: "CLASS " + c.tier })
        ]),
        h("div", { class: "body" }, [
          h("h3", { text: c.name }),
          h("p", { class: "blurb", text: c.blurb }),
          h("div", { class: "peek-label", text: "Door crack · " + p.peek.length + " tiles visible" }),
          peek
        ].concat(self.oddsBlock(c)).concat([
          h("button", { class: "btn wide buy", disabled: afford ? null : "disabled", onclick: function () {
            A.unlock(); if (g.buyLot(i)) A.buy();
          } }, [afford ? "Buy for " + money(c.price) : "Need " + money(c.price)])
        ]))
      ]);
      lots.appendChild(card);
    });
    this.stage.appendChild(lots);
    if (g.safetyNetAvailable()) {
      var sc = this.d.containerById[this.d.config.safetyNet.containerId];
      this.stage.appendChild(h("div", { class: "lot", style: "margin-top:14px" }, [
        h("div", { class: "body" }, [
          h("h3", { text: "Out of cash? " + sc.name }),
          h("p", { class: "blurb", text: sc.blurb + " Free to pick through while you can't afford a lot." }),
          h("button", { class: "btn ghost wide", onclick: function () { A.unlock(); g.takeScrapPile(); } }, ["Pick through it"])
        ])
      ]));
    }
    var next = this.d.containers.filter(function (c) { return c.tier === access + 1; })[0];
    if (next) this.stage.appendChild(h("p", { class: "hint", text: "Next class: " + next.name + " — buy an Auction License upgrade to bid on it." }));
  };

  // ------------------------------------------------------------------ stage: the open container
  UI.prototype.renderYard = function () {
    var self = this, g = this.g, cur = g.s.current, c = this.d.containerById[cur.containerId];
    var st = g.stats();
    this.paidEl = h("span", { class: "v", text: money(cur.price) });
    this.foundEl = h("span", { class: "v", text: money(g.foundValue()) });
    this.profitEl = h("span", { class: "v" });
    var head = h("div", { class: "stage-head" }, [
      h("h2", { text: c.name }),
      h("span", { class: "sub", text: cur.serial ? containerCode(c.tier, cur.serial) : "Free pile" })
    ]);
    var meter = h("div", { class: "meter" }, [
      h("div", {}, [h("span", { class: "k", text: "Paid" }), this.paidEl]),
      h("div", {}, [h("span", { class: "k", text: "Found" }), this.foundEl]),
      h("div", {}, [h("span", { class: "k", text: "Profit" }), this.profitEl])
    ]);
    var vars = "--cols:" + c.cols + ";--rows:" + c.rows;
    this.gridEl = h("div", { class: "grid", style: vars, role: "application", "aria-label": "Container. Drag across the rust to scrape it off." });
    this.itemEls = [];
    cur.gen.items.forEach(function (it, idx) {
      var def = self.d.itemById[it.id], ist = cur.itemState[idx];
      var el = h("div", {
        class: "item r-" + it.rarity + (ist.revealed ? " revealed" : "") + (ist.sold ? " sold" : ""),
        style: "grid-column:" + (it.x + 1) + " / span " + it.w + ";grid-row:" + (it.y + 1) + " / span " + it.h +
               ";--rc:" + self.rarityColor(it.rarity) + ";--iw:" + it.w + ";--ih:" + it.h
      }, [h("span", { class: "glyph", text: def.icon })]);
      if (ist.revealed) self.decorateItem(idx, el);
      self.itemEls.push(el);
      self.gridEl.appendChild(el);
    });
    this.tilesEl = h("div", { class: "tiles", style: vars });
    this.tileEls = [];
    for (var i = 0; i < cur.hp.length; i++) {
      var t = h("div", { class: "tile" + (cur.hp[i] <= 0 ? " gone" : "") });
      t.style.setProperty("--hp", String(cur.hp[i] / c.rustHp));
      this.tileEls.push(t);
      this.tilesEl.appendChild(t);
    }
    this.gridEl.appendChild(this.tilesEl);
    if (st.xray >= 1) {
      var xr = h("div", { class: "xray", style: vars, "aria-hidden": "true" });
      cur.gen.items.forEach(function (it) {
        if (it.w * it.h > 1) xr.appendChild(h("div", { style: "grid-column:" + (it.x + 1) + " / span " + it.w + ";grid-row:" + (it.y + 1) + " / span " + it.h }));
      });
      this.gridEl.appendChild(xr);
    }
    var frame = h("div", { class: "frame", style: "--c:" + TIER_COLORS[c.tier] + ";margin-top:22px" }, [this.gridEl]);
    this.findsEl = h("div", { class: "finds" });
    var yard = h("div", { class: "yard" }, [head, meter, frame,
      h("p", { class: "hint", text: "Drag across the rust to scrape. Hold still to keep scraping." }), this.findsEl]);
    this.stage.appendChild(yard);
    this.bindScrape();
    this.updateMeter();
    this.updateGlints();
    cur.gen.items.forEach(function (it, idx) { if (cur.itemState[idx].revealed) self.addFind(idx, false); });
    if (cur.done && cur.tally) this.showTally(cur.tally, true);
  };

  UI.prototype.decorateItem = function (idx, el) {
    var cur = this.g.s.current, it = cur.gen.items[idx], ist = cur.itemState[idx];
    var sale = ist.sold ? ist.soldFor : it.value * this.g.stats().sellTotal;
    var tag = el.querySelector(".tag");
    if (!tag) el.appendChild(h("span", { class: "tag", text: money(sale) }));
    else tag.textContent = money(sale);
    var k = el.querySelector(".keep");
    if (ist.kept && !k) el.appendChild(h("span", { class: "keep", title: "Kept for a collection", text: "📌" }));
    if (!ist.kept && k) k.remove();
    el.classList.toggle("sold", !!ist.sold);
  };

  UI.prototype.updateMeter = function () {
    var cur = this.g.s.current; if (!cur || !this.foundEl) return;
    var found = this.g.foundValue();
    this.foundEl.textContent = money(found);
    var p = found - cur.price;
    this.profitEl.textContent = (p >= 0 ? "+" : "") + money(p);
    this.profitEl.className = "v " + (p >= 0 ? "gain" : "loss");
  };

  /* Honest glints: appraiser level, or a big item already partly uncovered. */
  UI.prototype.updateGlints = function () {
    var cur = this.g.s.current; if (!cur || !this.tileEls) return;
    var lvl = this.g.stats().appraiser, show = APPRAISE[Math.min(3, lvl)] || [];
    var partial = {};
    var c = this.d.containerById[cur.containerId];
    cur.gen.items.forEach(function (it, idx) {
      if (cur.itemState[idx].revealed || (it.rarity !== "epic" && it.rarity !== "legendary")) return;
      for (var dy = 0; dy < it.h; dy++) for (var dx = 0; dx < it.w; dx++)
        if (cur.hp[(it.y + dy) * c.cols + it.x + dx] <= 0) partial[idx] = true;
    });
    for (var i = 0; i < this.tileEls.length; i++) {
      var t = this.tileEls[i];
      if (cur.hp[i] <= 0) { t.classList.remove("glint"); continue; }
      var idx = cur.gen.cells[i], it = cur.gen.items[idx];
      var on = show.indexOf(it.rarity) !== -1 || partial[idx];
      t.classList.toggle("glint", !!on);
      if (on) t.style.setProperty("--gc", this.rarityColor(it.rarity));
    }
  };

  UI.prototype.bindScrape = function () {
    var self = this, grid = this.gridEl, down = false, lastCell = -1, holdTimer = null, activeId = null;
    var repeatMs = this.d.config.scraping.holdRepeatMs;
    function cellAt(e) {
      var r = grid.getBoundingClientRect(), c = self.d.containerById[self.g.s.current.containerId];
      var x = Math.floor((e.clientX - r.left) / r.width * c.cols), y = Math.floor((e.clientY - r.top) / r.height * c.rows);
      if (x < 0 || y < 0 || x >= c.cols || y >= c.rows) return -1;
      return y * c.cols + x;
    }
    function hit(cell, e) {
      if (cell < 0 || !self.g.s.current || self.g.s.current.done) return;
      self.lastPointer = { x: e.clientX, y: e.clientY };
      self.g.scrape(cell);
    }
    function stopHold() { if (holdTimer) { clearInterval(holdTimer); holdTimer = null; } }
    grid.addEventListener("pointerdown", function (e) {
      if (down && e.pointerId !== activeId) return;   // one scraping finger at a time
      A.unlock();
      down = true; activeId = e.pointerId;
      try { grid.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      lastCell = cellAt(e); hit(lastCell, e);
      stopHold();
      holdTimer = setInterval(function () { if (down) hit(lastCell, self.lastPointer ? { clientX: self.lastPointer.x, clientY: self.lastPointer.y } : e); }, repeatMs);
      e.preventDefault();
    });
    grid.addEventListener("pointermove", function (e) {
      if (!down || e.pointerId !== activeId) return;
      var cell = cellAt(e);
      self.lastPointer = { x: e.clientX, y: e.clientY };
      if (cell !== lastCell) { lastCell = cell; hit(cell, e); }
    });
    function up(e) { if (e && e.pointerId != null && e.pointerId !== activeId) return; down = false; activeId = null; stopHold(); }
    grid.addEventListener("pointerup", up);
    grid.addEventListener("pointercancel", up);
    grid.addEventListener("lostpointercapture", up);
    doc.addEventListener("pointerup", up);
    this.stopScrape = function () { down = false; stopHold(); doc.removeEventListener("pointerup", up); };
  };

  UI.prototype.tileCenter = function (cell) {
    var t = this.tileEls && this.tileEls[cell]; if (!t) return { x: innerWidth / 2, y: innerHeight / 2 };
    var r = t.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  UI.prototype.itemCenter = function (idx) {
    var el = this.itemEls && this.itemEls[idx]; if (!el) return { x: innerWidth / 2, y: innerHeight / 2 };
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  UI.prototype.floatText = function (x, y, text, color, big) {
    var el = h("div", { class: "float" + (big ? " big" : ""), style: "left:" + x + "px;top:" + y + "px;--fc:" + color, text: text });
    doc.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1200);
  };

  UI.prototype.flash = function (color) {
    this.flashEl.style.setProperty("--fc", color);
    this.flashEl.classList.remove("on"); void this.flashEl.offsetWidth; this.flashEl.classList.add("on");
  };
  UI.prototype.shake = function () {
    this.stage.classList.remove("shake"); void this.stage.offsetWidth; this.stage.classList.add("shake");
  };
  UI.prototype.banner = function (text, sub, color) {
    var b = h("div", { class: "banner", style: "--bc:" + color }, [h("b", { text: text }), h("span", { text: sub })]);
    this.stage.appendChild(b);
    setTimeout(function () { b.remove(); }, 1900);
  };

  UI.prototype.addFind = function (idx, animate) {
    var cur = this.g.s.current, it = cur.gen.items[idx], def = this.d.itemById[it.id], ist = cur.itemState[idx];
    if (it.rarity === "junk" && !this.d.collectionOfItem[it.id]) return;  // keep the list about the good stuff
    var cond = this.d.config.conditions.filter(function (c) { return c.id === it.condition; })[0];
    var colId = this.d.collectionOfItem[it.id];
    var colNote = null;
    if (ist.kept && colId) {
      var col = this.d.collections.filter(function (c) { return c.id === colId; })[0];
      var have = col.items.filter(function (id) { return this.g.s.collected.indexOf(id) !== -1; }, this).length + 1;
      colNote = h("small", { text: "📌 " + col.name + " " + have + "/" + col.items.length });
    }
    var row = h("div", { class: "find" + (colNote ? " col" : ""), style: "--rc:" + this.rarityColor(it.rarity) }, [
      h("span", { class: "ico", text: def.icon }),
      h("span", { class: "n" }, [def.name, h("small", { text: cond.name + " · " + this.rarityName(it.rarity) }), colNote]),
      h("span", { class: "val", text: money(it.value * this.g.stats().sellTotal) })
    ]);
    this.findsEl.insertBefore(row, this.findsEl.firstChild);
    if (animate) row.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 220 });
  };

  // ------------------------------------------------------------------ events
  UI.prototype.onEvent = function (type, p) {
    var self = this;
    switch (type) {
      case "lots": case "wipe": case "prestige":
        if (!this.g.s.current) this.renderStage();
        this.renderTop(); this.renderPanel(); this.renderFooter();
        if (type === "prestige") { A.fanfare(); this.toast("Business sold. +" + p.gain + " reputation ★ — everything sells for more now."); }
        break;
      case "start":
        this.renderStage();
        this.renderTop();
        this.renderPanel();
        break;
      case "tile": {
        var t = this.tileEls && this.tileEls[p.cell]; if (!t) break;
        var c = this.d.containerById[this.g.s.current.containerId];
        t.style.setProperty("--hp", String(p.hp / c.rustHp));
        if (p.silent) { if (p.hp <= 0) t.classList.add("gone"); break; }
        var pos = this.tileCenter(p.cell);
        if (p.hp <= 0) {
          t.classList.add("gone");
          A.chip();
          burst(pos.x, pos.y, ["#7a3b1d", "#a4552a", "#5a2a15", "#c77a45"], 7, 160, 0.6, 4, 520);
          this.updateGlints();
        } else {
          t.classList.add("hit"); setTimeout(function () { t.classList.remove("hit"); }, 90);
          A.scrape();
          burst(pos.x, pos.y, ["#7a3b1d", "#a4552a"], 2, 90, 0.35, 3, 500);
        }
        break;
      }
      case "reveal": this.onReveal(p); break;
      case "sold":
        if (this.itemEls && this.itemEls[p.index]) this.decorateItem(p.index, this.itemEls[p.index]);
        this.updateMeter();
        this.renderTop(); this.bumpMoney();
        if (p.auto && this.g.s.current && !this.g.s.current.done) {
          var pc = this.itemCenter(p.index);
          this.floatText(pc.x, pc.y - 10, "+" + money(p.sale), "#8a8f98");
        }
        break;
      case "done":
        setTimeout(function () { self.showTally(p, false); }, 550);
        break;
      case "finished":
        if (p.completed.length) {
          A.fanfare();
          this.toast("Collection complete: " + p.completed.map(function (c) { return c.name + " (" + c.reward.text + ")"; }).join(", "));
        } else if (p.filed.length) {
          this.toast("Filed " + p.filed.length + " item" + (p.filed.length > 1 ? "s" : "") + " in your collection book.");
        }
        this.renderAll();
        break;
      case "upgrade":
        A.cash();
        this.renderTop(); this.renderPanel();
        if (this.g.s.current) { this.updateGlints(); }
        else this.renderStage();
        break;
      case "keep":
        if (this.itemEls) this.itemEls.forEach(function (el, i) { self.decorateItem(i, el); });
        if (this.stage.querySelector(".tally") && this.g.s.current && this.g.s.current.tally) {
          this.showTally(this.g.s.current.tally, true);
        }
        break;
    }
  };

  UI.prototype.onReveal = function (p) {
    var self = this, it = p.item, color = this.rarityColor(it.rarity);
    var el = this.itemEls && this.itemEls[p.index];
    this.updateMeter();
    if (p.silent) { if (el) { el.classList.add("revealed"); this.decorateItem(p.index, el); } this.addFind(p.index, false); return; }
    var big = it.rarity === "epic" || it.rarity === "legendary";
    function payoff() {
      if (!el) return;
      el.classList.add("revealed"); self.decorateItem(p.index, el);
      var c = self.itemCenter(p.index);
      A.reveal(it.rarity);
      var n = { junk: 4, common: 10, rare: 24, epic: 60, legendary: 140 }[it.rarity];
      burst(c.x, c.y, [color, "#ffffff", color], n, big ? 380 : 220, big ? 1.2 : 0.7, big ? 5 : 4, 300);
      self.floatText(c.x, c.y - 16, "+" + money(p.sale), color, big);
      if (big) {
        self.flash(color); self.shake();
        self.banner(it.rarity === "legendary" ? "LEGENDARY!" : "EPIC FIND", p.def.name + " · " + money(p.sale), color);
      }
      if (p.forCollection) setTimeout(function () { self.toast("New for your collection: " + p.def.name + " 📌"); }, big ? 900 : 100);
      self.addFind(p.index, true);
    }
    if (big && !(root.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      // Build-up: the result is already decided; this only stages it.
      A.charge();
      if (el) el.animate([{ transform: "scale(1)" }, { transform: "scale(1.04) rotate(-1deg)" }, { transform: "scale(.98) rotate(1deg)" }, { transform: "scale(1)" }], { duration: 420 });
      setTimeout(payoff, 420);
    } else payoff();
  };

  // ------------------------------------------------------------------ tally
  UI.prototype.showTally = function (t, restoring) {
    var self = this, g = this.g, cur = g.s.current;
    if (!cur) return;
    var old = this.stage.querySelector(".tally"); if (old) old.remove();
    var c = this.d.containerById[t.containerId];
    var profit = t.found - t.paid, ratio = t.paid > 0 ? t.found / t.paid : null;
    var verdict, cls = profit >= 0 ? "gain" : "loss";
    if (t.paid === 0) verdict = "Free finds are the best finds.";
    else if (ratio >= 5) verdict = "Jackpot. " + ratio.toFixed(1) + "× your money.";
    else if (ratio >= 1.5) verdict = "Big score. " + ratio.toFixed(1) + "× your money.";
    else if (profit >= 0) verdict = "Small profit. Every dollar counts.";
    else if (ratio >= 0.6) verdict = "Close, but a loss this time.";
    else verdict = "A dud. It happens to the best of us.";
    var keeps = h("div", { class: "keeps" });
    cur.gen.items.forEach(function (it, idx) {
      var colId = self.d.collectionOfItem[it.id], ist = cur.itemState[idx];
      if (!colId || ist.sold || g.s.collected.indexOf(it.id) !== -1) return;
      var col = self.d.collections.filter(function (x) { return x.id === colId; })[0], def = self.d.itemById[it.id];
      var id = "keep-" + idx;
      var cb = h("input", { type: "checkbox", id: id, checked: ist.kept ? "checked" : null, onchange: function () { g.toggleKeep(idx); } });
      keeps.appendChild(h("div", { class: "keeprow" }, [
        h("label", { for: id }, [cb, h("span", { text: def.icon + " Keep " + def.name }), h("small", { text: "for " + col.name + " — or sell for " + money(it.value * g.stats().sellTotal) })])
      ]));
    });
    var card = h("div", { class: "card", role: "dialog", "aria-label": "Container tally" }, [
      h("h3", { text: c.name + " — tally" }),
      h("div", { class: "rows" }, [
        h("div", {}, [h("span", { class: "k", text: "Paid" }), h("span", { class: "v", text: money(t.paid) })]),
        h("div", {}, [h("span", { class: "k", text: "Found" }), h("span", { class: "v", text: money(t.found) })]),
        h("div", {}, [h("span", { class: "k", text: "Profit" }), h("span", { class: "v " + cls, style: "color:var(--" + cls + ")", text: (profit >= 0 ? "+" : "") + money(profit) })])
      ]),
      h("div", { class: "verdict", text: verdict }),
      h("div", { class: "cashline", text: self.cashLine() }),
      keeps.childNodes.length ? h("div", { class: "peek-label", text: "Collection items" }) : null,
      keeps.childNodes.length ? keeps : null,
      h("button", { class: "btn wide", id: "tally-continue", onclick: function () { A.cash(); g.finishContainer(); } }, ["Sell the rest & back to the auction"])
    ]);
    var wrap = h("div", { class: "tally " + cls }, [card]);
    this.stage.appendChild(wrap);
    if (!restoring && t.paid > 0) {
      if (profit < 0) A.dud();
      else if (ratio >= 1.5) { A.fanfare(); var r = card.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 40, ["#5bd68e", "#ffae42", "#ffffff"], 50, 300, 1.1, 4, 350); }
      else A.cash();
    }
    var btn = card.querySelector("#tally-continue"); if (btn) btn.focus({ preventScroll: true });
  };

  UI.prototype.cashLine = function () {
    var g = this.g, cash = g.cashValue(), kept = g.foundValue() - cash;
    if (kept < 0.005) return "All of it goes to your cash: " + money(cash) + ".";
    return "Cash in: " + money(cash) + " · kept for collections: " + money(kept) + " (their value counts in Found).";
  };

  // ------------------------------------------------------------------ panel
  UI.prototype.renderPanel = function () {
    var self = this;
    Array.prototype.forEach.call(this.tabsEl.children, function (b) { b.setAttribute("aria-selected", String(b.id === "tab-" + self.tab)); });
    this.pane.innerHTML = "";
    if (this.tab === "upgrades") this.renderUpgrades();
    else if (this.tab === "collections") this.renderCollections();
    else this.renderLog();
  };

  UI.prototype.renderUpgrades = function () {
    var self = this, g = this.g;
    this.upButtons = [];
    this.goalEl = h("div", { class: "goal" });
    this.pane.appendChild(this.goalEl);
    this.updateGoal();
    this.d.categories.forEach(function (cat) {
      var ups = self.d.upgrades.filter(function (u) { return u.category === cat.id; });
      self.pane.appendChild(h("div", { class: "cat", text: cat.name }));
      ups.forEach(function (u) {
        var info = g.upgradeInfo(u);
        var pips = u.maxLevel <= 12 ? "●".repeat(info.level) + "○".repeat(u.maxLevel - info.level) : "Level " + info.level + " / " + u.maxLevel;
        var title = u.name + (info.nextName ? ": " + info.nextName : "");
        var btn = h("button", { class: "btn", onclick: function () { A.unlock(); g.buyUpgrade(u.id); } },
                    [info.maxed ? "Maxed" : money(info.cost)]);
        var row = h("div", { class: "up" + (info.unlocked ? "" : " locked") + (info.maxed ? " maxed" : "") }, [
          h("span", { class: "ico", text: u.icon }),
          h("div", {}, [
            h("div", { class: "t", text: title }),
            h("div", { class: "pips", text: pips }),
            h("div", { class: "d", text: info.unlocked ? u.desc : "Requires " + (u.requires || []).map(function (r) { return self.d.upgradeById[r.id].name + " " + r.level; }).join(", ") })
          ]),
          btn
        ]);
        self.upButtons.push({ btn: btn, u: u });
        self.pane.appendChild(row);
      });
    });
    var pbtn = h("button", { class: "btn ghost wide", onclick: function () {
      var gain = g.prestigePreview();
      if (gain < 1 || g.s.current) return;
      if (!self.prestigeArmed) {
        self.prestigeArmed = true;
        pbtn.textContent = "Tap again: reset cash & upgrades for +" + gain + " ★";
        clearTimeout(self.prestigeDisarm);
        self.prestigeDisarm = setTimeout(function () { self.prestigeArmed = false; self.updatePrestige(); }, 4000);
        return;
      }
      self.prestigeArmed = false;
      g.prestige();
    } });
    this.prestigeBtn = pbtn;
    this.prestigeArmed = false;
    this.pane.appendChild(h("div", { class: "prestige" }, [
      h("h4", { text: "Sell the business" }),
      h("div", { text: "Start over with a better reputation. Each ★ adds +" + Math.round(this.d.config.prestige.sellBonusPerStar * 100) + "% to everything you sell, forever. Collections are kept." }),
      h("div", { class: "d", text: "Earned this business: " + money(g.s.lifetime) + ". Next ★ at " + money(Math.pow(g.prestigePreview() + 1, 2) * this.d.config.prestige.earningsPerStarSquared) + "." }),
      pbtn
    ]));
    this.updateAffordability();
  };

  UI.prototype.updatePrestige = function () {
    var b = this.prestigeBtn; if (!b || this.prestigeArmed) return;
    var g = this.g, gain = g.prestigePreview();
    b.disabled = gain < 1 || !!g.s.current;
    b.textContent = gain < 1 ? "Not worth selling yet" : g.s.current ? "Finish this container first" : "Sell the business for +" + gain + " ★";
  };

  UI.prototype.updateGoal = function () {
    if (!this.goalEl) return;
    var goal = this.g.nextGoal();
    this.goalEl.innerHTML = "";
    if (!goal) { this.goalEl.appendChild(h("b", { text: "Everything affordable is yours. Open bigger containers!" })); return; }
    var pct = Math.max(0, Math.min(100, this.g.s.money / goal.cost * 100));
    this.goalEl.appendChild(h("div", {}, [h("b", { text: "Next goal: " }), goal.upgrade.icon + " " + goal.upgrade.name + " — " + money(goal.cost)]));
    var bar = h("div", { class: "bar" }, [h("i", { style: "width:" + pct + "%" })]);
    this.goalEl.appendChild(bar);
  };

  UI.prototype.updateAffordability = function () {
    var g = this.g;
    (this.upButtons || []).forEach(function (o) {
      var info = g.upgradeInfo(o.u);
      o.btn.disabled = info.maxed || !info.unlocked || !g.canAfford(info.cost);
    });
    this.updateGoal();
    this.updatePrestige();
  };

  UI.prototype.renderCollections = function () {
    var self = this, g = this.g;
    this.pane.appendChild(h("div", { class: "d", style: "color:var(--muted);font-size:13px", text: "Keep the first copy of each item to complete a set. Rewards are permanent, even after you sell the business." }));
    this.d.collections.forEach(function (col) {
      var have = col.items.filter(function (id) { return g.s.collected.indexOf(id) !== -1; }).length;
      var done = g.s.completed.indexOf(col.id) !== -1;
      var slots = h("div", { class: "slots" });
      col.items.forEach(function (id) {
        var def = self.d.itemById[id], got = g.s.collected.indexOf(id) !== -1;
        slots.appendChild(h("div", { class: "slot" + (got ? "" : " empty"), style: "--rc:" + self.rarityColor(def.rarity), title: def.name + (got ? "" : " (not found yet)") }, [got ? def.icon : "?"]));
      });
      self.pane.appendChild(h("div", { class: "col-card" + (done ? " done" : "") }, [
        h("header", {}, [h("b", { text: col.icon + " " + col.name }), h("span", { class: "pips", style: "font-family:var(--font-num)", text: have + " / " + col.items.length })]),
        h("div", { class: "reward", text: (done ? "Complete: " : "Reward: ") + col.reward.text }),
        slots,
        h("div", { class: "reward", text: col.items.map(function (id) { return self.d.itemById[id].name; }).join(" · ") })
      ]));
    });
  };

  UI.prototype.renderLog = function () {
    var self = this, list = h("ul", { class: "log" });
    if (!this.g.s.history.length) list.appendChild(h("li", { text: "No containers opened yet. Buy your first lot." }));
    this.g.s.history.forEach(function (t) {
      var c = self.d.containerById[t.containerId];
      list.appendChild(h("li", {}, [h("span", { text: c.name + (t.serial ? " · " + containerCode(c.tier, t.serial) : "") }),
        h("span", { class: t.profit >= 0 ? "gain" : "loss", text: (t.profit >= 0 ? "+" : "") + money(t.profit) })]));
    });
    this.pane.appendChild(list);
  };

  UI.prototype.toast = function (text) {
    var old = doc.querySelector(".toast"); if (old) old.remove();
    var t = h("div", { class: "toast", role: "status", text: text });
    doc.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  };

  // ------------------------------------------------------------------ frame loop
  UI.prototype.loop = function () {
    var self = this, last = performance.now(), acc = 0, autoAcc = 0, saveAcc = 0;
    function frame(now) {
      var dt = Math.min(0.1, (now - last) / 1000); last = now;
      self.g.tick(dt);
      var st = self.g.stats();
      if (st.autoScrape > 0 && self.g.s.current && !self.g.s.current.done) {
        autoAcc += st.autoScrape * dt;
        var hits = Math.floor(autoAcc);
        if (hits > 0) {
          autoAcc -= hits;
          self.g.autoScrape(hits, function (open) { return open[Math.floor(Math.random() * open.length)]; });
        }
      }
      fxStep(dt);
      acc += dt; saveAcc += dt;
      if (acc > 0.25) { acc = 0; self.renderTop(); if (self.tab === "upgrades") self.updateAffordability(); }
      if (saveAcc > 5) { saveAcc = 0; self.g.save(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  DS.UI = UI;
  DS.fmt = { money: money, containerCode: containerCode };
})(this);
