/* =============================================
   ANDLEEB ASGHAR SEO PORTFOLIO — script.js
============================================= */

// ---- NAV MOBILE TOGGLE ----
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ---- NAV SCROLL SHRINK ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(0,212,200,0.12)';
  } else {
    nav.style.borderBottomColor = 'rgba(255,255,255,0.06)';
  }
});

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// ---- BAR CHART ANIMATION ----
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const pct = bar.dataset.pct;
    bar.style.width = pct + '%';
  });
}

// ---- TOOL BAR ANIMATION ----
function animateTools() {
  document.querySelectorAll('.tool-fill').forEach(fill => {
    const w = fill.dataset.w;
    fill.style.width = w + '%';
  });
}

// ---- INTERSECTION OBSERVER ----
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBars();
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const toolObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateTools();
      toolObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Observe sections
document.querySelectorAll('.results-grid, .hero-stats').forEach(el => counterObserver.observe(el));
document.getElementById('barChart') && barObserver.observe(document.getElementById('barChart'));
document.querySelector('.tools-grid') && toolObserver.observe(document.querySelector('.tools-grid'));

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.result-card, .case-card, .service-category, .ind-card, .pub-card, .finding, .metric-box, .tool-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ---- AUDIT TOOL (demo) ----
const sampleAuditData = [
  { type: 'bad', label: 'Meta Description Missing', detail: 'No meta description found. Add one under 160 characters.' },
  { type: 'bad', label: 'Images Without Alt Text', detail: 'Multiple images found without alt attributes. Fix for SEO and accessibility.' },
  { type: 'bad', label: 'No H1 Tag Found', detail: 'Your page is missing an H1 heading. This is critical for SEO.' },
  { type: 'bad', label: 'Mobile PageSpeed Below 60', detail: 'Slow mobile load times hurt both rankings and conversions.' },
  { type: 'bad', label: 'Missing Schema Markup', detail: 'No JSON-LD or structured data detected. Add Organization and LocalBusiness schema.' },
  { type: 'good', label: 'HTTPS Enabled', detail: 'Your site uses a secure connection — good for trust and rankings.' },
  { type: 'good', label: 'Canonical Tag Present', detail: 'Self-referencing canonical found — correct configuration.' },
  { type: 'good', label: 'Sitemap Detected', detail: 'XML sitemap is accessible by search engines.' },
];

function runAudit() {
  const url = document.getElementById('auditUrl').value.trim();
  if (!url) return;

  const resultsDiv = document.getElementById('auditResults');
  const itemsDiv = document.getElementById('auditItems');

  itemsDiv.innerHTML = '<p style="color:rgba(255,255,255,0.5);font-size:0.85rem;margin-bottom:8px;">Analyzing ' + url + '...</p>';
  resultsDiv.style.display = 'block';

  setTimeout(() => {
    itemsDiv.innerHTML = sampleAuditData.map(item => `
      <div class="finding ${item.type}">
        <span class="finding-icon">${item.type === 'bad' ? '✗' : '✓'}</span>
        <div><strong>${item.label}</strong> — ${item.detail}</div>
      </div>
    `).join('');
  }, 1200);
}

// ---- FORM SUBMIT (demo) ----
function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.querySelectorAll('input, textarea, select, button').forEach(el => el.disabled = true);
  success.style.display = 'block';
  // In production: send to a backend / Formspree / Netlify Forms
}

// ---- SMOOTH ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--teal)' : '';
  });
});
