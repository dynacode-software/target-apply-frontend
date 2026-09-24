/**
 * pages/blog-post.js
 * Detalle de un artículo, resuelto por ?id= en la ruta (#/blog-post?id=...).
 * Como no se pidió contenido enriquecido del cuerpo del artículo, se
 * muestra el excerpt como cuerpo y se listan otros artículos de la misma
 * categoría.
 */
(function () {
  async function render(query) {
    const t = LangState.t.blog;
    const id = query ? query.get('id') : null;
    const [post, all] = await Promise.all([
      id ? TA_API.getBlogPostById(id) : Promise.resolve(null),
      TA_API.getBlogPosts()
    ]);

    if (!post) {
      document.title = 'Target Apply — ' + t.title;
      document.getElementById('pageRoot').innerHTML = `
        <div class="page"><div class="empty-state">
          <h3>${t.notFoundTitle}</h3>
          <p><a href="#/blog" class="btn btn--ghost" style="margin-top:1rem">${t.back}</a></p>
        </div></div>`;
      return;
    }

    const date = new Date(post.date).toLocaleDateString(LangState.lang === 'TR' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const related = all.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

    document.title = 'Target Apply — ' + post.title[LangState.lang];

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${post.category}</span>
            <h1 class="page-hero__title">${post.title[LangState.lang]}</h1>
            <p class="page-hero__desc">${t.by} ${post.author} &middot; ${date}</p>
          </div>
        </div>

        <div class="container" style="padding-block:3rem; max-width:44rem;">
          <div class="uni-card__img" style="height:280px; border-radius:var(--radius-md); margin-bottom:2rem;">
            <img src="${post.image}" alt="${post.title[LangState.lang]}" onerror="this.remove();">
          </div>
          <p style="font-size:1.0625rem; line-height:1.75; color:var(--text-muted)">${post.excerpt[LangState.lang]}</p>
          <a href="#/blog" class="btn btn--ghost" style="margin-top:2rem">${t.back}</a>
        </div>

        ${related.length ? `
        <div class="container" style="padding-bottom:3rem;">
          <h2 class="section-header__title" style="margin-bottom:1.25rem">${t.relatedTitle} ${post.category}</h2>
          <div class="grid-cards" style="padding:0">
            ${related.map(p => `
              <a class="blog-card" href="#/blog-post?id=${p.id}">
                <div class="blog-card__img"><img src="${p.image}" alt="${p.title[LangState.lang]}" onerror="this.remove();"></div>
                <div class="blog-card__body">
                  <span class="blog-card__cat">${p.category}</span>
                  <h3 class="blog-card__title">${p.title[LangState.lang]}</h3>
                </div>
              </a>`).join('')}
          </div>
        </div>` : ''}

        <div class="cta-strip">
          <div class="cta-strip__inner">
            <span class="cta-strip__eyebrow">${t.ctaLabel}</span>
            <h2>${t.ctaTitle}</h2>
            <p>${t.ctaDesc}</p>
            <a href="#/contact" class="btn btn--gold">${t.requestConsultation}</a>
          </div>
        </div>
      </div>`;
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.blogPost = render;
})();
