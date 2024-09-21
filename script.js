const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

window.addEventListener('scroll', () => {
    const limiter = document.querySelector('.categories');  
    const hidden = document.querySelector('.categories-header'); 
    
    const limiterPosition = limiter.getBoundingClientRect().bottom; 

    if (limiterPosition <= 80) {
        hidden.classList.add('categories-header-show'); 
    } else {
        hidden.classList.remove('categories-header-show');  
    }
});
