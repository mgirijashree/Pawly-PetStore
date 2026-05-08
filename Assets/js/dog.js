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

//Filter
document.addEventListener('DOMContentLoaded', () => {
    const priceSlider = document.querySelector('input[type="range"]');
    // More robust way to find the price display span
    const priceDisplay = document.querySelector('.justify-between span:last-child');
    const brandCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
        const maxPrice = parseFloat(priceSlider.value);
        
        // 1. Update the price text dynamically
        if (priceDisplay) {
            priceDisplay.textContent = `$${maxPrice}`;
        }

        // 2. Get array of checked brands (cleaned of extra whitespace)
        const activeBrands = Array.from(brandCheckboxes)
            .filter(i => i.checked)
            .map(i => i.nextElementSibling.textContent.trim());

        // 3. Loop through cards
        productCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            const brand = card.getAttribute('data-brand');
            
            // Logic: Show if (No brands selected OR brand matches) AND (Price is <= slider)
            const matchesBrand = activeBrands.length === 0 || activeBrands.includes(brand);
            const matchesPrice = price <= maxPrice;

            if (matchesBrand && matchesPrice) {
                card.style.setProperty('display', 'block', 'important');
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // Event Listeners
    priceSlider.addEventListener('input', filterProducts);
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Run once on load to set initial state
    filterProducts();
});