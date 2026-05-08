
let products = []; // Start with an empty list

// fetch from JSON file
async function loadProducts() {
    try {
        const response = await fetch('./Assets/js/products.json');
        products = await response.json(); // Convert file to JS list
        displayProducts(products);
    } catch (error) {
        console.error("Oops! Could not load the products:", error);
    }
}

// Call function on page starts
loadProducts();



/*------------------------Curated HTML Card----------------------------------*/


// Function to load and display products
async function loadProducts() {
    // Fetch JSON Data (Assuming it's in products.json)
    const response = await fetch('products.json');
    const products = await response.json();

    const grid = document.getElementById('product-grid');

    // HTML for each card
    grid.innerHTML = products.map(product => `
        <div class="bg-white p-8 card-soft shadow-sm relative card-container flex flex-col">
            <span class="absolute top-10 left-10 z-10 bg-[#B7104D] text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
                ${product.category}
            </span>

           <div class="bg-[#FAF3ED] rounded-xl p-4 mb-4 flex items-center justify-center h-48">
    <img src="${product.image}" class="max-h-full max-w-full object-contain">
</div>

            <h3 class="font-bold text-xl text-gray-900 mb-2">${product.name}</h3>
            <p class="text-gray-500 text-sm mb-8 leading-relaxed">${product.desc}</p>

            <div class="flex justify-between items-center mt-auto">
                <span class="text-3xl font-black text-[#B7104D]">$${product.price.toFixed(2)}</span>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" 
                        class="bg-[#E5E7EB] p-4 rounded-full hover:bg-[#B7104D] hover:text-white transition-colors">
                    <i class="bi bi-cart-plus text-xl"></i>
                </button>
            </div>
        </div>
    `).join('');
}



/*---------------------Toggle FAQ--------------------*/
function toggleFAQ(button) {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const icon = button.querySelector('i');

    // Check if the item is already open
    const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

    if (isOpen) {
        answer.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    } else {
        // This calculates the exact height of the text inside
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
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