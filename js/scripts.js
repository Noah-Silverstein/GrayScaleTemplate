/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
//card flipper
document.addEventListener('DOMContentLoaded', () => {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        const learnMoreButton = card.querySelector('.flip-card-front .btn'); // Select the "Learn More" button
        const backButton = card.querySelector('.flip-card-back .btn'); // Select the "Back" button
        // Can't use toggle because of double click might cause the card to flip back and forth
        // Flip the card to show the back side
        if (learnMoreButton) {
            learnMoreButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the event from bubbling up
                card.querySelector('.flip-card-inner').classList.add('flipped'); // Add the flipped class
            });
        }

        // Flip the card back to show the front side
        if (backButton) {
            backButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the event from bubbling up
                card.querySelector('.flip-card-inner').classList.remove('flipped'); // Remove the flipped class
            });
        }
    });
});

//language switcher
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('language-switcher');
    const defaultLanguage = 'en';
    let currentLanguage = localStorage.getItem('language') || defaultLanguage;

    function loadLanguage(language) {
        const path = `assets/languages/${language}.json`;
        console.log(`Fetching language file from: ${path}`);
        debugger
        fetch(path)            
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-translate]').forEach(element => {
                    const keys = element.getAttribute('data-translate').split('.');
                    let translation = translations;
                    keys.forEach(key => {
                        translation = translation[key];
                    });
                    element.textContent = translation;
                });
            });
    }

    languageSwitcher.addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('language', currentLanguage);
        loadLanguage(currentLanguage);
    });

    loadLanguage(currentLanguage);
});

//Code handling number of Testimonials on screen
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