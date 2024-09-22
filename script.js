$(document).ready(function() {
    let currentIndex = 0;
    const $slides = $('.slide');
    const totalSlides = $slides.length;
    const $carouselTrack = $('.carousel-track');
    const $carouselContainer = $('.carousel-container');

    // Clone the first slide and append it to the end for seamless looping
    const $firstSlideClone = $slides.first().clone();
    $carouselTrack.append($firstSlideClone);

    // Set up initial state
    let autoSlideInterval;
    const slideDuration = 700;  
    const autoSlideDelay = 5000; 

    // Function to update carousel width dynamically
    function updateSlideWidth() {
        return $carouselContainer.outerWidth();
    }

    // Move to the next slide
    function moveToNextSlide() {
        const slideWidth = updateSlideWidth();
        currentIndex++;

        $carouselTrack.css({
            'transition': `transform ${slideDuration}ms ease`,
            'transform': `translateX(-${currentIndex * slideWidth}px)`
        });

        if (currentIndex === totalSlides) {
            setTimeout(function() {
                $carouselTrack.css('transition', 'none'); 
                currentIndex = 0;
                $carouselTrack.css('transform', `translateX(0)`); // Reset to the first slide
            }, slideDuration);
        }
    }

    // Auto-play every 4 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(moveToNextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    // Arrow controls
    function moveToPrevSlide() {
        const slideWidth = updateSlideWidth();
        if (currentIndex > 0) {
            currentIndex--;
            $carouselTrack.css({
                'transition': `transform ${slideDuration}ms ease`,
                'transform': `translateX(-${currentIndex * slideWidth}px)`
            });
        }
    }

    $('.right-arrow').click(function() {
        stopAutoSlide();  
        moveToNextSlide();
        startAutoSlide(); 
    });

    $('.left-arrow').click(function() {
        stopAutoSlide(); 
        moveToPrevSlide();
        startAutoSlide();
    });

    // Handle window resize and recalculate width dynamically
    $(window).resize(function() {
        const slideWidth = updateSlideWidth();
        $carouselTrack.css('transform', `translateX(-${currentIndex * slideWidth}px)`);
    });
});
  
// Hamburger 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
var darkTheme = document.getElementById("dark-theme");

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
