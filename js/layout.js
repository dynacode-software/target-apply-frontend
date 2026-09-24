/**
 * layout.js
 * Construye el header (topbar + navbar) y el footer, comunes a todas las
 * vistas. A diferencia de una versión MPA, NO se auto-monta al cargar:
 * expone window.mountLayout() y es router.js quien decide cuándo llamarlo
 * (en cada cambio de ruta y de idioma), para que el enlace activo del menú
 * siempre refleje la vista actual sin recargar la página.
 */
// Ruta del logo, compartida con otras vistas. Coloca tu archivo en
// assets/img/brand/logo.png (o .svg, ajustando esta constante en un solo
// lugar). El logo se muestra solo (sin repetir "Target Apply" en texto al
// lado, como en el diseño de referencia); si el archivo no existe todavía,
// cada <img> que la usa tiene un "onerror" que la oculta.
window.TA_LOGO = 'assets/img/brand/logo.png';

(function () {
  const NAV_ITEMS = [
    { route: '', key: 'home' },
    { route: 'universities', key: 'universities' },
    { route: 'programs', key: 'programs' },
    { route: 'about', key: 'about' },
    { route: 'blog', key: 'blog' },
    { route: 'contact', key: 'contact' }
  ];

  const LANGUAGES = ['EN', 'TR'];

  const ICONS = {
    mail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    instagram: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    whatsapp: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.9-.8 1-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.1-.2 0-.4.1-.5.2-.2.5-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2-.1-.3-.3-.2-.5-.2h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c1.6 2.2 3.3 3.4 5.8 4.3.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.3A10 10 0 1 0 12 2z"/></svg>',
    youtube: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C15.7 2.6 12 2.6 12 2.6h0s-3.7 0-7.3.3c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S1.2 8.1 1.2 10v1.9c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.1.3 7.1.3s3.7 0 7.3-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V10c0-1.9-.3-3.8-.3-3.8z"/><path d="M9.8 14.5V7.5l6 3.5z"/></svg>',
    globe: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    chevron: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5"><path d="m6 9 6 6 6-6"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1B2A" stroke-width="2" stroke-linecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>'
  };

  function langMenu() {
    return LANGUAGES.map(l => `<button class="lang-option ${l === LangState.lang ? 'active' : ''}" data-lang="${l}">${l}</button>`).join('');
  }

  function renderNavbar() {
    const t = LangState.t;
    const here = window.Router ? window.Router.routeKey() : '';
    const links = NAV_ITEMS.map(({ route, key }) => {
      const cls = route === here ? ' class="active"' : '';
      return `<a href="#/${route}"${cls}>${t.nav[key]}</a>`;
    }).join('');

    return `
      <div class="topbar">
        <div class="topbar__inner">
          <div class="topbar__contacts">
            <a href="mailto:hello@targetapply.com">${ICONS.mail}hello@targetapply.com</a>
            <a href="tel:+900000000000">${ICONS.phone}+90 000 000 00 00</a>
          </div>
          <div class="topbar__social">
            <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="#" aria-label="WhatsApp">${ICONS.whatsapp}</a>
            <a href="#" aria-label="YouTube">${ICONS.youtube}</a>
          </div>
        </div>
      </div>
      <nav class="navbar">
        <div class="navbar__inner">
          <a href="#/" class="navbar__logo"><img src="${window.TA_LOGO}" alt="Target Apply" onerror="this.remove();"></a>
          <div class="navbar__links">${links}</div>
          <div class="navbar__actions">
            <div class="lang-dropdown" id="langDropdown">
              <button class="lang-toggle" id="langToggle" aria-label="Change language">
                ${ICONS.globe}<span>${LangState.lang}</span>${ICONS.chevron}
              </button>
              <div class="lang-dropdown__menu" id="langMenu">${langMenu()}</div>
            </div>
            <a href="#/contact" class="btn-apply">${t.nav.applyNow}</a>
          </div>
          <div class="navbar__mobile-toggle">
            <div class="lang-dropdown" id="langDropdownMobile">
              <button class="lang-mini" id="langToggleMobile" aria-label="Change language">${LangState.lang}</button>
              <div class="lang-dropdown__menu" id="langMenuMobile">${langMenu()}</div>
            </div>
            <button id="menuToggle" aria-label="Toggle menu">${ICONS.menu}</button>
          </div>
        </div>
        <div class="navbar__mobile-menu" id="mobileMenu">
          ${NAV_ITEMS.map(({ route, key }) => `<a href="#/${route}">${t.nav[key]}</a>`).join('')}
          <a href="#/contact" class="btn-apply">${t.nav.applyNow}</a>
        </div>
      </nav>`;
  }

  function renderFooter() {
    const t = LangState.t.footer;
    const nav = LangState.t.nav;
    return `
      <div class="footer__main">
        <div class="footer__grid">
          <div class="footer__brand-col">
            <a href="#/" class="footer__brand"><img src="${window.TA_LOGO}" alt="Target Apply" onerror="this.remove();"></a>
            <p>${t.tagline}</p>
          </div>
          <div class="footer__col">
            <h4>${t.explore}</h4>
            <ul>
              <li><a href="#/universities">${nav.universities}</a></li>
              <li><a href="#/programs">${nav.programs}</a></li>
              <li><a href="#/about">${t.aboutUs}</a></li>
              <li><a href="#/blog">${nav.blog}</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>${t.services}</h4>
            <ul>
              <li><span>${t.applicationSupport}</span></li>
              <li><span>${t.visaGuidance}</span></li>
              <li><span>${t.accommodation}</span></li>
              <li><span>${t.scholarshipSearch}</span></li>
              <li><span>${t.languagePrep}</span></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>${t.contact}</h4>
            <ul>
              <li><a href="mailto:hello@targetapply.com">hello@targetapply.com</a></li>
              <li><a href="tel:+900000000000">+90 000 000 00 00</a></li>
              <li><span>Istanbul, Turkey</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-inner">
          <span>&copy; ${t.copyright}</span>
          <span>${t.prototype}</span>
        </div>
      </div>`;
  }

  function mount() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    if (header) header.innerHTML = renderNavbar();
    if (footer) footer.innerHTML = renderFooter();
  }

  // Delegado en document: sigue funcionando aunque el header se reconstruya.
  document.addEventListener('click', e => {
    const langBtn = e.target.closest('#langToggle') || e.target.closest('#langToggleMobile');
    if (langBtn) {
      langBtn.closest('.lang-dropdown').classList.toggle('open');
      return;
    }
    const langOption = e.target.closest('.lang-option');
    if (langOption) {
      LangState.set(langOption.dataset.lang);
      return;
    }
    if (e.target.closest('#menuToggle')) {
      document.getElementById('mobileMenu')?.classList.toggle('open');
      return;
    }
    // Cerrar el menú móvil al navegar a una ruta interna.
    if (e.target.closest('#mobileMenu a')) {
      document.getElementById('mobileMenu')?.classList.remove('open');
      return;
    }
    // Cualquier otro clic cierra los dropdowns de idioma abiertos.
    document.querySelectorAll('.lang-dropdown.open').forEach(el => el.classList.remove('open'));
  });

  window.mountLayout = mount;
})();
