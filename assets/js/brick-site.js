// Home page interactions: the brick stack in the hero and the rotating greeting.
(function () {
  // ----- Brick stack -----
  var bricks = Array.prototype.slice.call(document.querySelectorAll('.stack .brick'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.brick-panel'));

  function show(i) {
    bricks.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.i === String(i))); });
    panels.forEach(function (p) {
      var on = p.dataset.panel === String(i);
      p.hidden = !on;
      if (on) { p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop'); }
    });
  }

  bricks.forEach(function (b) {
    b.addEventListener('click', function () {
      var already = b.getAttribute('aria-pressed') === 'true';
      show(already ? 'intro' : b.dataset.i);
    });
  });

  // ----- Tappable hero greeting -----
  var sticker = document.querySelector('button.hello');
  if (sticker) {
    var variants = Array.prototype.slice.call(sticker.querySelectorAll('.variant'));
    var cur = 0;
    sticker.addEventListener('click', function () {
      variants[cur].hidden = true;
      cur = (cur + 1) % variants.length;
      var v = variants[cur];
      v.hidden = false;
      v.classList.remove('in'); void v.offsetWidth; v.classList.add('in');
      sticker.setAttribute('aria-label', v.dataset.label + '. Tap to change language');
    });
  }

  // ----- Rotating greeting -----
  var greet = document.querySelector('.contact .greet');
  var note = document.querySelector('.greet-note');
  var data = document.getElementById('greetings');
  if (!greet || !data) return;
  var list = [];
  try { list = JSON.parse(data.textContent) || []; } catch (e) { list = []; }
  if (list.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var i = 0, paused = false;
  var box = greet.closest('.contact');
  var spell = document.querySelector('.contact .spell');
  var gbox = document.querySelector('.contact .greet-box');
  var hands = spell ? Array.prototype.slice.call(spell.querySelectorAll('img')) : [];
  box.addEventListener('mouseenter', function () { paused = true; });
  box.addEventListener('mouseleave', function () { paused = false; });
  box.addEventListener('focusin', function () { paused = true; });
  box.addEventListener('focusout', function () { paused = false; });

  var LETTER_MS = 650, HOLD_MS = 2600, SIGN_HOLD_MS = 1600;

  // Sign the word one handshape at a time in a single spot, like real fingerspelling.
  // A repeated letter (the second L) gets a small slide, the ASL convention for double letters.
  function sign(letters, done) {
    var caption = letters.map(function (c, k) { return '<span data-k="' + k + '">' + c.toUpperCase() + '</span>'; }).join('-');
    note.innerHTML = caption + ', fingerspelled in ASL';
    var marks = note.querySelectorAll('span[data-k]');
    var k = 0;
    (function step() {
      hands.forEach(function (h, j) { h.classList.toggle('on', j === k); h.classList.remove('double'); });
      for (var m = 0; m < marks.length; m++) marks[m].classList.toggle('now', m === k);
      if (k > 0 && letters[k] === letters[k - 1]) { void hands[k].offsetWidth; hands[k].classList.add('double'); }
      k++;
      if (k < letters.length) setTimeout(step, LETTER_MS);
      else setTimeout(function () {
        for (var m = 0; m < marks.length; m++) marks[m].classList.remove('now');
        done();
      }, SIGN_HOLD_MS);
    })();
  }

  function next() {
    if (paused || document.hidden) { setTimeout(next, 500); return; }
    i = (i + 1) % list.length;
    var item = list[i];
    var signed = !!(item.fingerspell && spell);
    greet.textContent = item.text;
    // A greeting with no subtext grows to fill both rows, so the frame doesn't look bare.
    if (gbox) gbox.classList.toggle('solo', !signed && !item.note);
    greet.hidden = signed;
    if (spell) spell.hidden = !signed;
    var shown = signed ? spell : greet;
    shown.classList.remove('swap'); void shown.offsetWidth; shown.classList.add('swap');
    if (signed) {
      sign(item.fingerspell, function () { setTimeout(next, 400); });
    } else {
      note.textContent = item.note || '\u00a0';
      setTimeout(next, HOLD_MS);
    }
  }
  setTimeout(next, HOLD_MS);
})();

// Highlight the section tab for whatever is on screen, show how far through it you are,
// and keep the active tab visible in the phone top bar.
(function () {
  var bar = document.querySelector('.bar-top, .bar-bottom, nav.side');
  var links = Array.prototype.slice.call(document.querySelectorAll('.sectionnav .tabs a[data-tab]'));
  if (!bar || !links.length) return;
  var sections = links.map(function (a) { return document.getElementById(a.dataset.tab); });
  if (sections.some(function (s) { return !s; })) return;
  var row = bar.querySelector('.tabs');
  var toggle = bar.querySelector('.cur-toggle');
  var label = toggle && toggle.querySelector('.cur-label');
  var num = toggle && toggle.querySelector('.cur-n');
  var current = null, ticking = false;

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.35, idx = 0;
    sections.forEach(function (s, i) { if (s.getBoundingClientRect().top <= line) idx = i; });
    var r = sections[idx].getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
    var doc = document.documentElement;
    var start = sections[0].getBoundingClientRect().top + window.scrollY - line;
    var page = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, doc.scrollHeight - window.innerHeight - start)));
    if (sections[0].getBoundingClientRect().top > line) { idx = -1; p = 0; }
    bar.style.setProperty('--page-p', page.toFixed(3));
    var id = idx < 0 ? null : sections[idx].id;
    links.forEach(function (a) {
      if (a.dataset.tab === id) { a.setAttribute('aria-current', 'true'); a.style.setProperty('--sec-p', p.toFixed(3)); }
      else { a.removeAttribute('aria-current'); a.style.removeProperty('--sec-p'); }
    });
    if (toggle) {
      toggle.style.setProperty('--sec-p', p.toFixed(3));
      var a = links[Math.max(0, idx)];
      label.textContent = a.textContent; num.textContent = Math.max(0, idx) + 1;
    }
    if (id !== current) {
      current = id;
      // Slide the tab row so the active tab sits in the middle (only matters when the row overflows).
      if (id && row && row.scrollWidth > row.clientWidth + 2) {
        var link = links[idx];
        row.scrollTo({ left: link.offsetLeft - row.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  if (toggle) {
    function setOpen(open) { bar.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); }
    toggle.addEventListener('click', function () { setOpen(!bar.classList.contains('open')); });
    links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('click', function (e) { if (!bar.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }
})();

// ----- Project carousels -----
// The track scrolls natively (swipe, trackpad, keyboard). This adds prev/next buttons that move one view at a time,
// arrow keys on the focused track, and dots that show which cards are in view.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('.carousel'), function (car) {
    var track = car.querySelector('.car-track');
    var slides = Array.prototype.slice.call(track.children);
    var controls = car.querySelector('.car-controls');
    var prev = car.querySelector('.car-prev');
    var next = car.querySelector('.car-next');
    var dots = Array.prototype.slice.call(car.querySelectorAll('.car-dots i'));
    if (!slides.length || !controls) return;
    controls.hidden = false;

    function step() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
    function perView() { return Math.max(1, Math.round((track.clientWidth + 1) / step())); }
    function go(dir) {
      var by = step() * (perView() > 1 ? perView() : 1);
      track.scrollBy({ left: dir * by, behavior: reduce ? 'auto' : 'smooth' });
    }
    function update() {
      var first = Math.round(track.scrollLeft / step());
      var max = track.scrollWidth - track.clientWidth - 2;
      var atEnd = track.scrollLeft >= max;
      var n = perView();
      if (atEnd) first = Math.max(0, slides.length - n);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd;
      dots.forEach(function (d, i) { d.classList.toggle('on', i >= first && i < first + n); });
      // Cards out of view stay reachable by Tab (focusing one scrolls it in), so nothing is hidden from screen readers.
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { e.preventDefault(); track.scrollTo({ left: 0 }); }
      else if (e.key === 'End') { e.preventDefault(); track.scrollTo({ left: track.scrollWidth }); }
    });
    var raf = 0;
    track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
