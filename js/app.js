// =============================
// 📌 Données dynamiques (18 cartes)
// =============================
const data = Array.from({ length: 18 }).map((_, i) => {
  const categories = ['Article', 'Développement web', 'Télécommunication', 'Cours'];
  const cat = categories[i % categories.length];

  return {
    id: i + 1,
    title: {
      'Article': `Comprendre un concept clé #${i + 1}`,
      'Développement web': `Projet Frontend : Tutoriel ${i + 1}`,
      'Télécommunication': `Notions VSAT expliquées ${i + 1}`,
      'Cours': `Cours: Module ${i + 1}`
    }[cat],
    desc: `Une description concise et pertinente pour la publication ${i + 1}. Extraits, astuces et points clés pour apprendre rapidement.`,
    author: 'Josue Makengo',
    date: '20/09/2025',
    category: cat,
    image: `images/photo${(i % 3) +1}.jpg`,
    link: `publication${i + 1}.html`
  };
});


//  Injection des cartes dans le DOM

fetch('posts.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('cardsGrid');
    data.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card__media">
          <img src="${item.image}" alt="Illustration ${item.title}">
          <span class="badge">${item.category}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">${item.title}</h3>
          <p class="card__desc">${item.desc}</p>
          <div class="card__meta">par ${item.author} le ${item.date}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        window.location.href = item.link;
      });
      grid.appendChild(card);
    });
  })
  .catch(err => console.error("Erreur de chargement des publications :", err));

// 🌙 Gestion du thème clair/sombre

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const stored = localStorage.getItem('orel_theme');
const isDark = stored ? stored === 'dark' : prefersDark;

if (isDark) document.documentElement.classList.add('dark');
themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';


themeToggle.addEventListener('click', () => {
  const isNowDark = document.documentElement.classList.toggle('dark');
  themeIcon.className = isNowDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('orel_theme', isNowDark ? 'dark' : 'light');
});

// =============================
// 📱 Gestion du menu mobile
// =============================
const burgerBtn = document.getElementById('burgerBtn');
const burgerIcon = document.getElementById('burgerIcon');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');

const openMenu = () => {
  mobileMenu.classList.add('open');
  burgerIcon.className = 'fa-solid fa-scissors'; // style "ciseau moderne"
  mobileMenu.setAttribute('aria-hidden', 'false');
};

const closeMenu = () => {
  mobileMenu.classList.remove('open');
  burgerIcon.className = 'fa-solid fa-bars';
  mobileMenu.setAttribute('aria-hidden', 'true');
};

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

closeMenuBtn.addEventListener('click', closeMenu);

// Fermer si clic en dehors
document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
    closeMenu();
  }
});

// =============================
// 📅 Année dynamique dans le footer
// =============================
document.getElementById('year').textContent = new Date().getFullYear();
