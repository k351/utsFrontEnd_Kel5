// Function to load items from localStorage and display them in the cart
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBody = document.getElementById('cart-items');
    
    cartBody.innerHTML = ''; // Clear existing items

    if (cartItems.length > 0) { // Ensure there are items in the cart
        cartItems.forEach(item => {
            // Ensure that the required properties exist
            const itemName = item.name || 'Unknown Product';
            const itemImage = item.image || 'path/to/default/image.png'; // Add a default image path
            const itemPrice = item.price || 'Rp0'; // Fallback price
            const itemQuantity = item.quantity || 1;

            // Only proceed if itemPrice is defined and valid
            if (itemPrice && itemName !== 'Unknown Product') {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="#" onclick="removeItem('${itemName}')"><i class="fa-regular fa-circle-xmark"></i></a></td>
                    <td><img src="${itemImage}" alt=""></td>
                    <td>${itemName}</td>
                    <td>${itemPrice}</td>
                    <td><input type="number" value="${itemQuantity}" min="1" onchange="updateQuantity('${itemName}', this.value)"></td>
                    <td>${(parseFloat(itemPrice.replace(/Rp/g, '').replace(/\./g, '').trim()) * itemQuantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                `;
                cartBody.appendChild(row);
            }
        });
    }

    // Update cart total at the end
    updateCartTotal(cartItems);
}

// Function to update the quantity of an item
function updateQuantity(name, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the item in the cart and update its quantity
    cartItems = cartItems.map(item => {
        if (item.name === name) {
            item.quantity = parseInt(newQuantity);
        }
        return item;
    });

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Reload the cart to reflect changes
    loadCartItems();
}

// Function to remove an item from the cart
function removeItem(name) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Filter out the item to be removed
    cartItems = cartItems.filter(item => item.name !== name);

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Reload the cart to reflect changes
    loadCartItems();
}

// Function to update the total cost of the cart
function updateCartTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price.replace(/Rp/g, '').replace(/\./g, '').trim()) || 0;
        return sum + (itemPrice * item.quantity);
    }, 0);

    // Display the total cost in the "Cart Total" section
    document.querySelector('#cart-total table tr:nth-child(3) td:last-child').innerText = total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

// Load cart items when the page loads
window.onload = loadCartItems;
