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
      const isOpen = wrapper.classList.toggle('open');
      if (isOpen) options.classList.add('open'); else options.classList.remove('open');
    });

    // close on outside click
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
        options.classList.remove('open');
      }
    });

    // mark processed
    select.dataset.custom = '1';
  });
}

document.addEventListener('DOMContentLoaded', () => initCustomSelects());
