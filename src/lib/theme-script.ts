/**
 * Runs before first paint (inlined in <head>) so the page never flashes the
 * wrong theme: light unless the visitor has chosen dark with the header toggle.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'){t='light'}document.documentElement.dataset.theme=t}catch(e){}})();`;
