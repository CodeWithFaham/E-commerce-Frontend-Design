// // Function to format price (e.g., 98 to $98.00)
// function formatPrice(price) {
//     if (typeof price === 'number') {
//         return `$${price.toFixed(2)}`;
//     }
//     return price || '$0.00';
// }

// let currentProduct = null;

// // --- MOCK DATA FOR DEMO (JSON data ko replace karne ke liye) ---
// const mockProductData = {
//     id: "1",
//     title: "Example Smart Watch Pro",
//     imagePath: "assets/images/product-main.jpg",
//     images: ["assets/images/thumb1.jpg", "assets/images/thumb2.jpg", "assets/images/thumb3.jpg"],
//     description: "This is a detailed description of the product, highlighting its main features and benefits for the customer. It is made with high-quality materials and designed for durability.",
//     priceTier1: { price: 98.00, range: '1-9 Units' },
//     priceTier2: { price: 89.99, range: '10-49 Units' },
//     priceTier3: { price: 79.50, range: '50+ Units' },
//     specs: [{ label: "Type", value: "Digital" }, { label: "Material", value: "Aluminum Alloy" }, { label: "Screen Size", value: "1.8 inches" }],
//     keyDetails: [{ label: "Type", value: "Smart Watch" }, { label: "Material", value: "Alloy" }, { label: "Design", value: "Modern" }, { label: "Customization", value: "Logo & Design" }, { label: "Protection", value: "Refund Policy" }, { label: "Warranty", value: "2 years" }]
// };


// // --- DYNAMIC DATA LOADING FUNCTION (Now using Mock Data) ---
// async function loadProductDetails() {
//     const mainTitleElement = document.getElementById('productTitle');
//     const mainImageElement = document.getElementById('mainProductImage');

//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('id');

//     if (!productId) {
//         mainTitleElement.textContent = "Product Not Selected.";
//         return;
//     }

//     // --- Using Mock Data for clean code ---
//     const product = mockProductData;

//     if (!product) {
//         mainTitleElement.textContent = `Product with ID "${productId}" not found.`;
//         return;
//     }

//     currentProduct = product;

//     document.getElementById('pageTitle').textContent = product.title + " - Details";
//     mainTitleElement.textContent = product.title;
//     mainImageElement.src = product.imagePath;

//     if (product.priceTier1) {
//         document.getElementById('priceValue1').textContent = formatPrice(product.priceTier1.price);
//         document.querySelectorAll('.price-tier .quantity-range')[0].textContent = product.priceTier1.range;
        
//         document.getElementById('priceValue2').textContent = formatPrice(product.priceTier2.price);
//         document.querySelectorAll('.price-tier .quantity-range')[1].textContent = product.priceTier2.range;

//         document.getElementById('priceValue3').textContent = formatPrice(product.priceTier3.price);
//         document.querySelectorAll('.price-tier .quantity-range')[2].textContent = product.priceTier3.range;
//     }

//     document.getElementById('productDescription').textContent = product.description;
    
//     const specsGrid = document.getElementById('productSpecsGrid');
//     specsGrid.innerHTML = ''; 
//     if (product.specs) {
//             product.specs.forEach(spec => {
//                 const p = document.createElement('p');
//                 p.innerHTML = `<strong>${spec.label}:</strong> ${spec.value}`;
//                 specsGrid.appendChild(p);
//             });
//     }
    
//     const keyDetailsGrid = document.getElementById('keyDetailsGrid');
//     keyDetailsGrid.innerHTML = '';
//     if (product.keyDetails) {
//             product.keyDetails.forEach(detail => {
//                 keyDetailsGrid.innerHTML += `<p><span>${detail.label}:</span> ${detail.value}</p>`;
//             });
//     }

//     const thumbnailGallery = document.getElementById('thumbnailGallery');
//     thumbnailGallery.innerHTML = '';
    
//     if (product.images && product.images.length > 0) {
//         product.images.forEach((imagePath, index) => {
//             const img = document.createElement('img');
//             img.src = imagePath;
//             img.alt = `${product.title} view ${index + 1}`;
//             if (index === 0) {
//                 img.classList.add('thumb-active');
//             }
//             thumbnailGallery.appendChild(img);
//         });
//         mainImageElement.src = product.images[0];
//     }
// }

// // --- TAB CONTENT CREATION AND MANAGEMENT ---
// const productTabsContainer = document.querySelector('.product-tabs');
// const tabContents = {
//     'Description': document.querySelector('.description-content'),
// };

// function createTabContent(tabName, text) {
//     const div = document.createElement('div');
//     div.classList.add('tab-content', `${tabName.toLowerCase().replace(/\s/g, '-')}-content`); 
//     div.style.display = 'none';
//     const p = document.createElement('p');
//     p.textContent = text;
//     div.appendChild(p);

//     const existingDescriptionContent = productTabsContainer.querySelector('.description-content');
//     if (existingDescriptionContent) {
//         existingDescriptionContent.after(div);
//     } else {
//         productTabsContainer.appendChild(div);
//     }
//     return div;
// }

// tabContents['Reviews'] = createTabContent('Reviews', 'Reviews content goes here.');
// tabContents['Shipping'] = createTabContent('Shipping', 'Shipping information: Free worldwide shipping for orders over $500. Delivery takes 5-7 days.');
// tabContents['About Seller'] = createTabContent('About Seller', 'About Seller: Guanjoi Trading LLC is a verified exporter since 2018.');


// function activateTab(tabName) {
//     for (const key in tabContents) {
//         if (tabContents[key]) {
//             tabContents[key].style.display = 'none';
//         }
//     }

//     document.querySelectorAll('.product-tabs .tab-button').forEach(button => {
//         button.classList.remove('tab-active');
//     });

//     if (tabContents[tabName]) {
//         tabContents[tabName].style.display = 'block';
//     }

//     const activeButton = Array.from(document.querySelectorAll('.product-tabs .tab-button')).find(button => button.textContent === tabName);
//     if (activeButton) {
//         activeButton.classList.add('tab-active');
//     }
// }


// // --- MAIN INITIALIZATION BLOCK ---
// document.addEventListener('DOMContentLoaded', function() {
//     loadProductDetails();

//     const mainProductImg = document.getElementById('mainProductImage');
//     const thumbnailGallery = document.getElementById('thumbnailGallery');

//     if (mainProductImg && thumbnailGallery) {
//         thumbnailGallery.addEventListener('click', function(event) {
//             const clickedThumbnail = event.target.closest('img');
//             if (clickedThumbnail && clickedThumbnail.parentElement === thumbnailGallery) {
//                 thumbnailGallery.querySelectorAll('img').forEach(img => {
//                     img.classList.remove('thumb-active');
//                 });

//                 clickedThumbnail.classList.add('thumb-active');
//                 mainProductImg.src = clickedThumbnail.src;
//                 mainProductImg.alt = clickedThumbnail.alt;
//             }
//         });
//     }

//     document.querySelectorAll('.product-tabs .tab-button').forEach(button => {
//         button.addEventListener('click', function() {
//             activateTab(this.textContent.trim());
//         });
//     });

//     activateTab('Description'); 


//     const btnInquiry = document.querySelector('.btn-inquiry');
//     const btnWishlist = document.querySelector('.btn-wishlist');

//     if (btnInquiry) {
//         btnInquiry.addEventListener('click', function() {
//             const title = currentProduct ? currentProduct.title : document.getElementById('productTitle').textContent.trim();
//             alert(`Inquiry sent successfully for product: "${title}"! The seller will contact you shortly.`);
//         });
//     }

//     if (btnWishlist) {
//         btnWishlist.addEventListener('click', function() {
//             const currentText = btnWishlist.textContent.trim();
//             const title = currentProduct ? currentProduct.title : "this product";

//             if (currentText.includes('Save for later')) {
//                 btnWishlist.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
//                 btnWishlist.style.backgroundColor = 'var(--primary-color, #007bff)';
//                 btnWishlist.style.color = 'white';
                
//                 alert(`Product "${title}" has been saved to your wishlist!`);
//             } else {
//                 btnWishlist.innerHTML = '<i class="fa-solid fa-heart"></i> Save for later';
//                 btnWishlist.style.backgroundColor = '';
//                 btnWishlist.style.color = '#555';
//             }
//         });
//     }
// });