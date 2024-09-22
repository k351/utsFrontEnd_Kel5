$(document).ready(function () {
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    // Clone the first slide and append it to the end to create seamless loop
    $('.carousel').append(slides.first().clone());

    function moveToNextSlide() {
        currentIndex++;
        const carouselWidth = $('.carousel-container').width(); // Get the width of the container

        // Move to the next slide
        $('.carousel').css('transform', `translateX(-${currentIndex * carouselWidth}px)`);

        // Reset to the first slide after reaching the last one
        if (currentIndex === totalSlides) {
            setTimeout(function () {
                $('.carousel').css('transition', 'none'); // Disable transition for the reset
                currentIndex = 0;
                $('.carousel').css('transform', 'translateX(0)'); // Reset to the first slide
                
                // Re-enable transition after resetting
                setTimeout(function () {
                    $('.carousel').css('transition', 'transform 0.7s ease'); // Smooth sliding back on
                }, 50); // Small delay to re-enable transition after reset
            }, 700); // This delay should match the transition duration (0.7s)
        }
    }

    // Auto-play every 4 seconds
    setInterval(moveToNextSlide, 4000);

    // Handle window resize to recalculate the width dynamically
    $(window).resize(function () {
        const carouselWidth = $('.carousel-container').width();
        $('.carousel').css('transform', `translateX(-${currentIndex * carouselWidth}px)`);
    });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
var darkTheme = document.getElementById("dark-theme");


// Hamburger 

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

// Text manipulation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item')
    const navbar = document.querySelector('.navbar')
    let signInButton

    function updateNav(e) {
        navItems.forEach(item => {
            const navLink = item.querySelector('.nav-link')
            if (e.matches) {
                // Replace icons with text for mobile view
                if (navLink.innerHTML.includes('fa-cart-shopping')) {
                    navLink.innerHTML = 'Cart'
                } else if (navLink.innerHTML.includes('fa-heart')) {
                    navLink.innerHTML = 'Wishlist'
                } else if (navLink.innerHTML.includes('fa-angle-down')) {
                    navLink.innerHTML = 'Categories'
                }

                // Add a "Sign In" button if it doesn't exist
                if (!signInButton) {
                    signInButton = document.createElement('li')
                    signInButton.classList.add('nav-item')
                    signInButton.innerHTML = '<a href="#" class="nav-link">Sign In</a>'
                    navbar.querySelector('.nav-menu').appendChild(signInButton)

                // Add event listener to close the menu when "Sign In" is clicked
                    signInButton.querySelector('.nav-link').addEventListener('click', () => {
                    hamburger.classList.remove("active")
                    navMenu.classList.remove("active")
                    })
                }
            } else {
                // Restore icons for desktop view
                if (navLink.textContent === 'Cart') {
                    navLink.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
                } else if (navLink.textContent === 'Wishlist') {
                    navLink.innerHTML = '<i class="fa-regular fa-heart"></i>'
                } else if (navLink.textContent === 'Categories') {
                    navLink.innerHTML = 'Categories <i class="fa-solid fa-angle-down"></i>'
                }

                // Remove "Sign In" button when in desktop view
                if (signInButton) {
                    signInButton.remove()
                    signInButton = null
                }
            }
        })
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addListener(updateNav)
    updateNav(mediaQuery)
})

darkTheme.onclick = function() {
    document.body.classList.toggle("darkmode");
    if(document.body.classList.contains("darkmode")){
        darkTheme.src = "images/icon/sun.png";
    } else {
        darkTheme.src = "images/icon/moon.png";
    }
}
