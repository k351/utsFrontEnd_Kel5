function addToCart(name, image, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, image, price, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    console.log(JSON.parse(localStorage.getItem('cartItems')));
    
    alert('Item added to cart!');
}        
