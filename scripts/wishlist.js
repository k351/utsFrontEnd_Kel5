import productsData from './productsData.js';
import { addToWishlist, loadIconStates } from './addToWishlist.js';

let currentSortCriteria = null;
let currentSortOrder = 'asc'; 

// Function to sort items based on selected filter
function sortWishlistItems(items, criteria, order = 'asc') {
    let sortedItems = [...items];  
    if (criteria === 'price') {
        return sortedItems.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));  
            const priceB = parseFloat(b.price.replace(/[^\d]/g, '')); 
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
    } else if (criteria === 'rating') {
        return sortedItems.sort((a, b) => b.stars - a.stars);  
    } else if (criteria === 'name') {  
        return sortedItems.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if (order === 'asc') {
                return nameA.localeCompare(nameB);  // Ascending order
            } else {
                return nameB.localeCompare(nameA);  // Descending order
            }
        });
    }

    return sortedItems; 
}

// Function to load wishlist items from localStorage and display them
function loadWishlistItems(sortCriteria = null, sortOrder = 'asc') {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistContainer = document.getElementById('wishlist-container');
    
    wishlistContainer.innerHTML = ''; 
    
    // Load the saved icon states
    const iconStates = loadIconStates();
    
    if (wishlistItems.length > 0) { 
        // Apply sorting if a criteria is selected
        let sortedItems = wishlistItems;
        if (sortCriteria) {
            sortedItems = sortWishlistItems(wishlistItems, sortCriteria, sortOrder);
        }

        sortedItems.forEach(product => {
            const isInWishlist = iconStates[product.name] || false;
            let productBox = `
                <div class="product-card fade-in">
                    <div class="image-container">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <h4 class="product-price">${product.price}</h4>
                        <p class="product-sold">Terjual ${product.sold}</p>
                        <div class="rating">
                            ${'<i class="fa fa-star"></i>'.repeat(product.stars)} ${product.stars}.0
                        </div>
                    </div>
                    <button class="wishlist-btn" data-product-name="${product.name}">
                        <i class="${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"
                       style="color: ${isInWishlist ? 'var(--secondary-color)' : 'gray'};"></i>
                    </button>
                    <button class="add-cart" onclick="addToCart('${product.name}', '${product.image}', '${product.price}')">+ Keranjang</button>
                </div>
            `;
            wishlistContainer.innerHTML += productBox;
        });

        attachWishlistEventListeners();
    } else {
        wishlistContainer.innerHTML = '<p style="color: var(--tertiary-color);">Your wishlist is empty!</p>';
    }
}

// Function to handle the sort criteria selection
document.querySelectorAll('input[name="sort"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const sortValue = this.value;

        let sortCriteria = null;
        let sortOrder = 'asc';

        if (sortValue === 'price') {
            sortCriteria = 'price';
            sortOrder = currentSortOrder; // Maintain the current sort order
        } else if (sortValue === 'rating') {
            sortCriteria = 'rating';
        } else if (sortValue === 'name-asc') {
            sortCriteria = 'name';
            sortOrder = 'asc';
        } else if (sortValue === 'name-desc') {
            sortCriteria = 'name';
            sortOrder = 'desc';
        }

        // Load wishlist with selected sorting criteria and order
        loadWishlistItems(sortCriteria, sortOrder); 
    });
});

// Handle sorting by price and toggle arrow direction
document.getElementById('priceArrow').addEventListener('click', function() {
    const priceArrow = document.getElementById('priceArrow');

    // Toggle sorting order between ascending and descending
    if (currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
        priceArrow.classList.remove('fa-arrow-up');
        priceArrow.classList.add('fa-arrow-down');
    } else {
        currentSortOrder = 'asc';
        priceArrow.classList.remove('fa-arrow-down');
        priceArrow.classList.add('fa-arrow-up');
    }

    // Sort by price using the updated order
    currentSortCriteria = 'price';
    loadWishlistItems('price', currentSortOrder); // Reload with new sorting order
});

// Function to attach event listeners to wishlist buttons
function attachWishlistEventListeners() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product-name');
            const product = productsData.find(item => item.name === productName);  // Find the product by name

            // Call addToWishlist and pass the button element for CSS updates
            addToWishlist(product.name, product.image, product.price, product.sold, product.stars, this);
            loadWishlistItems(); 
        });
    });
}

// Load wishlist items when the page loads, no sorting applied 
window.onload = () => loadWishlistItems();