// 1. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems(); 
});

// 2. CORE FUNCTIONS
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity across all unique items
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

    const countHeader = document.getElementById('cartCountHeader'); 
    const navCount = document.getElementById('navCartCount');       

    if (countHeader) {
        countHeader.innerText = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }

    if (navCount) {
        navCount.innerText = totalItems;
        navCount.style.display = totalItems === 0 ? 'none' : 'flex';
    }
}

function displayCartItems() {
    const cartContainer = document.getElementById('cartItemsList');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center py-10 text-gray-500">Your cart is empty.</p>';
        updateSummary(0);
        updateCartCount(); // Keeps the header in sync
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * (item.quantity || 1);
        
        const itemHTML = `
            <div class="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-6 mb-4">
                <div class="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src="${item.image}" class="w-full h-full object-cover" alt="${item.name}">
                </div>
                <div class="flex-1 flex flex-col">
                    <div class="flex justify-between">
                        <h3 class="font-bold text-xl text-gray-900">${item.name}</h3>
                        <span class="text-2xl font-bold text-[#B7104D]">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p class="text-gray-400 text-sm mt-1">${item.category || 'Premium Care'}</p>
                    <div class="flex justify-between items-center mt-6">
                        <div class="flex items-center border border-gray-200 rounded-full px-4 py-1 gap-4">
                            <button onclick="changeQuantity(${index}, -1)" class="text-gray-400 hover:text-black">-</button>
                            <span class="font-bold">${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)" class="text-gray-400 hover:text-black">+</button>
                        </div>
                        <button onclick="removeFromCart(${index})" class="hover:text-red-500 text-gray-400 text-sm">
                            <i class="bi bi-trash mr-1"></i> Remove
                        </button>
                    </div>
                </div>
            </div>`;
        cartContainer.innerHTML += itemHTML;
    });

    updateSummary(subtotal);
    updateCartCount(); // This updates the bubbles every time the list is drawn
}

function updateSummary(subtotal) {
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Check if elements exist before updating to avoid console errors
    if(document.getElementById('subtotal')) document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    if(document.getElementById('shipping')) document.getElementById('shipping').innerText = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if(document.getElementById('tax')) document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    if(document.getElementById('totalAmount')) document.getElementById('totalAmount').innerText = `$${total.toFixed(2)}`;
}

// 3. USER ACTIONS
function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity += delta;

    if (cart[index].quantity < 1) {
        removeFromCart(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); 
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateSummary(subtotal) {
    const goal = 100; // Free delivery goal
    const shipping = subtotal >= goal || subtotal === 0 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // 1. Calculate Progress Bar
    const progressPercent = Math.min((subtotal / goal) * 100, 100); 
    const remaining = Math.max(goal - subtotal, 0);

    // 2. Update the Progress Bar UI
    const progressBar = document.getElementById('deliveryProgress');
    const progressText = document.getElementById('deliveryText');

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }

    if (progressText) {
        if (remaining > 0) {
            progressText.innerText = `$${remaining.toFixed(2)} more for free delivery`;
        } else {
            progressText.innerText = `You've unlocked FREE delivery!`;
        }
    }

    // 3. Update the Sidebar totals (Existing logic)
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').innerText = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('totalAmount').innerText = `$${total.toFixed(2)}`;
}