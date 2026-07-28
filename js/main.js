/*=========================================================
BSGA CONSULTING
MAIN.JS
=========================================================*/

/*=========================================================
HEADER SCROLL
=========================================================*/

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

/*=========================================================
BACK TO TOP
=========================================================*/

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/*=========================================================
SMOOTH SCROLL
=========================================================*/

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

/*=========================================================
FADE-UP ANIMATION
=========================================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".fade-up").forEach(element => {

    observer.observe(element);

});

/*=========================================================
FAQ
=========================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

/*=========================================================
MOBILE MENU
=========================================================*/

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-overlay");

if (menuButton && mobileMenu && overlay) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.add("active");
        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

    });

    overlay.addEventListener("click", closeMenu);

    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}

function closeMenu() {

    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.overflow = "";

}

/*=========================================================
ACTIVE MENU LINK
=========================================================*/

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".desktop-nav a, .mobile-menu a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});

/*=========================================================
IMAGE HOVER EFFECT
=========================================================*/

document.querySelectorAll(".hero-image img, .service-image img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.04)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "";

    });

});

/*=========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*=========================================================
PAGE LOADED
=========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
