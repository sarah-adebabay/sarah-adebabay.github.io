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
