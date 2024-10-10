    // Function to load items from localStorage and display them in the cart
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartBody = document.getElementById('cart-items');
        const checkoutButton = document.querySelector('#cart-total .normal'); // Get the checkout button
        
        cartBody.innerHTML = ''; // Clear existing items

        if (cartItems.length > 0) { // Ensure there are items in the cart
            cartItems.forEach(item => {
                const itemName = item.name || 'Unknown Product';
                const itemImage = item.image || 'icon/Jeans.png';
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
            checkoutButton.style.display = 'block'; // Show the checkout button
        } else {
            checkoutButton.style.display = 'none'; // Hide the checkout button
        }

        updateCartTotal(cartItems); // Update cart total at the end
    }

    // Function to update the quantity of an item
    function updateQuantity(name, newQuantity) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        cartItems = cartItems.map(item => {
            if (item.name === name) {
                item.quantity = parseInt(newQuantity);
            }
            return item;
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems(); // Reload the cart to reflect changes
    }

    // Function to remove an item from the cart
    function removeItem(name) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems(); // Reload the cart to reflect changes
    }

    // Function to update the total cost of the cart
    function updateCartTotal(cartItems) {
        const couponDiscount = parseInt(localStorage.getItem('couponDiscount')) || 0; // Get the coupon discount
        const total = cartItems.reduce((sum, item) => {
            const itemPrice = parseFloat(item.price.replace(/Rp/g, '').replace(/\./g, '').trim()) || 0;
            return sum + (itemPrice * item.quantity);
        }, 0);

        const finalTotal = total; // Apply the coupon discount

        if (finalTotal === 0) {
            localStorage.removeItem('couponDiscount');
        }
        
        // Save the total to localStorage
        localStorage.setItem('cartTotal', finalTotal);

        // Display the totals in the "Cart Total" section
        document.querySelector('#cart-total table tr:nth-child(1) td:last-child').innerText = total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
        document.querySelector('#cart-total table tr:nth-child(2) td:last-child').innerText = couponDiscount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
        document.querySelector('#cart-total table tr:nth-child(3) td:last-child').innerText = finalTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    // Function to handle page load logic
    function handlePageLoad() {
        const currentPage = window.location.pathname;

        // Keep coupon discount if on cart.html or checkout.html
        if (!(currentPage.endsWith('cart.html') || currentPage.endsWith('checkout.html'))) {
            // Reset the coupon discount if navigating away from cart or checkout
            localStorage.removeItem('couponDiscount');
        }

        loadCartItems(); // Load the cart items
    }

    // Load cart items when the page loads
    window.addEventListener('DOMContentLoaded', handlePageLoad);

    // Function to apply coupon
    function applyCoupon() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get current cart items
        const couponInput = document.querySelector('input[placeholder="Please enter your coupon"]');
        const couponCode = couponInput.value.trim().toUpperCase();
        const coupons = {
            'DISCOUNT10': 10000, // 10,000 discount
            'DISCOUNT20': 20000, // 20,000 discount
            // Add more coupons as needed
        };

        // Check if cart is empty
        if (cartItems.length === 0) {
            alert('Please add items to your cart before applying a coupon.');
            return; // Exit the function if cart is empty
        }

        const discountValue = coupons[couponCode] || 0; // Get discount value or 0 if invalid

        // Store the discount in localStorage
        if (discountValue > 0) {
            localStorage.setItem('couponDiscount', discountValue);
            alert(`Coupon applied! You saved Rp ${discountValue}.`);
        } else {
            alert('Invalid coupon code.');
        }

        loadCartItems(); // Update the cart total display
    }

    // Attach the applyCoupon function to the Apply button
    document.querySelector('.coupon button').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        applyCoupon();
    });
