/*==================================================
BSGA CONSULTING
MAIN.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    ELEMENTS
    ==================================================*/

    const header = document.querySelector("header");

    const menu = document.getElementById("primary-menu");

    const toggle = document.querySelector(".menu-toggle");

    const overlay = document.querySelector(".menu-overlay");

    const backToTop = document.getElementById("backToTop");

    const progress = document.getElementById("scroll-progress");


    /*==================================================
    MOBILE MENU
    ==================================================*/

    function openMenu() {

        if (!menu || !toggle || !overlay) return;

        menu.classList.add("active");

        overlay.classList.add("active");

        document.body.classList.add("menu-open");

        toggle.setAttribute("aria-expanded", "true");

        const icon = toggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

    }


    function closeMenu() {

        if (!menu || !toggle || !overlay) return;

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


    if (toggle) {

        toggle.addEventListener("click", () => {

            if (menu.classList.contains("active")) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }


    if (overlay) {

        overlay.addEventListener("click", closeMenu);

    }


    /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

            if (menu && menu.classList.contains("active")) {

    requestAnimationFrame(() => {

        closeMenu();

    });

}

        });

    });
    /*==================================================
    SCROLL EVENTS
    ==================================================*/

    function updateScrollUI() {

        const scrollTop = window.pageYOffset;

        /* Header */

        if (header) {

            if (scrollTop > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }

        /* Progress Bar */

        if (progress) {

            const documentHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progressValue =
                (scrollTop / documentHeight) * 100;

            progress.style.width = progressValue + "%";

        }

        /* Back To Top */

        if (backToTop) {

            if (scrollTop > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

    }

    window.addEventListener("scroll", updateScrollUI);

    updateScrollUI();


    /*==================================================
    BACK TO TOP
    ==================================================*/

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*==================================================
    SCROLL ANIMATIONS
    ==================================================*/

    const animatedElements = document.querySelectorAll(

        ".fade-up, .fade-left, .fade-right, .zoom"

    );

    if (animatedElements.length) {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold: 0.15,

                rootMargin: "0px 0px -50px 0px"

            }

        );

        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }


    /*==================================================
    ESC CLOSES MENU
    ==================================================*/

    document.addEventListener("keydown", event => {

        if (

            event.key === "Escape" &&

            menu &&

            menu.classList.contains("active")

        ) {

            closeMenu();

        }

    });
/*==================================================
ACTIVE MENU ITEM
==================================================*/

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-menu a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});

    /*==================================================
    WINDOW RESIZE
    ==================================================*/

    window.addEventListener("resize", () => {

        if (

            window.innerWidth > 992 &&

            menu &&

            menu.classList.contains("active")

        ) {

            closeMenu();

        }

    });

});
/*==================================================
STAGGER CARDS
==================================================*/

document.querySelectorAll(".service-card, .industry-card, .why-card").forEach((card, index) => {

    card.style.transitionDelay = `${index * 60}ms`;

});
/*==================================================
CARD HOVER
==================================================*/

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.transform =
            `perspective(800px)
             rotateX(${-(y-rect.height/2)/35}deg)
             rotateY(${(x-rect.width/2)/35}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
