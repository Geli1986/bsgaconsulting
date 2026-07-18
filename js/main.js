/* ===========================================
BSGA CONSULTING
MAIN.JS
===========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       NAVBAR ON SCROLL
    =============================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

    /* ===============================
       SCROLL ANIMATIONS
    =============================== */

    const animatedElements = document.querySelectorAll(

        ".service-card, .about-card, .timeline-step, .industry-card, .why-item, .contact-card"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    animatedElements.forEach((element) => {

        observer.observe(element);

    });

    /* ===============================
       SCROLL PROGRESS BAR
    =============================== */

    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / documentHeight) * 100;

        if (progressBar) {

            progressBar.style.width = progress + "%";

        }

    });

    /* ===============================
       BACK TO TOP
    =============================== */

    const backButton = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (!backButton) return;

        if (window.scrollY > 500) {

            backButton.classList.add("show");

        } else {

            backButton.classList.remove("show");

        }

    });

    if (backButton) {

        backButton.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ===============================
       SMOOTH MENU LINKS
    =============================== */

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

});
/*=====================================
APPLE MENU
=====================================*/

const menu=document.querySelector(".nav-menu");

const toggle=document.querySelector(".menu-toggle");

const overlay=document.querySelector(".menu-overlay");

function closeMenu(){

menu.classList.remove("active");

overlay.classList.remove("active");

document.body.classList.remove("menu-open");

toggle.innerHTML='<i class="fa-solid fa-bars"></i>';

}

toggle.addEventListener("click",()=>{

menu.classList.toggle("active");

overlay.classList.toggle("active");

document.body.classList.toggle("menu-open");

if(menu.classList.contains("active")){

toggle.innerHTML='<i class="fa-solid fa-xmark"></i>';

}else{

toggle.innerHTML='<i class="fa-solid fa-bars"></i>';

}

});

overlay.addEventListener("click",closeMenu);

document.querySelectorAll(".nav-menu a").forEach(link=>{

link.addEventListener("click",closeMenu);

});
