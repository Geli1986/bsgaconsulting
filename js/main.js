/*==========================================================
HEADER
==========================================================*/

const header = document.querySelector(".header");

function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

updateHeader();

window.addEventListener("scroll", updateHeader);


/*==========================================================
FADE ANIMATION
==========================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(".fade").forEach(item=>{

    observer.observe(item);

});


/*==========================================================
ACTIVE MENU
==========================================================*/

const links = document.querySelectorAll("nav a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        links.forEach(item=>item.classList.remove("active"));

        link.classList.add("active");

    });

});
/* =========================================================
   MOBILE MENU
   BSGA CONSULTING
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (!menuToggle || !mobileNav) {
        return;
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = menuToggle.classList.toggle("active");

        mobileNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

});
