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
const pageHeader = document.querySelector('.page__header');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Checks if a given section is in the viewport
let isInViewport = (section) => {
    const clientViewPort = section.getBoundingClientRect();
    
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


let prevScrolledSection;
let activeSectionId;
// Add class 'active' to section when near top of viewport
let setActiveSection = () => {
    for (const section of sections) {
        if (isInViewport(section)) {
            //highlight active section
            section.querySelector(".h2-container").classList.add("active");
            
            // highlight Active section's link at navbar
            activeSectionId = section.getAttribute("id");
            document.querySelector(`a[data-id=${activeSectionId}]`).classList.add("active");
            
            if (prevScrolledSection) {
                prevScrolledSection.classList.remove("active");
            }
            prevScrolledSection = section;
            
    
        }else{
            // Remove highlight from Unactive section
            section.querySelector(".h2-container").classList.remove("active");
            
            // Remove highlight from unactive section's link at navbar
            activeSectionId = section.getAttribute("id");
            document.querySelector(`a[data-id=${activeSectionId}]`).classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollTo event
let scrollTo = (section) => {
    // Scroll to clicked section
    section.scrollIntoView({top: 0, behavior: "smooth"});
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Stored previous anchor tag
let prevActiveLink;

// Add click event listener to nav bar
navLinks.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.nodeName === 'A'){
        const sectionId = e.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        
        // Make link active 
        e.target.classList.add("active");
        
        // Make previous active link unactive 
        if (prevActiveLink) {
            prevActiveLink.classList.remove("active");
        }
        prevActiveLink = e.target;
        
        // scroll to section
        scrollTo(section);
        
            document.querySelector(".page__header").style.top = "-80px";
            
        
    }
});


// Stores the previous vertical page offsets
let prevScrollPos = window.pageYOffset;

document.addEventListener('scroll', () => {
    // sets active sections 
    setActiveSection();

    // Hide page hea
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        document.querySelector(".page__header").style.top = "0";
    } else {
        document.querySelector(".page__header").style.top = "-80px";
    }
    
    prevScrollPos = currentScrollPos;
});


// Build menu 
buildNav();


