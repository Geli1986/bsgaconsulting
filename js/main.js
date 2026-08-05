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
