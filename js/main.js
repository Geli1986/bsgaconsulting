// ======================================================
// BSGA CONSULTING
// Main JavaScript
// ======================================================

// Header al hacer scroll

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

// Animaciones al hacer scroll

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll(".fade-up").forEach(el => {

    observer.observe(el);

});

// Back To Top

const backToTop = document.querySelector(".back-to-top");

if(backToTop){

window.addEventListener("scroll",()=>{

backToTop.classList.toggle("show",window.scrollY>600);

});

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}
document.querySelectorAll("a[href^='#']").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});
