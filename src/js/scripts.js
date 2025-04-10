import { marked } from 'marked';
//
// Scripts
// 
//  

// controls the behavior of the navbar when the page is scrolled
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


// Function to load JSON files
async function loadJSON(language) {
    const path = `assets/languages/${language}.json`;
    console.log(`Fetching JSON file from: ${path}`);
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {};
    }
}

// Function to load Markdown files
async function loadMarkdown(language, filePath) {
    const path = `assets/languages/${language}/${filePath}`;
    console.log(`Fetching Markdown file from: ${path}`);
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }
        const markdownContent = await response.text();
        console.log('Markdown content:', markdownContent); // Debugging log
        return marked(markdownContent); // Convert Markdown to HTML
    } catch (error) {
        console.error(error);
        return `<p>Content not available in ${language}</p>`;
    }
}


// Function to load language content dynamically
async function loadLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    const fileCache = {};

    // Load the JSON file for the selected language
    if (!fileCache[language]) {
        fileCache[language] = await loadJSON(language);
    }

    for (const element of elements) {
        const translateKey = element.getAttribute('data-translate'); // e.g., "courses.barmitzvah.title"

        // Dynamically resolve the value from the JSON file using the translateKey
        const value = translateKey.split('.').reduce((obj, key) => obj?.[key], fileCache[language]);
        console.log(`Loading content for key "${translateKey}":`, value); // Debugging log

        let content;
        if (typeof value === 'string' && value.endsWith('.md')) {
            // If the value is a Markdown file reference, fetch and render it
            if (!fileCache[value]) {
                fileCache[value] = await loadMarkdown(language, value);
            }
            content = fileCache[value];
        } else {
            // Otherwise, treat it as plain text
            content = value || '';
        }

        console.log(`Injecting content for key "${translateKey}":`, content); // Debugging log

        // Inject the content into the element
        element.innerHTML = content;
    }
}


//language switcher
document.addEventListener('DOMContentLoaded', function () {
    const languageSwitcher = document.getElementById('language-switcher');
    const defaultLanguage = 'en';
    let currentLanguage = localStorage.getItem('language') || defaultLanguage;

    languageSwitcher.addEventListener('change', function () {
        currentLanguage = this.value;
        localStorage.setItem('language', currentLanguage);
        loadLanguage(currentLanguage);
    });

    loadLanguage(currentLanguage);
});

//Code to remove focus from the dropdown after a selection is made
document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');

    languageSwitcher.addEventListener('change', () => {
        // Remove focus from the dropdown after a selection is made
        languageSwitcher.blur();
    });
});

