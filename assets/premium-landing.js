/* ==========================================================================
   MATHEUS POLI — CORRETOR DE IMÓVEIS EM UBERABA / MG
   JavaScript de Navegação e Interatividade
   ========================================================================== */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL ────────────────────────────────────── */
  var navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ── 2. MENU MOBILE ──────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks  = document.querySelector('.nav-links');
  var navClose  = document.querySelector('.nav-close');

  function openMenu() {
    if (!navLinks) return;
    navLinks.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) navToggle.addEventListener('click', openMenu);
  if (navClose)  navClose.addEventListener('click', closeMenu);

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) &&
          e.target !== navToggle &&
          !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── 3. NAVEGAÇÃO SUAVE ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = navbar ? navbar.offsetHeight + 10 : 70;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  /* ── 4. ACORDEÃO DE DÚVIDAS (FAQ) ────────────────────────── */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var header = item.querySelector('.faq-header');
    var body = item.querySelector('.faq-body');

    if (!header || !body) return;

    header.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          var otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ── 5. ANIMAÇÕES DE SCROLL SUAVE ────────────────────────── */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    var animatedElements = document.querySelectorAll('.imovel-card, .diferencial-card, .bairro-box, .depoimento-card, .faq-item, .sobre-grid');
    animatedElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }

})();
