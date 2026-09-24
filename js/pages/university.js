/**
 * pages/university.js
 * Vista de detalle de una universidad, resuelta por ?id= en la ruta
 * (#/university?id=itu). El router le pasa el query ya parseado; pide un
 * único registro a TA_API.getUniversityById() en vez de traer la lista
 * completa.
 */
(function () {
  function notFoundHTML() {
    const t = LangState.t.universities;
    return `<div class="page"><div class="empty-state">
      <h3>${t.notFoundTitle}</h3>
      <p><a href="#/universities" class="btn btn--ghost" style="margin-top:1rem">${t.backToList}</a></p>
    </div></div>`;
  }

  async function render(query) {
    const t = LangState.t.universities;
    const id = query ? query.get('id') : null;
    const u = id ? await TA_API.getUniversityById(id) : null;

    if (!u) {
      document.title = 'Target Apply — ' + t.notFoundTitle;
      document.getElementById('pageRoot').innerHTML = notFoundHTML();
      return;
    }

    document.title = 'Target Apply — ' + u.name;
    const typeLabel = u.type === 'Public' ? t.public : t.private;

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${u.city} &middot; ${typeLabel}</span>
            <h1 class="page-hero__title">${u.name}</h1>
            <p class="page-hero__desc">${u.description[LangState.lang]}</p>
          </div>
        </div>

        <div class="container" style="padding-block:3rem; display:grid; gap:2.5rem; grid-template-columns:1fr;">
          <div class="uni-card__img" style="height:320px; border-radius:var(--radius-md);">
            <img src="${u.image}" alt="${u.name}" onerror="this.remove();">
          </div>

          <div style="display:grid; gap:1.5rem; grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));">
            <div><div class="uni-card__city"><span>${t.founded}</span></div><p style="margin-top:.25rem">${u.founded}</p></div>
            <div><div class="uni-card__city"><span>${t.tuition}</span></div><p style="margin-top:.25rem">${u.tuitionRange}</p></div>
            <div><div class="uni-card__city"><span>${t.languagesLabel}</span></div><p style="margin-top:.25rem">${u.languages.join(', ')}</p></div>
            <div><div class="uni-card__city"><span>${t.ranking}</span></div><p style="margin-top:.25rem">${u.ranking}</p></div>
          </div>

          <div>
            <h2 class="section-header__title" style="margin-bottom:1rem">${t.programsOffered}</h2>
            <div class="program-card__tags">${u.programs.map(p => `<span class="tag">${p}</span>`).join('')}</div>
          </div>

          <div class="hero__actions">
            <a href="${u.website}" target="_blank" rel="noopener" class="btn btn--ghost">${t.visitWebsite}</a>
            <a href="#/contact" class="btn btn--primary">${LangState.t.programs.requestConsultation}</a>
            <a href="#/universities" class="btn btn--ghost">${t.backToList}</a>
          </div>
        </div>
      </div>`;
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.university = render;
})();
