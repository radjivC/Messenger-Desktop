var url = require('url');
var nw = require('nw.gui');
var win = nw.Window.get();

var nativeMenuBar = new nw.Menu({ type: "menubar" });

if (nativeMenuBar.createMacBuiltin) {
  nativeMenuBar.createMacBuiltin("Messenger Native");
}

win.menu = nativeMenuBar;

window.onload = function() {
  document.getElementById('wv1').addEventListener('newwindow', function(e) {
    var urlObj = url.parse(e.targetUrl, true);
    if (urlObj.host.indexOf('facebook') !== -1) {
      nw.Shell.openExternal(e.targetUrl);
      return;
    }
    // If the link is external, facebook wraps it in a link to an intermediate
    // url which asks if you really want to leave.  This just skips that step.
    var realUrl = urlObj.query.u;
    if (realUrl) {
      nw.Shell.openExternal(realUrl);
    }
  });
};