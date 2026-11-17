(function() {
  // 1. Safely block pop-up windows
  try {
    window.open = function() { return null; };
  } catch (e) {}

  // 2. Block external link redirects without using modern .closest()
  document.addEventListener('click', function(e) {
    var el = e.target;
    while (el && el.tagName !== 'A') {
      el = el.parentElement;
    }
    if (el && el.href) {
      if (el.target === '_blank' || el.href.indexOf('movy.sx') === -1) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, true);

  // 3. Hide ad containers and overlays via CSS
  function injectCSS() {
    if (!document.head && !document.documentElement) return;
    if (document.getElementById('tb-adblock-css')) return;

    var style = document.createElement('style');
    style.id = 'tb-adblock-css';
    style.type = 'text/css';
    style.innerHTML = [
      'ins.adsbygoogle,',
      'div[id^="div-gpt-ad"],',
      'div[class*="popup"],',
      'div[class*="banner"],',
      'a[target="_blank"][style*="fixed"],',
      'a[target="_blank"][style*="absolute"] {',
      '  display: none !important;',
      '  visibility: hidden !important;',
      '  pointer-events: none !important;',
      '}'
    ].join('\n');

    (document.head || document.documentElement).appendChild(style);
  }

  injectCSS();
  setInterval(injectCSS, 2000);
})();
