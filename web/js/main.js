/* Boot: load data, restore the save, start the UI. */
(function (root) {
  "use strict";
  var DS = root.DS;

  function safeStorage() {
    try {
      var k = "__dockside_probe";
      root.localStorage.setItem(k, "1");
      root.localStorage.removeItem(k);
      return root.localStorage;
    } catch (e) { return null; }
  }

  function start(hotData) {
    var game = new DS.Game(root.DOCKSIDE_DATA, { storage: safeStorage() });
    if (hotData && hotData.state) { game.s = hotData.state; game.resumeBidding(); }
    else game.load();
    var ui = new DS.UI(game, document.getElementById("app"));
    ui.loop();
    // Save when the tab is hidden or closed (mobile browsers may kill background tabs).
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") game.save(); });
    root.addEventListener("pagehide", function () { game.save(); });
    root.dockside = { game: game, ui: ui };   // handy for debugging and tests
    if (root.claude && root.claude.hot && root.claude.hot.snapshot) {
      root.claude.hot.snapshot(function () { return { state: game.s }; });
    }
  }

  if (root.claude && root.claude.hot && root.claude.hot.ready) root.claude.hot.ready(start);
  else start(root.claude && root.claude.hot ? root.claude.hot.data : null);
})(this);
