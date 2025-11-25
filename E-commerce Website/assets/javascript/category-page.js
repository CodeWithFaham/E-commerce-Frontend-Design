document.addEventListener('DOMContentLoaded', () => {
    const productView = document.getElementById('product-view');
    const listViewBtn = document.getElementById('list-view-btn');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const sortSelect = document.getElementById('sort-select');
    
    const sidebarInputs = document.querySelectorAll('.sidebar-filters input[type="checkbox"], .sidebar-filters input[type="radio"]');
    const applyPriceBtn = document.getElementById('apply-price');
    let productCards = Array.from(document.querySelectorAll('.product-item-cell'));

    function toggleView(viewType) {
        if (viewType === 'list') {
            productView.classList.remove('grid-view');
            productView.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        } else {
            productView.classList.remove('list-view');
            productView.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        }
    }

    listViewBtn.addEventListener('click', () => toggleView('list'));
    gridViewBtn.addEventListener('click', () => toggleView('grid'));

    function applyFilters() {
        const activeBrands = [];
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

        document.querySelectorAll('.brand-group input:checked').forEach(checkbox => {
            activeBrands.push(checkbox.value.toLowerCase());
        });

        const selectedRatings = Array.from(document.querySelectorAll('.rating-group input:checked')).map(checkbox => parseInt(checkbox.value));
        const requiredMinStarCount = selectedRatings.length > 0 ? Math.min(...selectedRatings) : 0;

        productCards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand') ? card.getAttribute('data-brand').toLowerCase() : '';
            const cardPrice = parseFloat(card.getAttribute('data-price'));
            const cardRating = parseFloat(card.getAttribute('data-rating'));

            let isVisible = true;

            if (activeBrands.length > 0 && !activeBrands.includes(cardBrand)) {
                isVisible = false;
            }

            if (cardPrice < minPrice || cardPrice > maxPrice) {
                isVisible = false;
            }
            
            if (requiredMinStarCount > 0 && cardRating < (requiredMinStarCount * 1.5)) { 
                isVisible = false;
            }

            card.style.display = isVisible ? '' : 'none';
        });
        
        applySorting();
    }

    function applySorting() {
        const sortBy = sortSelect.value;

        productCards.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));

            if (sortBy === 'price-asc') {
                return priceA - priceB;
            } else if (sortBy === 'price-desc') {
                return priceB - priceA;
            } else if (sortBy === 'rating') {
                return ratingB - ratingA;
            }
            return 0;
        });

        productCards.forEach(card => {
            productView.appendChild(card);
        });
    }
    
    sidebarInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    applyPriceBtn.addEventListener('click', applyFilters);
    
    sortSelect.addEventListener('change', applySorting);
    
    toggleView('grid'); 
    applySorting();
});