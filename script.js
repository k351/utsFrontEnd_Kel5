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