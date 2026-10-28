(function () {
  "use strict";
  // Conserva los enlaces compartidos antes de separar el portfolio del inicio.
  if (document.body.classList.contains("home") && ["#casos", "#demo-titulo", "#herramientas-titulo", "#preguntas"].indexOf(window.location.hash) !== -1) {
    window.location.replace("proyectos.html" + window.location.hash);
    return;
  }
  var config = window.SOLVO_CONFIG || {};
  var selectedService = "general";
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
    photo.alt = config.nombre ? "Retrato de " + config.nombre : "La persona detrás de Enodo";
  }
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var service = link.getAttribute("data-service");
      selectedService = service;
      var message = service === "web" ? "Hola Enodo, necesito una página web para mi negocio." : "Hola Enodo, quiero automatizar una tarea de mi negocio.";
      var choice = document.getElementById("contact-choice");
      if (choice) { choice.textContent = service === "web" ? "Hablemos de tu próxima web." : "Hablemos de la tarea que querés simplificar."; choice.hidden = false; }
      document.querySelectorAll('#contacto [data-config="whatsapp"]').forEach(function (contact) {
        if (contact.hidden) return;
        var number = String(config.whatsapp || "").replace(/\D/g, "");
        if (number) contact.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
      });
      var email = document.querySelector('#contacto [data-config="email"]');
      if (email) email.href = "mailto:" + config.email + "?subject=" + encodeURIComponent(service === "web" ? "Consulta por desarrollo web · Enodo" : "Consulta por automatización · Enodo");
      track("solvo_service_select", { service: service });
    });
  });
  document.querySelectorAll("a[data-config]").forEach(function (link) {
    link.addEventListener("click", function () {
      track("solvo_contact_click", { channel: link.getAttribute("data-config"), service: link.closest("#contacto") ? selectedService : "general" });
    });
  });
  var next = document.getElementById("demo-next");
  var step = 0;
  var titles = ["01 / Archivo de ejemplo", "02 / Preparación y revisión", "03 / Envío simulado", "04 / Historial simulado"];
  var statuses = ["Empezá para ver cómo un archivo se convierte en tres recibos individuales.", "Antes de enviar, se revisan personas, períodos, páginas y correos. Este ejemplo no procesa archivos reales.", "En el sistema real, una persona revisa el resumen y confirma el envío. En esta demostración no se envió ningún mail.", "Ejemplo ficticio de historial: dos envíos aceptados y uno pendiente. Un envío aceptado no confirma lectura ni recepción."];
  var buttons = ["Iniciar demostración", "Confirmar envío simulado", "Ver historial", "Reiniciar demostración"];
  if (next) next.addEventListener("click", function () {
    step = (step + 1) % 4;
    document.getElementById("demo-step").textContent = titles[step];
    document.getElementById("demo-status").textContent = statuses[step];
    next.textContent = buttons[step];
    document.querySelector(".demo-document").hidden = step !== 0;
    document.getElementById("demo-records").hidden = step === 0;
    document.querySelectorAll(".demo-records li").forEach(function (row, index) {
      row.querySelector("strong").textContent = step === 3 ? (index < 2 ? "Aceptado · ejemplo" : "Pendiente · ejemplo") : step === 2 ? "Envío simulado" : "Para revisar";
      row.classList.remove("demo-updated");
      window.requestAnimationFrame(function () { row.classList.add("demo-updated"); });
    });
    track(step === 1 ? "solvo_demo_start" : "solvo_demo_step", { step: step });
  });
})();
