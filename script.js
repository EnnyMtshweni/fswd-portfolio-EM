
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
 
// ---- Smooth close mobile menu on nav link click ----
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navLinks');
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse && navCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});
 