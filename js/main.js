/* =========================================================
   BSGA CONSULTING
   GLOBAL JAVASCRIPT
   Main Navigation
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNav =
        document.querySelector(".mobile-nav");


    /* -----------------------------------------------------
       Stop if the global navigation is not present
    ----------------------------------------------------- */

    if (!menuToggle || !mobileNav) {
        return;
    }


    /* =====================================================
       OPEN / CLOSE MENU
    ===================================================== */

    function openMenu() {

        mobileNav.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    function closeMenu() {

        mobileNav.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    function toggleMenu() {

        const isOpen =
            mobileNav.classList.contains("open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    /* =====================================================
       MENU BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    /* =====================================================
       CLOSE AFTER CLICKING A LINK
    ===================================================== */

    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE THE MENU
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideMenu =
                mobileNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                mobileNav.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       CLOSE WITH ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileNav.classList.contains("open")
            ) {

                closeMenu();

                menuToggle.focus();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        }
    );


});
