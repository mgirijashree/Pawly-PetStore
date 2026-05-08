document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();
});

// 1. Core function to display items and calculate totals
function renderOrderSummary() {
    const cartItemsList = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalAmountEl = document.getElementById('totalAmount');
    
    // Get items from localStorage (assuming they are stored as an array of objects)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p class="text-center py-10 text-gray-400">Your cart is empty.</p>`;
        updateTotals(0);
        return;
    }

    // Render items with the "Anti-Overflow" structure we discussed
    cartItemsList.innerHTML = cart.map((item, index) => `
        <div class="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-3xl border border-[#F3ECE6]">
            <div class="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                <img src="${item.image || 'https://via.placeholder.com/150'}" 
                     class="w-full h-full object-cover" alt="${item.name}">
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                    <h4 class="text-sm font-bold text-[#4A3F3F] truncate">${item.name}</h4>
                    <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500 flex-shrink-0">
                        <i class="bi bi-trash3 text-xs"></i>
                    </button>
                </div>
                <p class="text-[10px] text-gray-400 uppercase">${item.category || 'Premium Care'}</p>
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center bg-white border border-[#E8DED7] rounded-full px-2 py-0.5">
                        <button onclick="updateQty(${index}, -1)" class="text-gray-400 text-xs">-</button>
                        <span class="text-[10px] font-bold px-2">${item.quantity}</span>
                        <button onclick="updateQty(${index}, 1)" class="text-gray-400 text-xs">+</button>
                    </div>
                    <span class="font-bold text-[#B7104D] text-sm">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Calculate Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateTotals(subtotal);
}

// 2. Calculation logic
function updateTotals(subtotal) {
    const taxRate = 0.08;
    const shipping = 0.00; // Free shipping as per your design
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shipping;

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').innerText = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    document.getElementById('totalAmount').innerText = `$${total.toFixed(2)}`;
}

// 3. Helper: Update Quantity
window.updateQty = (index, change) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderOrderSummary();
};

// 4. Helper: Remove Item
window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderOrderSummary();
};

// 5. Promo Code Logic
window.applyPromo = () => {
    const input = document.getElementById('promoInput');
    const totalEl = document.getElementById('totalAmount');
    let currentTotal = parseFloat(totalEl.innerText.replace('$', ''));

    if (input.value.toUpperCase() === 'PAWLY10') {
        const discount = currentTotal * 0.10;
        const newTotal = currentTotal - discount;
        totalEl.innerText = `$${newTotal.toFixed(2)}`;
        alert('Promo Applied! 10% discount subtracted from total.');
        input.disabled = true; // Prevent double usage
    } else {
        alert('Invalid Promo Code');
    }
};