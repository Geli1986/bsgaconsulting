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
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (!menuToggle || !mobileNav) {
        return;
    }


    menuToggle.addEventListener("click", function () {

        const isOpen =
            menuToggle.classList.toggle("active");

        mobileNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close menu when clicking a navigation link */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", function () {

            menuToggle.classList.remove("active");

            mobileNav.classList.remove("open");

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

});


/* =========================================================
   ACTIVE MENU
   ========================================================= */

const links = document.querySelectorAll("#mobileNav a");

links.forEach(link => {

    link.addEventListener("click", () => {

        links.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});
