(function () {
  "use strict";
  var config = window.SOLVO_CONFIG || {};
  // Punto de integración: los eventos solo se envían si existe una herramienta de medición conectada.
  function track(name, details) {
    var payload = Object.assign({ event: name }, details || {});
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent("solvo:analytics", { detail: payload }));
  }
  track("solvo_page_view");
  document.querySelectorAll('.projects a[target="_blank"]').forEach(function (link) {
    link.addEventListener("click", function () {
      var card = link.closest(".work-card");
      var name = card && card.querySelector(".work-card__name");
      track("solvo_project_open", { project: name ? name.textContent.trim() : "" });
    });
  });
  var profile = document.querySelector("[data-profile-name]");
  var photo = document.querySelector("[data-profile-photo]");
  if (profile && typeof config.nombre === "string" && config.nombre.trim()) {
    profile.textContent = config.nombre.trim();
    profile.hidden = false;
  }
  if (photo && typeof config.foto === "string" && /^assets\/[a-zA-Z0-9_./-]+\.(webp|png|jpe?g)$/i.test(config.foto)) {
    photo.addEventListener("load", function () { photo.hidden = false; });
    photo.src = config.foto;
    photo.alt = config.nombre ? "Retrato de " + config.nombre : "La persona detrás de Solvo";
  }
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var service = link.getAttribute("data-service");
      var message = service === "web" ? "Hola Solvo, necesito una página web para mi negocio." : "Hola Solvo, quiero automatizar una tarea de mi negocio.";
      var choice = document.getElementById("contact-choice");
      if (choice) { choice.textContent = service === "web" ? "Hablemos de tu próxima web." : "Hablemos de la tarea que querés simplificar."; choice.hidden = false; }
      document.querySelectorAll('[data-config="whatsapp"]').forEach(function (contact) {
        if (contact.hidden) return;
        var number = String(config.whatsapp || "").replace(/\D/g, "");
        if (number) contact.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
      });
      track("solvo_service_select", { service: service });
    });
  });
  document.querySelectorAll("a[data-config]").forEach(function (link) {
    link.addEventListener("click", function () { track("solvo_contact_click", { channel: link.getAttribute("data-config") }); });
  });
  var next = document.getElementById("demo-next");
  var step = 0;
  var titles = ["01 / Archivo de ejemplo", "02 / Recibos separados", "03 / Envío simulado", "04 / Recepción simulada"];
  var statuses = ["Empezá para ver cómo un archivo se convierte en tres recibos individuales.", "Cada persona tiene su recibo individual. Este ejemplo no procesa archivos reales.", "En el sistema real, cada recibo se envía a su destinatario. En esta demostración no se envió ningún mail.", "Ejemplo de seguimiento: dos personas confirmaron y una sigue pendiente. Todos los datos son ficticios."];
  var buttons = ["Iniciar demostración", "Simular envío", "Ver confirmaciones", "Reiniciar demostración"];
  if (next) next.addEventListener("click", function () {
    step = (step + 1) % 4;
    document.getElementById("demo-step").textContent = titles[step];
    document.getElementById("demo-status").textContent = statuses[step];
    next.textContent = buttons[step];
    document.querySelector(".demo-document").hidden = step !== 0;
    document.getElementById("demo-records").hidden = step === 0;
    document.querySelectorAll(".demo-records li").forEach(function (row, index) {
      row.querySelector("strong").textContent = step === 3 ? (index < 2 ? "Confirmado" : "Sin confirmar") : step === 2 ? "Envío simulado" : "Separado";
      row.classList.remove("demo-updated");
      window.requestAnimationFrame(function () { row.classList.add("demo-updated"); });
    });
    track(step === 1 ? "solvo_demo_start" : "solvo_demo_step", { step: step });
  });
})();
