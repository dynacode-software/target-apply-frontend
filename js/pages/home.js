/**
 * pages/home.js
 * Página de inicio. Los textos fijos vienen de I18N; las universidades
 * destacadas, los programas y las estadísticas se piden a TA_API (backend
 * simulado en memoria) cada vez que se renderiza la página.
 */
(function () {
  const root = () => document.getElementById('pageRoot');

  // Ícono simple por área de estudio, reutilizado en las tarjetas de programa.
  const FIELD_ICONS = {
    Engineering: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
    Medicine: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>',
    Business: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="18" y1="20" x2="18" y2="4"/></svg>',
    Architecture: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6"/></svg>',
    'Social Sciences': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    default: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>'
  };

  function stepsHTML() {
    return LangState.t.steps.map(s => `
      <li class="step">
        <span class="step__circle">${s.num}</span>
        <h3 class="step__title">${s.title}</h3>
        <p class="step__text">${s.desc}</p>
      </li>`).join('');
  }

  function uniCard(u) {
    const t = LangState.t.universities;
    const typeLabel = u.type === 'Public' ? t.public : t.private;
    return `
      <a class="uni-card" href="#/university?id=${u.id}">
        <div class="uni-card__img"><img src="${u.image}" alt="${u.name}" loading="lazy" onerror="this.closest('.uni-card__img').style.background='#E8E0D0'; this.remove();"></div>
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

  function programCard(p) {
    const icon = FIELD_ICONS[p.field] || FIELD_ICONS.default;
    return `
      <a class="program-card" href="#/programs?field=${encodeURIComponent(p.field)}&degree=${encodeURIComponent(p.degree)}">
        <div class="program-card__top">
          <div class="program-card__icon">${icon}</div>
          <h3 class="program-card__title">${p.name[LangState.lang]}</h3>
        </div>
        <div class="program-card__tags">
          <span class="tag tag--gold">${p.degree}</span>
          <span class="tag">${p.field}</span>
        </div>
      </a>`;
  }

  async function render() {
    const t = LangState.t.home;
    document.title = 'Target Apply — ' + t.heroTitlePrefix + ' ' + t.heroHighlight;

    root().innerHTML = `
      <section class="hero hero--photo">
        <img class="hero__bg" src="assets/img/hero/istanbul" alt="" onerror="this.remove();">
        <div class="container hero__inner">
          <div class="hero__card">
            <h1 class="hero__title">${t.heroTitlePrefix} <span class="hl">${t.heroHighlight}</span> ${t.heroSuffix}</h1>
            <p class="hero__subtitle">${t.heroDesc}</p>
            <div class="hero__actions">
              <a href="#/universities" class="btn btn--gold btn--lg">${t.exploreUniversities}</a>
              <a href="#/programs" class="btn btn--ghost btn--lg" style="border-color:rgba(255,255,255,.35); color:#fff">${t.browsePrograms}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="featured">
        <div class="container">
          <div class="section__head">
            <div class="section-header">
              <span class="section-header__eyebrow">${t.topPicksLabel}</span>
              <h2 class="section-header__title">${t.featuredTitle}</h2>
              <p class="section-header__desc">${t.featuredDesc}</p>
            </div>
            <a href="#/universities" class="section__view-all">${t.viewAll} &rarr;</a>
          </div>
          <div class="grid-cards" style="padding:0" id="featuredGrid">
            <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="container stats__grid" id="statsGrid"></div>
      </section>

      <section class="section" id="popular-programs" style="background:var(--cream-dark)">
        <div class="container">
          <div class="section-header" style="margin-bottom:2.5rem">
            <span class="section-header__eyebrow">${t.fieldsLabel}</span>
            <h2 class="section-header__title">${t.programsTitle}</h2>
            <p class="section-header__desc">${t.programsDesc}</p>
          </div>
          <div class="grid-cards" style="padding:0" id="programsGrid">
            <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
          </div>
          <div class="section__view-all-center">
            <a href="#/programs" class="btn btn--ghost">${t.viewAllPrograms} &rarr;</a>
          </div>
        </div>
      </section>

      <section class="how-it-works" id="how-it-works">
        <div class="container">
          <header class="section-header section-header--center">
            <span class="section-header__eyebrow">${t.howItWorksLabel}</span>
            <h2 class="section-header__title">${t.howItWorksTitle}</h2>
          </header>
          <ol class="steps">${stepsHTML()}</ol>
          <div class="how-it-works__cta" id="apply">
            <a href="#/contact" class="btn btn--primary btn--lg">${t.requestConsultation}</a>
          </div>
        </div>
      </section>`;

    const [featured, programs, stats] = await Promise.all([
      TA_API.getFeaturedUniversities(),
      TA_API.getPrograms(),
      TA_API.getStats()
    ]);

    document.getElementById('featuredGrid').innerHTML = featured.map(uniCard).join('');
    document.getElementById('programsGrid').innerHTML = programs.slice(0, 6).map(programCard).join('');
    document.getElementById('statsGrid').innerHTML = stats.map(s => `
      <div><div class="stats__value font-serif">${s.value}</div><div class="stats__label">${s.label[LangState.lang]}</div></div>
    `).join('');
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.home = render;
})();
