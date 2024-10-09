// Function to load wishlist items from localStorage and display them
function loadWishlistItems() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistContainer = document.getElementById('wishlist-container');
    
    wishlistContainer.innerHTML = ''; // Clear existing items

    if (wishlistItems.length > 0) { // Ensure there are items in the wishlist
        wishlistItems.forEach(product => {
            let productBox = `
            <div class="product-card">
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
                    <i class="fa fa-heart"></i>
                </button>
               <button class="add-cart" onclick="addToCart('${product.name}', '${product.image}', '${product.price}')">+ Keranjang</button>
            </div>
            `;
            wishlistContainer.innerHTML += productBox;
        });
    } else {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty!</p>';
    }
}

// Function to add an item to the cart
function addToCart(name, image, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.name === name);

    // Check if item already exists in the cart
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        cartItems.push({ name, image, price, quantity: 1 }); // Add new item if it doesn't exist
        alert(`${name} has been added to your cart!`);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    console.log(JSON.parse(localStorage.getItem('cartItems'))); // For debugging
    
    // Redirect to the cart page after adding
    window.location.href = './cart.html';
}

// Load wishlist items when the page loads
window.onload = loadWishlistItems;
