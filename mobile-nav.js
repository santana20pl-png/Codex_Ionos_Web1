(function () {

  function initMobileNav() {

    const menu = document.querySelector(".nav");
    const oldToggle = document.querySelector(".menu-toggle");

    if (!menu || !oldToggle) return;

    // Sustituye el botón para eliminar listeners anteriores
    const menuToggle = oldToggle.cloneNode(true);
    oldToggle.replaceWith(menuToggle);

    function closeMenu() {
      menu.classList.remove("open");
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const open = !menu.classList.contains("open");

      menu.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    // Limpiar botones + anteriores
    menu.querySelectorAll(".mobile-submenu-toggle").forEach(function (button) {
      button.remove();
    });

    // Crear acordeones
    menu.querySelectorAll(".nav-group").forEach(function (group) {

      const submenu = group.querySelector(":scope > .submenu");

      if (!submenu) return;

      const button = document.createElement("button");

      button.type = "button";
      button.className = "mobile-submenu-toggle";
      button.innerHTML = "+";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Untermenü öffnen");

      group.appendChild(button);

      button.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const open = !group.classList.contains("mobile-submenu-open");

        menu.querySelectorAll(".nav-group.mobile-submenu-open").forEach(function (other) {
          if (other !== group) {
            other.classList.remove("mobile-submenu-open");

            const otherButton =
              other.querySelector(":scope > .mobile-submenu-toggle");

            if (otherButton) {
              otherButton.setAttribute("aria-expanded", "false");
            }
          }
        });

        group.classList.toggle("mobile-submenu-open", open);
        button.setAttribute("aria-expanded", String(open));
      });

    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }

})();
