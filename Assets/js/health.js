

/*-----------------------Cart---------------------*/
function addToCart(name, price, image) {
    // Retrieve the cart from localStorage, or start with an empty array if null
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        // If it exists, just increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If it's new, push a clean object
        cart.push({
            name: name,
            price: parseFloat(price), // Ensure price is a number, not a string
            image: image,
            quantity: 1
        });
    }

    // Save the updated array back to localStorage as a JSON string
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optional: Feedback for the user
    console.log("Cart updated:", cart);
}

      
//Search


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('productSearch');
    const products = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('nohealthResults');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let hasResults = false;

        products.forEach(card => {
            // Get the text from the h3 (Product Name)
            const productName = card.querySelector('h3').textContent.toLowerCase();
            
            // Also check the category or description if you want broader search
            const productCategory = card.getAttribute('data-category').toLowerCase();

            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/Hide the "No results found" div
        if (hasResults) {
            noResultsMessage.classList.add('hidden');
        } else {
            noResultsMessage.classList.remove('hidden');
        }
    });
});


//health Filter------------------------------------------
// 1. Initial State
let activehealthCategory = 'All';
let activehealthScent = 'All';
let maxhealthPrice = 100;
let healthSearchTerm = '';

// 2. The Filter Logic
function applyAllhealthFilters() {
    // Select cards every time the function runs to ensure we have the current list
    const healthCards = document.querySelectorAll('#healthingGrid .product-card');
    let visibleCount = 0;

    healthCards.forEach(card => {
        // Pull data from your HTML attributes
        const productCategory = card.getAttribute('data-category');
        const productScent = card.getAttribute('data-scent');
        const productPrice = parseFloat(card.getAttribute('data-price'));
        const productName = card.querySelector('h3').textContent.toLowerCase();

        // Matching Logic
        const matchesCategory = (activehealthCategory === 'All' || productCategory === activehealthCategory);
        const matchesScent = (activehealthScent === 'All' || productScent === activehealthScent);
        const matchesPrice = (productPrice <= maxhealthPrice);
        const matchesSearch = productName.includes(healthSearchTerm);

        if (matchesCategory && matchesScent && matchesPrice && matchesSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Handle "No Results" message
    const noResults = document.getElementById('nohealthResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// 3. UI Interactions
function filterCategory(category, button) {
    activehealthCategory = category;

    // Update Pill Styles
    document.querySelectorAll('.category-pill').forEach(btn => {
        btn.classList.remove('bg-[#B13636]', 'text-white', 'shadow-lg');
        btn.classList.add('bg-[#EBE3DB]', 'text-gray-700');
    });
    button.classList.replace('bg-[#EBE3DB]', 'bg-[#B13636]');
    button.classList.replace('text-gray-700', 'text-white');
    button.classList.add('shadow-lg');

    applyAllhealthFilters();
}

function toggleScent(scent, button) {
    if (activehealthScent === scent) {
        activehealthScent = 'All';
        button.classList.remove('bg-[#B13636]', 'text-white');
    } else {
        activehealthScent = scent;
        document.querySelectorAll('.scent-pill').forEach(btn => {
            btn.classList.remove('bg-[#B13636]', 'text-white');
        });
        button.classList.add('bg-[#B13636]', 'text-white');
    }
    applyAllhealthFilters();
}

// 4. Initialize Listeners on Load
document.addEventListener('DOMContentLoaded', () => {
    const priceRangeInput = document.getElementById('priceRange');
    const priceValueDisplay = document.getElementById('priceValue');
    const healthSearchInput = document.getElementById('productSearch');

    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', (e) => {
            maxhealthPrice = parseFloat(e.target.value);
            priceValueDisplay.textContent = `$${maxhealthPrice}`;
            applyAllhealthFilters();
        });
    }

    if (healthSearchInput) {
        healthSearchInput.addEventListener('input', (e) => {
            healthSearchTerm = e.target.value.toLowerCase();
            applyAllhealthFilters();
        });
    }

    // Run once to set initial view
    applyAllhealthFilters();
});