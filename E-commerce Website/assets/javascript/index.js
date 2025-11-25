
// 1. DEALS SECTION COUNTDOWN TIMER
    // Calculates a countdown (4 days, 13 hours from now) and updates the elements.
document.addEventListener('DOMContentLoaded', () => {

    const initializeCountdown = () => {
        // Countdown date is set to 4 days and 13 hours from the current time.
        const countDownDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (13 * 60 * 60 * 1000);
        
        // Helper to add a leading zero to single digits.
        const pad = (num) => num < 10 ? "0" + num : num;

        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Get elements for display
            const daysElement = document.getElementById("days");
            const hoursElement = document.getElementById("hours");
            const minsElement = document.getElementById("mins");
            const secsElement = document.getElementById("secs");
            
            // Update the display if elements exist
            if(daysElement) daysElement.innerHTML = pad(days);
            if(hoursElement) hoursElement.innerHTML = pad(hours);
            if(minsElement) minsElement.innerHTML = pad(minutes);
            if(secsElement) secsElement.innerHTML = pad(seconds);

            // If the countdown is over, stop the interval and display "00"
            if (distance < 0) {
                clearInterval(x);
                if(daysElement) daysElement.innerHTML = "00";
                if(hoursElement) hoursElement.innerHTML = "00";
                if(minsElement) minsElement.innerHTML = "00";
                if(secsElement) secsElement.innerHTML = "00";
            }
        }, 1000);
    };
    // 2. SEARCH BOX FUNCTIONALITY (Made Global for onclick/Header)
    // Redirects user to a search results page with query and category parameters.

    window.performSearch = () => {
        const query = document.getElementById('searchInput').value.trim();
        const category = document.getElementById('categorySelect').value;

        if (query === "" && category === "all") {
            alert("Please enter a search term or select a specific category!");
            return;
        }

        const encodedQuery = encodeURIComponent(query);
        const encodedCategory = encodeURIComponent(category);
        
        const searchUrl = `search-results.html?q=${encodedQuery}&category=${encodedCategory}`;
        
        window.location.href = searchUrl; 
    };

    const initializeHeaderInteractions = () => {
        // Allows pressing 'Enter' in the search bar to trigger the search function.
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    window.performSearch();
                }
            });
        }
    };


    // 3. FOOTER NEWSLETTER SUBSCRIPTION (Made Global for onclick/Footer)
    // Provides mock success feedback for newsletter subscription.

    window.subscribeUser = (event) => {
        if(event) event.preventDefault();
        
        const emailField = document.getElementById('emailField');
        const btn = document.querySelector('.btn-subscribe');

        if(!emailField || !btn) return;

        const email = emailField.value;

        if(email && email.trim() !== "") {
            // Mock success feedback
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed';
            btn.style.backgroundColor = "#198754"; 
            
            setTimeout(() => {
                emailField.value = "";
                btn.innerText = "Subscribe";
                btn.style.backgroundColor = "#0d6efd"; 
            }, 2000);
        } else {
            alert("Please enter a valid email address.");
        }
    };

    // 4. CATEGORY/PRODUCT BUTTON HANDLERS (Global utility functions)
    // Placeholder functions for dynamic click handlers.


    window.sourceNow = (category) => {
        console.log("Source button clicked for:", category);
        alert("Redirecting to sourcing for: " + category);
    };

    window.viewProduct = (productName) => {
        console.log("User clicked on product:", productName);
        // Add navigation logic here if needed: window.location.href = `product-detail.html?name=${productName}`;
    };
    // INITIALIZATION
    initializeCountdown();
    initializeHeaderInteractions(); // To enable 'Enter' key on search input
});