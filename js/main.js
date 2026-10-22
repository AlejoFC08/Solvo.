(function () {
  "use strict";

  var config = window.SOLVO_CONFIG || {};

  function completo(valor) {
    return typeof valor === "string" && valor.trim() !== "" && valor.indexOf("[COMPLETAR]") === -1;
  }

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");

  function cerrarMenu(devolverFoco) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    menu.classList.remove("is-open");
    if (devolverFoco) toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var abierto = toggle.getAttribute("aria-expanded") === "true";
      if (abierto) {
        cerrarMenu(false);
      } else {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Cerrar menú");
        menu.classList.add("is-open");
      }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) cerrarMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) cerrarMenu(true);
    });

    // Si se agranda la pantalla con el menú abierto, lo cerramos.
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (mq) {
      if (mq.matches) cerrarMenu(false);
    });
  }

  /* ---------- Datos de contacto ---------- */
  document.querySelectorAll('[data-config="whatsapp"]').forEach(function (el) {
    if (!completo(config.whatsapp)) return;
    var numero = config.whatsapp.replace(/\D/g, "");
    var texto = config.whatsappMensaje ? "?text=" + encodeURIComponent(config.whatsappMensaje) : "";
    el.href = "https://wa.me/" + numero + texto;
  });

  document.querySelectorAll('[data-config="email"]').forEach(function (el) {
    if (!completo(config.email)) return;
    el.href = "mailto:" + config.email;
    var etiqueta = el.querySelector("[data-config-text]");
    if (etiqueta) etiqueta.textContent = config.email;
  });

  document.querySelectorAll('[data-config="instagram"]').forEach(function (el) {
    if (!completo(config.instagram)) return;
    var usuario = config.instagram.replace(/^@/, "");
    el.href = "https://www.instagram.com/" + usuario + "/";
  });

  /* ---------- Otros trabajos ---------- */
  var grilla = document.getElementById("trabajos-grilla");
  if (grilla && Array.isArray(config.trabajos)) {
    config.trabajos.forEach(function (t) {
      var li = document.createElement("li");
      li.className = "work-card";

      var img = document.createElement("img");
      img.src = t.imagen;
      img.alt = "Captura de la página web de " + t.cliente;
      img.width = 800;
      img.height = 500;
      img.loading = "lazy";
      img.decoding = "async";

      var cuerpo = document.createElement("div");
      cuerpo.className = "work-card__body";

      var nombre = document.createElement("h4");
      nombre.className = "work-card__name";
      if (completo(t.url)) {
        var link = document.createElement("a");
        link.href = t.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = t.cliente;
        nombre.appendChild(link);
      } else {
        nombre.textContent = t.cliente;
      }

      var tipo = document.createElement("p");
      tipo.className = "work-card__type";
      tipo.textContent = t.tipo || "Página web";

      cuerpo.appendChild(nombre);
      cuerpo.appendChild(tipo);
      li.appendChild(img);
      li.appendChild(cuerpo);
      grilla.appendChild(li);
    });
  }
})();
