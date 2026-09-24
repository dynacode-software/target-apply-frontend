/**
 * data.js
 * Simula el backend de contenido. En una integración real, cada función de
 * TA_API haría un `fetch('/api/...')` y devolvería la respuesta; aquí
 * devolvemos los mismos datos desde memoria envueltos en una pequeña
 * demora artificial (200ms) para que el resto del código ya esté escrito
 * de forma asíncrona y el cambio a un backend real no toque las páginas.
 */
(function () {
  const LATENCY_MS = 200;

  function ok(data) {
    return new Promise(resolve => setTimeout(() => resolve(structuredClone(data)), LATENCY_MS));
  }

  /* ============ UNIVERSIDADES ============ */
  const UNIVERSITIES = [
    {
      id: 'itu', name: 'Istanbul Technical University', city: 'Istanbul', type: 'Public',
      founded: 1773, ranking: 'QS #521–530', tuitionRange: '$3,000 – $5,500 / year',
      languages: ['Turkish', 'English'],
      image: 'assets/img/universities/itu',
      website: 'https://www.itu.edu.tr',
      programs: ['Computer Science', 'Civil Engineering', 'Architecture', 'Electrical Engineering', 'Mechanical Engineering', 'Naval Architecture'],
      featured: true,
      description: {
        EN: "One of the world's oldest technical universities, ITU is Turkey's flagship for engineering, architecture and applied sciences, with a sprawling campus overlooking the Bosphorus.",
        TR: 'Dünyanın en eski teknik üniversitelerinden biri olan İTÜ, Boğaz manzaralı geniş kampüsüyle mühendislik, mimarlık ve uygulamalı bilimlerde Türkiye\u2019nin öncü kurumudur.'
      }
    },
    {
      id: 'koc', name: 'Koç University', city: 'Istanbul', type: 'Private',
      founded: 1993, ranking: 'QS #451–460', tuitionRange: '$18,000 – $24,000 / year',
      languages: ['English'],
      image: 'assets/img/universities/koc',
      website: 'https://www.ku.edu.tr',
      programs: ['Business Administration', 'International Relations', 'Computer Engineering', 'Medicine', 'Law'],
      featured: true,
      description: {
        EN: 'A research-intensive private university on a purpose-built hilltop campus, Koç pairs a US-style liberal-arts core with strong medicine, law and business schools.',
        TR: 'Özel olarak inşa edilmiş bir tepe kampüsündeki bu araştırma yoğun özel üniversite, ABD tarzı bir liberal sanatlar çekirdeğini güçlü tıp, hukuk ve işletme okullarıyla birleştirir.'
      }
    },
    {
      id: 'bilkent', name: 'Bilkent University', city: 'Ankara', type: 'Private',
      founded: 1984, ranking: 'QS #601–650', tuitionRange: '$10,000 – $15,000 / year',
      languages: ['English'],
      image: 'assets/img/universities/bilkent',
      website: 'https://www.bilkent.edu.tr',
      programs: ['Computer Engineering', 'Economics', 'Industrial Engineering', 'Graphic Design', 'International Relations'],
      featured: true,
      description: {
        EN: 'Set on a forested campus in Ankara, Bilkent is a powerhouse for engineering and computer science, with instruction entirely in English since its founding.',
        TR: 'Ankara\u2019da ormanlık bir kampüste yer alan Bilkent, mühendislik ve bilgisayar bilimlerinde güçlü bir kurumdur; kuruluşundan bu yana eğitim tamamen İngilizcedir.'
      }
    },
    {
      id: 'bogazici', name: 'Boğaziçi University', city: 'Istanbul', type: 'Public',
      founded: 1863, ranking: 'QS #401–410', tuitionRange: '$1,500 – $3,000 / year',
      languages: ['English', 'Turkish'],
      image: 'assets/img/universities/bogazici',
      website: 'https://www.bogazici.edu.tr',
      programs: ['Computer Engineering', 'Economics', 'Psychology', 'Political Science', 'Chemical Engineering'],
      featured: false,
      description: {
        EN: 'Founded as Robert College, Boğaziçi is one of the oldest English-medium institutions outside the Anglosphere, set on a hillside campus above the strait.',
        TR: 'Robert Kolej olarak kurulan Boğaziçi, boğazın üzerindeki bir tepe kampüsünde, İngilizce dilinde eğitim veren dünyanın en köklü kurumlarından biridir.'
      }
    },
    {
      id: 'metu', name: 'Middle East Technical University', city: 'Ankara', type: 'Public',
      founded: 1956, ranking: 'QS #511–520', tuitionRange: '$1,000 – $2,500 / year',
      languages: ['English'],
      image: 'assets/img/universities/metu',
      website: 'https://www.metu.edu.tr',
      programs: ['Aerospace Engineering', 'Computer Engineering', 'City Planning', 'Chemistry', 'International Relations'],
      featured: false,
      description: {
        EN: 'METU sits on a vast forested campus and is widely regarded as one of the strongest engineering and research universities in the region, taught fully in English.',
        TR: 'ODTÜ, geniş ormanlık bir kampüs üzerinde yer alır ve bölgedeki en güçlü mühendislik ve araştırma üniversitelerinden biri olarak kabul edilir; eğitim tamamen İngilizcedir.'
      }
    },
    {
      id: 'sabanci', name: 'Sabancı University', city: 'Istanbul', type: 'Private',
      founded: 1996, ranking: 'QS #551–560', tuitionRange: '$16,000 – $20,000 / year',
      languages: ['English'],
      image: 'assets/img/universities/sabanci',
      website: 'https://www.sabanciuniv.edu',
      programs: ['Manufacturing Systems Engineering', 'Economics', 'Visual Arts & Communication Design', 'Molecular Biology'],
      featured: false,
      description: {
        EN: 'A young, interdisciplinary university that lets students choose their major after the first year, on a modern campus on the edge of Istanbul.',
        TR: 'İstanbul\u2019un kenarında modern bir kampüste yer alan bu genç, disiplinler arası üniversite, öğrencilerin bölümlerini ilk yıldan sonra seçmesine izin verir.'
      }
    },
    {
      id: 'hacettepe', name: 'Hacettepe University', city: 'Ankara', type: 'Public',
      founded: 1967, ranking: 'QS #801–1000', tuitionRange: '$800 – $2,000 / year',
      languages: ['Turkish', 'English'],
      image: 'assets/img/universities/hacettepe',
      website: 'https://www.hacettepe.edu.tr',
      programs: ['Medicine', 'Nursing', 'Audiology', 'Turkish Language & Literature', 'Statistics'],
      featured: false,
      description: {
        EN: 'One of Turkey\u2019s leading medical and health-sciences universities, with a large teaching hospital and strong research output across the sciences.',
        TR: 'Türkiye\u2019nin önde gelen tıp ve sağlık bilimleri üniversitelerinden biri olan Hacettepe, büyük bir eğitim hastanesine ve güçlü bir araştırma çıktısına sahiptir.'
      }
    },
    {
      id: 'ege', name: 'Ege University', city: 'Izmir', type: 'Public',
      founded: 1955, ranking: 'QS #1201–1400', tuitionRange: '$700 – $1,800 / year',
      languages: ['Turkish'],
      image: 'assets/img/universities/ege',
      website: 'https://www.ege.edu.tr',
      programs: ['Agricultural Engineering', 'Medicine', 'Fisheries', 'Textile Engineering'],
      featured: false,
      description: {
        EN: "Izmir's largest public university, known for agriculture, fisheries and medicine, with a coastal campus and a lower cost of living than Istanbul or Ankara.",
        TR: 'İzmir\u2019in en büyük devlet üniversitesi olan Ege, tarım, su ürünleri ve tıp alanlarında tanınır; kıyı kampüsü İstanbul veya Ankara\u2019ya göre daha düşük yaşam maliyeti sunar.'
      }
    }
  ];

  /* ============ PROGRAMAS ============ */
  const PROGRAMS = [
    { id: 'p-cs', name: { EN: 'Computer Science', TR: 'Bilgisayar Bilimleri' }, field: 'Engineering', degree: 'Bachelor', language: 'English', universities: ['itu', 'koc', 'bilkent', 'bogazici'] },
    { id: 'p-med', name: { EN: 'Medicine', TR: 'Tıp' }, field: 'Medicine', degree: 'Bachelor', language: 'Turkish', universities: ['koc', 'hacettepe', 'ege'] },
    { id: 'p-ba', name: { EN: 'Business Administration', TR: 'İşletme' }, field: 'Business', degree: 'Master', language: 'English', universities: ['koc', 'sabanci', 'bilkent'] },
    { id: 'p-arch', name: { EN: 'Architecture', TR: 'Mimarlık' }, field: 'Architecture', degree: 'Bachelor', language: 'English', universities: ['itu'] },
    { id: 'p-ee', name: { EN: 'Electrical Engineering', TR: 'Elektrik Mühendisliği' }, field: 'Engineering', degree: 'Master', language: 'English', universities: ['itu', 'metu'] },
    { id: 'p-ir', name: { EN: 'International Relations', TR: 'Uluslararası İlişkiler' }, field: 'Social Sciences', degree: 'Bachelor', language: 'English', universities: ['koc', 'bilkent', 'metu'] },
    { id: 'p-aero', name: { EN: 'Aerospace Engineering', TR: 'Havacılık ve Uzay Mühendisliği' }, field: 'Engineering', degree: 'Bachelor', language: 'English', universities: ['metu'] },
    { id: 'p-econ', name: { EN: 'Economics', TR: 'Ekonomi' }, field: 'Business', degree: 'Master', language: 'English', universities: ['bogazici', 'bilkent', 'sabanci'] },
    { id: 'p-psy', name: { EN: 'Psychology', TR: 'Psikoloji' }, field: 'Social Sciences', degree: 'Bachelor', language: 'English', universities: ['bogazici'] },
    { id: 'p-molbio', name: { EN: 'Molecular Biology & Genetics', TR: 'Moleküler Biyoloji ve Genetik' }, field: 'Medicine', degree: 'Bachelor', language: 'English', universities: ['sabanci'] },
    { id: 'p-mba', name: { EN: 'MBA', TR: 'İşletme Yüksek Lisansı (MBA)' }, field: 'Business', degree: 'Master', language: 'English', universities: ['koc', 'bilkent'] },
    { id: 'p-civ', name: { EN: 'Civil Engineering', TR: 'İnşaat Mühendisliği' }, field: 'Engineering', degree: 'Bachelor', language: 'Turkish', universities: ['itu', 'metu'] },
    { id: 'p-phd-cs', name: { EN: 'Computer Engineering (PhD)', TR: 'Bilgisayar Mühendisliği (Doktora)' }, field: 'Engineering', degree: 'PhD', language: 'English', universities: ['bilkent', 'metu'] }
  ];

  /* ============ BLOG ============ */
  const BLOG_POSTS = [
    {
      id: 'student-visa-guide', category: 'Visa', date: '2026-02-14', author: 'Elif Aydın',
      image: 'assets/img/blog/student-visa-guide',
      title: { EN: 'The 2026 student visa guide for Turkey', TR: '2026 Türkiye öğrenci vizesi rehberi' },
      excerpt: {
        EN: 'Every document, deadline and appointment you need to book, in the order you need to book them.',
        TR: 'İhtiyacınız olan her belge, son tarih ve randevu — hangi sırayla ayarlamanız gerektiğiyle birlikte.'
      }
    },
    {
      id: 'istanbul-vs-ankara', category: 'City Guides', date: '2026-01-30', author: 'Deniz Kaya',
      image: 'assets/img/blog/istanbul-vs-ankara',
      title: { EN: 'Istanbul or Ankara: choosing your student city', TR: 'İstanbul mu Ankara mı: öğrenci şehrinizi seçmek' },
      excerpt: {
        EN: 'Cost of living, commute times and nightlife compared, city by city.',
        TR: 'Yaşam maliyeti, ulaşım süreleri ve gece hayatı şehir şehir karşılaştırıldı.'
      }
    },
    {
      id: 'turkiye-scholarships', category: 'Scholarships', date: '2026-01-12', author: 'Mert Solak',
      image: 'assets/img/blog/turkiye-scholarships',
      title: { EN: 'Scholarships worth applying for in 2026', TR: '2026\u2019da başvurmaya değer burslar' },
      excerpt: {
        EN: 'Government, university and private scholarships that international students often miss.',
        TR: 'Uluslararası öğrencilerin sık sık gözden kaçırdığı devlet, üniversite ve özel burslar.'
      }
    },
    {
      id: 'accommodation-101', category: 'Accommodation', date: '2025-12-18', author: 'Elif Aydın',
      image: 'assets/img/blog/accommodation-101',
      title: { EN: 'Dorm, apartment or homestay: accommodation 101', TR: 'Yurt, daire ya da ev sahibi ailede kalmak: konaklama 101' },
      excerpt: {
        EN: 'What each option actually costs, and who tends to be happiest with it.',
        TR: 'Her seçeneğin gerçek maliyeti ve genellikle kimlerin bu seçenekten memnun kaldığı.'
      }
    },
    {
      id: 'english-medium-programs', category: 'Academics', date: '2025-11-22', author: 'Deniz Kaya',
      image: 'assets/img/blog/english-medium-programs',
      title: { EN: 'Do you need Turkish? A guide to English-medium programmes', TR: 'Türkçe biliyor olmanız gerekir mi? İngilizce programlar rehberi' },
      excerpt: {
        EN: 'Which fields are widely taught in English, and where a Turkish prep year still applies.',
        TR: 'Hangi alanlar yaygın olarak İngilizce okutuluyor ve nerede Türkçe hazırlık yılı hâlâ gerekiyor.'
      }
    },
    {
      id: 'first-month-checklist', category: 'City Guides', date: '2025-10-30', author: 'Mert Solak',
      image: 'assets/img/blog/first-month-checklist',
      title: { EN: 'Your first month in Turkey: a settling-in checklist', TR: 'Türkiye\u2019deki ilk ayınız: yerleşme kontrol listesi' },
      excerpt: {
        EN: 'Residence permits, bank accounts and SIM cards — in the order that actually works.',
        TR: 'İkamet izni, banka hesabı ve SIM kart — gerçekten işe yarayan sırayla.'
      }
    }
  ];

  /* ============ EQUIPO ============ */
  const TEAM = [
    {
      id: 'elif', name: 'Elif Aydın', photo: 'assets/img/team/elif',
      role: { EN: 'Visa & Immigration Advisor', TR: 'Vize ve Göç Danışmanı' },
      bio: { EN: 'Handled over 600 residence permit applications; ex-visa officer.', TR: '600\u2019den fazla ikamet izni başvurusu yönetti; eski vize memuru.' }
    },
    {
      id: 'deniz', name: 'Deniz Kaya', photo: 'assets/img/team/deniz',
      role: { EN: 'Engineering & Tech Advisor', TR: 'Mühendislik ve Teknoloji Danışmanı' },
      bio: { EN: 'ITU graduate who spent six years recruiting for engineering faculties.', TR: 'Altı yıl mühendislik fakültelerine öğrenci kazandıran İTÜ mezunu.' }
    },
    {
      id: 'mert', name: 'Mert Solak', photo: 'assets/img/team/mert',
      role: { EN: 'Scholarships & Funding Advisor', TR: 'Burs ve Finansman Danışmanı' },
      bio: { EN: 'Tracks every active scholarship programme across 30+ Turkish universities.', TR: '30\u2019dan fazla Türk üniversitesindeki her aktif burs programını takip eder.' }
    },
    {
      id: 'zeynep', name: 'Zeynep Arslan', photo: 'assets/img/team/zeynep',
      role: { EN: 'Medicine & Health Sciences Advisor', TR: 'Tıp ve Sağlık Bilimleri Danışmanı' },
      bio: { EN: 'Former admissions officer who now guides pre-med and dental applicants.', TR: 'Şimdi tıp ve diş hekimliği adaylarına rehberlik eden eski kabul memuru.' }
    }
  ];

  /* ============ ESTADÍSTICAS ============ */
  const STATS = [
    { value: '7', label: { EN: 'Years advising students', TR: 'Yıllık öğrenci danışmanlığı' } },
    { value: '850+', label: { EN: 'Students placed', TR: 'Yerleştirilen öğrenci' } },
    { value: '8', label: { EN: 'Partner universities', TR: 'Ortak üniversite' } },
    { value: '40+', label: { EN: 'Countries represented', TR: 'Temsil edilen ülke' } }
  ];

  /* ============ API "de red" ============ */
  window.TA_API = {
    getUniversities: () => ok(UNIVERSITIES),
    getUniversityById: id => ok(UNIVERSITIES.find(u => u.id === id) || null),
    getFeaturedUniversities: () => ok(UNIVERSITIES.filter(u => u.featured)),
    getPrograms: () => ok(PROGRAMS),
    getProgramById: id => ok(PROGRAMS.find(p => p.id === id) || null),
    getBlogPosts: () => ok(BLOG_POSTS),
    getBlogPostById: id => ok(BLOG_POSTS.find(p => p.id === id) || null),
    getTeam: () => ok(TEAM),
    getStats: () => ok(STATS)
  };
})();
