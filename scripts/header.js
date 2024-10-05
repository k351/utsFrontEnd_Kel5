const exploreMenu = document.getElementById("Explore");
const exploreLinks = document.querySelector(".explore-links");
const priaMenu = document.querySelector(".pria");
const wanitaMenu = document.querySelector(".wanita");
const priaExplore = document.getElementById("pria-contents");
const wanitaExplore = document.getElementById("wanita-contents");
const searchInput = document.querySelector('.search-header input');
const blackBox = document.querySelector('.black-box');
document.addEventListener('DOMContentLoaded', () => {

    priaMenu.addEventListener("click", () => {
        priaExplore.classList.toggle("contents-show")
        wanitaExplore.classList.remove("contents-show");
        updateExplore();
    })
    
    wanitaMenu.addEventListener("click", () => {
        wanitaExplore.classList.toggle("contents-show")
        priaExplore.classList.remove("contents-show");
        updateExplore();
    })
    
    exploreMenu.addEventListener("click", () => {
        exploreLinks.classList.toggle("explore-links-show");
        wanitaExplore.classList.remove("contents-show");
        priaExplore.classList.remove("contents-show");
        updateExplore();
    });
    
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        // This block runs only on index.html
        window.addEventListener('scroll', () => {
            const searchLimiter = document.querySelector('.home');
            const searchHidden = document.querySelector('.search-header');
            const categoriesLimiter = document.querySelector('.categories');  
            const categoriesHidden = document.querySelector('.categories-header'); 
            const searchLimiterPos = searchLimiter.getBoundingClientRect().bottom;
            const categoriesLimiterPos = categoriesLimiter.getBoundingClientRect().bottom;
    
            if (searchLimiterPos <= 80) {
                searchHidden.classList.add('search-header-show'); 
            } else {
                searchHidden.classList.remove('search-header-show');  
            }
    
            if (categoriesLimiterPos <= 80) {
                categoriesHidden.classList.add('categories-header-show'); 
            } else {
                categoriesHidden.classList.remove('categories-header-show');  
            }
        });/* */
    } else{
        // Automatically show elements on shop.html without scrolling
        const searchHidden = document.querySelector('.search-header');
        const categoriesHidden = document.querySelector('.categories-header'); 
        searchHidden.classList.add('search-header-show');
        categoriesHidden.classList.add('categories-header-show'); 
    }
    
    searchInput.addEventListener('focus', () => {
        blackBox.classList.add('black-box-show');
    });
    
    searchInput.addEventListener('blur', () => {
        blackBox.classList.remove('black-box-show');
    });
  });
    function updateExplore() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            exploreLinks.style.right = '3%';
            priaExplore.style.right = '3%';
            wanitaExplore.style.right = '3%';
            exploreLinks.style.left = '';  
            priaExplore.style.left = '';   
            wanitaExplore.style.left = ''; 
        } else {
            const rect = exploreMenu.getBoundingClientRect();
            exploreLinks.style.left = `${rect.left}px`;
            priaExplore.style.left = `${rect.left - 410}px`;
            wanitaExplore.style.left = `${rect.left - 410}px`;
            exploreLinks.style.right = '';  
            priaExplore.style.right = '';   
            wanitaExplore.style.right = ''; 
        }
    }
    // Add event listener for window resize
    window.addEventListener('resize', updateExplore);
    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', updateExplore);
    updateExplore();
