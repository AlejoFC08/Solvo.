(function () {
  "use strict";
  var root = document.documentElement;
  var desktop = window.matchMedia("(min-width: 1024px)");
  var hero = document.querySelector(".hero");
  var band = document.querySelector(".motion-band");
  var cards = document.querySelectorAll(".services .card");
  var services = document.querySelector(".services");
  var scene = document.querySelector(".scroll-scene");
  var steps = document.querySelectorAll(".scroll-scene .flow__step");
  var contact = document.querySelector(".contact");
  var queued = false;
  var entrances = Array.prototype.map.call(document.querySelectorAll('.section h2, .services .card, .about, .compare__card, .steps .step, .trust__item, .faq-list'), function (element, index) {
    element.setAttribute("data-scroll-entry", "");
    return { element: element, previousY: 0, direction: index % 2 ? 1 : -1 };
  });

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function visible(rect, height) { return rect.bottom > 0 && rect.top < height; }

  function update() {
    queued = false;
    root.classList.add("scroll-fx", "motion-enabled");
    var height = window.innerHeight;
    // Medimos primero y aplicamos estilos después para evitar recalcular el diseño por elemento.
    var heroRect = hero ? hero.getBoundingClientRect() : null;
    var bandRect = band ? band.getBoundingClientRect() : null;
    var servicesRect = services ? services.getBoundingClientRect() : null;
    var sceneRect = scene ? scene.getBoundingClientRect() : null;
    var contactRect = contact ? contact.getBoundingClientRect() : null;
    var entranceRects = entrances.map(function (entry) { return entry.element.getBoundingClientRect(); });
    entrances.forEach(function (entry, index) {
      var top = entranceRects[index].top - entry.previousY;
      var progress = clamp((height * .98 - top) / (height * .43), 0, 1);
      var remaining = Math.pow(1 - progress, 2);
      var distance = remaining * 72;
      entry.previousY = distance;
      entry.element.style.setProperty("--entry-y", distance.toFixed(2) + "px");
      entry.element.style.setProperty("--entry-x", (remaining * entry.direction * 48).toFixed(2) + "px");
      entry.element.style.setProperty("--entry-opacity", (.25 + progress * .75).toFixed(3));
      entry.element.style.setProperty("--entry-scale", (.94 + progress * .06).toFixed(4));
    });
    if (heroRect && visible(heroRect, height)) {
      var travel = clamp(-heroRect.top, 0, heroRect.height);
      hero.style.setProperty("--hero-text-y", (travel * .10).toFixed(2) + "px");
      hero.style.setProperty("--hero-art-y", (travel * .20).toFixed(2) + "px");
      hero.style.setProperty("--hero-art-angle", (travel * .008).toFixed(2) + "deg");
    }
    if (bandRect && visible(bandRect, height)) {
      var progress = clamp((height - bandRect.top) / (height + bandRect.height), 0, 1);
      band.style.setProperty("--band-shift", (-progress * (desktop.matches ? 480 : 240)).toFixed(2) + "px");
    }
      cards.forEach(function (card, index) {
        if (!servicesRect || !visible(servicesRect, height)) return;
        var offset = clamp((servicesRect.top - height * .35) / height, -.5, 1);
        card.style.setProperty("--card-y", (offset * (index % 2 ? 64 : -48)).toFixed(2) + "px");
      });
      if (sceneRect && visible(sceneRect, height)) {
        var sceneProgress = desktop.matches
          ? clamp((height * .28 - sceneRect.top) / Math.max(1, sceneRect.height - height * .65), 0, 1)
          : clamp((height * .72 - sceneRect.top) / Math.max(1, sceneRect.height * .8), 0, 1);
        scene.style.setProperty("--scene-progress", sceneProgress.toFixed(4));
        var current = Math.min(steps.length - 1, Math.floor(sceneProgress * steps.length));
        steps.forEach(function (step, index) {
          step.classList.toggle("is-current", index === current);
          step.classList.toggle("is-complete", index < current);
          step.style.setProperty("--link-progress", clamp(sceneProgress * steps.length - index, 0, 1).toFixed(4));
        });
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
  desktop.addEventListener("change", schedule);
  update();
})();
