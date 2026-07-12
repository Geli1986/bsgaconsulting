/* ======================================
   BSGA CONSULTING
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".service-card, .about-box, .timeline-item, .industry-grid div, .stat"
    );

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach(el=>observer.observe(el));

});
window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>80){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});
