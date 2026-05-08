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


/*---  Food Filter ---*/

        const checkboxes = document.querySelectorAll('.filter-check');
        const cards = document.querySelectorAll('.product-card');
        const itemCount = document.getElementById('itemCount');
        const noResults = document.getElementById('noResults');
        const sortSelect = document.getElementById('sortSelect');

        function updateFilter() {
            let activeLife = Array.from(document.querySelectorAll('#lifeFilters input:checked')).map(i => i.value);
            let activeTypes = Array.from(document.querySelectorAll('#typeFilters input:checked')).map(i => i.value);
            
            let visibleCount = 0;

            cards.forEach(card => {
                const cardLife = card.getAttribute('data-life');
                const cardType = card.getAttribute('data-type');

                const lifeMatch = activeLife.length === 0 || activeLife.includes(cardLife);
                const typeMatch = activeTypes.length === 0 || activeTypes.includes(cardType);

                if (lifeMatch && typeMatch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            itemCount.textContent = visibleCount;
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        checkboxes.forEach(box => box.addEventListener('change', updateFilter));
        updateFilter(); // Initial count



        

        // --- SORT LOGIC ---
        sortSelect.addEventListener('change', function() {
            const grid = document.getElementById('productGrid');
            const sortedCards = Array.from(cards);

            if (this.value === 'low') {
                sortedCards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
            } else if (this.value === 'high') {
                sortedCards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
            }

            sortedCards.forEach(card => grid.appendChild(card));
        });

document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sortSelect');
    const productGrid = document.getElementById('productGrid');

    sortSelect.addEventListener('change', function() {
        // Get all current product cards and convert NodeList to an Array
        const cards = Array.from(productGrid.querySelectorAll('.product-card'));
        const sortValue = this.value;

        // sort logic
        if (sortValue === 'low' || sortValue === 'high') {
            cards.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                if (sortValue === 'low') {
                    return priceA - priceB; // Smallest to Largest
                } else {
                    return priceB - priceA; // Largest to Smallest
                }
            });

            // 3. Re-append sorted cards to the grid
            // (appendChild moves existing elements, it doesn't duplicate them)
            cards.forEach(card => productGrid.appendChild(card));
        } else if (sortValue === 'relevance') {
            // Optional: Reload page or re-fetch to reset to original order
            location.reload(); 
        }
    });
});

