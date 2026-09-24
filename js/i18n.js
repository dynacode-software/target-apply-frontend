/**
 * i18n.js
 * Diccionario de textos estáticos de la interfaz (EN / TR) y estado global
 * de idioma. Los textos que vienen "del backend" (universidades, programas,
 * artículos de blog, equipo) viven en data.js, no aquí.
 */
window.I18N = {
  EN: {
    nav: { home: 'Home', universities: 'Universities', programs: 'Programs', about: 'About', blog: 'Blog', contact: 'Contact', applyNow: 'Apply Now' },

    home: {
      heroTitlePrefix: 'Your future studies in',
      heroHighlight: 'Turkey,',
      heroSuffix: 'mapped out.',
      heroDesc: 'Target Apply guides students from application to arrival — matching you with partner universities across Istanbul, Ankara and beyond, in your language.',
      exploreUniversities: 'Explore universities',
      browsePrograms: 'Browse programs',
      topPicksLabel: 'Top Picks',
      featuredTitle: 'Featured universities',
      featuredDesc: "A hand-picked selection of Turkey's most respected institutions — visited and vetted by our advisory team.",
      viewAll: 'View all',
      fieldsLabel: 'Fields of Study',
      programsTitle: 'Popular programmes',
      programsDesc: 'From engineering to medicine — explore programmes taught in English and Turkish across our partner network.',
      viewAllPrograms: 'View all programmes',
      howItWorksLabel: 'How It Works',
      howItWorksTitle: 'Three steps to your acceptance letter',
      requestConsultation: 'Request free consultation',
      learnMore: 'Learn more',
      ctaTitle: 'Ready to start your journey?',
      ctaDesc: 'Take the first step toward your acceptance letter today.',
      ctaButton: 'Begin your profile'
    },

    steps: [
      { num: '01', title: 'Tell us your goals', desc: 'Fill in a short profile about your academic background, preferred city, budget, and programme — it takes under ten minutes.' },
      { num: '02', title: 'We find your match', desc: 'Your dedicated advisor reviews your profile and recommends universities and programmes that align with your goals and qualifications.' },
      { num: '03', title: 'Apply with support', desc: 'We guide you through every document, deadline, and interview — and stay with you until your acceptance letter arrives.' }
    ],

    footer: {
      tagline: 'Strategic advisory for your future studies in Turkey — from first application to your first semester.',
      explore: 'Explore', services: 'Services', contact: 'Contact',
      applicationSupport: 'Application support', visaGuidance: 'Visa guidance',
      accommodation: 'Accommodation', scholarshipSearch: 'Scholarship search',
      languagePrep: 'Language prep', aboutUs: 'About us',
      copyright: '2026 Target Apply. All rights reserved.',
      prototype: 'Prototype for client review — v0.1'
    },

    common: { loading: 'Loading…', backendNote: 'Content loaded from server' },

    universities: {
      partnerNetwork: 'Partner Network', title: 'Universities in Turkey',
      desc: 'Browse our partner institutions across Istanbul, Ankara, and Izmir — each visited and evaluated by our advisory team.',
      searchPlaceholder: 'Search by name or programme...',
      allCities: 'All cities', allTypes: 'All types', public: 'Public', private: 'Private',
      learnMore: 'Learn more',
      results: n => `${n} ${n === 1 ? 'university' : 'universities'}`,
      notFoundTitle: 'No results found', notFoundDesc: 'Try adjusting your filters.',
      founded: 'Founded', tuition: 'Tuition', languagesLabel: 'Languages', ranking: 'Ranking',
      programsOffered: 'Programmes offered', visitWebsite: 'Visit website', backToList: 'Back to universities'
    },

    programs: {
      fieldsOfStudy: 'Fields of Study', title: 'Programmes in Turkey',
      desc: 'Explore Bachelor, Master, and PhD programmes taught in English and Turkish across our partner universities.',
      searchPlaceholder: 'Search programmes...',
      allFields: 'All fields', allDegrees: 'All degrees', allLanguages: 'All languages',
      results: n => `${n} ${n === 1 ? 'programme' : 'programmes'}`,
      viewUniversities: 'View universities', applyNow: 'Apply now',
      notSure: 'Not sure where to start?', ctaTitle: 'Let us match you to the right programme',
      ctaDesc: 'Our advisors review your academic background and goals, then recommend programmes that fit — at no cost to you.',
      requestConsultation: 'Request free consultation', availableAt: 'Available at:',
      notFoundTitle: 'No results found', notFoundDesc: 'Try adjusting your filters.'
    },

    about: {
      label: 'About Target Apply', title: 'We make studying in Turkey straightforward',
      heroDesc: 'Target Apply was founded by advisors who lived the international student experience — and decided to build the agency they wished had existed when they went through it.',
      missionLabel: 'Our Mission', missionTitle: 'Every student deserves clear guidance, not guesswork',
      missionParagraphs: [
        'Applying to a university in a foreign country is genuinely complex. The paperwork is unfamiliar, the timelines are tight, and the consequences of mistakes — missing a deadline, submitting the wrong document, choosing the wrong programme — can cost a year.',
        'Target Apply was built to eliminate that confusion. We partner directly with universities across Istanbul, Ankara and Izmir, so our advisors have direct lines to international offices, scholarship coordinators, and accommodation managers.'
      ],
      whyLabel: 'Why Turkey', whyTitle: 'Four reasons students choose Turkey',
      reasons: [
        { title: 'Internationally recognised degrees', desc: "Degrees from Turkey's top universities are accredited by the Bologna Process and recognised across Europe, the Middle East, and North America." },
        { title: 'English-medium instruction', desc: 'Leading institutions — Bilkent, Koç, Bogazici, METU — conduct all programmes in English, removing language barriers for international students.' },
        { title: 'Competitive tuition fees', desc: 'Annual tuition ranges from $1,500 at public universities to $14,000 at top private institutions — a fraction of equivalent degrees in the UK or Germany.' },
        { title: 'Cultural and geographic position', desc: 'Istanbul and Ankara are safe, modern, deeply cosmopolitan cities at the crossroads of Europe, Asia and the Middle East.' }
      ],
      teamLabel: 'The Team', teamTitle: 'Your advisory team',
      teamDesc: 'Each advisor specialises in a specific region or field — you are matched with the advisor best suited to your profile.',
      ctaTitle: 'Ready to start your application?',
      ctaDesc: 'Book a free consultation with one of our advisors and get a personalised university and programme recommendation.',
      requestConsultation: 'Request free consultation',
      studentsPlaced: 'students placed since 2019'
    },

    blog: {
      guidesLabel: 'Guides & Insights', title: 'The Target Apply Blog',
      desc: 'Visa guides, city breakdowns, scholarship news, and academic advice — everything you need to study in Turkey with confidence.',
      allCategories: 'All',
      readArticle: 'Read article', readMore: 'Read more',
      notFoundTitle: 'No articles in this category yet.', notFoundDesc: 'Try another category.',
      by: 'by', relatedTitle: 'More in',
      ctaLabel: 'Need personalised advice?', ctaTitle: 'Speak with an advisor',
      ctaDesc: 'Our team can walk you through the specifics of your situation — at no cost to you.',
      requestConsultation: 'Request free consultation', back: 'Back to blog'
    },

    contact: {
      freeLabel: 'Free Consultation', title: "Let's talk about your future",
      desc: 'Fill in the form below and one of our advisors will contact you within one business day — usually sooner.',
      formTitle: 'Request a consultation',
      fullName: 'Full name', email: 'Email address', phone: 'Phone / WhatsApp',
      country: 'Country of residence', university: 'University of interest',
      program: 'Programme of interest', message: 'Message',
      messagePlaceholder: 'Tell us about your academic background, your goals, and any questions you have...',
      submit: 'Submit request', submitting: 'Sending…',
      disclaimer: 'We respond within one business day. Your information is never shared with third parties.',
      successTitle: 'Request received',
      successDesc: 'Thank you, {name}. Your advisor will be in touch within one business day. Check your inbox — including your spam folder.',
      directContact: 'Direct contact', officeHoursLabel: 'Office hours',
      monFri: 'Monday – Friday', saturday: 'Saturday', sunday: 'Sunday', closed: 'Closed',
      timezone: 'Times shown in Turkey Standard Time (UTC+3).', selectOption: 'Select an option'
    }
  },

  TR: {
    nav: { home: 'Ana Sayfa', universities: 'Üniversiteler', programs: 'Programlar', about: 'Hakkımızda', blog: 'Blog', contact: 'İletişim', applyNow: 'Başvur' },

    home: {
      heroTitlePrefix: 'Türkiye\u2019deki',
      heroHighlight: 'geleceğiniz,',
      heroSuffix: 'planlı ve net.',
      heroDesc: 'Target Apply, öğrencilere başvurudan varışa kadar rehberlik eder — İstanbul, Ankara ve ötesindeki ortak üniversitelerle sizi kendi dilinizde eşleştirir.',
      exploreUniversities: 'Üniversiteleri keşfet',
      browsePrograms: 'Programlara göz at',
      topPicksLabel: 'Öne Çıkanlar', featuredTitle: 'Öne çıkan üniversiteler',
      featuredDesc: 'Danışmanlık ekibimiz tarafından ziyaret edilip değerlendirilen Türkiye\u2019nin en saygın kurumlarından bir seçki.',
      viewAll: 'Tümünü gör', fieldsLabel: 'Çalışma Alanları', programsTitle: 'Popüler programlar',
      programsDesc: 'Mühendislikten tıbba — ortak ağımızdaki üniversitelerde İngilizce ve Türkçe öğretilen programları keşfedin.',
      viewAllPrograms: 'Tüm programları gör', howItWorksLabel: 'Nasıl Çalışır',
      howItWorksTitle: 'Kabul mektubunuza üç adım',
      requestConsultation: 'Ücretsiz danışmanlık al', learnMore: 'Daha fazla',
      ctaTitle: 'Yolculuğunuza başlamaya hazır mısınız?',
      ctaDesc: 'Kabul mektubunuza doğru ilk adımı bugün atın.',
      ctaButton: 'Profilinizi oluşturun'
    },

    steps: [
      { num: '01', title: 'Hedeflerinizi anlatın', desc: 'Akademik geçmişiniz, tercih ettiğiniz şehir, bütçeniz ve programınız hakkında kısa bir profil doldurun — on dakikadan az sürer.' },
      { num: '02', title: 'Eşleşmenizi buluyoruz', desc: 'Özel danışmanınız profilinizi inceleyerek hedeflerinize ve yeterliliğinize uygun üniversiteleri ve programları önerir.' },
      { num: '03', title: 'Destekle başvurun', desc: 'Her belge, son tarih ve mülakatı birlikte atlatıyoruz — kabul mektubunuz gelene kadar yanınızdayız.' }
    ],

    footer: {
      tagline: 'Türkiye\u2019deki eğitiminiz için stratejik danışmanlık — ilk başvurudan ilk döneme kadar.',
      explore: 'Keşfet', services: 'Hizmetler', contact: 'İletişim',
      applicationSupport: 'Başvuru desteği', visaGuidance: 'Vize rehberliği',
      accommodation: 'Konaklama', scholarshipSearch: 'Burs araştırması',
      languagePrep: 'Dil hazırlığı', aboutUs: 'Hakkımızda',
      copyright: '2026 Target Apply. Tüm hakları saklıdır.',
      prototype: 'Müşteri incelemesi için prototip — v0.1'
    },

    common: { loading: 'Yükleniyor…', backendNote: 'İçerik sunucudan yüklendi' },

    universities: {
      partnerNetwork: 'Ortak Ağı', title: 'Türkiye\u2019deki Üniversiteler',
      desc: 'İstanbul, Ankara ve İzmir\u2019deki ortak kurumlarımızı inceleyin — her biri ekibimiz tarafından ziyaret edilip değerlendirilmiştir.',
      searchPlaceholder: 'Ad veya programa göre ara...',
      allCities: 'Tüm şehirler', allTypes: 'Tüm türler', public: 'Devlet', private: 'Özel',
      learnMore: 'Daha fazla',
      results: n => `${n} üniversite`,
      notFoundTitle: 'Sonuç bulunamadı', notFoundDesc: 'Filtrelerinizi değiştirmeyi deneyin.',
      founded: 'Kuruluş', tuition: 'Öğrenim ücreti', languagesLabel: 'Diller', ranking: 'Sıralama',
      programsOffered: 'Sunulan programlar', visitWebsite: 'Web sitesini ziyaret et', backToList: 'Üniversitelere dön'
    },

    programs: {
      fieldsOfStudy: 'Çalışma Alanları', title: 'Türkiye\u2019deki Programlar',
      desc: 'Ortak üniversitelerimizde İngilizce ve Türkçe verilen Lisans, Yüksek Lisans ve Doktora programlarını keşfedin.',
      searchPlaceholder: 'Program ara...',
      allFields: 'Tüm alanlar', allDegrees: 'Tüm dereceler', allLanguages: 'Tüm diller',
      results: n => `${n} program`,
      viewUniversities: 'Üniversiteleri gör', applyNow: 'Başvur',
      notSure: 'Nereden başlayacağınızdan emin değil misiniz?',
      ctaTitle: 'Size uygun programı bulalım',
      ctaDesc: 'Danışmanlarımız akademik geçmişinizi ve hedeflerinizi inceleyerek size uygun programları önerir — ücretsiz.',
      requestConsultation: 'Ücretsiz danışmanlık al', availableAt: 'Üniversiteler:',
      notFoundTitle: 'Sonuç bulunamadı', notFoundDesc: 'Filtrelerinizi değiştirmeyi deneyin.'
    },

    about: {
      label: 'Target Apply Hakkında', title: 'Türkiye\u2019de okumayı basitleştiriyoruz',
      heroDesc: 'Target Apply, uluslararası öğrenci deneyimini bizzat yaşamış danışmanlar tarafından kuruldu — kendileri bu süreçten geçerken var olmasını diledikleri ajansı inşa etmeye karar verdiler.',
      missionLabel: 'Misyonumuz', missionTitle: 'Her öğrenci belirsizlik değil, açık rehberlik hak eder',
      missionText: 'Yurt dışında üniversite seçmek, eski forum gönderilerini ve yanıtsız e-postaları bir araya getirmek anlamına gelmemeli. Her öğrenciyi, önerdiğimiz kampüsleri bizzat ziyaret etmiş özel bir danışmanla eşleştiriyoruz; böylece her öneri bir broşürden değil, ilk el bilgiden gelir.',
      whyLabel: 'Neden Türkiye', whyTitle: 'Öğrencilerin Türkiye\u2019yi seçtiği dört sebep',
      reasons: [
        { title: 'Küresel çapta tanınan diplomalar', desc: 'Türk üniversiteleri Avrupa, Körfez ülkeleri ve ötesinde tanınan akreditasyonlara sahiptir — diplomanız sizinle birlikte yolculuk eder.' },
        { title: 'Mantıklı öğrenim ücretleri', desc: 'Programlar, İngiltere veya ABD\u2019deki eşdeğerlerinin bir kısmı fiyatına, öğretim kalitesinden ödün vermeden sunulur.' },
        { title: 'İngilizce veya Türkçe eğitim', desc: 'Yüzlerce İngilizce program, Türkçede akıcı olmadan önce eğitiminize başlayabilmenizi sağlar.' },
        { title: 'Gerçek bir kavşak', desc: 'İstanbul ve Ankara, Avrupa, Orta Doğu ve Asya arasında yer alır — staj ve seyahat için doğal bir üs.' }
      ],
      teamLabel: 'Ekip', teamTitle: 'Danışmanlık ekibiniz',
      teamDesc: 'Her danışman belirli bir bölge veya alanda uzmanlaşmıştır — profilinize en uygun danışmanla eşleştirilirsiniz.',
      ctaTitle: 'Başvurunuza başlamaya hazır mısınız?',
      ctaDesc: 'Danışmanlarımızdan biriyle ücretsiz bir görüşme ayarlayın ve size özel üniversite ve program önerisi alın.',
      requestConsultation: 'Ücretsiz danışmanlık al',
      studentsPlaced: '2019\u2019dan bu yana yerleştirilen öğrenci'
    },

    blog: {
      guidesLabel: 'Rehberler ve Bilgiler', title: 'Target Apply Blog',
      desc: 'Vize rehberleri, şehir karşılaştırmaları, burs haberleri ve akademik tavsiyeler — Türkiye\u2019de güvenle okumak için ihtiyacınız olan her şey.',
      allCategories: 'Tümü',
      readArticle: 'Makaleyi oku', readMore: 'Devamını oku',
      notFoundTitle: 'Bu kategoride henüz makale yok.', notFoundDesc: 'Başka bir kategori deneyin.',
      by: 'yazan', relatedTitle: 'Diğer',
      ctaLabel: 'Kişiye özel tavsiyeye mi ihtiyacınız var?', ctaTitle: 'Bir danışmanla konuşun',
      ctaDesc: 'Ekibimiz durumunuzun ayrıntılarını sizinle birlikte inceleyebilir — ücretsiz.',
      requestConsultation: 'Ücretsiz danışmanlık al', back: 'Bloga dön'
    },

    contact: {
      freeLabel: 'Ücretsiz Danışmanlık', title: 'Geleceğiniz hakkında konuşalım',
      desc: 'Aşağıdaki formu doldurun, danışmanlarımızdan biri bir iş günü içinde — genellikle daha kısa sürede — sizinle iletişime geçecek.',
      formTitle: 'Danışmanlık talep edin',
      fullName: 'Ad Soyad', email: 'E-posta adresi', phone: 'Telefon / WhatsApp',
      country: 'İkamet ülkesi', university: 'İlgilendiğiniz üniversite',
      program: 'İlgilendiğiniz program', message: 'Mesaj',
      messagePlaceholder: 'Akademik geçmişiniz, hedefleriniz ve sorularınız hakkında bize bilgi verin...',
      submit: 'Talebi gönder', submitting: 'Gönderiliyor…',
      disclaimer: 'Bir iş günü içinde yanıt veriyoruz. Bilgileriniz asla üçüncü taraflarla paylaşılmaz.',
      successTitle: 'Talep alındı',
      successDesc: 'Teşekkürler, {name}. Danışmanınız bir iş günü içinde sizinle iletişime geçecek. Gelen kutunuzu — ve spam klasörünüzü — kontrol edin.',
      directContact: 'Doğrudan iletişim', officeHoursLabel: 'Çalışma saatleri',
      monFri: 'Pazartesi – Cuma', saturday: 'Cumartesi', sunday: 'Pazar', closed: 'Kapalı',
      timezone: 'Saatler Türkiye saatine göredir (UTC+3).', selectOption: 'Bir seçenek belirleyin'
    }
  }
};

/* ============ ESTADO GLOBAL DE IDIOMA ============ */
window.LangState = {
  lang: localStorage.getItem('ta_lang') || 'EN',
  get t() { return window.I18N[this.lang]; },
  set(lang) {
    if (!window.I18N[lang]) return;
    this.lang = lang;
    localStorage.setItem('ta_lang', lang);
    document.documentElement.lang = lang === 'TR' ? 'tr' : 'en';
    window.dispatchEvent(new Event('langchange'));
  }
};
