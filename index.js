// Block pop-up windows and tab redirects
window.open = function() { return null; };

// Hide common ad containers and invisible click-jack overlays
const style = document.createElement('style');
style.textContent = `
  iframe[src*="ads"], div[id*="ad-"], div[class*="popup"], 
  a[target="_blank"][style*="fixed"], ins.adsbygoogle {
    display: none !important;
    pointer-events: none !important;
  }
`;
document.documentElement.appendChild(style);
