/* =========================================================
   BSGA CONSULTING — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER
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
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    fadeItems.forEach(item => {

        observer.observe(item);

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");


if (menuToggle && mobileNav) {


    /* =====================================================
       OPEN / CLOSE
    ===================================================== */

    function openMobileMenu() {

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


    function closeMobileMenu() {

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


    function toggleMobileMenu() {

        const isOpen =
            mobileNav.classList.contains("open");


        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    /* =====================================================
       MENU BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            toggleMobileMenu();

        }
    );


    /* =====================================================
       CLOSE AFTER CLICKING A LINK
    ===================================================== */

    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    });


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

                closeMobileMenu();

                menuToggle.focus();

            }

        }
    );


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !mobileNav.classList.contains("open")
            ) {

                return;

            }


            const clickedInsideHeader =
                header &&
                header.contains(event.target);


            if (!clickedInsideHeader) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       RESET MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeMobileMenu();

            }

        }
    );

}
