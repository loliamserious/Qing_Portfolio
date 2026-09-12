(function () {
  var KEY = "portfolio-lang";

  function currentLang() {
    return document.documentElement.getAttribute("data-lang") === "zh" ? "zh" : "en";
  }

  function applyAttrs(lang) {
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(" ").forEach(function (attr) {
        var val = el.getAttribute("data-" + lang + "-" + attr);
        if (val !== null) el.setAttribute(attr, val);
      });
    });
    var metaDesc = document.querySelector('meta[name="description"][data-en]');
    if (metaDesc) metaDesc.setAttribute("content", metaDesc.getAttribute("data-" + lang));
    var titleTag = document.querySelector("title[data-en]");
    if (titleTag) document.title = titleTag.getAttribute("data-" + lang);
  }

  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    applyAttrs(lang);
    document.querySelectorAll("[data-i18n-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-i18n-lang") !== lang;
    });
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang-btn"));
    });
  });

  setLang(currentLang());
})();
