/* =========================================================
   Enny Mtshweni — Portfolio JavaScript
   Features: typewriter, navbar scroll, scroll reveal,
             active nav tracking, contact form validation,
             footer year
   ========================================================= */

'use strict';

// ---- 1. Footer Year ----
document.getElementById('footerYear').textContent = new Date().getFullYear();


// ---- 2. Navbar: scroll class + active link ----
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('#navLinks .nav-link');
const sections = document.querySelectorAll('main section[id]');

function onScroll() {
  // Add scrolled class for compact navbar
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });


// ---- 3. Smooth close mobile menu on nav link click ----
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navLinks');
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse && navCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});


// ---- 4. Typewriter effect in hero ----
const typewriterEl = document.getElementById('typewriter');
const roles = [
  'Full-Stack Developer',
  'Data Analyst',
  'Problem Solver',
  'UI Builder',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pause at end of word before deleting
      isDeleting = true;
      typeTimeout = setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    // Deleting
    typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 90;
  typeTimeout = setTimeout(typeWriter, speed);
}

typeWriter();


// ---- 5. Scroll reveal (Intersection Observer) ----
const revealItems = document.querySelectorAll('.reveal-item');

if (revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay by index within its parent group
          const siblings = Array.from(entry.target.parentElement.parentElement.querySelectorAll('.reveal-item'));
          const idx = siblings.indexOf(entry.target.parentElement);
          const delay = Math.max(0, idx * 80);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
}


// ---- 6. Contact form validation & submission ----
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function showFeedback(el) {
  el.classList.remove('d-none');
  setTimeout(() => el.classList.add('d-none'), 5000);
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous feedback
    formSuccess.classList.add('d-none');
    formError.classList.add('d-none');

    // HTML5 constraint validation
    if (!contactForm.checkValidity()) {
      contactForm.querySelectorAll('input, textarea').forEach(field => {
        if (!field.checkValidity()) {
          field.classList.add('is-invalid');
        }
      });
      contactForm.classList.add('was-validated');
      return;
    }

    // Show loading state
    btnText.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    submitBtn.disabled = true;

    // Simulate async send (replace with real API call if using Formspree etc.)
    setTimeout(() => {
      btnText.classList.remove('d-none');
      btnLoading.classList.add('d-none');
      submitBtn.disabled = false;

      // Simulate success
      showFeedback(formSuccess);
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      contactForm.querySelectorAll('.is-invalid').forEach(f => f.classList.remove('is-invalid'));
    }, 1500);
  });

  // Live clear invalid state as user types
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.checkValidity()) {
        field.classList.remove('is-invalid');
      }
    });
  });
}