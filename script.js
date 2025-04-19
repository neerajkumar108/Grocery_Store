// Sample products data
const products = [
    { id: 1, name: 'Sugar', price: 50 },
    { id: 2, name: 'Capsicum - Green (Loose)', price: 48 },
    { id: 3, name: 'Cauliflower', price: 25 },
    { id: 4, name: 'Coriander Leaves', price: 30 },
    { id: 5, name: 'Cucumber', price: 25 },
    { id: 6, name: 'Ladies Fingers', price: 40 },
    { id: 7, name: 'Onion', price: 36 },
    { id: 8, name: 'Potato', price: 20 },
    { id: 9, name: 'Tomato', price: 40 },
    { id: 10, name: 'Beans', price: 120 }
];

// ✅ Show toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3000);
    }
}

// ✅ Update cart icon badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');
    cartLinks.forEach(link => {
        let badge = link.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            link.appendChild(badge);
        }
        badge.textContent = cart.length;
    });
}

// ✅ Add item to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast(`${product.name} added to cart`);
        updateCartBadge();

        // Disable button and show tick mark
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            if (button.getAttribute('onclick') === `addToCart(${productId})`) {
                button.style.backgroundColor = 'green';
                button.textContent = 'Added';
                button.disabled = true;
                const tick = button.nextElementSibling;
                if (tick && tick.classList.contains('added-to-cart')) {
                    tick.style.display = 'inline';
                }
            }
        });
    }
}

// ✅ Display cart items and total
function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalCostEl = document.getElementById('total-cost');
    
    if (!cartList || !totalCostEl) return;

    cartList.innerHTML = '';
    let totalCost = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
        totalCost += item.price;
    });

    totalCostEl.textContent = `Total: ₹${totalCost.toFixed(2)}`;
}

// ✅ Handle checkout
function checkout() {
    alert('Checkout successful!');
    localStorage.removeItem('cart');
    updateCartUI();
    updateCartBadge();
}

// ✅ Initialize everything on page load
window.onload = () => {
    updateCartBadge();
    if (typeof updateCartUI === "function") {
        updateCartUI();
    }
};
