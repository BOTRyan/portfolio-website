let menuButton;
let menu;
let backdrop;

async function loadHeader() {
    const response = await fetch('/controls/header.html');
    const html = await response.text();

    const header = document.getElementById("header");
    header.replaceChildren();
    header.insertAdjacentHTML("beforeend", html);

    requestAnimationFrame(() => {
        initializeHeader();
    });
}

loadHeader();

function initializeHeader() {
    highlightActivePage();

    menuButton = document.querySelector(".header-menu-button");
    menu = document.querySelector(".header-mobile-menu");
    backdrop = document.querySelector(".header-mobile-backdrop");

    const desktopMediaQuery = window.matchMedia("(min-width: 769px)");

    desktopMediaQuery.addEventListener("change", event => {
        if (event.matches) {
            closeMenu();
        }
    });

    menuButton.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    menu.inert = true;
    setPageInert(false);

    menuButton.setAttribute("aria-expanded", "false");
}

function highlightActivePage() {
    const normalize = path => {
        if (path !== "/" && path.endsWith("/")) {
            return path.slice(0, -1);
        }
        return path;
    };

    const currentPath = normalize(window.location.pathname);
    document.querySelectorAll(".header-menu-option").forEach(link => {
        const linkPath = normalize(new URL(link.href).pathname);

        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
}

function toggleMenu() {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
}

function openMenu() {
    menu.classList.add("is-open");
    menu.inert = false;
    backdrop.classList.add("is-open");
    menuButton.classList.add("is-open");
    setPageInert(true);
    menuButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    menu.classList.remove("is-open");
    menu.inert = true;
    backdrop.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    setPageInert(false);
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

function setPageInert(state) {
    document.querySelector("main")?.toggleAttribute("inert", state);
    document.querySelector("footer")?.toggleAttribute("inert", state);
    document.querySelector(".header-skip-link")?.toggleAttribute("inert", state);
}
