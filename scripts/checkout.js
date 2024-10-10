// Retrieve the cart total and discount from localStorage
const cartTotal = localStorage.getItem('cartTotal');
const discount = localStorage.getItem('couponDiscount') || 0; // Fetch coupon discount; default to 0 if not set

// Format the values for display
const formattedCartTotal = cartTotal ? Number(cartTotal).toLocaleString('id-ID') : '0';
const formattedDiscount = discount ? `Rp ${Number(discount).toLocaleString('id-ID')}` : 'Rp 0';

// Calculate the final total
const finalTotal = (cartTotal ? Number(cartTotal) : 0) - (discount ? Number(discount) : 0);
const formattedFinalTotal = `Rp ${finalTotal.toLocaleString('id-ID')}`;

// Update the checkout total table
document.addEventListener('DOMContentLoaded', () => {
    const cartTotalCell = document.querySelector('#cart-total-cell');
    const discountCell = document.querySelector('#discount-cell');
    const totalCell = document.querySelector('#total-cell');

    if (cartTotalCell) {
        cartTotalCell.innerText = `Rp ${formattedCartTotal}`; // Update the cart total cell
    }
    if (discountCell) {
        discountCell.innerText = formattedDiscount; // Update the discount cell
    }
    if (totalCell) {
        totalCell.innerText = formattedFinalTotal; // Update the final total cell
    }
});

document.getElementById('edit-address-btn').addEventListener('click', function () {
    const contactPerson = document.getElementById('contact-person');
    const phoneNumber = document.getElementById('phone-number');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postcode = document.getElementById('postcode');

    contactPerson.innerHTML = `<input type="text" id="edit-contact-person" value="${contactPerson.innerText}">`;
    phoneNumber.innerHTML = `<input type="text" id="edit-phone-number" value="${phoneNumber.innerText}">`;
    address.innerHTML = `<input type="text" id="edit-address" value="${address.innerText}">`;
    city.innerHTML = `<input type="text" id="edit-city" value="${city.innerText}">`;
    postcode.innerHTML = `<input type="text" id="edit-postcode" value="${postcode.innerText}">`;

    document.getElementById('edit-address-btn').style.display = 'none';
    document.getElementById('save-address-btn').style.display = 'inline-block';
    document.getElementById('cancel-btn').style.display = 'inline-block';
});

// Save address functionality
document.getElementById('save-address-btn').addEventListener('click', function () {
    const newContactPerson = document.getElementById('edit-contact-person').value;
    const newPhoneNumber = document.getElementById('edit-phone-number').value;
    const newAddress = document.getElementById('edit-address').value;
    const newCity = document.getElementById('edit-city').value;
    const newPostcode = document.getElementById('edit-postcode').value;

    document.getElementById('contact-person').innerText = newContactPerson;
    document.getElementById('phone-number').innerText = newPhoneNumber;
    document.getElementById('address').innerText = newAddress;
    document.getElementById('city').innerText = newCity;
    document.getElementById('postcode').innerText = newPostcode;

    document.getElementById('edit-address-btn').style.display = 'inline-block';
    document.getElementById('save-address-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'none';
});

// Cancel functionality
document.getElementById('cancel-btn').addEventListener('click', function () {
    const contactPerson = document.getElementById('contact-person');
    const phoneNumber = document.getElementById('phone-number');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postcode = document.getElementById('postcode');

    contactPerson.innerHTML = contactPerson.querySelector('input').value;
    phoneNumber.innerHTML = phoneNumber.querySelector('input').value;
    address.innerHTML = address.querySelector('input').value;
    city.innerHTML = city.querySelector('input').value;
    postcode.innerHTML = postcode.querySelector('input').value;

    document.getElementById('edit-address-btn').style.display = 'inline-block';
    document.getElementById('save-address-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'none';
});

// Reset cart and checkout data
function resetCartAndCheckoutData() {
    // Clear the cart items and totals in localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('couponDiscount'); // Ensure correct item name is used for coupon discount

    // Clear the cart display
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
    }

    const cartTotalCell = document.querySelector('#cart-total-cell');
    const discountCell = document.querySelector('#discount-cell');
    const totalCell = document.querySelector('#total-cell');
    
    if (cartTotalCell) {
        cartTotalCell.innerText = 'Rp 0';
    }

    if (discountCell) {
        discountCell.innerText = 'Rp 0';
    }

    if (totalCell) {
        totalCell.innerText = 'Rp 0';
    }

    // Reset the address information
    const contactPerson = document.getElementById('contact-person');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postcode = document.getElementById('postcode');
    
    if (contactPerson) {
        contactPerson.innerText = '';
    }

    if (address) {
        address.innerText = '';
    }

    if (city) {
        city.innerText = '';
    }

    if (postcode) {
        postcode.innerText = '';
    }
}

// Checkout button functionality
document.getElementById('checkout-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent immediate navigation

    // Get address fields
    const contactPerson = document.getElementById('contact-person').innerText.trim();
    const phoneNumber = document.getElementById('phone-number').innerText.trim();
    const address = document.getElementById('address').innerText.trim();
    const city = document.getElementById('city').innerText.trim();
    const postcode = document.getElementById('postcode').innerText.trim();
    
    // Validate if fields are empty
    if (!contactPerson || !phoneNumber || !address || !city || !postcode) {
        alert("Please fill in all address details");
        return; // Prevent proceeding if validation fails
    }

    // Check if the cart total is zero
    if (finalTotal === 0) {
        alert("You have nothing in your cart."); // Alert if total is zero
        return; // Prevent proceeding if the cart is empty
    }
    
    resetCartAndCheckoutData(); // Reset cart and address data
    alert("Berhasil Check Out!"); // Notify user
    
    // Delay redirect to allow UI to update
    setTimeout(function() {
        window.location.href = "index.html"; // Redirect to homepage
    }, 500); // Delay for 500ms (0.5 second)
});
