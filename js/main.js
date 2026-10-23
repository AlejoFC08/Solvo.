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
    el.hidden = false;
  });

  document.querySelectorAll('[data-config="email"]').forEach(function (el) {
    if (!completo(config.email)) return;
    el.href = "mailto:" + config.email;
    el.hidden = false;
    var etiqueta = el.querySelector("[data-config-text]");
    if (etiqueta) etiqueta.textContent = config.email;
  });

  document.querySelectorAll('[data-config="instagram"]').forEach(function (el) {
    if (!completo(config.instagram)) return;
    var usuario = config.instagram.replace(/^@/, "");
    el.href = "https://www.instagram.com/" + usuario + "/";
    el.hidden = false;
  });

  /* ---------- Otros trabajos ---------- */
  var grilla = document.getElementById("trabajos-grilla");
  if (grilla && Array.isArray(config.trabajos)) {
    config.trabajos.forEach(function (t) {
      if (!t || !completo(t.cliente) || !completo(t.imagen) || t.imagen.indexOf("placeholder") !== -1) return;
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
    if (grilla.children.length) grilla.closest(".works").hidden = false;
  }

  /* ---------- Animaciones ---------- */
  var raiz = document.documentElement;
  var reducirMovimiento = false;
  var hayObserver = "IntersectionObserver" in window;

  // Luz localizada: acompaña el puntero sin mover el contenido de las tarjetas.
  if (!reducirMovimiento && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".services .card").forEach(function (card) {
      var pendiente = false;
      var x = 0;
      var y = 0;
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        if (pendiente) return;
        pendiente = true;
        window.requestAnimationFrame(function () {
          card.style.setProperty("--spot-x", x + "px");
          card.style.setProperty("--spot-y", y + "px");
          pendiente = false;
        });
      });
    });
  }

  // Aparición de bloques al llegar a la vista
  var animables = document.querySelectorAll("[data-reveal]");

  function mostrar(el) {
    el.classList.add("is-visible");
    // Terminada la entrada, quitamos la demora para que el hover responda al instante.
    setTimeout(function () {
      el.classList.add("is-done");
    }, 1400);
  }

  if (reducirMovimiento || !hayObserver) {
    animables.forEach(mostrar);
  } else {
    raiz.classList.add("reveal-ready");
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        mostrar(entrada.target);
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    animables.forEach(function (el) {
      observador.observe(el);
    });
    // El teclado debe poder llegar al contenido aunque todavía no haya entrado en vista.
    document.addEventListener("focusin", function (event) {
      var bloque = event.target.closest("[data-reveal]");
      if (bloque) mostrar(bloque);
    });
  }

  // Encabezado: fondo al bajar y barra de progreso de lectura
  var header = document.querySelector(".site-header");
  var scrollPendiente = false;

  function actualizarHeader() {
    scrollPendiente = false;
    var y = window.scrollY;
    var max = raiz.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 8);
    header.style.setProperty("--progress", max > 0 ? Math.min(y / max, 1).toFixed(4) : "0");
  }

  if (header) {
    window.addEventListener("scroll", function () {
      if (scrollPendiente) return;
      scrollPendiente = true;
      window.requestAnimationFrame(actualizarHeader);
    }, { passive: true });
    actualizarHeader();
  }

  // Menú: marca la sección que se está viendo
  if (hayObserver) {
    var enlacesMenu = {};
    document.querySelectorAll('.nav-list a[href^="#"]').forEach(function (a) {
      enlacesMenu[a.getAttribute("href").slice(1)] = a;
    });

    var espia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        Object.keys(enlacesMenu).forEach(function (id) {
          enlacesMenu[id].classList.remove("is-active");
          enlacesMenu[id].removeAttribute("aria-current");
        });
        var activo = enlacesMenu[entrada.target.id];
        if (activo) {
          activo.classList.add("is-active");
          activo.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main > section[id]").forEach(function (seccion) {
      espia.observe(seccion);
    });
  }

  // Hero: inclinación sutil de la ilustración con el mouse
  var hero = document.querySelector(".hero");
  var visual = document.querySelector(".hero__visual");
  var arte = document.querySelector(".hero-art");
  if (hero && visual && !reducirMovimiento && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      visual.style.setProperty("--px", ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      visual.style.setProperty("--py", ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    });
    hero.addEventListener("pointerleave", function () {
      visual.style.setProperty("--px", "0");
      visual.style.setProperty("--py", "0");
    });
  }

  // Hero: pausa las animaciones continuas cuando no está en pantalla
  if (arte && arte.pauseAnimations) {
    if (reducirMovimiento) {
      arte.pauseAnimations();
    } else if (hayObserver) {
      new IntersectionObserver(function (entradas) {
        var visible = entradas[0].isIntersecting;
        hero.classList.toggle("is-paused", !visible);
        if (visible && !raiz.classList.contains("motion-paused")) {
          arte.unpauseAnimations();
        } else {
          arte.pauseAnimations();
        }
      }).observe(hero);
    }
  }
})();
