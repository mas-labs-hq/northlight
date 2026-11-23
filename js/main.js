/* ============================================================
   NORTHLIGHT HOSPITAL - main.js (v1.0)
   Loader / nav / reveal / booking / protection / whatsapp
   ============================================================ */
(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  var CONFIG = {
    phoneMain: '+254 745 190190',
    phoneMainIntl: '+254745190190',
    whatsapp: '254745190190',
    loaderMs: 2800
  };
  window.NH_CONFIG = CONFIG;

  /* ---------- CONSOLE SIGNATURE ---------- */
  try {
    console.log('%c Northlight Hospital ', 'background:#0a3f3c;color:#c8a24b;font-size:14px;padding:6px 14px;border-radius:6px;font-weight:bold;');
    console.log('%c Powered By MortApps Studios ', 'background:#c8a24b;color:#0a3f3c;font-size:11px;padding:4px 10px;border-radius:6px;font-weight:bold;');
  } catch (e) {}

  /* ---------- LOADER (2.8s) ---------- */
  var loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    var t0 = Date.now();
    var finish = function () {
      var wait = Math.max(0, CONFIG.loaderMs - (Date.now() - t0));
      setTimeout(function () {
        loader.classList.add('done');
        document.body.style.overflow = '';
        setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
      }, wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    // failsafe: never trap the user
    setTimeout(function () {
      if (!loader.classList.contains('done')) {
        loader.classList.add('done');
        document.body.style.overflow = '';
      }
    }, CONFIG.loaderMs + 2500);
  }

  /* ---------- HEADER SHADOW ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE DRAWER ---------- */
  var drawer = document.getElementById('m-drawer');
  var overlay = document.getElementById('drawer-overlay');
  var toggle = document.getElementById('nav-toggle');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (toggle) toggle.addEventListener('click', openDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  var closeBtn = document.getElementById('m-drawer-close');
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
  var mLinks = document.querySelectorAll('.m-links a, .m-drawer-cta a');
  mLinks.forEach(function (a) { a.addEventListener('click', closeDrawer); });

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- STAT COUNTERS ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        cio.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- TOAST ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- BOOKING FORM ---------- */
  var form = document.getElementById('booking-form');
  if (form) {
    var successBox = document.getElementById('booking-success');
    var submitBtn = document.getElementById('booking-submit');

    // service preselect from service cards
    document.querySelectorAll('[data-book]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var sel = document.getElementById('bf-service');
        if (sel) sel.value = el.getAttribute('data-book');
        var target = document.getElementById('book');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(function () {
          var nameInput = document.getElementById('bf-name');
          if (nameInput) nameInput.focus({ preventScroll: true });
        }, 650);
      });
    });

    // date min = today
    var dateInput = document.getElementById('bf-date');
    if (dateInput) {
      var today = new Date();
      var iso = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      dateInput.min = iso;
    }

    function setError(id, show) {
      var field = document.getElementById(id);
      if (field) field.closest('.form-field').classList.toggle('error', show);
      return !show;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('bf-name') || {}).value || '';
      var phone = (document.getElementById('bf-phone') || {}).value || '';
      var service = (document.getElementById('bf-service') || {}).value || '';
      var date = (document.getElementById('bf-date') || {}).value || '';

      var okName = setError('bf-name', name.trim().length < 2);
      var okPhone = setError('bf-phone', !/^[0-9+\s()-]{9,15}$/.test(phone.trim()));
      var okService = setError('bf-service', !service);
      var okDate = setError('bf-date', !date);
      if (!(okName && okPhone && okService && okDate)) {
        toast('Please complete the highlighted fields');
        return;
      }

      var original = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending your request...';

      // Formspree-ready: set data-endpoint on the <form> to activate live sending.
      var endpoint = form.getAttribute('data-endpoint');
      var complete = function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;

        var ref = 'NH-' + String(Math.floor(100000 + Math.random() * 900000));
        var timeSlot = (document.getElementById('bf-time') || {}).value || 'your preferred time';

        document.getElementById('bs-name').textContent = name.trim().split(' ')[0];
        document.getElementById('bs-service').textContent = service;
        document.getElementById('bs-phone').textContent = phone.trim();
        document.getElementById('bs-slot').textContent = timeSlot.toLowerCase() + ', ' + date;
        document.getElementById('bs-ref').textContent = ref;

        var waMsg = 'Hello Northlight Hospital. I have booked an appointment online. Ref: ' + ref +
          '. Name: ' + name.trim() + '. Service: ' + service + '. Preferred: ' + timeSlot + ', ' + date + '.';
        var waBtn = document.getElementById('bs-whatsapp');
        if (waBtn) waBtn.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(waMsg);

        form.style.display = 'none';
        if (successBox) {
          successBox.classList.add('show');
          var top = successBox.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        toast('Appointment request received');
      };

      if (endpoint) {
        var fd = new FormData(form);
        fd.append('Reference', 'NH-WEB');
        fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .then(function () { complete(); })
          .catch(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = original;
            toast('Could not send. Please call us instead.');
          });
      } else {
        setTimeout(complete, 1300);
      }
    });

    // live error clearing
    ['bf-name', 'bf-phone', 'bf-service', 'bf-date'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { setError(id, false); });
    });

    // book again
    var again = document.getElementById('bs-again');
    if (again) {
      again.addEventListener('click', function (e) {
        e.preventDefault();
        form.reset();
        form.style.display = '';
        if (successBox) successBox.classList.remove('show');
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /* ---------- CONTENT PROTECTION (deterrent) ---------- */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if (e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) ||
        (e.ctrlKey && k === 'u') ||
        (e.metaKey && e.altKey && (k === 'i' || k === 'j' || k === 'c'))) {
      e.preventDefault();
      toast('Content is protected');
      return false;
    }
  });

  /* ---------- FOOTER YEAR ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- SHARE LINKS (blog posts) ---------- */
  document.querySelectorAll('.share-btn[data-share]').forEach(function (btn) {
    var type = btn.getAttribute('data-share');
    var url = encodeURIComponent(location.href);
    var title = encodeURIComponent(document.title);
    var href = '';
    if (type === 'wa') href = 'https://wa.me/?text=' + title + '%20' + url;
    if (type === 'x') href = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
    if (type === 'fb') href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    if (href) {
      btn.setAttribute('href', href);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    }
    if (type === 'copy') {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(location.href).then(function () { toast('Link copied'); });
        }
      });
    }
  });

  /* ---------- SMOOTH ANCHOR OFFSET FIX ---------- */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 86;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
