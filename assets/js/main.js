// STARTUDE DZ 4.0 - Main JS Controller

// ==========================================
// 1. STATE & STORAGE MANAGEMENT
// ==========================================
const DEFAULT_SETTINGS = {
  registrationOpen: true,
  showTimer: true,
  timerEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  enable3DBackground: true,
  maintenanceMode: false
};

const DEFAULT_STATS = {
  participants: 1250,
  projects: 340,
  wilayas: 58,
  partners: 12
};

const DEFAULT_CONTACT = {
  address: "بن عكنون – الجزائر العاصمة",
  phone: "+213 21 00 00 00",
  mobile: "+213 550 00 00 00",
  email: "Startudedz@gmail.com"
};

// Load configurations safely with default merging
function safeParse(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return defaultValue;
    const parsed = JSON.parse(val);
    if (parsed && typeof parsed === 'object') {
      return { ...defaultValue, ...parsed };
    }
    return defaultValue;
  } catch (e) {
    console.warn(`[Storage] Failed to parse ${key}, resetting to default.`, e);
    return defaultValue;
  }
}

const settings = safeParse('adminSettings', DEFAULT_SETTINGS);
const stats = safeParse('adminStats', DEFAULT_STATS);
const contactInfo = safeParse('adminContact', DEFAULT_CONTACT);

// Global save helpers for admin panel
function saveSettings(newSettings) {
  localStorage.setItem('adminSettings', JSON.stringify({ ...settings, ...newSettings }));
}
function saveStats(newStats) {
  localStorage.setItem('adminStats', JSON.stringify({ ...stats, ...newStats }));
}
function saveContact(newContact) {
  localStorage.setItem('adminContact', JSON.stringify({ ...contactInfo, ...newContact }));
}

// ==========================================
// 2. MAINTENANCE MODE REDIRECT
// ==========================================
const path = window.location.pathname.toLowerCase();
const isMaintenancePage = path.includes('maintenance.html');
const isAdminPage = path.includes('admin.html');

if (settings.maintenanceMode && !isMaintenancePage && !isAdminPage) {
  window.location.href = 'maintenance.html';
} else if (!settings.maintenanceMode && isMaintenancePage) {
  window.location.href = 'index.html';
}

// ==========================================
// 3. TRANSLATION ENGINE (BILINGUAL SUPPORT)
// ==========================================
const translations = {
  ar: {
    "nav": {
      "home": "الرئيسية",
      "about": "عن المسابقة",
      "axes": "المحاور",
      "registration": "التسجيل",
      "contact": "التواصل",
      "dashboard": "لوحة التحكم"
    },
    "hero": {
      "title": "STARTUDE DZ 4.0",
      "subtitle": "مسابقة وطنية تهدف إلى تحويل أفكار الطلبة إلى مؤسسات ناشئة ومشاريع مبتكرة تساهم في بناء اقتصاد المعرفة في الجزائر.",
      "register_btn": "👉 سجل الآن",
      "countdown_text": "الوقت المتبقي لانتهاء التسجيل",
      "closed_text": "التسجيل مغلق حالياً / Registration Closed"
    },
    "organizers": {
      "title": "الجهة المنظمة والشركاء",
      "text": "تنظم هذه المسابقة من طرف المنظمة الوطنية للطلبة الأحرار (ONEL)، بالتعاون مع مختلف الشركاء من مؤسسات أكاديمية وحاضنات أعمال، بهدف دعم الابتكار وريادة الأعمال لدى الطلبة.",
      "onel": "المنظمة الوطنية للطلبة الأحرار ONEL",
      "digital_incubator": "حاضنة الأعمال الرقمية بوزارة التعليم العالي والبحث العلمي",
      "incubators": "حاضنات الأعمال",
      "partners": "شركاء اقتصاديون"
    },
    "about": {
      "title": "عن المسابقة",
      "text1": "في ظل التحولات الرقمية المتسارعة، أصبحت المؤسسات الناشئة ركيزة أساسية للاقتصاد الحديث.",
      "text2": "تأتي مسابقة STARTUDE DZ 4.0 كمنصة وطنية تهدف إلى تمكين الطلبة من تحويل أفكارهم إلى مشاريع حقيقية، من خلال مرافقة علمية، تدريبية، وتنافسية.",
      "goals": "الأهداف",
      "goal1": "نشر ثقافة الابتكار وريادة الأعمال",
      "goal2": "تحويل الأفكار إلى مشاريع قابلة للتجسيد",
      "goal3": "ربط الجامعة بالمحيط الاقتصادي",
      "goal4": "دعم الطلبة المبدعين"
    },
    "axes": {
      "title": "المحاور الاستراتيجية للمسابقة",
      "text": "ترتكز المسابقة على مجموعة من المحاور ذات الأولوية الوطنية، والتي تعكس احتياجات المجتمع والاقتصاد الجزائري.",
      "axis1": "التنمية الخضراء والبيئة",
      "axis2": "الهوية الوطنية والذاكرة",
      "axis3": "الفلاحة الذكية والأمن الغذائي",
      "axis4": "الصحة الرقمية",
      "axis5": "الطاقة والطاقات المتجددة",
      "axis6": "الأمن السيبراني والذكاء الاصطناعي",
      "axis7": "الأمن المائي",
      "axis8": "الاقتصاد الرقمي والتجارة الإلكترونية",
      "axis9": "الرياضة الجامعية والرفاهية",
      "axis10": "الابتكار الاجتماعي والمواطنة"
    },
    "registration": {
      "title": "التسجيل في المسابقة",
      "text": "ندعو جميع الطلبة والباحثين الشباب إلى المشاركة في هذه المسابقة الوطنية عبر تسجيل مشاريعهم وأفكارهم المبتكرة.",
      "btn": "👉 التسجيل الآن",
      "closed": "التسجيل مغلق حالياً / Registration is currently closed"
    },
    "stats": {
      "participants": "عدد المشاركين",
      "projects": "عدد المشاريع",
      "wilayas": "عدد الولايات المشاركة",
      "partners": "عدد الشركاء"
    },
    "contact": {
      "title": "تواصل معنا",
      "text": "لأي استفسار أو معلومات إضافية، يرجى التواصل معنا عبر القنوات التالية.",
      "address": "العنوان:",
      "phone": "الهاتف:",
      "mobile": "النقال:",
      "email": "البريد الإلكتروني:"
    },
    "footer": {
      "quick_links": "روابط سريعة",
      "social": "وسائل التواصل الاجتماعي",
      "copyright": "© 2026 STARTUDE DZ – جميع الحقوق محفوظة",
      "onel": "المنظمة الوطنية للطلبة الأحرار (ONEL)",
      "terms": "شروط الاستخدام",
      "privacy": "سياسة الخصوصية"
    },
    "terms": {
      "title": "شروط الاستخدام",
      "intro": "مرحباً بكم في منصة STARTUDE DZ 4.0. باستخدامكم لهذه المنصة، فإنكم توافقون على الشروط والأحكام التالية:",
      "item1": "المنصة مخصصة لغرض التسجيل في المسابقة الوطنية للطلبة الجامعيين.",
      "item2": "يجب تقديم معلومات صحيحة ودقيقة عند التسجيل.",
      "item3": "تحتفظ الجهة المنظمة بالحق في تعديل هذه الشروط في أي وقت."
    },
    "privacy": {
      "title": "سياسة الخصوصية",
      "intro": "نحن نقدر خصوصيتكم ونسعى لحماية بياناتكم الشخصية. تشرح هذه السياسة كيفية جمعنا واستخدامنا لبياناتكم:",
      "item1": "يتم جمع البيانات الشخصية لأغراض التسجيل والتواصل بخصوص المسابقة فقط.",
      "item2": "لن يتم مشاركة بياناتكم مع أي جهة خارجية باستثناء الشركاء الرسميين للمسابقة.",
      "item3": "نستخدم معايير أمنية عالية لحماية بياناتكم من الوصول غير المصرح به."
    },
    "maintenance": {
      "title": "الموقع تحت الصيانة",
      "subtitle": "نحن نعمل حالياً على تحسين وتحديث المنصة لتقديم أفضل تجربة ممكنة. سنعود قريباً!",
      "back_soon": "سنعود قريباً..."
    },
    "admin": {
      "title": "لوحة التحكم للمدير",
      "login_title": "تسجيل الدخول للوحة التحكم",
      "password_placeholder": "كلمة المرور للمدير",
      "login_btn": "دخول",
      "logout_btn": "تسجيل الخروج",
      "wrong_password": "كلمة المرور خاطئة!",
      "save": "حفظ التغييرات",
      "save_success": "تم حفظ التغييرات بنجاح!",
      "settings": "إعدادات المنصة",
      "reg_enable": "تشغيل التسجيل",
      "timer_show": "إظهار العداد",
      "timer_date": "تاريخ انتهاء العداد",
      "bg_enable": "خلفية ثلاثية الأبعاد (3D)",
      "maintenance_enable": "وضع الصيانة",
      "stats": "تعديل الإحصائيات",
      "contact": "معلومات التواصل"
    }
  },
  en: {
    "nav": {
      "home": "Home",
      "about": "About",
      "axes": "Axes",
      "registration": "Register",
      "contact": "Contact",
      "dashboard": "Dashboard"
    },
    "hero": {
      "title": "STARTUDE DZ 4.0",
      "subtitle": "A national competition aiming to transform students' ideas into startups and innovative projects that contribute to building Algeria's knowledge economy.",
      "register_btn": "👉 Register Now",
      "countdown_text": "Time remaining for registration",
      "closed_text": "Registration Closed"
    },
    "organizers": {
      "title": "Organizers & Partners",
      "text": "This competition is organized by the National Organization of Free Students (ONEL), in collaboration with various academic and business incubator partners, aiming to support innovation and entrepreneurship among students.",
      "onel": "National Organization of Free Students (ONEL)",
      "digital_incubator": "Digital Business Incubator at the Ministry of Higher Education",
      "incubators": "Business Incubators",
      "partners": "Economic Partners"
    },
    "about": {
      "title": "About the Competition",
      "text1": "In light of rapid digital transformations, startups have become an essential pillar of the modern economy.",
      "text2": "The STARTUDE DZ 4.0 competition serves as a national platform aimed at empowering students to turn their ideas into real projects, through scientific, training, and competitive guidance.",
      "goals": "Objectives",
      "goal1": "Spreading the culture of innovation and entrepreneurship",
      "goal2": "Transforming ideas into viable projects",
      "goal3": "Connecting the university with the economic environment",
      "goal4": "Supporting creative students"
    },
    "axes": {
      "title": "Strategic Axes of the Competition",
      "text": "The competition focuses on a set of national priority axes, reflecting the needs of society and the Algerian economy.",
      "axis1": "Green Development & Environment",
      "axis2": "National Identity & Memory",
      "axis3": "Smart Agriculture & Food Security",
      "axis4": "Digital Health",
      "axis5": "Energy & Renewable Energies",
      "axis6": "Cybersecurity & Artificial Intelligence",
      "axis7": "Water Security",
      "axis8": "Digital Economy & E-commerce",
      "axis9": "University Sports & Well-being",
      "axis10": "Social Innovation & Citizenship"
    },
    "registration": {
      "title": "Competition Registration",
      "text": "We invite all young students and researchers to participate in this national competition by registering their innovative projects and ideas.",
      "btn": "👉 Register Now",
      "closed": "Registration is currently closed"
    },
    "stats": {
      "participants": "Participants",
      "projects": "Projects",
      "wilayas": "Participating Wilayas",
      "partners": "Partners"
    },
    "contact": {
      "title": "Contact Us",
      "text": "For any inquiries or additional information, please contact us through the following channels.",
      "address": "Address:",
      "phone": "Phone:",
      "mobile": "Mobile:",
      "email": "Email:"
    },
    "footer": {
      "quick_links": "Quick Links",
      "social": "Social Media",
      "copyright": "© 2026 STARTUDE DZ – All Rights Reserved",
      "onel": "National Organization of Free Students (ONEL)",
      "terms": "Terms of Use",
      "privacy": "Privacy Policy"
    },
    "terms": {
      "title": "Terms of Use",
      "intro": "Welcome to the STARTUDE DZ 4.0 platform. By using this platform, you agree to the following terms and conditions:",
      "item1": "The platform is dedicated for registration in the national competition for university students.",
      "item2": "Accurate and truthful information must be provided upon registration.",
      "item3": "The organizing committee reserves the right to modify these terms at any time."
    },
    "privacy": {
      "title": "Privacy Policy",
      "intro": "We value your privacy and strive to protect your personal data. This policy explains how we collect and use your data:",
      "item1": "Personal data is collected for registration and communication purposes regarding the competition only.",
      "item2": "Your data will not be shared with any third party except official competition partners.",
      "item3": "We use high security standards to protect your data from unauthorized access."
    },
    "maintenance": {
      "title": "Site Under Maintenance",
      "subtitle": "We are currently working on improvements and updates to provide the best possible experience. We will be back soon!",
      "back_soon": "We will be back soon..."
    },
    "admin": {
      "title": "Admin Dashboard",
      "login_title": "Admin Dashboard Login",
      "password_placeholder": "Admin Password",
      "login_btn": "Login",
      "logout_btn": "Logout",
      "wrong_password": "Wrong password!",
      "save": "Save Changes",
      "save_success": "Changes saved successfully!",
      "settings": "Platform Settings",
      "reg_enable": "Enable Registration",
      "timer_show": "Show Timer",
      "timer_date": "Timer End Date",
      "bg_enable": "3D Background Effect",
      "maintenance_enable": "Maintenance Mode",
      "stats": "Modify Statistics",
      "contact": "Contact Information"
    }
  }
};

let currentLang = localStorage.getItem('language') || 'ar';

function translateString(path) {
  const parts = path.split('.');
  let val = translations[currentLang];
  for (const part of parts) {
    if (val && val[part] !== undefined) {
      val = val[part];
    } else {
      return path;
    }
  }
  return val;
}

function updateTranslations() {
  document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;

  // Find all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.textContent = translateString(key);
  });

  // Handle placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    elem.placeholder = translateString(key);
  });

  // Handle button labels
  const langBtn = document.querySelector('.lang-toggle-text');
  if (langBtn) {
    langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('language', currentLang);
  updateTranslations();
  
  // Rerender specific dynamic things
  if (typeof updateCountdown === 'function') {
    updateCountdown();
  }
}

// ==========================================
// 4. NAVIGATION & MOBILE MENU
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  const langToggleBtn = document.querySelector('.lang-toggle');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinksContainer.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // Load state and apply translations
  updateTranslations();

  // Smooth scroll support for hash routing
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Initialize page components
  initPageComponents();
});

// ==========================================
// 5. COMPONENT LOGIC & ANIMATIONS
// ==========================================
function initPageComponents() {
  // Inject settings statistics if available
  const pCount = document.getElementById('stat-participants');
  const prCount = document.getElementById('stat-projects');
  const wCount = document.getElementById('stat-wilayas');
  const ptCount = document.getElementById('stat-partners');

  if (pCount) pCount.setAttribute('data-target', stats.participants);
  if (prCount) prCount.setAttribute('data-target', stats.projects);
  if (wCount) wCount.setAttribute('data-target', stats.wilayas);
  if (ptCount) ptCount.setAttribute('data-target', stats.partners);

  // Inject contact details
  const contactAddress = document.getElementById('contact-address-val');
  const contactPhone = document.getElementById('contact-phone-val');
  const contactMobile = document.getElementById('contact-mobile-val');
  const contactEmail = document.getElementById('contact-email-val');

  if (contactAddress) contactAddress.textContent = contactInfo.address;
  if (contactPhone) contactPhone.textContent = contactInfo.phone;
  if (contactMobile) contactMobile.textContent = contactInfo.mobile;
  if (contactEmail) contactEmail.textContent = contactInfo.email;

  // Load registration buttons & dynamic actions
  const heroActions = document.getElementById('hero-registration-actions');
  const regCardActions = document.getElementById('registration-card-actions');

  if (heroActions) {
    if (settings.registrationOpen) {
      heroActions.innerHTML = `<a href="https://forms.gle/GF4hKjQXyG3VxNG48" target="_blank" rel="noreferrer" class="btn-primary" data-i18n="hero.register_btn">${translateString('hero.register_btn')}</a>`;
    } else {
      heroActions.innerHTML = `<button class="btn-secondary" disabled>${currentLang === 'ar' ? 'التسجيل مغلق حالياً' : 'Registration Closed'}</button>`;
    }
  }

  if (regCardActions) {
    if (settings.registrationOpen) {
      regCardActions.innerHTML = `<a href="https://forms.gle/GF4hKjQXyG3VxNG48" target="_blank" rel="noreferrer" class="btn-primary btn-large" data-i18n="registration.btn">${translateString('registration.btn')}</a>`;
    } else {
      regCardActions.innerHTML = `<div class="registration-closed" data-i18n="registration.closed">${translateString('registration.closed')}</div>`;
    }
  }

  // Statistics intersection observer count-up
  const statsElements = document.querySelectorAll('.stat-card h3');
  if (statsElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCountUp(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsElements.forEach(el => observer.observe(el));
  }

  // Init PWA service worker (only on secure origins/localhost)
  initServiceWorker();

  // Run countdown
  initCountdown();

  // Run particles background
  initParticles();

  // Initialize admin dashboard if container is found
  if (document.getElementById('admin-login-container') || document.getElementById('admin-dashboard-container')) {
    initAdminDashboard();
  }
}

function animateCountUp(element, target) {
  let count = 0;
  const duration = 1500;
  const speed = Math.ceil(target / (duration / 16));

  const timer = setInterval(() => {
    count += speed;
    if (count >= target) {
      element.textContent = `+${target}`;
      clearInterval(timer);
    } else {
      element.textContent = `+${count}`;
    }
  }, 16);
}

// Countdown timer
let countdownInterval;
function initCountdown() {
  const container = document.getElementById('countdown-container');
  if (!container) return;

  if (!settings.showTimer) {
    container.style.display = 'none';
    return;
  }

  updateCountdown();
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const container = document.getElementById('countdown-container');
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!container || !daysEl) return;

  const difference = +new Date(settings.timerEndDate) - +new Date();
  if (difference <= 0) {
    container.style.display = 'none';
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minsEl.textContent = minutes;
  secsEl.textContent = seconds;

  // Update label translation helper
  const isArabic = currentLang === 'ar';
  document.getElementById('lbl-days').textContent = isArabic ? 'أيام' : 'Days';
  document.getElementById('lbl-hours').textContent = isArabic ? 'ساعات' : 'Hours';
  document.getElementById('lbl-mins').textContent = isArabic ? 'دقائق' : 'Minutes';
  document.getElementById('lbl-secs').textContent = isArabic ? 'ثوانٍ' : 'Seconds';
}

// Particle Background using tsParticles CDN
function initParticles() {
  if (!settings.enable3DBackground || !document.getElementById('tsparticles')) return;

  // Load particles config if tsParticles library is present
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          }
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.5 }
          },
          push: {
            quantity: 4
          }
        },
      },
      particles: {
        color: {
          value: ["#008f4a", "#d21034", "#f0f4f8"], // Premium palette
        },
        links: {
          color: "#ffffff",
          distance: 130,
          enable: true,
          opacity: 0.2,
          width: 1.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 120, // Increased density
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 1,
            sync: false
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            sync: false
          }
        },
      },
      detectRetina: true,
    });
  }
}

// PWA Service worker helper
function initServiceWorker() {
  const isSecure = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'https:';
  
  // Force cache clearing for updates
  const CURRENT_VERSION = '6';
  if (localStorage.getItem('app_cache_version') !== CURRENT_VERSION) {
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (let name of names) caches.delete(name);
      });
    }
    localStorage.setItem('app_cache_version', CURRENT_VERSION);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
    // Reload page to get fresh assets
    setTimeout(() => {
      window.location.reload();
    }, 300);
    return;
  }

  if ('serviceWorker' in navigator && isSecure) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered scope:', reg.scope);
          // Check for updates to force installation
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[PWA] New content is available; please refresh.');
                }
              }
            };
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }
}

// ==========================================
// 6. CLIENT-SIDE ADMIN DASHBOARD CONTROLLER
// ==========================================
function initAdminDashboard() {
  const loginContainer = document.getElementById('admin-login-container');
  const dashboardContainer = document.getElementById('admin-dashboard-container');
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password-input');
  const loginError = document.getElementById('admin-login-error');
  const logoutBtn = document.getElementById('admin-logout-btn');
  const saveBtn = document.getElementById('admin-save-btn');
  const saveMsg = document.getElementById('admin-save-message');

  // Inputs
  const regOpenToggle = document.getElementById('admin-reg-open');
  const showTimerToggle = document.getElementById('admin-show-timer');
  const timerEndDateInput = document.getElementById('admin-timer-date');
  const enableBgToggle = document.getElementById('admin-enable-bg');
  const maintenanceToggle = document.getElementById('admin-maintenance-mode');

  const participantsInput = document.getElementById('admin-participants');
  const projectsInput = document.getElementById('admin-projects');
  const wilayasInput = document.getElementById('admin-wilayas');
  const partnersInput = document.getElementById('admin-partners');

  const addressInput = document.getElementById('admin-address');
  const phoneInput = document.getElementById('admin-phone');
  const mobileInput = document.getElementById('admin-mobile');
  const emailInput = document.getElementById('admin-email');

  // Check authentication
  let isAuthenticated = sessionStorage.getItem('adminAuth') === 'true';

  function updateView() {
    if (isAuthenticated) {
      if (loginContainer) loginContainer.style.display = 'none';
      if (dashboardContainer) dashboardContainer.style.display = 'block';
      fillFormFields();
    } else {
      if (loginContainer) loginContainer.style.display = 'flex';
      if (dashboardContainer) dashboardContainer.style.display = 'none';
    }
  }

  function fillFormFields() {
    if (regOpenToggle) regOpenToggle.checked = settings.registrationOpen;
    if (showTimerToggle) showTimerToggle.checked = settings.showTimer;
    if (timerEndDateInput) {
      timerEndDateInput.value = settings.timerEndDate ? settings.timerEndDate.substring(0, 16) : '';
    }
    if (enableBgToggle) enableBgToggle.checked = settings.enable3DBackground;
    if (maintenanceToggle) maintenanceToggle.checked = settings.maintenanceMode;

    if (participantsInput) participantsInput.value = stats.participants;
    if (projectsInput) projectsInput.value = stats.projects;
    if (wilayasInput) wilayasInput.value = stats.wilayas;
    if (partnersInput) partnersInput.value = stats.partners;

    if (addressInput) addressInput.value = contactInfo.address;
    if (phoneInput) phoneInput.value = contactInfo.phone;
    if (mobileInput) mobileInput.value = contactInfo.mobile;
    if (emailInput) emailInput.value = contactInfo.email;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (passwordInput && passwordInput.value === 'ONEL2026') {
        isAuthenticated = true;
        sessionStorage.setItem('adminAuth', 'true');
        if (loginError) loginError.textContent = '';
        if (passwordInput) passwordInput.value = '';
        updateView();
      } else {
        if (loginError) {
          loginError.textContent = translateString('admin.wrong_password');
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isAuthenticated = false;
      sessionStorage.removeItem('adminAuth');
      updateView();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Gather values
      const newSettings = {
        registrationOpen: regOpenToggle ? regOpenToggle.checked : settings.registrationOpen,
        showTimer: showTimerToggle ? showTimerToggle.checked : settings.showTimer,
        timerEndDate: timerEndDateInput && timerEndDateInput.value ? new Date(timerEndDateInput.value).toISOString() : settings.timerEndDate,
        enable3DBackground: enableBgToggle ? enableBgToggle.checked : settings.enable3DBackground,
        maintenanceMode: maintenanceToggle ? maintenanceToggle.checked : settings.maintenanceMode
      };

      const newStats = {
        participants: participantsInput ? parseInt(participantsInput.value) || 0 : stats.participants,
        projects: projectsInput ? parseInt(projectsInput.value) || 0 : stats.projects,
        wilayas: wilayasInput ? parseInt(wilayasInput.value) || 0 : stats.wilayas,
        partners: partnersInput ? parseInt(partnersInput.value) || 0 : stats.partners
      };

      const newContact = {
        address: addressInput ? addressInput.value : contactInfo.address,
        phone: phoneInput ? phoneInput.value : contactInfo.phone,
        mobile: mobileInput ? mobileInput.value : contactInfo.mobile,
        email: emailInput ? emailInput.value : contactInfo.email
      };

      // Save to storage
      localStorage.setItem('adminSettings', JSON.stringify(newSettings));
      localStorage.setItem('adminStats', JSON.stringify(newStats));
      localStorage.setItem('adminContact', JSON.stringify(newContact));

      // Update local memory
      Object.assign(settings, newSettings);
      Object.assign(stats, newStats);
      Object.assign(contactInfo, newContact);

      // Re-initialize backgrounds immediately
      if (typeof initVideoBackground === 'function') initVideoBackground();
      if (typeof initParticles === 'function') initParticles();

      // Visual feedback
      if (saveMsg) {
        saveMsg.textContent = translateString('admin.save_success');
        saveMsg.style.display = 'inline';
        setTimeout(() => {
          saveMsg.textContent = '';
        }, 3000);
      }

      // If maintenance toggled, force redirect check after a short delay
      setTimeout(() => {
        if (newSettings.maintenanceMode) {
          window.location.href = 'maintenance.html';
        }
      }, 1000);
    });
  }

  updateView();
}
