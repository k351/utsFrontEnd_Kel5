import productsData from './productsData.js';
import { loadIconStates } from './addToWishlist.js';
import { attachWishlistEventListeners } from './indexproduct.js';

// Pagination variables
let paginationCurrentPage = 1;
const paginationItemsPerPage = 4;
let filteredProducts = productsData; // Initially show all products

// Function to render products with pagination
function renderProducts(page) {
    const startIndex = (page - 1) * paginationItemsPerPage;
    const endIndex = startIndex + paginationItemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    let productContainer = document.querySelector('.box-container');
    productContainer.innerHTML = '';  // Clear the container

    // Load the saved icon states
    const iconStates = loadIconStates();

    paginatedProducts.forEach(product => {
        const isInWishlist = iconStates[product.name] || false;

        let productBox = `
            <div class="box">
                <a href="product_${product.index}.html">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="desc">
                        <span>${product.category}</span>
                        <h5>${product.name}</h5>
                        <div class="star">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(product.stars)}
                        </div>
                        <h4>${product.price}</h4>
                    </div>
                    <a onclick="addToCart('${product.name}', '${product.image}', '${product.price}')">
                        <i class="fa-solid fa-cart-plus cart" style="color: ${product.cart_icon_color};"></i>
                    </a>
                    <button class="wishlist-btn" data-product-name="${product.name}">
                        <i class="${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"
                        style="color: ${isInWishlist ? 'var(--secondary-color)' : 'gray'};"></i>
                    </button>
                </a>
            </div>
        `;
        productContainer.innerHTML += productBox;
    });

    attachWishlistEventListeners();
}

// Function to create pagination buttons dynamically
function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredProducts.length / paginationItemsPerPage);

    // Create number buttons
    for (let i = 1; i <= totalPages; i++) {
        let pageLink = document.createElement('a');
        pageLink.innerText = i;
        if (i === paginationCurrentPage) {
            pageLink.classList.add('active');
        }
        pageLink.href = '#';
        pageLink.onclick = () => changePage(i);
        paginationContainer.appendChild(pageLink);
    }

    // Right arrow (forward navigation)
    if (paginationCurrentPage < totalPages) {
        const navButtonNext = document.createElement('a');
        navButtonNext.href = '#';
        navButtonNext.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        navButtonNext.classList.add('pagination-nav');
        navButtonNext.onclick = () => changePage(paginationCurrentPage + 1);
        paginationContainer.appendChild(navButtonNext);
    }

    // Left arrow (backward navigation)
    if (paginationCurrentPage > 1) {
        const navButtonPrev = document.createElement('a');
        navButtonPrev.href = '#';
        navButtonPrev.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        navButtonPrev.classList.add('pagination-nav');
        navButtonPrev.onclick = () => changePage(paginationCurrentPage - 1);
        paginationContainer.appendChild(navButtonPrev);
    }
    
}


// Function to change the page and re-render products
function changePage(page) {
    paginationCurrentPage = page;
    renderProducts(paginationCurrentPage);
    setupPagination();
}

// Function to handle search functionality
function search() {
    let filter = document.getElementById('searchBar').value.toUpperCase();
    filteredProducts = productsData.filter(product => product.name.toUpperCase().includes(filter));

    // Reset to the first page whenever a search is performed
    paginationCurrentPage = 1;
    
    // Render the first page of search results
    renderProducts(paginationCurrentPage);
    setupPagination();
}

function filterByCategory() {
    const selectedCategory = document.getElementById('categories').value.toUpperCase();

    if (selectedCategory === "none") {
        filteredProducts = productsData; 
    } else {
        filteredProducts = productsData.filter(product => product.category.toUpperCase() === selectedCategory);
    }
    paginationCurrentPage = 1;

    renderProducts(paginationCurrentPage);
    setupPagination();
}

// Attach event listener for search bar
document.getElementById('searchBar').addEventListener('input', search);
document.getElementById('categories').addEventListener('change', filterByCategory);

// Initial load
window.onload = function() {
    // Retrieve search and filter queries from LocalStorage
    const searchQuery = localStorage.getItem('searchQuery');
    const filterQuery = localStorage.getItem('filterQuery');

    if (searchQuery && searchQuery !== '') {
        // If there's a search query, fill the search bar and run the search
        document.getElementById('searchBar').value = searchQuery;
        search(); // Run the search function to filter products
        localStorage.setItem('searchQuery', ''); // Clear search query
    } else if (filterQuery && filterQuery !== 'none') {
        // If there's a filter category, set it and filter products
        document.getElementById('categories').value = filterQuery;
        filterByCategory(); // Run the filter function to filter products
        localStorage.setItem('filterQuery', 'none'); // Clear filter query
    } else {
        // If no search or filter, show all products
        filteredProducts = productsData; // Reset filtered products to all products
        renderProducts(paginationCurrentPage); // Render all products
    }

    // Setup pagination after rendering products
    setupPagination();
};