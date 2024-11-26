import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// Need to split product HTML between if the search bar has a value or if not


// Initial Loading
let searchBarValue = '';
updateProductPage();



document.querySelector('.js-search-button').addEventListener('click', () => {
    // console.log('clicked button');
    searchBarValue = getSearchContents();
    updateProductPage();
});

document.querySelector('.js-search-bar').addEventListener('keyup', () => {
    // console.log('clicked button');
    searchBarValue = getSearchContents();
    console.log(searchBarValue);
    updateProductPage();
});

// let emptyString = 'hji';

// if (!emptyString) {
//     console.log('true');
// } else {
//     console.log('false');
// }


// console.log(searchBarValue);

// let string1 = 'all';
// let string2 = 'basketball';
// console.log(string2.includes(string1));

function updateProductPage() {

    if (!searchBarValue) {
        // console.log('ran no search');
        renderHomeNoSearch();
    } else {
        // console.log('ran search');
        renderHomeSearch(searchBarValue);
    }
}


function renderHomeNoSearch() {

    // console.log('this with no search');

    let productsHTML = '';

    products.forEach((product) => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-dropdown-quantity-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" 
                data-product-id="${product.id}">
                    Add to Cart
                </button>
                </div>`
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

function renderHomeSearch(searchContents) {
    
    let productsHTML = '';

    // console.log('this with search');
    // Loop through each product and check title
    products.forEach((product) => {
        if (product.name.includes(searchContents)) {
            // console.log(product.name);
            productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-dropdown-quantity-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" 
                data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>`
        };
    });


    document.querySelector('.js-products-grid').innerHTML = productsHTML;

   
    
   

}



function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;

    });



    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;


}

updateCartQuantity();




const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button) => 
    {button.addEventListener('click', 
    () => {
        const productId = button.dataset.productId;

        addToCart(productId);

        updateCartQuantity();

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        
        

        // Check for previous and if so, delete

        const previousTimeoutId = addedMessageTimeouts[productId];
        if (addedMessageTimeouts) {
            clearTimeout(previousTimeoutId);
        }

        const timeoutId = addedMessage.classList.add('added-to-cart-visible');

        



        setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');


        }, 2000);

        addedMessageTimeouts[productId] = timeoutId;

        
        

        



    });
    
});

function getSearchContents() {
    const searchMessage = document.querySelector('.js-search-bar').value;
    console.log(searchMessage);

    return searchMessage;

}

// document.querySelector('.js-search-button').addEventListener('click', () => {
//     console.log('clicked button');
//     const value = getSearchContents();
//     return value;
// });