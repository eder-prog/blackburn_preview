/* ============================================================
   Blackburn Construction — main.js
   - Adaptive header (elementFromPoint 3-sample voting)
   - Logo morph on scroll > 80px
   - Mobile nav toggle
   - Form validation + mailto submit
   - 280-char counter
   - Phone auto-format
   - Smooth scroll
   - Mobile sticky CTA reveal
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // -------- 1. Adaptive header --------
  const header = $('.site-header');
  const SCROLL_TRIGGER = 80;

  function detectHeaderBg() {
    if (!header) return;
    const y = header.offsetHeight + 10;
    const samples = [0.15, 0.5, 0.85].map(p => {
      const el = document.elementFromPoint(window.innerWidth * p, y);
      if (!el) return null;
      // climb to find data-bg
      let node = el;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.bg) return node.dataset.bg;
        node = node.parentElement;
      }
      return 'light';
    });
    const dark = samples.filter(s => s === 'dark').length;
    const isDark = dark >= 2;
    header.classList.toggle('over-dark', isDark);
    header.classList.toggle('over-light', !isDark);
  }

  function onScroll() {
    const scrolled = window.scrollY > SCROLL_TRIGGER;
    header.classList.toggle('is-scrolled', scrolled);
    detectHeaderBg();

    // Mobile sticky CTA reveal
    const stickyCta = $('.sticky-cta');
    if (stickyCta) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = window.scrollY / docH;
      stickyCta.classList.toggle('is-visible', pct > 0.18 && pct < 0.92);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', detectHeaderBg, { passive: true });
  onScroll();

  // Tag all dark sections after DOMReady (in case markup updates)
  document.addEventListener('DOMContentLoaded', () => {
    $$('.section--forest, .hero, .process, .final-cta, .site-footer').forEach(el => {
      if (!el.dataset.bg) el.dataset.bg = 'dark';
    });
    $$('.section--cream, .trust, .services, .about, .service-area, .reviews-empty, .form-section').forEach(el => {
      if (!el.dataset.bg) el.dataset.bg = 'light';
    });
    detectHeaderBg();
  });

  // -------- 2. Mobile nav toggle --------
  const navToggle = $('.nav-toggle');
  const mobileNav = $('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.getAttribute('aria-hidden') === 'false';
      mobileNav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    // close on link click
    $$('a', mobileNav).forEach(a => a.addEventListener('click', () => {
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  // -------- 3. Smooth-scroll anchor links --------
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // -------- 4. Phone auto-format --------
  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }

  const phoneInput = $('#form-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const before = e.target.selectionStart;
      e.target.value = formatPhone(e.target.value);
      try { e.target.setSelectionRange(e.target.value.length, e.target.value.length); } catch (_) {}
    });
  }

  // -------- 5. 280-char counter --------
  const msg = $('#form-message');
  const counter = $('#form-message-counter');
  if (msg && counter) {
    const MAX = 280;
    const update = () => {
      const len = msg.value.length;
      counter.textContent = `${len} / ${MAX}`;
      counter.style.color = len > MAX ? 'var(--accent-italic)' : '';
    };
    msg.addEventListener('input', () => {
      if (msg.value.length > 280) msg.value = msg.value.slice(0, 280);
      update();
    });
    update();
  }

  // -------- 6. Form validation + submit-enable --------
  const form = $('#estimate-form');
  const submitBtn = $('#form-submit');
  const consentRequired = $('#consent-contact');

  function refreshSubmit() {
    if (!submitBtn || !consentRequired) return;
    if (consentRequired.checked) {
      submitBtn.removeAttribute('aria-disabled');
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.add('btn--bounce');
    } else {
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.classList.remove('btn--bounce');
    }
  }
  if (consentRequired) {
    consentRequired.addEventListener('change', refreshSubmit);
    refreshSubmit();
  }

  function validate() {
    if (!form) return false;
    let ok = true;
    const fields = [
      { id: 'form-name',    test: v => v.trim().length >= 2 },
      { id: 'form-phone',   test: v => v.replace(/\D/g, '').length === 10 },
      { id: 'form-message', test: v => v.trim().length >= 5 }
    ];
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      if (!el) return;
      const valid = f.test(el.value);
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) ok = false;
    });
    return ok;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        // focus first invalid
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      if (!consentRequired || !consentRequired.checked) {
        consentRequired && consentRequired.focus();
        return;
      }

      // Build mailto (only 3 fields collected; backend swap to info@ once set up)
      const get = id => (document.getElementById(id)?.value || '').trim();
      const sms = $('#consent-sms')?.checked ? 'YES' : 'NO';
      const body = `New estimate request from Blackburn Construction website%0D%0A%0D%0A`
        + `Name: ${encodeURIComponent(get('form-name'))}%0D%0A`
        + `Phone: ${encodeURIComponent(get('form-phone'))}%0D%0A%0D%0A`
        + `Project details:%0D%0A${encodeURIComponent(get('form-message'))}%0D%0A%0D%0A`
        + `---%0D%0A`
        + `SMS consent: ${sms}%0D%0A`
        + `Contact consent: YES (required to submit)`;
      const subject = encodeURIComponent('New estimate request — ' + get('form-name'));
      // TODO: swap to info@blackburnconstruction.com once that mailbox is set up
      const mailto = `mailto:jsblackburn3@yahoo.com?subject=${subject}&body=${body}`;

      // submit-busy ui
      submitBtn.textContent = 'SENDING...';
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.classList.remove('btn--bounce');

      // open mailto + show success
      setTimeout(() => {
        window.location.href = mailto;
        // show success state
        form.classList.add('is-submitted');
        const success = $('#form-success');
        if (success) {
          success.classList.add('is-visible');
          success.focus();
        }
      }, 400);
    });

    // live re-validate on blur
    $$('input, select, textarea', form).forEach(el => {
      el.addEventListener('blur', () => validate());
    });
  }

})();
