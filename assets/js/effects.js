/* ============================================================
   Blackburn Construction — effects.js
   Scroll-reveal fade-up (only effect)
   Honors prefers-reduced-motion + IntersectionObserver fallback.
   ============================================================ */

(function () {
  'use strict';

  // Reduced motion → just show everything immediately
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const revealSelectors = [
    '.trust__item',
    '.services__head > *',
    '.service-card',
    '.about__photo',
    '.about__copy > *',
    '.service-area__head > *',
    '.city-list li',
    '.service-area__map',
    '.process__head > *',
    '.process__step',
    '.reviews-empty__inner > *',
    '.final-cta__inner > *',
    '.form-section__head > *',
    '.estimate-form',
    '.footer__grid > *'
  ].join(', ');

  const targets = document.querySelectorAll(revealSelectors);

  if (!('IntersectionObserver' in window)) {
    // Old browser — reveal everything immediately
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger by index, looped every 6 items so cascades feel tight
    el.style.transitionDelay = ((i % 6) * 70) + 'ms';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => io.observe(el));
})();
