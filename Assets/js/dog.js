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


document.addEventListener('DOMContentLoaded', () => {
    const priceSlider = document.querySelector('input[type="range"]');
    const priceDisplay = priceSlider.parentElement.querySelector('.justify-between span:last-child');
    const brandCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');

    // 1. Update price display label dynamically
    priceSlider.addEventListener('input', (e) => {
        priceDisplay.textContent = `$${e.target.value}+`;
        filterProducts();
    });

    // 2. Listen for Brand changes
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        const maxPrice = parseFloat(priceSlider.value);
        
        // Get array of checked brands
        const activeBrands = Array.from(brandCheckboxes)
            .filter(i => i.checked)
            .map(i => i.parentElement.innerText.trim());

        productCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            const brand = card.getAttribute('data-brand');
            
            // Logic: 
            // - If no brands are checked, show all brands.
            // - Otherwise, check if product brand is in activeBrands.
            // - Check if price is <= slider value (or however you prefer the logic).
            
            const matchesBrand = activeBrands.length === 0 || activeBrands.includes(brand);
            const matchesPrice = price <= maxPrice;

            if (matchesBrand && matchesPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize display
    filterProducts();
});

