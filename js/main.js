/* Factory OS marketing site — minimal interactivity */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // CTA form — no backend, so just acknowledge
  var form = document.querySelector('.cta-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Thanks — we\u2019ll be in touch!';
        btn.disabled = true;
        btn.style.opacity = '0.75';
      }
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'We\u2019ll reach out within one working day.';
        note.style.color = 'var(--ok)';
        note.style.fontWeight = '600';
      }
    });
  }

  // Smooth-scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var headerH = document.querySelector('.site-header');
        var offset = headerH ? headerH.offsetHeight + 12 : 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
