(function () {
  "use strict";
  var root = document.documentElement;
  var preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 1024px)");
  var hero = document.querySelector(".hero");
  var band = document.querySelector(".motion-band");
  var cards = document.querySelectorAll(".services .card");
  var services = document.querySelector(".services");
  var scene = document.querySelector(".scroll-scene");
  var steps = document.querySelectorAll(".scroll-scene .flow__step");
  var contact = document.querySelector(".contact");
  var queued = false;

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function visible(rect, height) { return rect.bottom > 0 && rect.top < height; }

  function update() {
    queued = false;
    var enabled = !preference.matches;
    root.classList.toggle("scroll-fx", enabled);
    if (!enabled || root.classList.contains("motion-paused")) return;
    var height = window.innerHeight;
    // Medimos primero y aplicamos estilos después para evitar recalcular el diseño por elemento.
    var heroRect = hero ? hero.getBoundingClientRect() : null;
    var bandRect = band ? band.getBoundingClientRect() : null;
    var servicesRect = services ? services.getBoundingClientRect() : null;
    var sceneRect = scene ? scene.getBoundingClientRect() : null;
    var contactRect = contact ? contact.getBoundingClientRect() : null;
    if (heroRect && visible(heroRect, height)) {
      var travel = clamp(-heroRect.top, 0, heroRect.height);
      hero.style.setProperty("--hero-text-y", (travel * .10).toFixed(2) + "px");
      hero.style.setProperty("--hero-art-y", (travel * .20).toFixed(2) + "px");
      hero.style.setProperty("--hero-art-angle", (travel * .008).toFixed(2) + "deg");
    }
    if (bandRect && visible(bandRect, height)) {
      var progress = clamp((height - bandRect.top) / (height + bandRect.height), 0, 1);
      band.style.setProperty("--band-shift", (-progress * (desktop.matches ? 280 : 100)).toFixed(2) + "px");
    }
    if (desktop.matches) {
      cards.forEach(function (card, index) {
        if (!servicesRect || !visible(servicesRect, height)) return;
        var offset = clamp((servicesRect.top - height * .35) / height, -.5, 1);
        card.style.setProperty("--card-y", (offset * (index % 2 ? 48 : -32)).toFixed(2) + "px");
      });
      if (sceneRect && visible(sceneRect, height)) {
        var sceneProgress = clamp((height * .28 - sceneRect.top) / Math.max(1, sceneRect.height - height * .65), 0, 1);
        scene.style.setProperty("--scene-progress", sceneProgress.toFixed(4));
        var current = Math.min(steps.length - 1, Math.floor(sceneProgress * steps.length));
        steps.forEach(function (step, index) {
          step.classList.toggle("is-current", index === current);
          step.classList.toggle("is-complete", index < current);
          step.style.setProperty("--link-progress", clamp(sceneProgress * steps.length - index, 0, 1).toFixed(4));
        });
      }
    }
    if (contactRect && visible(contactRect, height)) {
      var amount = clamp((height - contactRect.top) / (height + contactRect.height), 0, 1);
      contact.style.setProperty("--mark-y", (45 - amount * 90).toFixed(2) + "px");
      contact.style.setProperty("--mark-angle", (-10 + amount * 20).toFixed(2) + "deg");
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  preference.addEventListener("change", schedule);
  desktop.addEventListener("change", schedule);
  var toggle = document.querySelector(".motion-toggle");
  if (toggle) toggle.addEventListener("click", schedule);
  update();
})();
