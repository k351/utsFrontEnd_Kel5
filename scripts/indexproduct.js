import productsData from './productsData.js';
import { addToWishlist, loadIconStates } from './addToWishlist.js';

// Function to render all products (without pagination)
function renderProducts() {
    let productContainer = document.querySelector('.box-container');
    productContainer.innerHTML = '';  // Clear the container

    // Load the saved icon states
    const iconStates = loadIconStates();

    productsData.forEach(product => {
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

    attachWishlistEventListeners();  // Attach event listeners for wishlist buttons
}

// Attach click event listeners for wishlist buttons
function attachWishlistEventListeners() {
    let wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product-name');
            const product = productsData.find(item => item.name === productName);  // Find the product by name

            // Call addToWishlist and pass the button element for CSS updates
            addToWishlist(product.name, product.image, product.price, product.sold, product.stars, this);
        });
    });
}

// Search function (if needed)
function search() {
    let filter = document.getElementById('searchBar').value.toUpperCase();
    let filteredProducts = productsData.filter(product => product.name.toUpperCase().includes(filter));

    let productContainer = document.querySelector('.box-container');
    productContainer.innerHTML = '';

    filteredProducts.forEach(product => {
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
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        `;
        productContainer.innerHTML += productBox;
    });

    attachWishlistEventListeners();  // Attach event listeners to search results
}

// Attach event listener for search bar
document.getElementById('searchBar').addEventListener('input', search);

// Initialize load when the window is ready
window.onload = function() {
    renderProducts();  
};

export {attachWishlistEventListeners};