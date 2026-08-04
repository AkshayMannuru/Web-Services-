// ===========================
// Navbar scroll
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===========================
// Hamburger
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu after a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===========================
// Mark active nav link based on current page
// ===========================
(function setActiveNav() {
  const current = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === current);
  });
})();

// ===========================
// Scroll Reveal
// ===========================
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ? parseFloat(entry.target.dataset.delay) * 80 : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}
initReveal();

// ===========================
// Portfolio filter (portfolio page only)
// ===========================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const show = cat === 'all' || item.dataset.category === cat;
      item.style.display = show ? '' : 'none';
      if (show) {
        item.style.opacity = '0';
        item.style.transform = 'scale(.95)';
        requestAnimationFrame(() => {
          item.style.transition = 'opacity .3s, transform .3s';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      }
    });
  });
});

// ===========================
// Contact form (contact page only)
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = '#10b981';
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = 'Send My Request <span class="arrow">→</span>';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });
}

// ===========================
// FAQ accordion (contact page only)
// ===========================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const arrow = btn.querySelector('.faq-arrow');
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-arrow').forEach(a => { a.textContent = '▾'; a.classList.remove('open'); });
    if (!isOpen) {
      answer.classList.add('open');
      arrow.textContent = '▴';
    }
  });
});

// ===========================
// "Fill the form" scroll button on contact page
// ===========================
const scrollToFormBtn = document.getElementById('scrollToForm');
if (scrollToFormBtn) {
  scrollToFormBtn.addEventListener('click', () => {
    document.querySelector('.contact-form-card').scrollIntoView({ behavior: 'smooth' });
  });
}
