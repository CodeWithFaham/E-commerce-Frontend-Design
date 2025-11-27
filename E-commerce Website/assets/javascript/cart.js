document.addEventListener('DOMContentLoaded', () => {
    updateCartSummary();
    updateItemCount();

    const removeButtons = document.querySelectorAll('.action-btn');
    removeButtons.forEach(btn => {
        if(btn.innerText.trim() === 'Remove') {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                cartItem.remove();
                updateItemCount();
                updateCartSummary();
            });
        }
    });

    const qtySelects = document.querySelectorAll('.qty-control select');
    qtySelects.forEach(select => {
        select.addEventListener('change', updateCartSummary);
    });

    const removeAllBtn = document.querySelector('.btn-remove-all');
    if(removeAllBtn) {
        removeAllBtn.addEventListener('click', () => {
            const items = document.querySelectorAll('.cart-item');
            items.forEach(item => item.remove());
            updateItemCount();
            updateCartSummary();
        });
    }
});

const updateItemCount = () => {
    const items = document.querySelectorAll('.cart-item');
    const title = document.querySelector('.page-title');
    if(title) {
        title.innerText = `My cart (${items.length})`;
    }
};

const updateCartSummary = () => {
    let subtotal = 0;
    
    const items = document.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        const priceText = item.querySelector('.item-price').innerText.replace('$', '');
        const price = parseFloat(priceText);
        
        const qtySelect = item.querySelector('.qty-control select');
        const qty = parseInt(qtySelect.value);
        
        subtotal += (price * qty);
    });

    let discount = subtotal > 0 ? 60.00 : 0;
    let tax = subtotal > 0 ? 14.00 : 0;
    
    if (items.length === 0) {
        discount = 0;
        tax = 0;
    }

    let total = subtotal - discount + tax;

    const summaryLines = document.querySelectorAll('.summary-details .summary-line');
    
    if(summaryLines.length >= 4) {
        summaryLines[0].querySelector('span:last-child').innerText = `$${subtotal.toFixed(2)}`;
        summaryLines[1].querySelector('span:last-child').innerText = `-$${discount.toFixed(2)}`;
        summaryLines[2].querySelector('span:last-child').innerText = `+$${tax.toFixed(2)}`;
        document.querySelector('.total-price').innerText = `$${total.toFixed(2)}`;
    }
};

const performSearch = () => {
    alert("Search functionality abhi connect nahi hai.");
};

const subscribeUser = (event) => {
    event.preventDefault();
    alert("Subscribe karne ke liye shukriya!");
};