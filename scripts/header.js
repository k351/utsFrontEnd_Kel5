document.addEventListener('DOMContentLoaded', () => {
    const exploreMenu = document.getElementById("Explore");
    const exploreLinks = document.querySelector(".explore-links");
    const priaMenu = document.querySelector(".pria");
    const wanitaMenu = document.querySelector(".wanita");
    const priaExplore = document.getElementById("pria-contents");
    const wanitaExplore = document.getElementById("wanita-contents");
    const searchInput = document.querySelector('.search-header input');
    const blackBox = document.querySelector('.black-box');

    function alignFixedElementToExplore() {
      if (exploreMenu && exploreLinks) {
        const rect = exploreMenu.getBoundingClientRect();
        exploreLinks.style.left = `${rect.left}px`;
        priaExplore.style.left = `${rect.left - 410}px`
        wanitaExplore.style.left = `${rect.left - 410}px`
      }
    }
    alignFixedElementToExplore();
    window.addEventListener('resize', alignFixedElementToExplore);

    priaMenu.addEventListener("click", () => {
        priaExplore.classList.toggle("pria-contents-show")
        if (wanitaExplore.classList.contains("wanita-contents-show")) {
            wanitaExplore.classList.remove("wanita-contents-show");
        }
    })
    
    wanitaMenu.addEventListener("click", () => {
        wanitaExplore.classList.toggle("wanita-contents-show")
        if (priaExplore.classList.contains("pria-contents-show")) {
            priaExplore.classList.remove("pria-contents-show");
        }
    })
    
    exploreMenu.addEventListener("click", () => {
        exploreLinks.classList.toggle("explore-links-show");
        if (wanitaExplore.classList.contains("wanita-contents-show") || priaExplore.classList.contains("pria-contents-show")) {
            wanitaExplore.classList.remove("wanita-contents-show");
            priaExplore.classList.remove("pria-contents-show");
        }
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
  