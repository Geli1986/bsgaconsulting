/*==================================================
BSGA CONSULTING
MAIN.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const progressBar = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("backToTop");

    const menu = document.querySelector(".nav-menu");
    const toggle = document.querySelector(".menu-toggle");
    const overlay = document.querySelector(".menu-overlay");

    /*==============================================
    HEADER + PROGRESS + BACK TO TOP
    ==============================================*/

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        // Header
        if (header) {
            header.classList.toggle("scrolled", scrollY > 40);
        }

        // Progress
        if (progressBar) {

            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            progressBar.style.width =
                ((scrollY / height) * 100) + "%";
        }

        // Back To Top
        if (backToTop) {

            backToTop.classList.toggle("show", scrollY > 500);

        }

    });

    /*==============================================
    BACK TO TOP
    ==============================================*/

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*==============================================
    MOBILE MENU
    ==============================================*/

    function closeMenu() {

        if (!menu || !overlay || !toggle) return;

        menu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");

        toggle.setAttribute("aria-expanded", "false");

        const icon = toggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

    if (menu && toggle && overlay) {

        toggle.addEventListener("click", () => {

            menu.classList.toggle("active");
            overlay.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            const opened = menu.classList.contains("active");

            toggle.setAttribute("aria-expanded", opened);

            const icon = toggle.querySelector("i");

            if (icon) {

                icon.classList.toggle("fa-bars", !opened);
                icon.classList.toggle("fa-xmark", opened);

            }

        });

        overlay.addEventListener("click", closeMenu);

    }

    /*==============================================
    SMOOTH SCROLL
    ==============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            closeMenu();

            const headerHeight = header ? header.offsetHeight : 0;

            const offset =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({

                top: offset,

                behavior: "smooth"

            });

        });

    });

    /*==============================================
    SCROLL ANIMATIONS
    ==============================================*/

    const animated = document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right,.zoom"

    );

    if (animated.length) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: 0.15

        });

        animated.forEach(el => observer.observe(el));

    }

});
