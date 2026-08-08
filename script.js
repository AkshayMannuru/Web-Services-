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

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  navbar.classList.remove('nav-hidden');
  lastScrollY = currentScrollY;
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
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.22em';
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
   CARD SPOTLIGHT & 3D TILT — premium micro-animations
   ============================================================ */
(function initSpotlightAndTilt() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  qsa('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      // 3D Tilt calculation (max 10 degrees tilt)
      const tiltX = -((e.clientY - rect.top) / rect.height - 0.5) * 10;
      const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      
      // Update transform style inline with scale & lift
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      // Smoothly reset tilt and positioning when cursor leaves card
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
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
      // Clamped magnetic movement so it stays comfortably within bounds without overlapping adjacent buttons
      const rawDx  = (e.clientX - cx) * 0.14;
      const rawDy  = (e.clientY - cy) * 0.14;
      const dx     = Math.max(-8, Math.min(8, rawDx));
      const dy     = Math.max(-6, Math.min(6, rawDy));
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.02)`;
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

    // Clear previous error states
    contactForm.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

    // Gather inputs
    const nameInput = contactForm.querySelectorAll('input[type="text"]')[0];
    const businessNameInput = contactForm.querySelectorAll('input[type="text"]')[1];
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const typeSelect = contactForm.querySelectorAll('select')[0];
    const budgetSelect = contactForm.querySelectorAll('select')[1];
    const projectDescInput = contactForm.querySelector('textarea');

    // Validation checks
    let isValid = true;
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      isValid = false;
    }
    if (!businessNameInput.value.trim()) {
      businessNameInput.classList.add('invalid');
      isValid = false;
    }
    if (!phoneInput.value.trim()) {
      phoneInput.classList.add('invalid');
      isValid = false;
    }
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      emailInput.classList.add('invalid');
      isValid = false;
    }
    if (!typeSelect.value) {
      const trigger = typeSelect.closest('.custom-select') ? typeSelect.closest('.custom-select').querySelector('.custom-select__trigger') : null;
      if (trigger) trigger.classList.add('invalid');
      isValid = false;
    }
    if (!projectDescInput.value.trim() || projectDescInput.value.trim().length < 5) {
      projectDescInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) {
      // Setup listeners to remove invalid state on user interaction
      contactForm.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', () => el.classList.remove('invalid'), { once: true });
      });
      document.querySelectorAll('.custom-select__option').forEach(opt => {
        opt.addEventListener('click', () => {
          const trigger = opt.closest('.custom-select').querySelector('.custom-select__trigger');
          if (trigger) trigger.classList.remove('invalid');
        }, { once: true });
      });
      return;
    }

    btn.textContent = 'Preparing Gmail…';
    btn.disabled = true;

    // Gather values for submission
    const name = nameInput.value;
    const businessName = businessNameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    
    const websiteType = typeSelect.value || 'Not Specified';
    const budgetRange = budgetSelect.value || 'Not Specified';
    const projectDesc = projectDescInput.value;

    // Format email subject and body
    const subject = encodeURIComponent(`New Project Quote Request - ${businessName}`);
    const emailBody = `Hello LocaliQ Digital Media,

I would like to request a free quote for my project. Below are the details:

--------------------------------------------------
CONTACT & BUSINESS INFO
--------------------------------------------------
* Full Name: ${name}
* Business Name: ${businessName}
* Phone Number: ${phone}
* Email Address: ${email}

--------------------------------------------------
PROJECT DETAILS
--------------------------------------------------
* Type of Website: ${websiteType}
* Budget Range: ${budgetRange}

* Project Description:
${projectDesc}

--------------------------------------------------
Submitted via Quote Request Form.`;

    const body = encodeURIComponent(emailBody);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@localiqdigitalmedia.in&su=${subject}&body=${body}`;

    // Redirect to Gmail compose in a new tab
    window.open(gmailUrl, '_blank');

    setTimeout(() => {
      btn.innerHTML = '✓ Redirected to Gmail!';
      btn.style.background = '#10b981';
      contactForm.reset();

      // Reset custom select dropdown displays back to placeholder texts
      document.querySelectorAll('.custom-select').forEach(wrapper => {
        const selectEl = wrapper.querySelector('select');
        const triggerSpan = wrapper.querySelector('.custom-select__trigger span');
        if (selectEl && triggerSpan) {
          triggerSpan.textContent = selectEl.options[0].text;
        }
      });

      setTimeout(() => {
        btn.innerHTML = 'Send My Request <span class="arrow">→</span>';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1000);
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
  pill.addEventListener('blur', () => { pill.style.animationPlayState = ''; });
});

/* ============================================================
   PRICING CARD — highlight on focus (keyboard a11y)
   ============================================================ */
qsa('.pricing-card a').forEach(link => {
  const card = link.closest('.pricing-card');
  if (!card) return;

  card.addEventListener('focusin', function () {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 20px 60px rgba(0,87,255,.14)';
  });
  card.addEventListener('focusout', function () {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
});

// ===========================
// Responsive modal (contact page only)
// ===========================
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const responsiveModal = document.getElementById('responsiveModal');

if (openModalBtn && closeModalBtn && responsiveModal) {
  const toggleModal = visible => {
    responsiveModal.classList.toggle('active', visible);
    document.body.style.overflow = visible ? 'hidden' : '';
  };

  openModalBtn.addEventListener('click', () => toggleModal(true));
  closeModalBtn.addEventListener('click', () => toggleModal(false));
  responsiveModal.addEventListener('click', e => {
    if (e.target === responsiveModal) toggleModal(false);
  });
}

// ===========================
// Custom select conversion (contact page only)
// Converts <select class="js-custom-select"> into a styled dropdown
// ===========================
function initCustomSelects() {
  document.querySelectorAll('select.js-custom-select').forEach(select => {
    if (select.dataset.custom === '1') return;
    select.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select__trigger';
    const initial = select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : select.options[0].text;
    trigger.innerHTML = `<span>${initial}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    wrapper.appendChild(trigger);

    const options = document.createElement('div');
    options.className = 'custom-select__options';
    Array.from(select.options).forEach(opt => {
      const item = document.createElement('div');
      item.className = 'custom-select__option';
      if (opt.disabled) item.classList.add('disabled');
      if (opt.selected) item.classList.add('selected');
      item.dataset.value = opt.value;
      item.textContent = opt.text;
      item.addEventListener('click', () => {
        if (opt.disabled) return;
        select.value = item.dataset.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        trigger.querySelector('span').textContent = item.textContent;
        options.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));
        item.classList.add('selected');
        wrapper.classList.remove('open');
      });
      options.appendChild(item);
    });
    wrapper.appendChild(options);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isAlreadyOpen = wrapper.classList.contains('open');
      
      // Close all other custom dropdowns
      document.querySelectorAll('.custom-select').forEach(otherWrapper => {
        if (otherWrapper !== wrapper) {
          otherWrapper.classList.remove('open');
          const otherOptions = otherWrapper.querySelector('.custom-select__options');
          if (otherOptions) otherOptions.classList.remove('open');
        }
      });

      if (isAlreadyOpen) {
        wrapper.classList.remove('open');
        options.classList.remove('open');
      } else {
        wrapper.classList.add('open');
        options.classList.add('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
        options.classList.remove('open');
      }
    });

    select.dataset.custom = '1';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomSelects);
} else {
  initCustomSelects();
}
