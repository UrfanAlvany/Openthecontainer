/* Synthesised sound (no audio files). Starts only after the first user gesture. */
(function (root) {
  "use strict";
  var ctx = null, master = null, enabled = true, noiseBuf = null;

  function ensure() {
    if (!enabled) return null;
    if (!ctx) {
      var AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      var data = noiseBuf.getChannelData(0);
      for (var i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, gain, glideTo) {
    var c = ensure(); if (!c) return;
    var t = c.currentTime + (start || 0);
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain || 0.2, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function noise(start, dur, freq, q, gain) {
    var c = ensure(); if (!c) return;
    var t = c.currentTime + (start || 0);
    var src = c.createBufferSource(); src.buffer = noiseBuf;
    var f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q || 1;
    var g = c.createGain();
    g.gain.setValueAtTime(gain || 0.2, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t, Math.random() * 0.3); src.stop(t + dur + 0.02);
  }

  var lastScrape = 0;
  var S = {
    setEnabled: function (on) { enabled = on; if (!on && ctx) ctx.suspend(); if (on) ensure(); },
    isEnabled: function () { return enabled; },
    unlock: function () { ensure(); },
    scrape: function () {
      var now = performance.now();
      if (now - lastScrape < 45) return;
      lastScrape = now;
      noise(0, 0.07, 1800 + Math.random() * 1600, 1.4, 0.10);
    },
    chip: function () { noise(0, 0.05, 3800, 3, 0.08); tone(900 + Math.random() * 300, 0, 0.04, "square", 0.02); },
    buy: function () { noise(0, 0.25, 300, 0.8, 0.25); tone(110, 0, 0.3, "sawtooth", 0.05, 70); },
    // Reveal sounds scale with rarity: junk is a dull thud, legendary is a fanfare.
    reveal: function (rarity) {
      switch (rarity) {
        case "junk": tone(160, 0, 0.12, "triangle", 0.12, 120); break;
        case "common": tone(520, 0, 0.14, "triangle", 0.12); break;
        case "rare": tone(784, 0, 0.18, "sine", 0.16); tone(1175, 0.06, 0.22, "sine", 0.12); break;
        case "epic":
          [659, 831, 988, 1319].forEach(function (f, i) { tone(f, i * 0.07, 0.3, "triangle", 0.14); });
          break;
        case "legendary":
          [523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) { tone(f, i * 0.08, 0.5, "triangle", 0.16); });
          tone(2093, 0.5, 0.9, "sine", 0.08);
          noise(0.45, 0.8, 6000, 0.7, 0.05);
          break;
      }
    },
    // Rising tone while the last tile of a big item is about to go.
    charge: function () { tone(220, 0, 0.45, "sawtooth", 0.05, 880); },
    cash: function () { tone(1568, 0, 0.08, "square", 0.05); tone(2093, 0.07, 0.18, "square", 0.05); noise(0, 0.12, 5000, 2, 0.05); },
    dud: function () { tone(330, 0, 0.25, "sawtooth", 0.07, 220); tone(247, 0.22, 0.45, "sawtooth", 0.07, 150); },
    fanfare: function () { [392, 523, 659, 784].forEach(function (f, i) { tone(f, i * 0.1, 0.35, "triangle", 0.12); }); },
    click: function () { tone(1200, 0, 0.03, "square", 0.03); }
  };
  root.DS = root.DS || {};
  root.DS.audio = S;
})(this);
