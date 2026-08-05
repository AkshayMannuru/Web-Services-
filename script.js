/* ============================================================
   WEBCRAFT STUDIO — PREMIUM JAVASCRIPT
   Aurora canvas · Particles · Parallax · Magnetic · Carousel
   Custom cursor · Split text · Ripple · Scroll reveal · Counter
   ============================================================ */

'use strict';

// ===========================
// Utility helpers
// ===========================
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Detect reduced motion preference
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Detect touch device (disable cursor + magnetic on touch)
const isTouchDevice = () =>
  ('ontouchstart' in window) || navigator.maxTouchPoints > 0;



/* ============================================================
   AURORA CANVAS — animated mesh gradient background
   ============================================================ */
(function initAurora() {
  const canvas = qs('#aurora-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let W, H, rafId;
  let lastTime = 0;
  const FPS = 30;
  const INTERVAL = 1000 / FPS;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Aurora "blobs"
  const blobs = [
    { x: 0.15, y: 0.3,  r: 0.55, color: [0, 87, 255],    speed: 0.00018 },
    { x: 0.75, y: 0.65, r: 0.5,  color: [124, 58, 237],  speed: 0.00015 },
    { x: 0.5,  y: 0.1,  r: 0.4,  color: [6, 182, 212],   speed: 0.0002  },
    { x: 0.85, y: 0.15, r: 0.35, color: [99, 102, 241],  speed: 0.00012 },
  ];

  function draw(ts) {
    if (ts - lastTime < INTERVAL) {
      rafId = requestAnimationFrame(draw);
      return;
    }
    lastTime = ts;

    ctx.clearRect(0, 0, W, H);

    // Dark base
    ctx.fillStyle = '#020818';
    ctx.fillRect(0, 0, W, H);

    blobs.forEach((b, i) => {
      const t = ts * b.speed + i * 2.1;
      const cx = (b.x + Math.sin(t) * 0.18) * W;
      const cy = (b.y + Math.cos(t * 0.8) * 0.15) * H;
      const r  = b.r * Math.min(W, H);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,   `rgba(${b.color},0.22)`);
      grad.addColorStop(0.5, `rgba(${b.color},0.08)`);
      grad.addColorStop(1,   `rgba(${b.color},0)`);

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.75, t * 0.1, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    rafId = requestAnimationFrame(draw);
  }

  if (!prefersReducedMotion()) {
    rafId = requestAnimationFrame(draw);
  } else {
    // Static fallback
    ctx.fillStyle = '#020818';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }
})();

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
(function initParticles() {
  const canvas = qs('#particle-canvas');
  if (!canvas || prefersReducedMotion()) return;

  const ctx    = canvas.getContext('2d');
  let W, H;
  const COUNT  = 55;
  let particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    }));
  }

  createParticles();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
      if (p.y < -5)  p.y = H + 5;
      if (p.y > H+5) p.y = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ============================================================
   NAVBAR — scroll shrink + active link
   ============================================================ */
const navbar   = qs('#navbar');
const hamburger = qs('#hamburger');
const navLinks  = qs('#navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateScrollTopBtn();
}, { passive: true });

// Active nav link
(function setActiveNav() {
  const current = document.body.dataset.page;
  qsa('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === current);
  });
})();

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
qsa('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   HERO MOUSE PARALLAX
   ============================================================ */
(function initParallax() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  const hero    = qs('#hero');
  const orbs    = qsa('.hero-orb');
  const shapes  = qsa('.hero-shape');

  if (!hero) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    targetY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
  });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 12;
      orb.style.transform = `translate3d(${currentX * depth}px, ${currentY * depth}px, 0)`;
    });

    shapes.forEach((shape, i) => {
      const depth = (i + 1) * 6;
      shape.style.transform = `translate3d(${currentX * -depth}px, ${currentY * -depth}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
})();

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
function initReveal() {
  const els = qsa('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay
          ? parseFloat(entry.target.dataset.delay) * 90
          : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

  els.forEach(el => observer.observe(el));
}
initReveal();

// Section divider line reveal
function initSectionReveal() {
  const sections = qsa('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => observer.observe(s));
}
initSectionReveal();

/* ============================================================
   HERO SCROLL PARALLAX
   ============================================================ */
(function initScrollParallax() {
  if (prefersReducedMotion()) return;
  const heroBg = qs('#heroBg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
  }, { passive: true });
})();

/* ============================================================
   ANIMATED COUNTERS — hero stats
   ============================================================ */
function animateCounters() {
  qsa('.hero-stats .stat strong').forEach((el, i) => {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    const suffix = el.dataset.suffix || el.textContent.replace(/[0-9]/g, '');
    if (!Number.isFinite(target)) return;

    const duration = 1600 + i * 200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = `${target}${suffix}`;
    }

    setTimeout(() => requestAnimationFrame(update), i * 150);
  });
}

const statsSection = qs('.hero-stats');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  counterObserver.observe(statsSection);
}

/* ============================================================
   HERO TITLE — word-by-word animation
   ============================================================ */
(function initSplitText() {
  const title = qs('#heroTitle');
  if (!title || prefersReducedMotion()) return;

  // Only split the first text node (not the span.gradient-text)
  title.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const words = node.textContent.trim().split(/\s+/);
      const frag  = document.createDocumentFragment();
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        span.style.transitionDelay = `${i * 0.08}s`;
        frag.appendChild(span);
      });
      node.replaceWith(frag);
    }
  });

  // Trigger animation
  requestAnimationFrame(() => {
    title.classList.add('words-ready');
  });
})();

/* ============================================================
   CARD SPOTLIGHT — mouse-position glow inside cards
   ============================================================ */
(function initSpotlight() {
  if (isTouchDevice()) return;

  qsa('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
(function initMagnetic() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  qsa('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect   = el.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.28;
      const dy     = (e.clientY - cy) * 0.28;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.04)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0,0,0) scale(1)';
      el.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform .15s ease';
    });
  });
})();

/* ============================================================
   RIPPLE EFFECT on primary buttons
   ============================================================ */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-primary, .btn-nav');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
  btn.appendChild(ripple);

  ripple.addEventListener('animationend', () => ripple.remove());
});

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track  = qs('#testimonialsTrack');
  const prev   = qs('#carouselPrev');
  const next   = qs('#carouselNext');
  const dots   = qsa('#carouselDots .carousel-dot');
  if (!track) return;

  const cards   = qsa('.testimonial-card', track);
  const total   = cards.length;
  let perView   = window.innerWidth <= 768 ? 1 : 2;
  let current   = 0;
  let maxIndex;
  let autoTimer;

  function calcMax() {
    perView  = window.innerWidth <= 768 ? 1 : 2;
    maxIndex = Math.ceil(total / perView) - 1;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-pressed', i === current);
    });
  }

  function goTo(index, smooth = true) {
    calcMax();
    current = clamp(index, 0, maxIndex);

    const cardW  = cards[0].offsetWidth + 24; // card + gap
    const offset = current * cardW * perView;
    track.style.transition = smooth ? 'transform .65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    track.style.transform  = `translate3d(-${offset}px, 0, 0)`;
    updateDots();
  }

  function nextSlide() { goTo(current >= maxIndex ? 0 : current + 1); }
  function prevSlide() { goTo(current <= 0 ? maxIndex : current - 1); }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  calcMax();
  updateDots();
  startAuto();

  if (next) next.addEventListener('click', () => { nextSlide(); restartAuto(); });
  if (prev) prev.addEventListener('click', () => { prevSlide(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      restartAuto();
    });
  });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    startAuto();
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const carousel = qs('#testimonialsCarousel');
    if (!carousel) return;
    const rect = carousel.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') { nextSlide(); restartAuto(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); restartAuto(); }
  });

  // Pause on hover
  const carousel = qs('#testimonialsCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
  }

  // Re-layout on resize
  window.addEventListener('resize', () => {
    calcMax();
    goTo(current, false);
  }, { passive: true });
})();

/* ============================================================
   SCROLL-TO-TOP BUTTON
   ============================================================ */
const scrollTopBtn = qs('#scrollTopBtn');

function updateScrollTopBtn() {
  if (!scrollTopBtn) return;
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   PORTFOLIO FILTER (portfolio page only)
   ============================================================ */
qsa('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    qsa('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;

    qsa('.portfolio-item').forEach(item => {
      const show = cat === 'all' || item.dataset.category === cat;
      item.style.display = show ? '' : 'none';

      if (show) {
        item.style.opacity   = '0';
        item.style.transform = 'scale(.95)';
        requestAnimationFrame(() => {
          item.style.transition = 'opacity .4s, transform .4s';
          item.style.opacity    = '1';
          item.style.transform  = 'scale(1)';
        });
      }
    });
  });
});

/* ============================================================
   CONTACT FORM (contact page only)
   ============================================================ */
const contactForm = qs('#contactForm');
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

/* ============================================================
   FAQ ACCORDION (contact page only)
   ============================================================ */
qsa('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer  = btn.nextElementSibling;
    const arrow   = btn.querySelector('.faq-arrow');
    const isOpen  = answer.classList.contains('open');

    qsa('.faq-a').forEach(a => a.classList.remove('open'));
    qsa('.faq-arrow').forEach(a => {
      a.textContent = '▾';
      a.classList.remove('open');
    });

    if (!isOpen) {
      answer.classList.add('open');
      if (arrow) { arrow.textContent = '▴'; arrow.classList.add('open'); }
    }
  });
});

/* ============================================================
   SCROLL-TO-FORM button (contact page only)
   ============================================================ */
const scrollToFormBtn = qs('#scrollToForm');
if (scrollToFormBtn) {
  scrollToFormBtn.addEventListener('click', () => {
    const form = qs('.contact-form-card');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ============================================================
   INDUSTRY PILLS — pause animation on hover
   (handled via CSS, JS reset for accessibility)
   ============================================================ */
qsa('.industry-pill').forEach(pill => {
  pill.addEventListener('focus', () => { pill.style.animationPlayState = 'paused'; });
  pill.addEventListener('blur',  () => { pill.style.animationPlayState = ''; });
});

/* ============================================================
   PRICING CARD — highlight on focus (keyboard a11y)
   ============================================================ */
qsa('.pricing-card a').forEach(link => {
  link.closest('.pricing-card').addEventListener('focusin', function () {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 20px 60px rgba(0,87,255,.14)';
  });
  link.closest('.pricing-card').addEventListener('focusout', function () {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
});
