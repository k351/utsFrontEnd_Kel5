// Function to add or remove items from the wishlist
function addToWishlist(name, image, price, sold, stars, element) {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    // Check if the item is already in the wishlist
    const existingItem = wishlistItems.find(item => item.name === name);

    if (existingItem) {
        // If the item exists, remove it from the wishlist
        const updatedWishlist = wishlistItems.filter(item => item.name !== name);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
        alert('Item removed from wishlist!');
        updateIconState(name, false, element);  
    } else {
        // If the item doesn't exist, add it to the wishlist
        wishlistItems.push({ name, image, price, sold, stars });
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        alert('Item added to wishlist!');
        updateIconState(name, true, element);  
    }

    console.log(JSON.parse(localStorage.getItem('wishlistItems')));  
}

// Function to update the heart icon and save its state to localStorage
function updateIconState(productName, isAdded, element) {
    let iconStates = JSON.parse(localStorage.getItem('wishlistIconStates')) || {};

    // Update the icon state in localStorage
    if (isAdded) {
        iconStates[productName] = true;  
    } else {
        delete iconStates[productName];  
    }

    // Update the icon visually
    const heartIcon = element.querySelector('i');
    if (isAdded) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.style.color = 'var(--secondary-color)';
    } else {
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.style.color = 'gray';
    }

    localStorage.setItem('wishlistIconStates', JSON.stringify(iconStates));
}

// Function to load the saved heart icon states from localStorage
function loadIconStates() {
    return JSON.parse(localStorage.getItem('wishlistIconStates')) || {};
}

export { addToWishlist, loadIconStates };
