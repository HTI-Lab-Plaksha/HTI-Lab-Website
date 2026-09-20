
/* =========================================================
   HTI LAB — THEME (light / dark)
   Load this in <head> on every page (no "defer"), so the
   saved theme is applied before the page paints.
========================================================= */

(function () {

    var KEY = "hti-theme";
    var root = document.documentElement;
    var media = window.matchMedia("(prefers-color-scheme: dark)");

    function saved() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function apply(theme) {
        root.setAttribute("data-theme", theme);

        var buttons = document.querySelectorAll(".theme-toggle");
        buttons.forEach(function (btn) {
            btn.setAttribute("aria-pressed", theme === "dark");
            btn.setAttribute(
                "aria-label",
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            );
        });
    }

    // 1. Saved choice  2. Device setting  3. Light
    apply(saved() || (media.matches ? "dark" : "light"));

    // Toggle on click (works for buttons added later too)
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".theme-toggle")) return;

        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);

        try { localStorage.setItem(KEY, next); } catch (e) {}
    });

    // Follow the device setting until the visitor picks a theme manually
    media.addEventListener("change", function (e) {
        if (!saved()) apply(e.matches ? "dark" : "light");
    });

    // Sync button state once the page has loaded
    document.addEventListener("DOMContentLoaded", function () {
        apply(root.getAttribute("data-theme"));
    });

})();
