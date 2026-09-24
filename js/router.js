/**
 * router.js
 * Router de una sola página basado en el hash de la URL (#/ruta?param=valor).
 * No hay recargas de página: cada "ruta" es una función de render ya
 * registrada por su módulo en window.TA_PAGES, y este router se limita a
 * decidir cuál llamar y a mantener el header/footer sincronizados.
 *
 * Rutas:
 *   #/                      -> home
 *   #/universities          -> universities
 *   #/university?id=itu     -> university (detalle)
 *   #/programs              -> programs
 *   #/about                 -> about
 *   #/blog                  -> blog
 *   #/blog-post?id=...      -> blog-post (detalle)
 *   #/contact               -> contact
 */
(function () {
  const ROUTE_TO_PAGE = {
    '': 'home',
    'home': 'home',
    'universities': 'universities',
    'university': 'university',
    'programs': 'programs',
    'about': 'about',
    'blog': 'blog',
    'blog-post': 'blogPost',
    'contact': 'contact'
  };

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, ''); // quita "#" y el "/" inicial
    const [path, query] = raw.split('?');
    return { path: path || '', query: new URLSearchParams(query || '') };
  }

  function routeKey() {
    const { path } = parseHash();
    return ROUTE_TO_PAGE.hasOwnProperty(path) ? path : '';
  }

  async function renderCurrent() {
    const { path, query } = parseHash();
    const key = ROUTE_TO_PAGE.hasOwnProperty(path) ? path : '';
    const pageFn = window.TA_PAGES && window.TA_PAGES[ROUTE_TO_PAGE[key]];

    if (typeof window.mountLayout === 'function') window.mountLayout();

    if (typeof pageFn === 'function') {
      await pageFn(query);
    } else {
      document.getElementById('pageRoot').innerHTML = '<div class="page"><div class="empty-state"><h3>404</h3></div></div>';
    }

    window.scrollTo(0, 0);
  }

  window.Router = { parseHash, routeKey, renderCurrent };

  window.addEventListener('hashchange', renderCurrent);
  window.addEventListener('langchange', renderCurrent);
  document.addEventListener('DOMContentLoaded', renderCurrent);
})();
