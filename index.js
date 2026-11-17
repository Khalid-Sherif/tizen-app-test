(function() {
  // 1. Block all pop-up windows and new-tab redirects
  window.open = function() { return null; };

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && (link.target === '_blank' || (link.href && !link.href.includes('movy.sx')))) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // 2. Block common streaming ad/pop-under script domains
  const adDomains = [
    'doubleclick', 'googlesyndication', 'adsterra', 'popads', 'popcash',
    'propellerads', 'exoclick', 'juicyads', 'hilltopads', 'monetag',
    'trafficjunky', 'onclicka', 'acscdn', 'bet', 'casino'
  ];

  const isAdUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const lower = url.toLowerCase();
    return adDomains.some(domain => lower.includes(domain));
  };

  // Intercept dynamically injected <script> and <iframe> elements
  const origAppend = Element.prototype.appendChild;
  Element.prototype.appendChild = function(el) {
    if ((el.tagName === 'SCRIPT' || el.tagName === 'IFRAME') && isAdUrl(el.src)) {
      return el;
    }
    return origAppend.call(this, el);
  };

  // 3. Hide banner ads and invisible full-screen click-jack overlays via CSS
  const injectCSS = () => {
    if (document.getElementById('tb-adblock-css')) return;
    const style = document.createElement('style');
    style.id = 'tb-adblock-css';
    style.textContent = `
      iframe:not([src*="movy"]):not([src*="vid"]):not([src*="embed"]):not([src*="player"]),
      div[id*="ad"], div[class*="ad-"], div[class*="-ad"], div[class*="banner"],
      div[class*="popup"], div[class*="overlay"][style*="z-index"],
      a[target="_blank"], ins.adsbygoogle {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  };

  injectCSS();
  setInterval(injectCSS, 1500);
})();
