/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const pageFragment = document.createDocumentFragment();
const sections = document.querySelectorAll('section');
const navLinks = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Checks if a given section is in the viewport
let isInViewport = (section) => {
    const clientViewPort = section.getBoundingClientRect();
    // console.log(clientViewPort);
    
    return (
        clientViewPort.top >= 0 &&
        clientViewPort.left >= 0 &&
        clientViewPort.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        clientViewPort.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let buildNav = () => {
    for (const section of sections) {        
        const navLink= document.createElement('li');
        const sectionName = section.getAttribute('data-nav');
        const sectionId = section.getAttribute('id');
        navLink.innerHTML = `<a class ="menu__link" data-id="${sectionId}">${sectionName}</a>`;
        pageFragment.appendChild(navLink);
    }
    navLinks.appendChild(pageFragment);
}


// Add class 'active' to section when near top of viewport
let setActiveSection = () => {
    for (const section of sections) {
        if (isInViewport(section)) {
            section.classList.add("active");
        }else{
            section.classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollTo event
let scrollTo = (section) => {
        // Scroll to clicked section
        section.scrollIntoView({block: "center", behavior: "smooth"});
    }


/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add click event listener to nav bar
navLinks.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.nodeName === 'A'){
        const sectionId = e.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        scrollTo(section);
    }
});

document.addEventListener('scroll', () => {
    setActiveSection();
});


// Build menu 
buildNav();


