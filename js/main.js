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

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.pageYOffset > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Ticker: duplicate track for a seamless loop
  var ticker = document.getElementById('ticker-track');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

  // Scroll-reveal on all .reveal elements
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Animated counters in hero stats
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObs.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var dur = 900, start = null;
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || target === 0) { el.textContent = String(target); return; }
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  // Flow timeline: highlight the step in view
  var steps = document.querySelectorAll('#flow .flow-step');
  if ('IntersectionObserver' in window && steps.length) {
    var stepObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          steps.forEach(function (s) { s.classList.remove('active'); });
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' });
    steps.forEach(function (s) { stepObs.observe(s); });
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
