/* =========================================================
   BSGA CONSULTING
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   HEADER SCROLL
   ========================================================= */

const header = document.querySelector(".site-header");

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

updateHeader();

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   FADE ANIMATIONS
   ========================================================= */

const fadeItems =
    document.querySelectorAll(".fade");

if (
    "IntersectionObserver" in window &&
    fadeItems.length
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    fadeItems.forEach(function (item) {

        observer.observe(item);

    });

}


/* =========================================================
   GLOBAL MOBILE MENU
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");


function closeMobileMenu() {

    if (!menuToggle || !mobileNav) {
        return;
    }

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


function openMobileMenu() {

    if (!menuToggle || !mobileNav) {
        return;
    }

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


if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                mobileNav.classList.contains("open");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /* Close after navigation */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    });


    /* Close when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            if (
                mobileNav.classList.contains("open") &&
                !mobileNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );


    /* Close with ESC */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileNav.classList.contains("open")
            ) {

                closeMobileMenu();

                menuToggle.focus();

            }

        }
    );


    /* Close if viewport becomes desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {

                closeMobileMenu();

            }

        }
    );

}
