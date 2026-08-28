/* =========================================================
   BSGA CONSULTING
   GLOBAL JAVASCRIPT
   Version: 2026
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileNavigation();
    initSmoothAnchors();
    initExternalLinks();
    initHeaderState();

});


/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (!menuToggle || !mobileNav) {
        return;
    }


    const closeMenu = () => {

        menuToggle.classList.remove("is-open");

        mobileNav.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("mobile-menu-open");

    };


    const openMenu = () => {

        menuToggle.classList.add("is-open");

        mobileNav.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("mobile-menu-open");

    };


    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close when selecting a navigation link */

    mobileNav
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


    /* Close with Escape */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* Close when clicking outside the menu */

    document.addEventListener("click", (event) => {

        if (
            !mobileNav.classList.contains("is-open") ||
            menuToggle.contains(event.target) ||
            mobileNav.contains(event.target)
        ) {
            return;
        }

        closeMenu();

    });


    /* Reset mobile navigation when returning to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 780) {
            closeMenu();
        }

    });

}


/* =========================================================
   03. SMOOTH INTERNAL ANCHORS
========================================================= */

function initSmoothAnchors() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    if (!links.length) {
        return;
    }


    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            /*
             * Keep the URL anchor without forcing
             * an abrupt browser jump.
             */

            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });

}


/* =========================================================
   04. EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

    const currentHost =
        window.location.hostname;

    const links =
        document.querySelectorAll("a[href]");


    links.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        /*
         * Ignore:
         * - mailto:
         * - tel:
         * - anchors
         * - relative links
         */

        if (
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }


        let url;

        try {

            url = new URL(
                href,
                window.location.href
            );

        } catch {
            return;
        }


        /*
         * Only process genuinely external URLs.
         */

        if (
            url.hostname &&
            url.hostname !== currentHost
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });

}


/* =========================================================
   05. HEADER SCROLL STATE
========================================================= */

function initHeaderState() {

    const header =
        document.querySelector(".site-header");

    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (window.scrollY > 20) {

                header.classList.add(
                    "is-scrolled"
                );

            } else {

                header.classList.remove(
                    "is-scrolled"
                );

            }

        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   06. CURRENT PAGE NAVIGATION
========================================================= */

function setCurrentNavigation() {

    const currentPath =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation a, .mobile-nav a"
        );


    navigationLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        /*
         * Ignore external links, email and telephone.
         */

        if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("#")
        ) {
            return;
        }


        const linkPath =
            href.split("/").pop() || "index.html";


        if (linkPath === currentPath) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.classList.remove("active");

            if (
                link.getAttribute("aria-current") === "page"
            ) {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }

    });

}


/* =========================================================
   07. INITIALISE CURRENT NAVIGATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    setCurrentNavigation
);
