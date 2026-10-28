(function () {
  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Photo fallback: show initials if profile.jpg is missing
  document.querySelectorAll('img[data-ph]').forEach(function (img) {
    function swap() {
      var d = document.createElement('div');
      d.className = 'ph';
      d.textContent = img.dataset.ph;
      d.setAttribute('role', 'img');
      d.setAttribute('aria-label', img.alt);
      img.replaceWith(d);
    }
    img.addEventListener('error', swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (e, i) {
      e.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(e);
    });
  }

  // Highlight nav link for the section on screen
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if ('IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute('href').slice(1)] = l; });
    var nav = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        var active = byId[entry.target.id];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) nav.observe(s);
    });
  }
})();
