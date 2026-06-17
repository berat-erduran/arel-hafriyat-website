document.addEventListener("DOMContentLoaded", function () {
  var nav = document.getElementById("tmNav");
  if (!nav) {
    return;
  }

  var collapse = nav.querySelector("#navbarSupportedContent");
  var toggler = nav.querySelector(".navbar-toggler");
  var closeBtn = nav.querySelector(".tm-mobile-menu-close");
  var dropdownItems = Array.prototype.slice.call(nav.querySelectorAll(".tm-nav-dropdown"));

  function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function setDropdownState(item, open) {
    var toggle = item.querySelector(".tm-nav-dropdown-toggle");
    if (!toggle) {
      return;
    }

    item.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      setDropdownState(item, false);
    });
  }

  document.addEventListener(
    "click",
    function (e) {
      var toggle = e.target.closest(".tm-nav-dropdown-toggle");
      if (!toggle || !nav.contains(toggle)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      var parentItem = toggle.closest(".tm-nav-dropdown");
      if (!parentItem) {
        return;
      }

      var isOpen = parentItem.classList.contains("is-open");

      if (!isMobile()) {
        closeAllDropdowns();
      }

      setDropdownState(parentItem, !isOpen);
    },
    true
  );

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  if (closeBtn && collapse) {
    closeBtn.addEventListener("click", function () {
      collapse.classList.remove("show");
      closeAllDropdowns();
      if (toggler) {
        toggler.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (collapse) {
    collapse.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link || link.classList.contains("tm-nav-dropdown-toggle")) {
        return;
      }

      if (isMobile()) {
        collapse.classList.remove("show");
        closeAllDropdowns();
        if (toggler) {
          toggler.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      if (collapse) {
        collapse.classList.remove("show");
      }
      if (toggler) {
        toggler.setAttribute("aria-expanded", "false");
      }
      closeAllDropdowns();
    }
  });
});
