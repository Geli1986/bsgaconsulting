/* =========================================================
   BSGA CONSULTING — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const header = document.querySelector("header");

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

window.addEventListener("scroll", updateHeader);


/* =========================================================
   FADE ANIMATION
   ========================================================= */

const fadeItems = document.querySelectorAll(".fade");

if ("IntersectionObserver" in window && fadeItems.length) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    fadeItems.forEach(item => {

        observer.observe(item);

    });

}


/* =========================================================
   MOBILE MENU
   BSGA CONSULTING
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const isOpen = mobileNav.classList.contains("open");

        if (isOpen) {

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

        } else {

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

    });


    /* Close menu after selecting a page */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

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

        });

    });

}
