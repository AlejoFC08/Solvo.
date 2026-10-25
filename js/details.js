(function () {
  "use strict";
  var root = document.documentElement;
  var elements = document.querySelectorAll(".home-featured, .home-webs > a, .home-process-list > li");
  if (!elements.length) return;
  if (!("IntersectionObserver" in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("polish-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
  elements.forEach(function (element, index) {
    element.setAttribute("data-polish", "");
    element.style.setProperty("--polish-order", String(index % 3));
    observer.observe(element);
  });
  root.classList.add("polish-ready");
  document.addEventListener("focusin", function (event) {
    var element = event.target.closest("[data-polish]");
    if (element) element.classList.add("polish-visible");
  });
})();
