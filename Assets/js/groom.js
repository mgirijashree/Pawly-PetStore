

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


      
//Search


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('productSearch');
    const products = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('noGroomResults');

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


//Groom Filter------------------------------------------
// 1. Initial State
let activeGroomCategory = 'All';
let activeGroomScent = 'All';
let maxGroomPrice = 100;
let groomSearchTerm = '';

// 2. The Filter Logic
function applyAllGroomFilters() {
    // Select cards every time the function runs to ensure we have the current list
    const groomCards = document.querySelectorAll('#groomingGrid .product-card');
    let visibleCount = 0;

    groomCards.forEach(card => {
        // Pull data from your HTML attributes
        const productCategory = card.getAttribute('data-category');
        const productScent = card.getAttribute('data-scent');
        const productPrice = parseFloat(card.getAttribute('data-price'));
        const productName = card.querySelector('h3').textContent.toLowerCase();

        // Matching Logic
        const matchesCategory = (activeGroomCategory === 'All' || productCategory === activeGroomCategory);
        const matchesScent = (activeGroomScent === 'All' || productScent === activeGroomScent);
        const matchesPrice = (productPrice <= maxGroomPrice);
        const matchesSearch = productName.includes(groomSearchTerm);

        if (matchesCategory && matchesScent && matchesPrice && matchesSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Handle "No Results" message
    const noResults = document.getElementById('noGroomResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// 3. UI Interactions
function filterCategory(category, button) {
    activeGroomCategory = category;

    // Update Pill Styles
    document.querySelectorAll('.category-pill').forEach(btn => {
        btn.classList.remove('bg-[#B13636]', 'text-white', 'shadow-lg');
        btn.classList.add('bg-[#EBE3DB]', 'text-gray-700');
    });
    button.classList.replace('bg-[#EBE3DB]', 'bg-[#B13636]');
    button.classList.replace('text-gray-700', 'text-white');
    button.classList.add('shadow-lg');

    applyAllGroomFilters();
}

function toggleScent(scent, button) {
    if (activeGroomScent === scent) {
        activeGroomScent = 'All';
        button.classList.remove('bg-[#B13636]', 'text-white');
    } else {
        activeGroomScent = scent;
        document.querySelectorAll('.scent-pill').forEach(btn => {
            btn.classList.remove('bg-[#B13636]', 'text-white');
        });
        button.classList.add('bg-[#B13636]', 'text-white');
    }
    applyAllGroomFilters();
}

// 4. Initialize Listeners on Load
document.addEventListener('DOMContentLoaded', () => {
    const priceRangeInput = document.getElementById('priceRange');
    const priceValueDisplay = document.getElementById('priceValue');
    const groomSearchInput = document.getElementById('productSearch');

    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', (e) => {
            maxGroomPrice = parseFloat(e.target.value);
            priceValueDisplay.textContent = `$${maxGroomPrice}`;
            applyAllGroomFilters();
        });
    }

    if (groomSearchInput) {
        groomSearchInput.addEventListener('input', (e) => {
            groomSearchTerm = e.target.value.toLowerCase();
            applyAllGroomFilters();
        });
    }

    // Run once to set initial view
    applyAllGroomFilters();
});