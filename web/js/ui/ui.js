/* Game screen. Rules live in js/core; this file draws the HUD, the stage (quay, auction,
 * open container), the sheets, and forwards input. */
(function (root) {
  "use strict";
  var DS = root.DS, A = DS.audio, doc = root.document;
  var ICONS = (root.DOCKSIDE_ICONS && root.DOCKSIDE_ICONS.icons) || {};
  var TIER_COLORS = { 0: "#5b5046", 1: "#8b4a2b", 2: "#1f6f8b", 3: "#a8342b", 4: "#55602f", 5: "#2d3e8f" };
  var TIER_SPEC = { 0: "LOOSE PILE", 1: "10' GP · MAX GROSS 10,160 KG", 2: "20' GP · MAX GROSS 30,480 KG", 3: "40' HC · MAX GROSS 32,500 KG",
                    4: "20' MIL · MAX GROSS 30,480 KG", 5: "40' RF · MAX GROSS 34,000 KG" };
  var TIER_CLS = { 0: "", 1: "10G1", 2: "22G1", 3: "45G1", 4: "22G9", 5: "45R1" };
  var OWNER = { 0: "----", 1: "RSTU", 2: "STDU", 3: "PRMU", 4: "MILU", 5: "SEAU" };
  var APPRAISE = { 1: ["epic", "legendary"], 2: ["rare", "epic", "legendary"], 3: ["junk", "common", "rare", "epic", "legendary"] };
  var reduced = !!(root.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  // ------------------------------------------------------------------ helpers
  function h(tag, attrs, children) {
    var el = doc.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === "class") el.className = v;
      else if (k === "style") el.setAttribute("style", v);
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else if (k === "text") el.textContent = v;
      else if (v != null && v !== false) el.setAttribute(k, v);
    });
    (children || []).forEach(function (c) { if (c != null) el.appendChild(typeof c === "string" ? doc.createTextNode(c) : c); });
    return el;
  }
  function icon(name, cls) {
    var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("class", "gi" + (cls ? " " + cls : ""));
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name] || "";
    return svg;
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
    var owner = OWNER[tier] || "DKSU", s = String(serial).padStart(6, "0"), vals = {}, v = 10;
    for (var c = 65; c <= 90; c++) { if (v % 11 === 0) v++; vals[String.fromCharCode(c)] = v++; }
    var sum = 0, str = owner + s;
    for (var i = 0; i < str.length; i++) sum += (/[A-Z]/.test(str[i]) ? vals[str[i]] : +str[i]) * Math.pow(2, i);
    return owner + " " + s + " " + (sum % 11) % 10;
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
    if (reduced) n = Math.ceil(n / 4);
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, s = speed * (0.4 + Math.random());
      fx.parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - speed * 0.4, life: life, max: life,
                      c: Array.isArray(color) ? color[i % color.length] : color, s: sizePx * (0.5 + Math.random()), g: gravity, r: Math.random() * 6 });
    }
  }
  function fxStep(dt) {
    var c = fx.ctx, k = devicePixelRatio;
    c.clearRect(0, 0, fx.canvas.width, fx.canvas.height);
    for (var i = fx.parts.length - 1; i >= 0; i--) {
      var p = fx.parts[i];
      p.life -= dt;
      if (p.life <= 0) { fx.parts.splice(i, 1); continue; }
      p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += dt * 8;
      c.globalAlpha = Math.min(1, p.life / p.max * 1.5);
      c.fillStyle = p.c;
      c.save(); c.translate(p.x * k, p.y * k); c.rotate(p.r);
      c.fillRect(-p.s * k / 2, -p.s * k / 3, p.s * k, p.s * k * 0.66);
      c.restore();
    }
    c.globalAlpha = 1;
  }

  // ------------------------------------------------------------------ UI
  function UI(game, rootEl) {
    this.g = game; this.d = game.d; this.el = rootEl;
    this.sheetName = null; this.selectedLot = 0; this.soundOn = true;
    var canvas = doc.getElementById("scene");
    this.scene = canvas && DS.Scene ? new DS.Scene(canvas) : null;
    this.build();
    fxInit();
    var self = this;
    game.on(function (type, p) { self.onEvent(type, p); });
    this.renderAll();
  }

  UI.prototype.rarity = function (r) {
    for (var i = 0; i < this.d.config.rarities.length; i++) if (this.d.config.rarities[i].id === r) return this.d.config.rarities[i];
    return { color: "#fff", name: r };
  };
  UI.prototype.rivalById = function (id) {
    for (var i = 0; i < this.d.rivals.length; i++) if (this.d.rivals[i].id === id) return this.d.rivals[i];
    return null;
  };
  UI.prototype.ui = function (key) { return this.d.config.uiArt[key]; };

  UI.prototype.build = function () {
    var self = this;
    this.el.innerHTML = "";
    this.cashEl = h("span", { class: "cash", text: "$0" });
    this.rateEl = h("span", { class: "rate" });
    this.starsEl = h("b", { text: "0" });
    this.titleEl = h("div", { class: "hud-title", text: "Pier 4 · Night auction" });
    this.soundBtn = h("button", { class: "roundbtn", "aria-label": "Sound on", "aria-pressed": "true", onclick: function () {
      self.soundOn = !self.soundOn; A.setEnabled(self.soundOn);
      self.soundBtn.setAttribute("aria-pressed", String(self.soundOn));
      self.soundBtn.setAttribute("aria-label", self.soundOn ? "Sound on" : "Sound off");
      self.soundBtn.innerHTML = ""; self.soundBtn.appendChild(icon(self.ui(self.soundOn ? "sound" : "mute")));
    } }, [icon(this.ui("sound"))]);
    var hud = h("header", { class: "hud" }, [
      h("div", { class: "pill" }, [h("span", { class: "ico" }, [icon(this.ui("cash"))]), this.cashEl, this.rateEl]),
      this.titleEl,
      h("div", { class: "hud-right" }, [
        h("div", { class: "pill stars", title: "Reputation stars" }, [h("span", { class: "ico" }, [icon(this.ui("star"))]), this.starsEl]),
        this.soundBtn
      ])
    ]);
    this.stage = h("main", { class: "stage", "aria-live": "polite" });
    this.navBtns = {}; this.badges = {};
    var nav = h("nav", { class: "dockbar", "aria-label": "Menus" });
    [["upgrades", "Upgrades"], ["contracts", "Contracts"], ["collections", "Collection"], ["log", "Log"]].forEach(function (n) {
      var badge = h("span", { class: "badge", hidden: "hidden" });
      var b = h("button", { class: "navbtn", id: "nav-" + n[0], "aria-expanded": "false", onclick: function () { A.unlock(); A.click(); self.toggleSheet(n[0]); } },
        [h("span", { class: "roundbtn" }, [icon(self.ui(n[0]))]), n[1], badge]);
      self.navBtns[n[0]] = b; self.badges[n[0]] = badge;
      nav.appendChild(b);
    });
    this.el.appendChild(hud); this.el.appendChild(this.stage); this.el.appendChild(nav);
    this.sheetTitle = h("h2");
    this.sheetBody = h("div", { class: "body" });
    this.sheet = h("aside", { class: "sheet", "aria-hidden": "true" }, [
      h("header", {}, [this.sheetTitle, h("button", { class: "roundbtn", "aria-label": "Close", onclick: function () { self.toggleSheet(null); } }, [icon(this.ui("close"))])]),
      this.sheetBody
    ]);
    this.scrim = h("div", { class: "scrim", onclick: function () { self.toggleSheet(null); } });
    doc.body.appendChild(this.scrim);
    doc.body.appendChild(this.sheet);
    this.flashEl = h("div", { class: "flash" });
    doc.body.appendChild(this.flashEl);
  };

  UI.prototype.renderAll = function () { this.renderTop(); this.renderStage(); this.renderSheet(); this.updateBadges(); };

  UI.prototype.renderTop = function () {
    this.cashEl.textContent = money(this.g.s.money);
    var rate = this.g.crewRate();
    this.rateEl.textContent = rate > 0 ? "+" + money(rate) + "/s" : "";
    this.starsEl.textContent = String(this.g.s.stars);
  };
  UI.prototype.bumpMoney = function () { var el = this.cashEl; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); };

  UI.prototype.updateBadges = function () {
    var g = this.g, n = 0;
    if (!g.s.bidding) g.d.upgrades.forEach(function (u) { var i = g.upgradeInfo(u); if (!i.maxed && i.unlocked && g.canAfford(i.cost)) n++; });
    this.setBadge("upgrades", n);
  };
  UI.prototype.setBadge = function (name, n) {
    var b = this.badges[name]; if (!b) return;
    if (n > 0) { b.hidden = false; b.textContent = String(n); } else b.hidden = true;
  };

  // ------------------------------------------------------------------ stage routing
  UI.prototype.renderStage = function () {
    if (this.stopScrape) this.stopScrape();
    (this.doorTimers || []).forEach(clearTimeout);
    this.doorTimers = [];
    this.stage.innerHTML = "";
    var old = doc.querySelector(".tally"); if (old) old.remove();
    if (this.g.s.current) this.renderYard();
    else if (this.g.s.bidding) this.renderBidding();
    else if (this.passResult) this.renderPassResult();
    else this.renderQuay();
    if (this.scene) this.scene.setMood("night");
  };

  UI.prototype.lotArt = function (c, serial) {
    var box = h("div", { class: "cbox", style: "--c:" + TIER_COLORS[c.tier] }, [
      h("span", { class: "rail t" }), h("span", { class: "rail b" }), h("span", { class: "seam" }),
      h("span", { class: "bar", style: "left:36%" }), h("span", { class: "bar", style: "left:44%" }),
      h("span", { class: "bar", style: "left:54%" }), h("span", { class: "bar", style: "left:62%" }),
      h("span", { class: "seal" }),
      h("span", { class: "code", text: serial ? containerCode(c.tier, serial) : "" }),
      h("span", { class: "cls", text: TIER_CLS[c.tier] }),
      h("span", { class: "spec", text: TIER_SPEC[c.tier] })
    ]);
    return box;
  };

  UI.prototype.oddsBlock = function (c) {
    var st = this.g.stats(), self = this;
    var w = DS.rules.rarityWeights(this.d, c, st.luck), total = w.reduce(function (a, b) { return a + b; }, 0);
    var bar = h("div", { class: "odds", "aria-hidden": "true" }), legend = h("div", { class: "odds-legend" });
    DS.rules.RARITIES.forEach(function (r, i) {
      var pct = w[i] / total * 100, rr = self.rarity(r);
      if (pct <= 0) return;
      bar.appendChild(h("span", { style: "width:" + pct + "%;background:" + rr.color }));
      legend.appendChild(h("span", {}, [h("i", { style: "background:" + rr.color }), rr.name + " " + (pct < 1 ? pct.toFixed(2) : pct.toFixed(1)) + "%"]));
    });
    return h("div", { class: "col" }, [h("div", { class: "label", text: "Odds per item" }), bar, legend]);
  };

  /* Door-crack grid. Tiles only you can see (Door Crack upgrade) are marked. */
  UI.prototype.peekGrid = function (p) {
    var self = this, c = p.container, xray = this.g.stats().xray >= 2;
    var grid = h("div", { class: "peek", style: "grid-template-columns:repeat(" + c.cols + ",1fr);--pw:" + Math.min(360, c.cols * 52) + "px" });
    var seen = {};
    p.peek.forEach(function (cell, k) { seen[cell] = k < p.basePeek ? "all" : "you"; });
    for (var k = 0; k < c.cols * c.rows; k++) {
      var it = p.gen.items[p.gen.cells[k]], def = self.d.itemById[it.id], rr = self.rarity(it.rarity);
      if (seen[k]) grid.appendChild(h("div", { class: "pc seen" + (seen[k] === "you" ? " mine" : ""), style: "--rc:" + rr.color,
        title: def.name + " · " + rr.name + (seen[k] === "you" ? " (only you can see this)" : "") }, [icon(def.art)]));
      else grid.appendChild(h("div", { class: "pc" + (xray && (it.w > 1 || it.h > 1) ? " outline" : "") }));
    }
    return grid;
  };

  // ------------------------------------------------------------------ stage: the quay
  UI.prototype.renderQuay = function () {
    var self = this, g = this.g, access = g.stats().tierAccess;
    this.titleEl.textContent = "Pier 4 · Night auction";
    this.stage.appendChild(h("h1", { class: "title", text: "Tonight's lots" }));
    this.stage.appendChild(h("p", { class: "subtitle", text: "Rusty boxes sell at the gate. Bigger containers go under the hammer." }));
    if (this.selectedLot >= g.s.lots.length) this.selectedLot = 0;
    var quay = h("div", { class: "quay", role: "radiogroup", "aria-label": "Lots" });
    g.s.lots.forEach(function (lot, i) {
      var p = g.lotPreview(lot), c = p.container;
      var price = p.auction ? p.auction.opening : c.price;
      quay.appendChild(h("button", { class: "lotbox", role: "radio", "aria-pressed": String(i === self.selectedLot), "aria-checked": String(i === self.selectedLot),
        "aria-label": c.name, onclick: function () { A.unlock(); A.click(); self.selectedLot = i; self.renderStage(); } }, [
        self.lotArt(c, lot.serial),
        h("span", { class: "lotname", text: c.name }),
        h("span", { class: "pricetag" }, [h("small", { text: p.auction ? "Opening" : "Price" }), h("b", { text: money(price) })])
      ]));
    });
    this.stage.appendChild(quay);
    var sel = quay.children[this.selectedLot];
    if (sel && quay.scrollWidth > quay.clientWidth) requestAnimationFrame(function () { quay.scrollLeft = sel.offsetLeft - (quay.clientWidth - sel.offsetWidth) / 2; });
    this.stage.appendChild(this.lotInfo(this.selectedLot));
    if (g.safetyNetAvailable()) {
      var sc = this.d.containerById[this.d.config.safetyNet.containerId];
      this.stage.appendChild(h("div", { class: "plate", style: "margin-top:14px;text-align:center" }, [
        h("div", { class: "label", text: "Out of cash" }),
        h("p", { class: "blurb", style: "margin:6px 0 10px", text: sc.blurb }),
        h("button", { class: "gbtn steel", onclick: function () { A.unlock(); g.takeScrapPile(); } }, ["Pick through the scrap pile"])
      ]));
    }
    var next = this.d.containers.filter(function (c) { return c.tier === access + 1; })[0];
    if (next) this.stage.appendChild(h("p", { class: "hint", text: "Next class: " + next.name + ". Get the next Auction License in Upgrades." }));
    if (this.scene) this.scene.setFocus((this.selectedLot + 0.5) / Math.max(1, g.s.lots.length));
  };

  UI.prototype.lotInfo = function (i) {
    var self = this, g = this.g, lot = g.s.lots[i], p = g.lotPreview(lot), c = p.container;
    var extra = p.peek.length - p.basePeek, cta, right;
    if (p.auction) {
      var canOpen = g.canAfford(p.auction.opening);
      var medals = h("div", { class: "medals small" });
      p.auction.rivals.forEach(function (r) {
        var def = self.rivalById(r.id);
        medals.appendChild(h("div", { class: "medal" }, [h("span", { class: "face" }, [icon(def.art)]), h("span", { class: "name", text: def.name })]));
      });
      cta = h("button", { class: "gbtn", id: "lot-cta", disabled: canOpen ? null : "disabled", onclick: function () { A.unlock(); A.click(); g.openBidding(i); } },
        [icon(this.ui("gavel")), canOpen ? "Join the bidding" : "Need " + money(p.auction.opening)]);
      right = [h("div", { class: "label", text: "Guide price " + money(c.price) + " · in the room tonight" }), medals, cta];
    } else {
      var afford = g.canAfford(c.price);
      cta = h("button", { class: "gbtn", id: "lot-cta", disabled: afford ? null : "disabled", onclick: function () { A.unlock(); if (g.buyLot(i)) A.buy(); } },
        [afford ? "Buy for " + money(c.price) : "Need " + money(c.price)]);
      right = [h("div", { class: "label", text: "Fixed price at the yard gate" }), cta];
    }
    return h("section", { class: "plate lotinfo" }, [
      h("div", { class: "col" }, [
        h("div", { class: "label", text: "Door crack · " + p.basePeek + " tiles" + (extra > 0 ? " + " + extra + " only you see" : "") }),
        this.peekGrid(p),
        h("p", { class: "blurb", text: c.blurb })
      ]),
      h("div", { class: "col" }, [this.oddsBlock(c)].concat(right))
    ]);
  };

  // ------------------------------------------------------------------ stage: live auction
  UI.prototype.renderBidding = function () {
    var self = this, g = this.g, info = g.biddingInfo(), p = info.preview, c = p.container, b = info.bidding;
    this.titleEl.textContent = "Under the hammer";
    var holder = b.holder === null ? "Opening bid" : b.holder === "you" ? "You hold the bid" : this.rivalById(info.setup.rivals[b.holder].id).name;
    var board = h("div", { class: "board" }, [
      h("div", { class: "lotline", text: "Lot " + containerCode(c.tier, info.lot.serial) + " · " + c.name + " · guide " + money(c.price) }),
      h("div", { class: "led" + (this.ledFlash ? " flash" : ""), text: money(b.holder === null ? info.setup.opening : b.bid) }),
      h("div", { class: "holder" + (b.holder === "you" ? " you" : ""), text: holder })
    ]);
    this.ledFlash = false;
    var medals = h("div", { class: "medals" });
    info.setup.rivals.forEach(function (r, i) {
      var def = self.rivalById(r.id), mood = g.rivalMood(i), holding = b.holder === i;
      medals.appendChild(h("div", { class: "medal m-" + mood + (holding ? " holding" : ""), title: def.blurb }, [
        h("span", { class: "face" }, [icon(def.art)]),
        holding ? h("span", { class: "chip", text: "High bid" }) : mood === "out" ? h("span", { class: "chip out", text: "Out" }) : null,
        h("span", { class: "name", text: def.name }),
        h("span", { class: "tell", text: def.tells[mood] })
      ]));
    });
    var canBid = b.holder !== "you" && g.canAfford(info.nextBid) && !this.biddingBusy;
    var bidBtn = h("button", { class: "gbtn", id: "bid-btn", disabled: canBid ? null : "disabled", onclick: function () { self.onPlayerBid(); } },
      [icon(this.ui("gavel")), b.holder === "you" ? "The room is thinking…" : g.canAfford(info.nextBid) ? "Bid " + money(info.nextBid) : "Can't cover " + money(info.nextBid)]);
    var passBtn = h("button", { class: "gbtn steel", id: "pass-btn", disabled: b.holder === "you" || this.biddingBusy ? "disabled" : null, onclick: function () {
      A.click(); var r = g.passBidding(); if (r) { self.passResult = r; self.renderStage(); }
    } }, [b.holder === null ? "Pass" : "Walk away"]);
    var log = h("ul", { class: "bidlog" });
    b.log.slice(0, 5).forEach(function (e) {
      log.appendChild(h("li", { class: e.who === "you" ? "you" : "" }, [
        h("span", { text: e.who === "you" ? "You" : self.rivalById(info.setup.rivals[e.who].id).name }), h("span", { text: money(e.amount) })]));
    });
    var extra = p.peek.length - p.basePeek;
    this.stage.appendChild(h("div", { class: "auction" }, [
      board, medals,
      h("div", { class: "bidrow" }, [bidBtn, passBtn]),
      h("div", { class: "plate auction-foot" }, [
        h("div", { class: "col" }, [h("div", { class: "label", text: "Door crack · " + p.basePeek + " tiles" + (extra > 0 ? " + " + extra + " only you see" : "") }), this.peekGrid(p)]),
        h("div", { class: "col" }, [this.oddsBlock(c), h("div", { class: "label", text: "Bids" }), log])
      ])
    ]));
  };

  UI.prototype.onPlayerBid = function () {
    var self = this, g = this.g;
    A.unlock();
    if (!g.playerBid()) return;
    A.gavel();
    this.biddingBusy = true; this.ledFlash = true;
    this.renderStage();
    this.bidTimer = setTimeout(function () {
      if (!g.s.bidding) { self.biddingBusy = false; return; }
      var r = g.rivalTurn();
      self.biddingBusy = false;
      if (r === "raised") { A.gavel(); self.ledFlash = true; self.renderStage(); }
    }, 650 + Math.random() * 350);
  };

  UI.prototype.renderPassResult = function () {
    var self = this, r = this.passResult, who = r.winner < 0 ? null : this.rivalById(r.rivalId);
    this.titleEl.textContent = "Sold elsewhere";
    var list = h("div", { class: "missed" });
    r.gen.items.slice().sort(function (a, b) { return b.value - a.value; }).slice(0, 8).forEach(function (it) {
      var def = self.d.itemById[it.id];
      list.appendChild(h("span", { class: "mi", style: "--rc:" + self.rarity(it.rarity).color, title: def.name }, [icon(def.art)]));
    });
    var verdict = !who ? "Nobody wanted it. It goes back to the shipping line." :
      r.inside > r.price * 1.5 ? who.name + " got a bargain. That one hurts." :
      r.inside < r.price ? "Good call. " + who.name + " overpaid." : "About what it was worth.";
    this.stage.appendChild(h("section", { class: "plate passcard" }, [
      who ? h("div", { class: "who" }, [h("div", { class: "medal" }, [h("span", { class: "face" }, [icon(who.art)])])]) : null,
      h("h3", { text: who ? "Sold to " + who.name + " for " + money(r.price) : "No sale" }),
      h("div", { class: "twoup" }, [
        h("div", {}, [h("span", { class: "label", text: "They paid" }), h("span", { class: "v", text: money(r.price) })]),
        h("div", {}, [h("span", { class: "label", text: "What was inside" }), h("span", { class: "v", text: money(r.inside) })])
      ]),
      h("p", { class: "blurb", text: verdict }),
      list,
      h("button", { class: "gbtn", onclick: function () { self.passResult = null; A.click(); self.renderStage(); } }, ["Back to the quay"])
    ]));
  };

  // ------------------------------------------------------------------ stage: opening a container
  UI.prototype.renderYard = function () {
    var self = this, g = this.g, cur = g.s.current, c = this.d.containerById[cur.containerId], st = g.stats();
    this.titleEl.textContent = c.name;
    this.foundEl = h("span", { class: "v", text: money(g.foundValue()) });
    this.profitEl = h("span", { class: "v" });
    this.stage.appendChild(h("div", { class: "docketbar" }, [
      h("div", { class: "dchip" }, [h("span", { class: "k", text: "PAID" }), h("span", { class: "v", text: money(cur.price) })]),
      h("div", { class: "dchip" }, [h("span", { class: "k", text: "FOUND" }), this.foundEl]),
      h("div", { class: "dchip" }, [h("span", { class: "k", text: "PROFIT" }), this.profitEl])
    ]));
    var vars = "--cols:" + c.cols + ";--rows:" + c.rows;
    this.gridEl = h("div", { class: "grid", style: vars, role: "application", "aria-label": "Container. Drag across the rust to scrape it off." });
    this.itemEls = [];
    cur.gen.items.forEach(function (it, idx) {
      var def = self.d.itemById[it.id], ist = cur.itemState[idx];
      var el = h("div", { class: "item r-" + it.rarity + (ist.revealed ? " revealed" : "") + (ist.sold ? " sold" : ""),
        style: "grid-column:" + (it.x + 1) + " / span " + it.w + ";grid-row:" + (it.y + 1) + " / span " + it.h +
               ";--rc:" + self.rarity(it.rarity).color + ";--iw:" + it.w + ";--ih:" + it.h }, [icon(def.art)]);
      if (ist.revealed) self.decorateItem(idx, el);
      self.itemEls.push(el); self.gridEl.appendChild(el);
    });
    this.tilesEl = h("div", { class: "tiles", style: vars });
    this.tileEls = [];
    for (var i = 0; i < cur.hp.length; i++) {
      var t = h("div", { class: "tile" + (cur.hp[i] <= 0 ? " gone" : ""), style: "background-position:" + (i * 37 % 120) + "px " + (i * 53 % 120) + "px, 0 0, 0 0" });
      t.style.setProperty("--hp", String(cur.hp[i] / c.rustHp));
      this.tileEls.push(t); this.tilesEl.appendChild(t);
    }
    this.gridEl.appendChild(this.tilesEl);
    if (st.xray >= 1) {
      var xr = h("div", { class: "xray", style: vars, "aria-hidden": "true" });
      cur.gen.items.forEach(function (it) {
        if (it.w * it.h > 1) xr.appendChild(h("div", { style: "grid-column:" + (it.x + 1) + " / span " + it.w + ";grid-row:" + (it.y + 1) + " / span " + it.h }));
      });
      this.gridEl.appendChild(xr);
    }
    this.lightEl = h("div", { class: "flashlight", "aria-hidden": "true" });
    this.gridEl.appendChild(this.lightEl);
    var frame = h("div", { class: "cframe", style: "--c:" + TIER_COLORS[c.tier] }, [
      h("span", { class: "door l" }), h("span", { class: "door r" }),
      h("span", { class: "stencil", text: cur.serial ? containerCode(c.tier, cur.serial) : "SCRAP PILE" }),
      h("div", { class: "interior" }, [this.gridEl])
    ]);
    this.findsEl = h("div", { class: "finds", "aria-label": "Best finds so far" });
    this.stage.appendChild(frame);
    this.stage.appendChild(this.findsEl);
    this.stage.appendChild(h("p", { class: "hint", text: "Drag across the rust to scrape. Hold still to keep scraping." }));
    if (this.justStarted && cur.price > 0) this.doorBeat(c);
    this.justStarted = false;
    this.bindScrape();
    this.updateMeter(); this.updateGlints(); this.renderFinds();
    if (this.scene) this.scene.setFocus(0.5);
    if (cur.done && cur.tally) this.showTally(cur.tally, true);
  };

  /* Doors swing open and a flashlight sweeps in. Tap to skip. Contents were decided when the lot was generated. */
  UI.prototype.doorBeat = function (c) {
    var grid = this.gridEl;
    if (this.pendingHammer != null) { this.banner("SOLD!", "to you for " + money(this.pendingHammer), "#ffb13b"); this.pendingHammer = null; }
    if (reduced) return;
    var doors = h("div", { class: "doors", style: "--c:" + TIER_COLORS[c.tier] }, [
      h("div", { class: "door2 l" }, [h("span", { class: "bar" }), h("span", { class: "bar" })]),
      h("div", { class: "door2 r" }, [h("span", { class: "bar" }), h("span", { class: "bar" })])
    ]);
    grid.appendChild(doors);
    var open = setTimeout(function () { if (doors.isConnected) { doors.classList.add("open"); A.doors(); } }, 380);
    var gone = setTimeout(function () { doors.remove(); }, 1500);
    this.doorTimers = [open, gone];
    doors.addEventListener("pointerdown", function () { clearTimeout(open); clearTimeout(gone); doors.remove(); });
  };

  UI.prototype.decorateItem = function (idx, el) {
    var cur = this.g.s.current, it = cur.gen.items[idx], ist = cur.itemState[idx];
    var sale = ist.sold ? ist.soldFor : it.value * this.g.stats().sellTotal;
    var tag = el.querySelector(".tag");
    if (!tag) el.appendChild(h("span", { class: "tag", text: money(sale) })); else tag.textContent = money(sale);
    var k = el.querySelector(".keep");
    if (ist.kept && !k) el.appendChild(h("span", { class: "keep", title: "Kept for your collection" }, [icon(this.ui("collections"))]));
    if (!ist.kept && k) k.remove();
    el.classList.toggle("sold", !!ist.sold);
  };

  UI.prototype.updateMeter = function () {
    var cur = this.g.s.current; if (!cur || !this.foundEl) return;
    var found = this.g.foundValue(), p = found - cur.price;
    this.foundEl.textContent = money(found);
    this.profitEl.textContent = (p >= 0 ? "+" : "") + money(p);
    this.profitEl.className = "v " + (p >= 0 ? "gain" : "loss");
  };

  /* Honest glints: appraiser level, or a big item already partly uncovered. */
  UI.prototype.updateGlints = function () {
    var cur = this.g.s.current; if (!cur || !this.tileEls) return;
    var show = APPRAISE[Math.min(3, this.g.stats().appraiser)] || [], partial = {}, c = this.d.containerById[cur.containerId], self = this;
    cur.gen.items.forEach(function (it, idx) {
      if (cur.itemState[idx].revealed || (it.rarity !== "epic" && it.rarity !== "legendary")) return;
      for (var dy = 0; dy < it.h; dy++) for (var dx = 0; dx < it.w; dx++) if (cur.hp[(it.y + dy) * c.cols + it.x + dx] <= 0) partial[idx] = true;
    });
    for (var i = 0; i < this.tileEls.length; i++) {
      var t = this.tileEls[i];
      if (cur.hp[i] <= 0) { t.classList.remove("glint"); continue; }
      var idx = cur.gen.cells[i], it = cur.gen.items[idx], on = show.indexOf(it.rarity) !== -1 || partial[idx];
      t.classList.toggle("glint", !!on);
      if (on) t.style.setProperty("--gc", self.rarity(it.rarity).color);
    }
  };

  UI.prototype.renderFinds = function () {
    var self = this, cur = this.g.s.current; if (!cur || !this.findsEl) return;
    var order = { legendary: 0, epic: 1, rare: 2, common: 3, junk: 4 };
    var shown = cur.gen.items.map(function (it, i) { return { it: it, i: i }; })
      .filter(function (o) { return cur.itemState[o.i].revealed && o.it.rarity !== "junk"; })
      .sort(function (a, b) { return order[a.it.rarity] - order[b.it.rarity] || b.it.value - a.it.value; }).slice(0, 5);
    this.findsEl.innerHTML = "";
    shown.forEach(function (o) {
      var def = self.d.itemById[o.it.id], cond = self.d.config.conditions.filter(function (c) { return c.id === o.it.condition; })[0];
      var ist = cur.itemState[o.i], sale = ist.sold ? ist.soldFor : o.it.value * self.g.stats().sellTotal;
      self.findsEl.appendChild(h("div", { class: "loot", style: "--rc:" + self.rarity(o.it.rarity).color }, [
        h("span", { class: "li" }, [icon(def.art)]),
        h("span", {}, [h("b", { text: def.name }), h("small", { text: cond.name + " · " + self.rarity(o.it.rarity).name + (ist.kept ? " · keeping" : "") })]),
        h("span", { class: "lv", text: money(sale) })
      ]));
    });
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
    function light(e) {
      var r = grid.getBoundingClientRect();
      self.lightEl.style.setProperty("--lx", ((e.clientX - r.left) / r.width * 100) + "%");
      self.lightEl.style.setProperty("--ly", ((e.clientY - r.top) / r.height * 100) + "%");
    }
    function hit(cell, e) {
      if (cell < 0 || !self.g.s.current || self.g.s.current.done) return;
      self.lastPointer = { x: e.clientX, y: e.clientY };
      self.g.scrape(cell);
    }
    function stopHold() { if (holdTimer) { clearInterval(holdTimer); holdTimer = null; } }
    grid.addEventListener("pointerdown", function (e) {
      if (down && e.pointerId !== activeId) return;
      A.unlock();
      down = true; activeId = e.pointerId;
      try { grid.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      lastCell = cellAt(e); hit(lastCell, e); light(e);
      stopHold();
      holdTimer = setInterval(function () { if (down) hit(lastCell, self.lastPointer ? { clientX: self.lastPointer.x, clientY: self.lastPointer.y } : e); }, repeatMs);
      e.preventDefault();
    });
    grid.addEventListener("pointermove", function (e) {
      light(e);
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
    var r = t.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };
  UI.prototype.itemCenter = function (idx) {
    var el = this.itemEls && this.itemEls[idx]; if (!el) return { x: innerWidth / 2, y: innerHeight / 2 };
    var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };
  UI.prototype.floatText = function (x, y, text, color, big) {
    var el = h("div", { class: "float" + (big ? " big" : ""), style: "left:" + x + "px;top:" + y + "px;--fc:" + color, text: text });
    doc.body.appendChild(el); setTimeout(function () { el.remove(); }, 1200);
  };
  UI.prototype.flash = function (color) {
    this.flashEl.style.setProperty("--fc", color);
    this.flashEl.classList.remove("on"); void this.flashEl.offsetWidth; this.flashEl.classList.add("on");
  };
  UI.prototype.shake = function () { this.stage.classList.remove("shake"); void this.stage.offsetWidth; this.stage.classList.add("shake"); };
  UI.prototype.banner = function (text, sub, color) {
    var b = h("div", { class: "banner", style: "--bc:" + color }, [h("b", { text: text }), h("span", { text: sub })]);
    doc.body.appendChild(b); setTimeout(function () { b.remove(); }, 2000);
  };

  // ------------------------------------------------------------------ events
  UI.prototype.onEvent = function (type, p) {
    var self = this;
    switch (type) {
      case "lots": case "wipe": case "prestige":
        if (!this.g.s.current && !this.g.s.bidding) this.renderStage();
        this.renderTop(); this.renderSheet(); this.updateBadges();
        if (type === "prestige") { A.fanfare(); this.toast("Business sold. +" + p.gain + " reputation ★. Everything sells for more now."); }
        break;
      case "bidding": case "passed":
        this.renderStage(); this.renderSheet(); this.updateBadges();
        break;
      case "hammer":
        A.hammer(); this.pendingHammer = p.amount;
        break;
      case "start":
        this.justStarted = true;
        this.renderStage(); this.renderTop(); this.renderSheet(); this.updateBadges();
        break;
      case "tile": {
        var t = this.tileEls && this.tileEls[p.cell]; if (!t) break;
        var c = this.d.containerById[this.g.s.current.containerId];
        t.style.setProperty("--hp", String(p.hp / c.rustHp));
        if (p.silent) { if (p.hp <= 0) t.classList.add("gone"); break; }
        var pos = this.tileCenter(p.cell);
        if (p.hp <= 0) {
          t.classList.add("gone"); A.chip();
          burst(pos.x, pos.y, ["#7a3b1d", "#a4552a", "#5a2a15", "#c77a45", "#3a1a0b"], 9, 170, 0.7, 5, 620);
          this.updateGlints();
        } else {
          t.classList.add("hit"); setTimeout(function () { t.classList.remove("hit"); }, 90);
          A.scrape();
          burst(pos.x, pos.y, ["#7a3b1d", "#a4552a"], 3, 100, 0.4, 3, 560);
        }
        break;
      }
      case "reveal": this.onReveal(p); break;
      case "sold":
        if (this.itemEls && this.itemEls[p.index]) this.decorateItem(p.index, this.itemEls[p.index]);
        this.updateMeter(); this.renderTop(); this.bumpMoney();
        if (p.auto && this.g.s.current && !this.g.s.current.done) {
          var pc = this.itemCenter(p.index); this.floatText(pc.x, pc.y - 10, "+" + money(p.sale), "#9aa3ab");
        }
        break;
      case "done":
        setTimeout(function () { if (self.g.s.current && self.g.s.current.tally) self.showTally(self.g.s.current.tally, false); }, 600);
        break;
      case "finished": this.onFinished(p); break;
      case "upgrade":
        A.cash(); this.renderTop(); this.renderSheet(); this.updateBadges();
        if (this.g.s.current) this.updateGlints(); else if (!this.g.s.bidding) this.renderStage();
        break;
      case "contracts": if (this.sheetName === "contracts") this.renderSheet(); break;
      case "contract":
        A.cash(); this.toast("Contract done: " + p.text + " · +" + money(p.contract.reward));
        this.renderTop(); this.bumpMoney(); this.setBadge("contracts", 1);
        break;
      case "keep":
        if (this.itemEls) this.itemEls.forEach(function (el, i) { if (self.g.s.current.itemState[i].revealed) self.decorateItem(i, el); });
        if (doc.querySelector(".tally") && this.g.s.current && this.g.s.current.tally) this.showTally(this.g.s.current.tally, true);
        this.renderFinds();
        break;
    }
  };

  UI.prototype.onFinished = function (p) {
    var g = this.g;
    if (p.completed.length) {
      A.fanfare();
      this.banner("SET COMPLETE", p.completed.map(function (c) { return c.name; }).join(" · "), "#62e394");
      this.toast(p.completed.map(function (c) { return c.name + ": " + c.reward.text; }).join(" · "));
    } else if (p.filed.length) {
      var close = this.d.collections.filter(function (col) {
        return g.s.completed.indexOf(col.id) === -1 && col.items.filter(function (id) { return g.s.collected.indexOf(id) === -1; }).length === 1;
      })[0];
      if (close) {
        var missing = this.d.itemById[close.items.filter(function (id) { return g.s.collected.indexOf(id) === -1; })[0]];
        this.toast("One away! " + close.name + " only needs the " + missing.name + ".");
      } else this.toast("Filed " + p.filed.length + " item" + (p.filed.length > 1 ? "s" : "") + " in your collection book.");
      this.setBadge("collections", p.filed.length);
    }
    this.renderAll();
  };

  UI.prototype.onReveal = function (p) {
    var self = this, it = p.item, color = this.rarity(it.rarity).color, el = this.itemEls && this.itemEls[p.index];
    this.updateMeter();
    if (p.silent) { if (el) { el.classList.add("revealed"); this.decorateItem(p.index, el); } this.renderFinds(); return; }
    var big = it.rarity === "epic" || it.rarity === "legendary";
    function payoff() {
      if (!el || !el.isConnected) return;
      el.classList.add("revealed"); self.decorateItem(p.index, el);
      var c = self.itemCenter(p.index);
      A.reveal(it.rarity);
      var n = { junk: 5, common: 12, rare: 30, epic: 70, legendary: 160 }[it.rarity];
      burst(c.x, c.y, [color, "#ffffff", color], n, big ? 420 : 240, big ? 1.3 : 0.8, big ? 7 : 5, 320);
      self.floatText(c.x, c.y - 16, "+" + money(p.sale), color, big);
      var cond = it.condition === "mint" ? " · MINT" : "";
      if (big) {
        self.flash(color); self.shake();
        if (self.scene) { self.scene.setMood("reveal"); setTimeout(function () { if (self.scene) self.scene.setMood("night"); }, 1600); }
        self.banner(it.rarity === "legendary" ? "LEGENDARY!" : "EPIC!", p.def.name + cond + " · " + money(p.sale), color);
      } else if (it.condition === "mint" && it.rarity !== "junk") self.floatText(c.x, c.y - 44, "MINT!", "#fff4c2", false);
      if (p.forCollection) setTimeout(function () { self.toast("New for your collection: " + p.def.name); }, big ? 900 : 100);
      self.renderFinds();
    }
    if (big && !reduced) {
      A.charge();
      if (el) el.animate([{ transform: "scale(1)" }, { transform: "scale(1.05) rotate(-1.5deg)" }, { transform: "scale(.97) rotate(1.5deg)" }, { transform: "scale(1)" }], { duration: 420 });
      setTimeout(payoff, 420);
    } else payoff();
  };

  // ------------------------------------------------------------------ tally docket
  UI.prototype.showTally = function (t, restoring) {
    var self = this, g = this.g, cur = g.s.current;
    if (!cur) return;
    var old = doc.querySelector(".tally"); if (old) old.remove();
    var c = this.d.containerById[t.containerId];
    var profit = t.found - t.paid, ratio = t.paid > 0 ? t.found / t.paid : null;
    var verdict, stamp, cls = profit >= 0 ? "gain" : "loss";
    if (t.paid === 0) { verdict = "Free finds are the best finds."; stamp = "FREE"; }
    else if (ratio >= 5) { verdict = ratio.toFixed(1) + "× your money."; stamp = "JACKPOT"; cls = "jackpot"; }
    else if (ratio >= 1.5) { verdict = "Big score: " + ratio.toFixed(1) + "× your money."; stamp = "BIG SCORE"; }
    else if (profit >= 0) { verdict = "A small profit. Every dollar counts."; stamp = "PROFIT"; }
    else if (ratio >= 0.6) { verdict = "Close, but a loss this time."; stamp = "LOSS"; }
    else { verdict = "A dud. It happens to the best of us."; stamp = "DUD"; }
    var keeps = h("div", { class: "keeps" });
    cur.gen.items.forEach(function (it, idx) {
      var colId = self.d.collectionOfItem[it.id], ist = cur.itemState[idx];
      if (!colId || ist.sold || g.s.collected.indexOf(it.id) !== -1) return;
      var col = self.d.collections.filter(function (x) { return x.id === colId; })[0], def = self.d.itemById[it.id], id = "keep-" + idx;
      keeps.appendChild(h("div", { class: "keeprow" }, [
        h("label", { for: id }, [
          h("input", { type: "checkbox", id: id, checked: ist.kept ? "checked" : null, onchange: function () { g.toggleKeep(idx); } }),
          h("span", { class: "li", style: "color:" + self.rarity(it.rarity).color }, [icon(def.art)]),
          h("span", {}, [h("b", { text: "Keep " + def.name }), h("br"), h("small", { text: "for " + col.name + ", or sell for " + money(it.value * g.stats().sellTotal) })])
        ])
      ]));
    });
    var cash = g.cashValue(), kept = g.foundValue() - cash;
    var docket = h("div", { class: "docket", role: "dialog", "aria-label": "Salvage docket" }, [
      h("h3", { text: "Salvage docket" }),
      h("div", { class: "ref", text: c.name + (cur.serial ? " · " + containerCode(c.tier, cur.serial) : "") }),
      h("div", { class: "line" }, [h("span", { text: "Paid" }), h("b", { text: money(t.paid) })]),
      h("div", { class: "line" }, [h("span", { text: "Found" }), h("b", { text: money(t.found) })]),
      h("div", { class: "line total" }, [h("span", { text: "Profit" }), h("b", { class: profit >= 0 ? "gain" : "loss", text: (profit >= 0 ? "+" : "") + money(profit) })]),
      h("div", { class: "stamp " + cls, text: stamp }),
      h("p", { class: "verdict", text: verdict }),
      h("p", { class: "cashline", text: kept < 0.005 ? "Cash in: " + money(cash) + "." : "Cash in: " + money(cash) + " · kept for collections: " + money(kept) + " (counted in Found)." }),
      keeps.childNodes.length ? keeps : null,
      h("button", { class: "gbtn green", id: "tally-continue", onclick: function () { A.cash(); g.finishContainer(); } }, ["Sell & back to the quay"])
    ]);
    if (restoring) docket.style.animation = "none";
    var wrap = h("div", { class: "tally" }, [docket]);
    doc.body.appendChild(wrap);
    if (restoring) { var st = docket.querySelector(".stamp"); if (st) st.style.animation = "none"; }
    if (!restoring && !reduced) {
      var vals = docket.querySelectorAll(".line b"), t0 = performance.now();
      (function step(now) {
        var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3), shown = t.found * e - t.paid;
        vals[1].textContent = money(t.found * e);
        vals[2].textContent = (shown >= 0 ? "+" : "") + money(shown);
        if (k < 1) requestAnimationFrame(step); else vals[2].textContent = (profit >= 0 ? "+" : "") + money(profit);
      })(t0);
    }
    if (!restoring && t.paid > 0) {
      if (profit < 0) A.dud();
      else if (ratio >= 1.5) { A.fanfare(); var r = docket.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 60, ["#62e394", "#ffb13b", "#ffffff"], 60, 320, 1.2, 6, 380); }
      else A.cash();
    }
    var btn = docket.querySelector("#tally-continue"); if (btn) btn.focus({ preventScroll: true });
  };

  // ------------------------------------------------------------------ sheets
  UI.prototype.toggleSheet = function (name) {
    this.sheetName = this.sheetName === name ? null : name;
    var self = this;
    Object.keys(this.navBtns).forEach(function (k) { self.navBtns[k].setAttribute("aria-expanded", String(k === self.sheetName)); });
    this.sheet.classList.toggle("open", !!this.sheetName);
    this.scrim.classList.toggle("open", !!this.sheetName);
    this.sheet.setAttribute("aria-hidden", String(!this.sheetName));
    if (this.sheetName === "contracts" || this.sheetName === "collections") this.setBadge(this.sheetName, 0);
    this.renderSheet();
  };

  UI.prototype.renderSheet = function () {
    if (!this.sheetName) return;
    var titles = { upgrades: "Upgrades", contracts: "Port contracts", collections: "Collection book", log: "Harbour log" };
    this.sheetTitle.innerHTML = "";
    this.sheetTitle.appendChild(icon(this.ui(this.sheetName)));
    this.sheetTitle.appendChild(doc.createTextNode(" " + titles[this.sheetName]));
    this.sheetBody.innerHTML = "";
    if (this.sheetName === "upgrades") this.renderUpgrades();
    else if (this.sheetName === "contracts") this.renderContracts();
    else if (this.sheetName === "collections") this.renderCollections();
    else this.renderLog();
  };

  UI.prototype.renderUpgrades = function () {
    var self = this, g = this.g, body = this.sheetBody;
    this.shopBtns = [];
    this.goalEl = h("div", { class: "goal" });
    body.appendChild(this.goalEl);
    this.d.categories.forEach(function (cat) {
      body.appendChild(h("div", { class: "section-h" }, [icon(cat.art), cat.name]));
      var shop = h("div", { class: "shop" });
      self.d.upgrades.filter(function (u) { return u.category === cat.id; }).forEach(function (u) {
        var info = g.upgradeInfo(u);
        var title = u.name + (info.nextName ? ": " + info.nextName : "");
        var btn = h("button", { class: "gbtn small", onclick: function () { A.unlock(); g.buyUpgrade(u.id); } }, [info.maxed ? "Maxed" : money(info.cost)]);
        var card = h("div", { class: "shop-item" + (info.unlocked ? "" : " locked") + (info.maxed ? " maxed" : "") }, [
          h("span", { class: "si" }, [icon(info.unlocked ? u.art : self.ui("lock"))]),
          h("span", { class: "nm", text: title }),
          h("span", { class: "lv", text: "Level " + info.level + " / " + u.maxLevel }),
          h("span", { class: "ds", text: info.unlocked ? u.desc : "Needs " + (u.requires || []).map(function (r) { return self.d.upgradeById[r.id].name + " " + r.level; }).join(", ") }),
          btn
        ]);
        self.shopBtns.push({ btn: btn, card: card, u: u });
        shop.appendChild(card);
      });
      body.appendChild(shop);
    });
    var pbtn = h("button", { class: "gbtn steel", onclick: function () {
      var gain = g.prestigePreview();
      if (gain < 1 || g.s.current || g.s.bidding) return;
      if (!self.prestigeArmed) {
        self.prestigeArmed = true;
        pbtn.textContent = "Tap again: reset for +" + gain + " ★";
        clearTimeout(self.prestigeDisarm);
        self.prestigeDisarm = setTimeout(function () { self.prestigeArmed = false; self.updatePrestige(); }, 4000);
        return;
      }
      self.prestigeArmed = false; g.prestige();
    } });
    this.prestigeBtn = pbtn; this.prestigeArmed = false;
    body.appendChild(h("div", { class: "prestige" }, [
      h("h4", { text: "Sell the business" }),
      h("div", { text: "Start over with a better reputation. Each ★ adds +" + Math.round(this.d.config.prestige.sellBonusPerStar * 100) + "% to everything you sell, forever. Collections are kept." }),
      h("div", { class: "blurb", text: "Earned this business: " + money(g.s.lifetime) + ". Next ★ at " + money(Math.pow(g.prestigePreview() + 1, 2) * this.d.config.prestige.earningsPerStarSquared) + "." }),
      pbtn
    ]));
    this.updateAffordability();
  };

  UI.prototype.updatePrestige = function () {
    var b = this.prestigeBtn; if (!b || this.prestigeArmed || !b.isConnected) return;
    var g = this.g, gain = g.prestigePreview();
    b.disabled = gain < 1 || !!g.s.current || !!g.s.bidding;
    b.textContent = gain < 1 ? "Not worth selling yet" : (g.s.current || g.s.bidding) ? "Finish what you're doing first" : "Sell for +" + gain + " ★";
  };

  UI.prototype.updateGoal = function () {
    if (!this.goalEl || !this.goalEl.isConnected) return;
    var goal = this.g.nextGoal();
    this.goalEl.innerHTML = "";
    if (!goal) { this.goalEl.appendChild(h("b", { text: "Everything on the shelf is affordable. Go open bigger containers." })); return; }
    var pct = Math.max(0, Math.min(100, this.g.s.money / goal.cost * 100));
    this.goalEl.appendChild(h("div", {}, [h("b", { text: "Next goal: " }), goal.upgrade.name + " · " + money(goal.cost)]));
    this.goalEl.appendChild(h("div", { class: "bar" }, [h("i", { style: "width:" + pct + "%" })]));
  };

  UI.prototype.updateAffordability = function () {
    var g = this.g;
    (this.shopBtns || []).forEach(function (o) {
      var info = g.upgradeInfo(o.u), can = !info.maxed && info.unlocked && g.canAfford(info.cost) && !g.s.bidding;
      o.btn.disabled = !can;
      o.card.classList.toggle("can", can);
    });
    this.updateGoal(); this.updatePrestige();
  };

  UI.prototype.renderContracts = function () {
    var self = this, body = this.sheetBody;
    body.appendChild(h("p", { class: "blurb", text: "Optional jobs from the harbour office. No deadlines. Rewards are fixed when the job is posted." }));
    (this.g.s.contracts || []).forEach(function (c) {
      body.appendChild(h("div", { class: "contract" }, [
        h("div", { class: "ct" }, [h("span", { text: self.g.contractText(c) }), h("b", { text: "+" + money(c.reward) })]),
        h("div", { class: "bar" }, [h("i", { style: "width:" + (c.progress / c.n * 100) + "%" })]),
        h("small", { text: c.progress + " / " + c.n })
      ]));
    });
  };

  UI.prototype.renderCollections = function () {
    var self = this, g = this.g, body = this.sheetBody, album = h("div", { class: "album" });
    body.appendChild(h("p", { class: "blurb", text: "Keep the first copy of each item to complete a set. Rewards are permanent, even after you sell the business." }));
    this.d.collections.forEach(function (col) {
      var have = col.items.filter(function (id) { return g.s.collected.indexOf(id) !== -1; }).length, done = g.s.completed.indexOf(col.id) !== -1;
      var slots = h("div", { class: "slots" });
      col.items.forEach(function (id) {
        var def = self.d.itemById[id], got = g.s.collected.indexOf(id) !== -1;
        slots.appendChild(h("div", { class: "slot" + (got ? "" : " empty"), style: "--rc:" + self.rarity(def.rarity).color, title: def.name + (got ? "" : " (not found yet)") }, [icon(def.art)]));
      });
      album.appendChild(h("div", { class: "set" + (done ? " done" : "") }, [
        h("header", {}, [h("b", {}, [icon(col.art), col.name]), h("span", { class: "count", text: have + " / " + col.items.length })]),
        slots,
        h("div", { class: "reward", text: (done ? "Complete: " : "Reward: ") + col.reward.text })
      ]));
    });
    body.appendChild(album);
  };

  UI.prototype.renderLog = function () {
    var self = this, g = this.g, body = this.sheetBody, list = h("ul", { class: "log" });
    if (!g.s.history.length) list.appendChild(h("li", { text: "No containers opened yet." }));
    g.s.history.forEach(function (t) {
      var c = self.d.containerById[t.containerId];
      list.appendChild(h("li", {}, [h("span", { text: c.name }), h("span", { class: t.profit >= 0 ? "gain" : "loss", text: (t.profit >= 0 ? "+" : "") + money(t.profit) })]));
    });
    body.appendChild(list);
    var st = g.s.stats;
    body.appendChild(h("p", { class: "blurb", text: "Containers opened: " + st.opened + " · Legendaries found: " + st.found.legendary + (st.best ? " · Best container: " + money(st.best.profit) : "") }));
    var armed = false, wipe = h("button", { class: "gbtn steel small", onclick: function () {
      if (!armed) { armed = true; wipe.textContent = "Tap again to erase your save"; setTimeout(function () { armed = false; wipe.textContent = "New game"; }, 3000); return; }
      self.toggleSheet(null); g.wipe(); self.renderAll();
    } }, ["New game"]);
    body.appendChild(wipe);
    body.appendChild(h("p", { class: "credits" }, ["Icons: game-icons.net by Lorc, Delapouite and contributors, ",
      h("a", { href: "https://creativecommons.org/licenses/by/3.0/", target: "_blank", rel: "noopener" }, ["CC BY 3.0"]), "."]));
  };

  UI.prototype.toast = function (text) {
    var old = doc.querySelector(".toast"); if (old) old.remove();
    var t = h("div", { class: "toast", role: "status", text: text });
    doc.body.appendChild(t); setTimeout(function () { t.remove(); }, 3200);
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
        if (hits > 0) { autoAcc -= hits; self.g.autoScrape(hits, function (open) { return open[Math.floor(Math.random() * open.length)]; }); }
      }
      if (self.scene && !doc.hidden) self.scene.frame(dt);
      fxStep(dt);
      acc += dt; saveAcc += dt;
      if (acc > 0.25) { acc = 0; self.renderTop(); self.updateBadges(); if (self.sheetName === "upgrades") self.updateAffordability(); }
      if (saveAcc > 5) { saveAcc = 0; self.g.save(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  DS.UI = UI;
  DS.fmt = { money: money, containerCode: containerCode };
})(this);
