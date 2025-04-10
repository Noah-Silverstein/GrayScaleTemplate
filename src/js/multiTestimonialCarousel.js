//Code handling number of Testimonials on screen
/*
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));

    const adjustCarousel = () => {
        const screenWidth = window.innerWidth;
        let itemsPerSlide;

        // Determine the number of items per slide based on screen size
        if (screenWidth >= 1200) {
            itemsPerSlide = 4; // Extra large screens
        } else if (screenWidth >= 992) {
            itemsPerSlide = 3; // Large screens
        } else if (screenWidth >= 768) {
            itemsPerSlide = 2; // Medium screens
        } else {
            itemsPerSlide = 1; // Small screens
        }

        // Clear existing slides
        carouselInner.innerHTML = '';

        // Create new slides dynamically
        for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            if (i === 0) slide.classList.add('active'); // Make the first slide active

            const row = document.createElement('div');
            row.classList.add('row', 'testimonial-row', 'justify-content-center'); 
            
            // Add the correct number of testimonials to the slide
            for (let j = 0; j < itemsPerSlide; j++) {
                const index = (i + j) % testimonials.length; // Loop back to the start if necessary
                const col = document.createElement('div');
                col.classList.add('col-md-4', 'col-lg-3'); // Adjust column size
                col.appendChild(testimonials[index].cloneNode(true)); // Clone the testimonial
                row.appendChild(col);
            }

            slide.appendChild(row);
            carouselInner.appendChild(slide);
        }
    };

    // Adjust carousel on load and resize
    adjustCarousel();
    window.addEventListener('resize', adjustCarousel);
});

*/