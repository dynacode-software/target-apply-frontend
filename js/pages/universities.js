/**
 * pages/universities.js
 * Página de listado de universidades. Los datos se piden una vez a
 * TA_API.getUniversities() y el filtrado (texto, ciudad, tipo) ocurre en
 * memoria sobre esa respuesta, igual que haría un backend real con una
 * lista ya cacheada.
 */
(function () {
  const state = { q: '', city: 'all', type: 'all', all: [] };

  function cityOptions() {
    const cities = [...new Set(state.all.map(u => u.city))].sort();
    return ['all', ...cities];
  }

  function filtered() {
    const q = state.q.toLowerCase();
    return state.all.filter(u => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.programs.some(p => p.toLowerCase().includes(q));
      const matchCity = state.city === 'all' || u.city === state.city;
      const matchType = state.type === 'all' || u.type === state.type;
      return matchQ && matchCity && matchType;
    });
  }

  function cardHTML(u) {
    const t = LangState.t.universities;
    const typeLabel = u.type === 'Public' ? t.public : t.private;
    return `
      <a class="uni-card" href="#/university?id=${u.id}">
        <div class="uni-card__img"><img src="${u.image}" alt="${u.name}" loading="lazy" onerror="this.remove();"></div>
        <div class="uni-card__body">
          <div class="uni-card__top">
            <div class="uni-card__city"><span>${u.city}</span></div>
            <span class="uni-card__type ${u.type.toLowerCase()}">${typeLabel}</span>
          </div>
          <h3 class="uni-card__title">${u.name}</h3>
          <p class="uni-card__desc">${u.description[LangState.lang]}</p>
          <div class="uni-card__more">${t.learnMore} &rarr;</div>
        </div>
      </a>`;
  }

  function renderGrid() {
    const t = LangState.t.universities;
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
    const t = LangState.t.universities;
    document.title = 'Target Apply — ' + t.title;
    const cities = cityOptions();

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${t.partnerNetwork}</span>
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
            <select id="citySelect">
              ${cities.map(c => `<option value="${c}" ${c === state.city ? 'selected' : ''}>${c === 'all' ? t.allCities : c}</option>`).join('')}
            </select>
            <select id="typeSelect">
              <option value="all" ${state.type === 'all' ? 'selected' : ''}>${t.allTypes}</option>
              <option value="Public" ${state.type === 'Public' ? 'selected' : ''}>${t.public}</option>
              <option value="Private" ${state.type === 'Private' ? 'selected' : ''}>${t.private}</option>
            </select>
            <span class="filterbar__count" id="resultCount"></span>
          </div>
        </div>

        <div class="grid-cards" id="cardsGrid">
          <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
        </div>
      </div>`;

    document.getElementById('searchInput').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
    document.getElementById('citySelect').addEventListener('change', e => { state.city = e.target.value; renderGrid(); });
    document.getElementById('typeSelect').addEventListener('change', e => { state.type = e.target.value; renderGrid(); });
  }

  async function render() {
    shell();
    if (!state.all.length) state.all = await TA_API.getUniversities();
    renderGrid();
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.universities = render;
})();
