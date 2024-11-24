export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
}];



export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }

    });

    const quantityValue = 
    Number(document.querySelector(`.js-dropdown-quantity-${productId}`).value);
    
    if(matchingItem) {
        matchingItem.quantity += quantityValue;
    } else {
        cart.push({
            productId: productId,
            quantity: quantityValue,
        });

    }
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);


        }
    });

    console.log(newCart);

    cart = newCart;
}

// console.log(removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'));