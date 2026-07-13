/* =============================================
   FRANCIS PORTFOLIO - main.js v2
   ============================================= */

// ── THEME TOGGLE ──────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved theme (default: light)
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
}

// ── NAV SCROLL EFFECT ─────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ── MOBILE MENU ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function openMobileMenu() {
  menuOpen = true;
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    menuOpen ? closeMobileMenu() : openMobileMenu();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) closeMobileMenu();
});

// ── SCROLL REVEAL ─────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => observer.observe(el));

// ── STAT COUNT-UP ─────────────────────────────
function animateCount(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stats__number').forEach((el) => {
          const plus = el.querySelector('.stats__plus');
          const raw = el.textContent.replace('+', '').trim();
          const target = parseInt(raw, 10);
          if (!isNaN(target)) {
            el.textContent = '0';
            if (plus) el.appendChild(plus);
            animateCount(el.childNodes[0], target, 1200);
          }
        });
      }
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

// ── CONTACT FORM (contact.html) ───────────────
const form = document.getElementById('contactForm');
if (form) {
  const note = document.getElementById('formNote');
  const btn  = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = `Portfolio inquiry from ${name}`;
    const body = `${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;

    const mailtoLink = `mailto:francisonoyima23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    note.textContent = "Opening your email app... please hit send to complete your message.";
    note.style.color = 'var(--accent-green)';
  });
}