(function () {
  "use strict";
  var id = String((window.SOLVO_CONFIG || {}).analyticsId || "").trim();
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  var enabled = false;
  var panel;
  var allowed = ["solvo_page_view", "solvo_service_select", "solvo_project_open", "solvo_demo_start", "solvo_demo_step", "solvo_contact_click"];
  function preference(value) {
    try { if (value) window.localStorage.setItem("solvo_analytics",value); return window.localStorage.getItem("solvo_analytics"); } catch (error) { return null; }
  }
  function send(name, detail) {
    if (!enabled) return;
    var data = {};
    ["service", "channel", "project", "step"].forEach(function (key) {
      if (detail && detail[key] !== undefined) data[key] = detail[key];
    });
    window.gtag("event", name === "solvo_page_view" ? "page_view" : name, data);
  }
  function enable() {
    if (enabled) return;
    enabled = true;
    window["ga-disable-" + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false, page_location:window.location.origin + window.location.pathname });
    if (!document.querySelector("script[data-solvo-analytics]")) {
      var script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
      script.setAttribute("data-solvo-analytics", "");
      document.head.appendChild(script);
    }
    send("solvo_page_view");
  }
  function choose(value) {
    preference(value);
    if (value === "yes") enable();
    else { enabled = false; window["ga-disable-" + id] = true; }
    panel.hidden = true;
  }
  panel = document.createElement("aside");
  panel.className = "analytics-choice";
  panel.setAttribute("aria-label", "Preferencias de estadísticas");
  panel.innerHTML = '<p>¿Nos ayudás a mejorar Solvik? Podemos medir visitas y clics con Google Analytics. No incluimos el contenido de tu consulta ni tus datos de contacto.</p><div class="actions"><button type="button" data-choice="yes">Permitir estadísticas</button><button type="button" data-choice="no">Ahora no</button></div>';
  panel.querySelectorAll("button").forEach(function (button) { button.addEventListener("click",function () { choose(button.getAttribute("data-choice")); }); });
  var stored = preference();
  panel.hidden = stored === "yes" || stored === "no";
  document.body.appendChild(panel);
  if (stored === "yes") enable();
  var footer = document.querySelector(".site-footer .container");
  if (footer) {
    var settings = document.createElement("button");
    settings.type = "button"; settings.className = "analytics-preferences"; settings.textContent = "Preferencias de estadísticas";
    settings.addEventListener("click",function () { panel.hidden = false; panel.querySelector("button").focus(); });
    footer.appendChild(settings);
  }
  window.addEventListener("solvo:analytics",function (event) {
    if (!event.detail || typeof event.detail.event !== "string") return;
    if (allowed.indexOf(event.detail.event) === -1 || event.detail.event === "solvo_page_view") return;
    send(event.detail.event,event.detail);
  });
})();
