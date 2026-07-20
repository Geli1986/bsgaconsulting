/* ==========================================
BSGA CONSULTING
MAIN.JS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /* ==========================================
       SCROLL ANIMATIONS
    ========================================== */

    const animatedElements = document.querySelectorAll(

        ".fade-up, .fade-left, .fade-right, .zoom"

    );

    if (animatedElements.length > 0) {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },

            {

                threshold: 0.15

            }

        );

        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }

    /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */

    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", function () {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    });

    /* ==========================================
       BACK TO TOP
    ========================================== */

    const backButton = document.getElementById("backToTop");

    if (backButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backButton.classList.add("show");

            } else {

                backButton.classList.remove("show");

            }

        });

        backButton.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menu = document.querySelector(".nav-menu");
    const toggle = document.querySelector(".menu-toggle");
    const overlay = document.querySelector(".menu-overlay");

    if (menu && toggle && overlay) {

        function closeMenu() {

            menu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("menu-open");

            const icon = toggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

        toggle.addEventListener("click", function () {

            menu.classList.toggle("active");
            overlay.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            const icon = toggle.querySelector("i");

            if (!icon) return;

            if (menu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

        overlay.addEventListener("click", closeMenu);

        document.querySelectorAll(".nav-menu a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

    }

});
