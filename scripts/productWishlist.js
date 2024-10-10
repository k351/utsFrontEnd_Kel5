import productsData from './productsData.js';
import { addToWishlist, loadIconStates } from './addToWishlist.js';


document.addEventListener("DOMContentLoaded", function() {
    const productImage = document.querySelector(".product-image");
    const productDataElement = document.getElementById('productData');
    const productData = JSON.parse(productDataElement.textContent);
    const product = productsData.find(item => item.name === productData.name);
    
    const iconStates = loadIconStates();
    const isInWishlist = iconStates[product.name] || false;
    const wishlistButton = document.createElement('button');
    wishlistButton.classList.add('wishlist-btn');
    wishlistButton.setAttribute('aria-label', isInWishlist ? 'Remove from wishlist' : 'Add to wishlist');
    wishlistButton.innerHTML = `<i class="${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"
                                     style="color: ${isInWishlist ? 'var(--secondary-color)' : 'gray'};"></i>`;
    productImage.appendChild(wishlistButton);
        
    wishlistButton.addEventListener('click', function() {
            addToWishlist(product.name, product.image, product.price, product.sold, product.stars, wishlistButton);
    });
});
