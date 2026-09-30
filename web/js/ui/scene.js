/* The world behind the UI: a container port at night, drawn procedurally on a canvas.
 * Static layers are pre-rendered on resize; lights, water and fog animate each frame. */
(function (root) {
  "use strict";
  var doc = root.document;

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var BOX_COLORS = ["#8b3f22", "#1f5f78", "#9a2f28", "#4b5a2e", "#2c3d86", "#b8781f", "#5a5f66", "#6d2f5a"];

  function Scene(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.staticLayer = doc.createElement("canvas");
    this.lights = [];      // blinking crane lights
    this.lamps = [];       // sodium lamp positions
    this.t = 0;
    this.focus = 0.5;      // horizontal spotlight position, 0..1
    this.mood = "night";   // "night" | "reveal" (warmer, brighter)
    this.moodT = 0;
    this.reduced = !!(root.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    var self = this;
    this.resize();
    root.addEventListener("resize", function () { self.resize(); });
  }

  Scene.prototype.resize = function () {
    var dpr = Math.min(2, root.devicePixelRatio || 1);
    this.w = root.innerWidth; this.h = root.innerHeight;
    this.c.width = this.staticLayer.width = Math.round(this.w * dpr);
    this.c.height = this.staticLayer.height = Math.round(this.h * dpr);
    this.dpr = dpr;
    this.drawStatic();
  };

  Scene.prototype.drawStatic = function () {
    var g = this.staticLayer.getContext("2d"), w = this.w, h = this.h, r = rng(1962);
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    var horizon = h * 0.52;
    this.horizon = horizon;

    // Sky: deep harbour blue with a sodium haze over the terminal.
    var sky = g.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, "#070d14");
    sky.addColorStop(0.6, "#0f1c2a");
    sky.addColorStop(1, "#2a2b2e");
    g.fillStyle = sky; g.fillRect(0, 0, w, horizon);
    var haze = g.createRadialGradient(w * 0.5, horizon, 10, w * 0.5, horizon, w * 0.7);
    haze.addColorStop(0, "rgba(255,150,60,.28)"); haze.addColorStop(1, "rgba(255,150,60,0)");
    g.fillStyle = haze; g.fillRect(0, 0, w, horizon);

    // Stars and a moon.
    for (var i = 0; i < 90; i++) {
      g.fillStyle = "rgba(220,230,255," + (0.15 + r() * 0.5) + ")";
      g.fillRect(r() * w, r() * horizon * 0.55, 1.2, 1.2);
    }
    var mx = w * 0.82, my = h * 0.12;
    var moon = g.createRadialGradient(mx, my, 2, mx, my, 70);
    moon.addColorStop(0, "rgba(235,238,245,.95)"); moon.addColorStop(0.18, "rgba(220,226,240,.9)");
    moon.addColorStop(0.2, "rgba(200,210,230,.18)"); moon.addColorStop(1, "rgba(200,210,230,0)");
    g.fillStyle = moon; g.beginPath(); g.arc(mx, my, 70, 0, Math.PI * 2); g.fill();

    // Far city skyline with lit windows.
    var x = 0;
    g.fillStyle = "#0b131b";
    var windows = [];
    while (x < w) {
      var bw = 20 + r() * 60, bh = 20 + r() * (h * 0.14);
      g.fillRect(x, horizon - bh - h * 0.05, bw, bh + h * 0.05);
      for (var k = 0; k < bw * bh / 180; k++) windows.push([x + 3 + r() * (bw - 6), horizon - bh - h * 0.05 + 4 + r() * bh]);
      x += bw + r() * 6;
    }
    windows.forEach(function (p) {
      g.fillStyle = r() < 0.7 ? "rgba(255,196,110,.55)" : "rgba(170,210,255,.45)";
      g.fillRect(p[0], p[1], 2, 2);
    });

    // Water between city and terminal.
    var water = g.createLinearGradient(0, horizon - h * 0.05, 0, horizon + h * 0.05);
    water.addColorStop(0, "#0a1520"); water.addColorStop(1, "#0d1a24");
    g.fillStyle = water; g.fillRect(0, horizon - h * 0.05, w, h * 0.1);
    this.waterY = horizon - h * 0.05; this.waterH = h * 0.1;

    // Gantry cranes (ship-to-shore), silhouettes with boom and legs.
    this.lights = [];
    var cranes = [w * 0.1, w * 0.36, w * 0.68, w * 0.93];
    var self = this;
    cranes.forEach(function (cx, i) {
      var scale = 0.75 + (i % 2) * 0.2, base = horizon + h * 0.03, top = base - h * 0.34 * scale;
      g.strokeStyle = "#0d151d"; g.fillStyle = "#0d151d"; g.lineWidth = 5 * scale;
      var legW = 60 * scale;
      g.beginPath();
      g.moveTo(cx - legW, base); g.lineTo(cx - legW * 0.8, top);
      g.moveTo(cx + legW, base); g.lineTo(cx + legW * 0.8, top);
      g.moveTo(cx - legW * 0.9, base - (base - top) * 0.45); g.lineTo(cx + legW * 0.9, base - (base - top) * 0.45);
      g.stroke();
      g.fillRect(cx - legW * 1.6, top - 10 * scale, legW * 4.6, 12 * scale);        // boom
      g.fillRect(cx - legW * 0.5, top - 34 * scale, legW, 26 * scale);               // machinery house
      g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(cx, top - 34 * scale); g.lineTo(cx - legW * 1.5, top - 8 * scale);
      g.moveTo(cx, top - 34 * scale); g.lineTo(cx + legW * 2.9, top - 8 * scale); g.stroke();
      self.lights.push({ x: cx + legW * 2.9, y: top - 12 * scale, phase: i * 0.7 });
      self.lights.push({ x: cx, y: top - 36 * scale, phase: i * 0.7 + 0.35 });
    });

    // Container stacks on the terminal, tinted by sodium light.
    var yardTop = horizon + h * 0.02;
    for (var row = 0; row < 3; row++) {
      var y0 = yardTop + row * h * 0.018, bh2 = h * 0.028 + row * h * 0.006;
      x = -20 + r() * 20;
      while (x < w) {
        var stack = 1 + Math.floor(r() * 4), bw2 = 44 + row * 14;
        for (var s = 0; s < stack; s++) {
          var col = BOX_COLORS[Math.floor(r() * BOX_COLORS.length)];
          var yy = y0 - s * bh2;
          g.fillStyle = col; g.fillRect(x, yy - bh2, bw2, bh2 - 1);
          g.fillStyle = "rgba(0,0,0," + (0.55 - row * 0.12) + ")"; g.fillRect(x, yy - bh2, bw2, bh2 - 1);
          g.fillStyle = "rgba(255,255,255,.06)";
          for (var rib = x + 3; rib < x + bw2 - 2; rib += 4) g.fillRect(rib, yy - bh2 + 1, 1, bh2 - 3);
        }
        x += bw2 + 2 + (r() < 0.2 ? 30 + r() * 60 : 0);
      }
    }

    // Foreground: the yard floor with painted lanes in perspective.
    var floorTop = yardTop + h * 0.05;
    var floor = g.createLinearGradient(0, floorTop, 0, h);
    floor.addColorStop(0, "#1c1f22"); floor.addColorStop(1, "#0c0e10");
    g.fillStyle = floor; g.fillRect(0, floorTop, w, h - floorTop);
    g.strokeStyle = "rgba(230,180,40,.22)"; g.lineWidth = 2;
    for (var ln = -6; ln <= 6; ln++) {
      g.beginPath(); g.moveTo(w * 0.5 + ln * w * 0.04, floorTop); g.lineTo(w * 0.5 + ln * w * 0.3, h); g.stroke();
    }
    g.strokeStyle = "rgba(255,255,255,.04)";
    for (var cr = 0; cr < 40; cr++) {                 // concrete cracks
      var cx0 = r() * w, cy0 = floorTop + r() * (h - floorTop);
      g.beginPath(); g.moveTo(cx0, cy0); g.lineTo(cx0 + (r() - 0.5) * 60, cy0 + (r() - 0.5) * 20); g.stroke();
    }

    // Lamp posts along the quay.
    this.lamps = [w * 0.05, w * 0.3, w * 0.55, w * 0.8].map(function (lx) { return { x: lx, y: floorTop - h * 0.16 }; });
    this.lamps.forEach(function (l) {
      g.fillStyle = "#0a0d10"; g.fillRect(l.x - 2, l.y, 4, floorTop - l.y + 8);
      g.fillRect(l.x - 12, l.y - 3, 24, 5);
    });
    this.floorTop = floorTop;
  };

  Scene.prototype.setMood = function (m) { this.mood = m; };
  Scene.prototype.setFocus = function (f) { this.focus = f; };

  Scene.prototype.frame = function (dt) {
    var g = this.ctx, w = this.w, h = this.h;
    this.t += this.reduced ? 0 : dt;
    var t = this.t;
    this.moodT += ((this.mood === "reveal" ? 1 : 0) - this.moodT) * Math.min(1, dt * 3);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(this.staticLayer, 0, 0);
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Water shimmer: moving highlight streaks.
    for (var i = 0; i < 26; i++) {
      var sx = ((i * 97.3 + t * (8 + (i % 5) * 3)) % (w + 80)) - 40;
      var sy = this.waterY + ((i * 37) % Math.max(1, this.waterH));
      g.fillStyle = "rgba(255,190,110," + (0.06 + 0.05 * Math.sin(t * 2 + i)) + ")";
      g.fillRect(sx, sy, 18 + (i % 4) * 8, 1);
    }

    // Blinking red aviation lights on the cranes.
    this.lights.forEach(function (l) {
      var on = Math.sin(t * 2.2 + l.phase * 6) > 0.2;
      if (!on) return;
      var gl = g.createRadialGradient(l.x, l.y, 0, l.x, l.y, 10);
      gl.addColorStop(0, "rgba(255,60,50,.95)"); gl.addColorStop(1, "rgba(255,60,50,0)");
      g.fillStyle = gl; g.beginPath(); g.arc(l.x, l.y, 10, 0, Math.PI * 2); g.fill();
    });

    // Sodium lamp cones.
    var ft = this.floorTop;
    this.lamps.forEach(function (l, i) {
      var flick = 0.92 + 0.08 * Math.sin(t * 13 + i * 3) * (i === 2 ? 1 : 0.1);
      var cone = g.createRadialGradient(l.x, l.y, 4, l.x, ft + h * 0.12, h * 0.34);
      cone.addColorStop(0, "rgba(255,170,80," + (0.22 * flick) + ")");
      cone.addColorStop(1, "rgba(255,170,80,0)");
      g.fillStyle = cone;
      g.beginPath(); g.moveTo(l.x - 8, l.y); g.lineTo(l.x + 8, l.y); g.lineTo(l.x + h * 0.3, h); g.lineTo(l.x - h * 0.3, h); g.closePath(); g.fill();
      g.fillStyle = "rgba(255,200,120," + (0.9 * flick) + ")"; g.fillRect(l.x - 9, l.y + 1, 18, 2);
    });

    // Stage spotlight on the yard floor (warmer and brighter during reveals).
    var fx = w * this.focus, fy = h * 0.72, rad = Math.max(w, h) * (0.45 + this.moodT * 0.1);
    var spot = g.createRadialGradient(fx, fy, 10, fx, fy, rad);
    spot.addColorStop(0, "rgba(255,215,150," + (0.10 + this.moodT * 0.10) + ")");
    spot.addColorStop(1, "rgba(255,215,150,0)");
    g.fillStyle = spot; g.fillRect(0, 0, w, h);

    // Drifting fog bands.
    for (var f = 0; f < 3; f++) {
      var fyy = this.horizon + h * (0.02 + f * 0.05);
      var off = ((t * (6 + f * 4)) % (w * 1.5)) - w * 0.25;
      var fog = g.createRadialGradient(off, fyy, 10, off, fyy, w * 0.4);
      fog.addColorStop(0, "rgba(150,165,180,.07)"); fog.addColorStop(1, "rgba(150,165,180,0)");
      g.fillStyle = fog; g.fillRect(0, fyy - h * 0.15, w, h * 0.3);
    }

    // Vignette.
    var vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
    vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.55)");
    g.fillStyle = vg; g.fillRect(0, 0, w, h);
  };

  root.DS = root.DS || {};
  root.DS.Scene = Scene;
})(this);
