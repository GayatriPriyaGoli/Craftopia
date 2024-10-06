function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const products = Array.from(document.querySelectorAll('.product'));
    const productList = document.getElementById('product-list');
    const notFoundMessage = document.getElementById('notFoundMessage');

    productList.innerHTML = ''; // Clear the product list before repopulating

    let foundProducts = false;

    products.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase(); // Get product name from <h4>

        // Check if the product name includes the search input or if the search input is empty
        if (productName.includes(searchInput) || searchInput === "") {
            productList.appendChild(product); // Re-add matching or all products
            foundProducts = true;
        }
    });

    // Display the not found message only if no products match and input is not empty
    if (foundProducts) {
        notFoundMessage.style.display = 'none'; // Hide "not found" message
    } else if (searchInput !== "") {
        notFoundMessage.style.display = 'block'; // Show "not found" message
        notFoundMessage.textContent = "Can't find product";
    } else {
        notFoundMessage.style.display = 'none'; // Hide the message if input is cleared
    }
}

document.getElementById("searchInput").addEventListener("input", searchProducts);
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("openNavBtn").style.display = "none"; 
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("openNavBtn").style.display = "block"; 
}

document.getElementById("closeNav").addEventListener("click", closeNav);

document.getElementById("openNavBtn").addEventListener("click", openNav);

function sortProducts() {
    const sortBy = document.querySelector('input[name="sort"]:checked');
    const productList = document.getElementById('product-list');
    const products = Array.from(document.querySelectorAll('.product'));

    if (sortBy) {
        const sortValue = sortBy.value;
        if (sortValue === 'low_to_high') {
            products.sort((a, b) => parseInt(a.getAttribute('data-price'), 10) - parseInt(b.getAttribute('data-price'), 10));
        } else if (sortValue === 'high_to_low') {
            products.sort((a, b) => parseInt(b.getAttribute('data-price'), 10) - parseInt(a.getAttribute('data-price'), 10));
        } else if (sortValue === 'bestselling') {
            
        }
    }

  
    productList.innerHTML = '';
    products.forEach(product => productList.appendChild(product));
}

document.querySelectorAll('input[name="sort"]').forEach(input => {
    input.addEventListener('change', sortProducts);
});

function filterProductsByPrice() {
    const priceFilter = document.querySelector('input[name="price"]:checked');
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const price = parseInt(product.getAttribute('data-price'), 10);

        let display = false;

        if (priceFilter) {
            switch (priceFilter.value) {
                case 'below_10000':
                    if (price < 10000) display = true;
                    break;
                case '10000_25000':
                    if (price >= 10000 && price <= 25000) display = true;
                    break;
                case '25000_50000':
                    if (price >= 25000 && price <= 50000) display = true;
                    break;
                case '50000_100000':
                    if (price >= 50000 && price <= 100000) display = true;
                    break;
                case 'above_100000':
                    if (price > 100000) display = true;
                    break;
            }
        } else {
            display = true;
        }
        product.style.display = display ? 'block' : 'none';
    });
}

document.querySelectorAll('input[name="price"]').forEach(input => {
    input.addEventListener('change', filterProductsByPrice);
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.querySelectorAll('input[name="price"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="sort"]').forEach(input => input.checked = false);
    filterProductsByPrice(); 
});
function addToCart(productId, productPrice) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
if (!cart.includes(productId)) {
cart.push(productId);
localStorage.setItem('cart', JSON.stringify(cart));
console.log(`Added product ${productId} to cart`, cart);
} else {
console.log(`Product ${productId} is already in the cart.`);
}
}

document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', function() {
const productCard = this.closest('.product-card');
const productId = productCard.getAttribute('data-product-id');
const productPrice = productCard.querySelector('.product-price').textContent;

addToCart(productId, productPrice); 
});
});
function addToCart(productId) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
if (!cart.includes(productId)) {
cart.push(productId);
localStorage.setItem('cart', JSON.stringify(cart));

alert("Product added to cart!");
} else {
alert("Product is already in cart!");
}
}

function toggleWishlist(productId) {
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
if (!wishlist.includes(productId)) {
wishlist.push(productId);
localStorage.setItem('wishlist', JSON.stringify(wishlist));
alert("Product added to wishlist!");
} else {
alert("Product is already in wishlist!");
}
}

document.getElementById("wishlist-icon").addEventListener("click", function() {
window.location.href = "wishlist1.html"; 
});

document.querySelectorAll('.heart-icon').forEach(icon => {
icon.addEventListener('click', function() {
this.classList.toggle('red'); 
});
});
document.addEventListener('DOMContentLoaded', function() {
updateCartUI();
});
window.onload = function() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cart-list');

cart.forEach(item => {
const listItem = document.createElement('li');
listItem.textContent = `${item.name} - ₹${item.price}`;
cartList.appendChild(listItem);
});
};

