document.addEventListener("DOMContentLoaded", () => {

const items=document.querySelectorAll(

".service-card,.about-card,.timeline-step,.industry-card"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

});

items.forEach(item=>observer.observe(item));

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>60){

header.classList.add("scrolled");

}

else{

header.classList.remove("scrolled");

}

});

});
