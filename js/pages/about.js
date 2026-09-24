/**
 * pages/about.js
 * Página "Acerca de". La misión y las razones son texto fijo (I18N); el
 * equipo y las estadísticas se piden a TA_API porque son contenido que
 * cambiaría con más frecuencia (altas/bajas del equipo, nuevos números).
 */
(function () {
  function teamCard(m) {
    return `
      <div class="team-card">
        <div class="team-card__photo"><img src="${m.photo}" alt="${m.name}" onerror="this.remove();"></div>
        <h3 class="team-card__name">${m.name}</h3>
        <p class="team-card__role">${m.role[LangState.lang]}</p>
        <p class="team-card__bio">${m.bio[LangState.lang]}</p>
      </div>`;
  }

  function reasonCard(r, i) {
    return `
      <div class="reason-card">
        <span class="reason-card__num">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="reason-card__title">${r.title}</h3>
        <p class="reason-card__text">${r.desc}</p>
      </div>`;
  }

  async function render() {
    const t = LangState.t.about;
    document.title = 'Target Apply — ' + t.title;

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero page-hero--photo">
          <img class="page-hero__bg" src="assets/img/about/hero" alt="" onerror="this.remove();">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${t.label}</span>
            <h1 class="page-hero__title">${t.title}</h1>
            <p class="page-hero__desc">${t.heroDesc}</p>
          </div>
        </div>

        <section class="stats">
          <div class="container stats__grid" id="statsGrid"></div>
        </section>

        <section class="about-section">
          <div class="container mission-grid">
            <div>
              <div class="section-header" style="margin-bottom:1.5rem">
                <span class="section-header__eyebrow">${t.missionLabel}</span>
                <h2 class="section-header__title">${t.missionTitle}</h2>
              </div>
              ${t.missionParagraphs.map(p => `<p style="color:var(--text-muted); line-height:1.7; font-size:.9375rem; margin-bottom:1rem">${p}</p>`).join('')}
            </div>
            <div class="mission-media">
              <img src="assets/img/about/mission" alt="" onerror="this.closest('.mission-media').style.display='none';">
              <div class="mission-badge" id="missionBadge"></div>
            </div>
          </div>
        </section>

        <section class="about-section about-section--alt">
          <div class="container">
            <div class="section-header" style="margin-bottom:2rem">
              <span class="section-header__eyebrow">${t.whyLabel}</span>
              <h2 class="section-header__title">${t.whyTitle}</h2>
            </div>
            <div class="reasons-grid">${t.reasons.map(reasonCard).join('')}</div>
          </div>
        </section>

        <section class="about-section">
          <div class="container">
            <div class="section-header" style="margin-bottom:2rem">
              <span class="section-header__eyebrow">${t.teamLabel}</span>
              <h2 class="section-header__title">${t.teamTitle}</h2>
              <p class="section-header__desc">${t.teamDesc}</p>
            </div>
            <div class="team-grid" id="teamGrid">
              <p style="color:var(--text-soft)">${LangState.t.common.loading}</p>
            </div>
          </div>
        </section>

        <div class="cta-strip">
          <div class="cta-strip__inner">
            <h2>${t.ctaTitle}</h2>
            <p>${t.ctaDesc}</p>
            <a href="#/contact" class="btn btn--gold">${t.requestConsultation}</a>
          </div>
        </div>
      </div>`;

    const [team, stats] = await Promise.all([TA_API.getTeam(), TA_API.getStats()]);

    document.getElementById('teamGrid').innerHTML = team.map(teamCard).join('');
    document.getElementById('statsGrid').innerHTML = stats.map(s => `
      <div><div class="stats__value font-serif">${s.value}</div><div class="stats__label">${s.label[LangState.lang]}</div></div>
    `).join('');

    // La insignia flotante sobre la foto de la misión reutiliza el dato de
    // "estudiantes colocados" ya pedido al backend, en vez de repetirlo.
    const placedStat = stats[1];
    document.getElementById('missionBadge').innerHTML = placedStat
      ? `<div class="mission-badge__value font-serif">${placedStat.value}</div><div class="mission-badge__label">${t.studentsPlaced}</div>`
      : '';
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.about = render;
})();
