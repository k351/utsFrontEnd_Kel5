import productsData from './productsData.js';

// Function to render all products (without pagination)
function renderProducts() {
    let productContainer = document.querySelector('.box-container');
    productContainer.innerHTML = '';

    productsData.forEach(product => {
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
            </div>
        `;
        productContainer.innerHTML += productBox;
    });
}

// Function to handle search functionality
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
            </div>
        `;
        productContainer.innerHTML += productBox;
    });
}

// Attach event listener for search bar
document.getElementById('searchBar').addEventListener('input', search);

// Initial load
window.onload = function() {
    renderProducts();
};
