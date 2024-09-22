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