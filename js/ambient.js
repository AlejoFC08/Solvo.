(function () {
  "use strict";
  var hero = document.querySelector(".home .hero");
  if (!hero) return;
  var canvas = document.createElement("canvas");
  canvas.className = "ambient-canvas";
  canvas.setAttribute("aria-hidden", "true");
  hero.prepend(canvas);
  var ctx = canvas.getContext("2d");
  if (!ctx) return;
  var small = window.matchMedia("(max-width: 767px)");
  var width = 0, height = 0, pageTop = 0, frame = 0, last = 0;
  var visible = false;
  var elapsed = 0;
  var points = [];
  for (var i = 0; i < 26; i++) {
    points.push({ x: (i * .61803398875) % 1, y: (i * .381966 + .16) % 1, phase: i * 1.7 });
  }
  function measure() {
    var rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    pageTop = rect.top + window.scrollY;
    var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function draw(time) {
    frame = 0;
    if (!visible || document.hidden) return;
    var limit = small.matches ? 50 : 33;
    if (last && time - last < limit) { frame = window.requestAnimationFrame(draw); return; }
    elapsed += last ? Math.min(time - last, 100) : 0;
    last = time;
    var t = elapsed / 1000;
    var scroll = Math.max(0, window.scrollY - pageTop);
    ctx.clearRect(0, 0, width, height);
    var count = small.matches ? 15 : points.length;
    var positions = [];
    for (var j = 0; j < count; j++) {
      var p = points[j];
      var x = p.x * width + Math.sin(t * .23 + p.phase) * 24;
      var y = ((p.y * height + Math.cos(t * .18 + p.phase) * 22 + scroll * (j % 2 ? .12 : -.08)) % height + height) % height;
      positions.push({ x:x, y:y });
      ctx.fillStyle = j % 3 ? "rgba(155,191,255,.48)" : "rgba(216,232,255,.8)";
      ctx.beginPath(); ctx.arc(x, y, j % 3 ? 1.5 : 2.5, 0, Math.PI * 2); ctx.fill();
      if (j % 6 === 0) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(t * .12 + p.phase);
        ctx.strokeStyle = "rgba(160,193,255,.3)";
        ctx.strokeRect(-7,-7,14,14); ctx.restore();
      }
      if (j > 0) {
        var previous = positions[j - 1];
        var distance = Math.hypot(x - previous.x, y - previous.y);
        if (distance < 200) {
          ctx.strokeStyle = "rgba(140,181,255," + ((1 - distance / 200) * .25) + ")";
          ctx.beginPath(); ctx.moveTo(previous.x,previous.y); ctx.lineTo(x,y); ctx.stroke();
        }
      }
    }
    frame = window.requestAnimationFrame(draw);
  }
  function start() {
    if (visible && !document.hidden && !frame) { last = 0; frame = window.requestAnimationFrame(draw); }
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else { window.cancelAnimationFrame(frame); frame = 0; }
    }).observe(hero);
  } else { visible = true; }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { window.cancelAnimationFrame(frame); frame = 0; }
    else start();
  });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  measure(); start();

  // Indicadores decorativos: no agregan texto ni altura a las tarjetas.
  document.querySelectorAll(".home-services .card:not(.offer)").forEach(function (card, index) {
    var symbol = document.createElement("span");
    symbol.className = "ambient-symbol ambient-symbol--" + index;
    symbol.setAttribute("aria-hidden", "true");
    card.appendChild(symbol);
  });
  var offers = document.querySelectorAll(".offer");
  if ("IntersectionObserver" in window) {
    var offersObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("offer-in-view", entry.isIntersecting);
      });
    });
    offers.forEach(function (offer) { offersObserver.observe(offer); });
  } else {
    offers.forEach(function (offer) { offer.classList.add("offer-in-view"); });
  }
})();
