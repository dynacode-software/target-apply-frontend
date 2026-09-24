/**
 * pages/programs.js
 * Página de listado de programas académicos, con filtros por área,
 * nivel de título e idioma. Igual que universities.js, pide los datos
 * una vez a TA_API.getPrograms() y filtra en memoria.
 */
(function () {
  const state = { q: '', field: 'all', degree: 'all', language: 'all', all: [], universities: [] };

  const FIELD_ICONS = {
    Engineering: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
    Medicine: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>',
    Business: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="18" y1="20" x2="18" y2="4"/></svg>',
    Architecture: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6"/></svg>',
    'Social Sciences': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    default: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>'
  };

  function options(key) {
    return ['all', ...new Set(state.all.map(p => p[key]))].sort((a, b) => a === 'all' ? -1 : a.localeCompare(b));
  }

  function uniNames(ids) {
    return ids
      .map(id => state.universities.find(u => u.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  }

  function filtered() {
    const q = state.q.toLowerCase();
    return state.all.filter(p => {
      const name = p.name[LangState.lang].toLowerCase();
      const matchQ = !q || name.includes(q);
      const matchField = state.field === 'all' || p.field === state.field;
      const matchDegree = state.degree === 'all' || p.degree === state.degree;
      const matchLang = state.language === 'all' || p.language === state.language;
      return matchQ && matchField && matchDegree && matchLang;
    });
  }

  function cardHTML(p) {
    const t = LangState.t.programs;
    const icon = FIELD_ICONS[p.field] || FIELD_ICONS.default;
    return `
      <div class="program-card">
        <div class="program-card__top">
          <div class="program-card__icon">${icon}</div>
          <h3 class="program-card__title">${p.name[LangState.lang]}</h3>
        </div>
        <div class="program-card__tags">
          <span class="tag tag--gold">${p.degree}</span>
          <span class="tag">${p.field}</span>
          <span class="tag">${p.language}</span>
        </div>
        <p class="program-card__available">${t.availableAt} ${uniNames(p.universities)}</p>
        <div class="program-card__actions">
          <a class="btn btn--ghost" href="#/universities">${t.viewUniversities}</a>
          <a class="btn btn--primary" href="#/contact">${t.applyNow}</a>
        </div>
      </div>`;
  }

  function renderGrid() {
    const t = LangState.t.programs;
    const list = filtered();
    const grid = document.getElementById('cardsGrid');
    const count = document.getElementById('resultCount');
    if (count) count.textContent = t.results(list.length);
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<div class="empty-state"><h3>${t.notFoundTitle}</h3><p>${t.notFoundDesc}</p></div>`;
  }

  function shell() {
    const t = LangState.t.programs;
    document.title = 'Target Apply — ' + t.title;

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${t.fieldsOfStudy}</span>
            <h1 class="page-hero__title">${t.title}</h1>
            <p class="page-hero__desc">${t.desc}</p>
          </div>
        </div>

        <div class="filterbar">
          <div class="filterbar__inner">
            <div class="filterbar__search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9A9080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="searchInput" placeholder="${t.searchPlaceholder}" value="${state.q}">
            </div>
            <select id="fieldSelect">
              ${options('field').map(f => `<option value="${f}" ${f === state.field ? 'selected' : ''}>${f === 'all' ? t.allFields : f}</option>`).join('')}
            </select>
            <select id="degreeSelect">
              ${options('degree').map(d => `<option value="${d}" ${d === state.degree ? 'selected' : ''}>${d === 'all' ? t.allDegrees : d}</option>`).join('')}
            </select>
            <select id="langSelect">
              ${options('language').map(l => `<option value="${l}" ${l === state.language ? 'selected' : ''}>${l === 'all' ? t.allLanguages : l}</option>`).join('')}
            </select>
            <span class="filterbar__count" id="resultCount"></span>
          </div>
        </div>

        <div class="grid-cards" id="cardsGrid">
          <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
        </div>

        <div class="cta-strip">
          <div class="cta-strip__inner">
            <span class="cta-strip__eyebrow">${t.notSure}</span>
            <h2>${t.ctaTitle}</h2>
            <p>${t.ctaDesc}</p>
            <a href="#/contact" class="btn-gold btn btn--gold">${t.requestConsultation}</a>
          </div>
        </div>
      </div>`;

    document.getElementById('searchInput').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
    document.getElementById('fieldSelect').addEventListener('change', e => { state.field = e.target.value; renderGrid(); });
    document.getElementById('degreeSelect').addEventListener('change', e => { state.degree = e.target.value; renderGrid(); });
    document.getElementById('langSelect').addEventListener('change', e => { state.language = e.target.value; renderGrid(); });
  }

  async function render(query) {
    const firstLoad = !state.all.length;
    if (firstLoad) {
      document.getElementById('pageRoot').innerHTML = `<div class="page"><div class="loading-state"><p>${LangState.t.common.loading}</p></div></div>`;
      const [programs, universities] = await Promise.all([TA_API.getPrograms(), TA_API.getUniversities()]);
      state.all = programs;
      state.universities = universities;
    }
    // Si se llega desde una tarjeta de la home (#/programs?field=X&degree=Y),
    // preseleccionamos esos filtros una sola vez, al entrar a la página.
    if (firstLoad && query) {
      const field = query.get('field');
      const degree = query.get('degree');
      if (field) state.field = field;
      if (degree) state.degree = degree;
    }
    shell();
    renderGrid();
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.programs = render;
})();
