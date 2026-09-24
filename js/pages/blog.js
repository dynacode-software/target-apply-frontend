/**
 * pages/blog.js
 * Listado de artículos del blog, con filtro por categoría. Los artículos
 * se piden a TA_API.getBlogPosts(); las categorías se derivan de ellos.
 */
(function () {
  const state = { category: 'all', all: [] };

  function categories() {
    return ['all', ...new Set(state.all.map(p => p.category))];
  }

  function filtered() {
    return state.category === 'all' ? state.all : state.all.filter(p => p.category === state.category);
  }

  function cardHTML(p) {
    const t = LangState.t.blog;
    const date = new Date(p.date).toLocaleDateString(LangState.lang === 'TR' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
    return `
      <a class="blog-card" href="#/blog-post?id=${p.id}">
        <div class="blog-card__img"><img src="${p.image}" alt="${p.title[LangState.lang]}" loading="lazy" onerror="this.remove();"></div>
        <div class="blog-card__body">
          <span class="blog-card__cat">${p.category}</span>
          <h3 class="blog-card__title">${p.title[LangState.lang]}</h3>
          <p class="blog-card__excerpt">${p.excerpt[LangState.lang]}</p>
          <span class="blog-card__meta">${t.by} ${p.author} &middot; ${date}</span>
        </div>
      </a>`;
  }

  function renderGrid() {
    const t = LangState.t.blog;
    const list = filtered();
    const grid = document.getElementById('cardsGrid');
    const pills = document.getElementById('catPills');
    if (pills) {
      pills.innerHTML = categories().map(c => `
        <button class="cat-pill ${c === state.category ? 'active' : ''}" data-cat="${c}">${c === 'all' ? t.allCategories : c}</button>
      `).join('');
    }
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<div class="empty-state"><h3>${t.notFoundTitle}</h3><p>${t.notFoundDesc}</p></div>`;
  }

  function shell() {
    const t = LangState.t.blog;
    document.title = 'Target Apply — ' + t.title;

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero blog-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${t.guidesLabel}</span>
            <h1 class="page-hero__title">${t.title}</h1>
            <p class="page-hero__desc">${t.desc}</p>
          </div>
        </div>

        <div class="blog-cats" id="catPills"></div>

        <div class="grid-cards" id="cardsGrid">
          <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
        </div>
      </div>`;

    document.getElementById('catPills').addEventListener('click', e => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      state.category = btn.dataset.cat;
      renderGrid();
    });
  }

  async function render() {
    shell();
    if (!state.all.length) state.all = await TA_API.getBlogPosts();
    renderGrid();
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.blog = render;
})();
