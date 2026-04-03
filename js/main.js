/* ============================================================
   Body of Christ Ministries — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ---- Active nav link ---- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---- Prayer Request form ---- */
  var prayerForm = document.getElementById('prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var messageField = document.getElementById('prayer-message');
      var successMsg = document.getElementById('form-success');
      var errorMsg = document.getElementById('form-error');
      var submitBtn = prayerForm.querySelector('[type="submit"]');

      // Clear previous messages
      successMsg.classList.remove('visible');
      errorMsg.classList.remove('visible');

      // Basic required-field validation
      if (!messageField.value.trim()) {
        messageField.focus();
        errorMsg.textContent = 'Please enter your prayer request before submitting.';
        errorMsg.classList.add('visible');
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      var formData = new FormData(prayerForm);

      fetch(prayerForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            successMsg.classList.add('visible');
            prayerForm.reset();
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            return response.json().then(function (data) {
              throw new Error(data.errors ? data.errors.map(function (e) { return e.message; }).join(', ') : 'Submission error');
            });
          }
        })
        .catch(function (err) {
          errorMsg.textContent = 'There was a problem submitting your request. Please try again or email us directly.';
          errorMsg.classList.add('visible');
          console.error(err);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Prayer Request';
        });
    });
  }

  /* ---- Events page: load from JSON ---- */
  var eventsContainer = document.getElementById('events-list');
  if (eventsContainer) {
    fetch('data/events.json')
      .then(function (r) { return r.json(); })
      .then(function (events) {
        if (!events || events.length === 0) {
          eventsContainer.innerHTML = '<p class="no-events">No upcoming events at this time. Check back soon!</p>';
          return;
        }

        var now = new Date();
        now.setHours(0, 0, 0, 0);

        // Sort ascending, show upcoming first
        events.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

        var upcoming = events.filter(function (ev) { return new Date(ev.date) >= now; });
        var past = events.filter(function (ev) { return new Date(ev.date) < now; });

        function renderEvent(ev) {
          var d = new Date(ev.date + 'T12:00:00');
          var month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
          var day = d.getDate();
          return '<article class="event-card">' +
            '<div class="event-date-badge" aria-hidden="true"><span class="month">' + month + '</span><span class="day">' + day + '</span></div>' +
            '<div class="event-info">' +
            '<h3>' + escapeHtml(ev.title) + '</h3>' +
            '<p class="event-meta">' +
              '<span>' + d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</span>' +
              (ev.time ? ' &bull; <span>' + escapeHtml(ev.time) + '</span>' : '') +
              (ev.location ? ' &bull; <span>' + escapeHtml(ev.location) + '</span>' : '') +
            '</p>' +
            (ev.description ? '<p>' + escapeHtml(ev.description) + '</p>' : '') +
            '</div></article>';
        }

        var html = '';
        if (upcoming.length > 0) {
          html += '<h2 class="section-title" style="margin-bottom:1rem">Upcoming Events</h2>';
          html += upcoming.map(renderEvent).join('');
        }
        if (past.length > 0) {
          html += '<h2 class="section-title" style="margin:2.5rem 0 1rem;opacity:.6">Past Events</h2>';
          html += past.map(renderEvent).join('');
        }
        if (upcoming.length === 0 && past.length === 0) {
          html = '<p class="no-events">No events listed at this time. Check back soon!</p>';
        }

        eventsContainer.innerHTML = html;
      })
      .catch(function () {
        eventsContainer.innerHTML = '<p class="no-events">Unable to load events right now. Please check back later.</p>';
      });
  }

  /* ---- Helper ---- */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
