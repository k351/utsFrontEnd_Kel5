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

  // Create navigation button (this will stay on the right of the last number button)
  if (totalPages > 1) {
      const navButton = document.createElement('a');
      navButton.href = '#';
      navButton.classList.add('pagination-nav');

      if (paginationCurrentPage === 1) {
          navButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
          navButton.onclick = () => changePage(paginationCurrentPage + 1);
      } else if (paginationCurrentPage > 1 && paginationCurrentPage < totalPages) {
          navButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
          navButton.onclick = () => changePage(paginationCurrentPage - 1);
      } else if (paginationCurrentPage === totalPages) {
          navButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
          navButton.onclick = () => changePage(paginationCurrentPage - 1);
      }

      // Append the navigation button after the last page link
      paginationContainer.appendChild(navButton);
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

// Attach event listener for search bar
document.getElementById('searchBar').addEventListener('input', search);

// Initial load
window.onload = function() {
    renderProducts(paginationCurrentPage);
    setupPagination();
};
