/*-----------------------Cart---------------------*/

function addToCart(name, price, image) {
    // 1. Get existing cart or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if item already exists to update quantity instead of duplicating
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }

    // 3. Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${name} added to cart!`);
}
