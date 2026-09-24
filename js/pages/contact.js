/**
 * pages/contact.js
 * Formulario de contacto. Las opciones de "Universidad" y "Programa" se
 * piden a TA_API (mismo backend simulado que el resto del sitio) en vez de
 * ser texto libre. El "envío" se simula con una demora (como si fuera un
 * POST real) y luego muestra un mensaje de éxito con el nombre capturado,
 * sin recargar la página.
 */
(function () {
  const ICONS = {
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
  };

  function submitToBackend(data) {
    return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 900));
  }

  function formHTML(t, universities, programs) {
    return `
      <form id="contactForm" class="form-card" novalidate>
        <h2 class="section-header__title" style="margin-bottom:1.5rem">${t.formTitle}</h2>

        <div class="form-row">
          <div class="form-field"><label for="fullName">${t.fullName}<span class="req">*</span></label><input id="fullName" name="fullName" type="text" placeholder="${t.fullName}" required></div>
          <div class="form-field"><label for="email">${t.email}<span class="req">*</span></label><input id="email" name="email" type="email" placeholder="you@example.com" required></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label for="phone">${t.phone}</label><input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000"></div>
          <div class="form-field"><label for="country">${t.country}<span class="req">*</span></label><input id="country" name="country" type="text" placeholder="e.g. Egypt, Nigeria, Kazakhstan" required></div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="university">${t.university}</label>
            <select id="university" name="university">
              <option value="">${t.selectOption}</option>
              ${universities.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label for="program">${t.program}</label>
            <select id="program" name="program">
              <option value="">${t.selectOption}</option>
              ${programs.map(p => `<option value="${p.id}">${p.name[LangState.lang]}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field">
          <label for="message">${t.message}</label>
          <textarea id="message" name="message" placeholder="${t.messagePlaceholder}"></textarea>
        </div>

        <button type="submit" class="btn btn--primary btn--block btn--lg" id="submitBtn">${t.submit}</button>
        <p class="form-disclaimer">${t.disclaimer}</p>
      </form>`;
  }

  function infoHTML(t) {
    return `
      <div class="contact-side">
        <div class="contact-info-card">
          <h3>${t.directContact}</h3>
          <div class="contact-info__item">
            <div class="contact-info__icon">${ICONS.mail}</div>
            <div><div class="contact-info__label">${t.email}</div><div class="contact-info__value">hello@targetapply.com</div></div>
          </div>
          <div class="contact-info__item">
            <div class="contact-info__icon">${ICONS.phone}</div>
            <div><div class="contact-info__label">${t.phone}</div><div class="contact-info__value">+90 000 000 00 00</div></div>
          </div>
          <div class="contact-info__item">
            <div class="contact-info__icon">${ICONS.pin}</div>
            <div><div class="contact-info__label">${t.officeLabel}</div><div class="contact-info__value">${t.officeAddress}</div></div>
          </div>
        </div>

        <div class="office-hours-card">
          <span class="office-hours-card__eyebrow">${t.officeHoursLabel}</span>
          <div class="hours-row"><span>${t.monFri}</span><span>09:00 &ndash; 18:00</span></div>
          <div class="hours-row"><span>${t.saturday}</span><span>10:00 &ndash; 14:00</span></div>
          <div class="hours-row"><span>${t.sunday}</span><span class="muted">${t.closed}</span></div>
          <p class="contact-info__timezone">${t.timezone}</p>
        </div>
      </div>`;
  }

  function bindForm(t) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const fullName = form.fullName.value.trim();
      btn.disabled = true;
      btn.textContent = t.submitting;

      await submitToBackend(Object.fromEntries(new FormData(form).entries()));

      document.querySelector('.contact-layout').innerHTML = `
        <div class="form-card form-success" style="grid-column:1/-1">
          <h3 class="font-serif">${t.successTitle}</h3>
          <p>${t.successDesc.replace('{name}', fullName || '')}</p>
        </div>`;
    });
  }

  async function render() {
    const t = LangState.t.contact;
    document.title = 'Target Apply — ' + t.title;

    document.getElementById('pageRoot').innerHTML = `
      <div class="page">
        <div class="page-hero">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${t.freeLabel}</span>
            <h1 class="page-hero__title">${t.title}</h1>
            <p class="page-hero__desc">${t.desc}</p>
          </div>
        </div>
        <div class="contact-layout">
          <div class="loading-state"><p>${LangState.t.common.loading}</p></div>
        </div>
      </div>`;

    const [universities, programs] = await Promise.all([TA_API.getUniversities(), TA_API.getPrograms()]);

    document.querySelector('.contact-layout').innerHTML = formHTML(t, universities, programs) + infoHTML(t);
    bindForm(t);
  }

  window.TA_PAGES = window.TA_PAGES || {};
  window.TA_PAGES.contact = render;
})();
