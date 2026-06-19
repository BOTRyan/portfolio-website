    const menuButton = document.querySelector(".header-menu-button");
    const menu = document.querySelector(".header-mobile-menu");
    const backdrop = document.querySelector(".header-mobile-backdrop");
    const desktopMediaQuery = window.matchMedia("(min-width: 768px)");

    desktopMediaQuery.addEventListener("change", event => {
        if (event.matches) {
            closeMenu();
        }
    });

    menuButton.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", closeMenu);

    function toggleMenu() {
        menu.classList.contains("is-open") ? closeMenu() : openMenu();
    }

    function openMenu() {
        menu.classList.add("is-open");
        backdrop.classList.add("is-open");
        menuButton.classList.add("is-open");

        document.querySelector("main").inert = true;
        document.querySelector("footer").inert = true;

        menuButton.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menu.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        menuButton.classList.remove("is-open");

        document.querySelector("main").inert = false;
        document.querySelector("footer").inert = false;

        menuButton.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
