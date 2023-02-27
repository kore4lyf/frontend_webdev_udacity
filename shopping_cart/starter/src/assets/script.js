// create an array called products
let products = [];

// Total amount of money paid by user
let totalPaid = 0;

// Adding products into products(array) as objects
products.push(
    {
        name: "Cartons of Cherries",
        price: 4,
        quantity: 0,
        productId: 0001,
        image: "images/cherry.jpg"
    },
    {
        name: "Cartons of Strawberries",
        price: 5,
        quantity: 0,
        productId: 0002,
        image: "images/strawberry.jpg"
    },
    {
        name: "Cartons of Oranges",
        price: 10,
        quantity: 0,
        productId: 0003,
        image: "images/orange.jpg"
    }
);

// An empty array named cart
let cart = []; 

/* 
 * name: addProductToCart
 * description: Adds a product(object) to cart
 * @productId: represents the identity of a product to be added the database
 */
function addProductToCart(productId) {
    // Thanks at Reviewer
    let product = products.find(product => product.productId === productId);
    product.quantity += 1;

    if (!cart.includes(product)){
        cart.push(product)
    }
}

/* 
 * name: increaseQuantity
 * description: Increases the quantity of a product in yhe cart
 * @productId: Represents the identity of the product, whos quantity is to be increased.
 */
function increaseQuantity(productId) {
    for (const item of cart) {
        if (productId === item.productId) {
           item.quantity++;
        }
    }
}

/* 
 * name: decreaseQuantity
 * description: Decreases the the quabtity of a product in the cart.
 * @productId: Represents the identity of the product, whos quantity is to be decreased.
 */
function decreaseQuantity(productId) {
    for (const item of cart) {
        if (productId === item.productId) {
            item.quantity > 1 ? item.quantity-- : cart.splice(cart.indexOf(item), 1);
        }
    }
}

/* 
 * name: removeProductFromCart
 * description: Removes a product from the cart
 * @productId: Represents the identity of the product to be removed from the cart..
 */
function removeProductFromCart(productId) {
    for (const item of cart) {
        if (productId === item.productId) {
            cart.splice(cart.indexOf(item), 1);
        }
    }
}

/* 
 * name: cartTotal
 * description: Calculates the total price of all the products in the cart
 * return:: Total cost of products in the cart (Number)
 */
function cartTotal() {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

/* 
 * name: emptyCart
 * description: Empties the cart
 */
function emptyCart(){
    cart = [];
}

/* 
 * name: pay
 * description: Calculates the difference between tbe amount paid and total cost of the productsl(s) in the cart
 * @amount: Represents the money paid by the user
 */
function pay(amount) {
    totalPaid += amount;
    return (totalPaid - cartTotal());
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/
 
function validateCreditCardData() {
    // Select Card Number
    const cardNumber = document.querySelector('#card-number');
    // Select Card Name
    const cardName = document.querySelector('#card-name');
    const cardCCV = document.querySelector('#card-ccv');
    const expiryDate = document.querySelector('#card-expiry-date');

    // set for border color to grey/ 
    cardNumber.style.cssText = 'border-color: #ccc;';
    cardName.style.cssText = 'border-color: #ccc;';
    cardCCV.style.cssText = 'border-color: #ccc;';
    expiryDate.style.cssText = 'border-color: #ccc;';
    
    let errorData = [];

    if (cardNumber.value.length > 16 || cardNumber.value.length < 16) {
            // add error details to errorData
            errorData.push(cardNumber);
            errorData.push('Card number must contain 16 characters only');
            return errorData;
    } else if (cardName.value === '') {
            // add error details to errorData
            errorData.push(cardName);
            errorData.push('Card name cannot be empty');
            return errorData;
    } else if (0) {
        // add error details to errorData
            errorData.push(cardName);
            errorData.push('Card name cannot contain symbols');
            return errorData;
    }else if (cardCCV.value.length > 3 || cardCCV.value.length < 3) {
            // add error details to errorData
            errorData.push(cardCCV);
            errorData.push('Card CCV must contain 3 characters only');
            return errorData;
    } else if (!expiryDate.value) {
            // add erxpiryDate);
            errorData.push(expiryDate);
            errorData.push('Card expiry date cannot be empty');
    }
    return errorData;
}
    

function validateCreditCard() {
    const errorData = validateCreditCardData();
    const errorInfo = document.querySelector('.add-credit-card .error-info');
    // Show error notification in .form-info
    if (errorData.length) {
        const [form, errorMSG] = errorData;
        
        errorInfo.innerHTML = `<ul type="none">
        <li> ${errorMSG} </li>
        </ul>
        `
        
        // change border color to red
        form.style.cssText = 'border-color: red;';
        form.focus();

        // Show error details if form data is invalid
        if (errorInfo.classList.contains('hide')){
            errorInfo.classList.toggle('hide');
        }
    } else {
        // empty error details
        errorInfo.innerHTML = '';
        
        // Hide form info if form data is valid
        if (!errorInfo.classList.contains('hide')){
            errorInfo.classList.toggle('hide');
        }
        
        // Hide add-credit-card 
        document.querySelector('.add-credit-card').classList.toggle('hide');
        
        // Show checkout form
        document.querySelector('.checkout form').classList.toggle('hide');
        
        // Show credit card successfully added
        document.querySelector('.credit-card-added').classList.toggle('hide');
    }
}



document.querySelector('.credit-card-added').addEventListener('click', () => {
    // Hide credit card successfully added
        document.querySelector('.add-credit-card').classList.toggle('hide');
        
    // Show credit card successfully added
        document.querySelector('.credit-card-added').classList.toggle('hide');
        
    // Hide checkout form
        document.querySelector('.checkout form').classList.toggle('hide');
});

document.querySelector('.add-credit-card>form>input[type=submit]').addEventListener('click', (e) => {
    e.preventDefault();
    validateCreditCard();
});

document.querySelector('.add-product').addEventListener('click', () => {
    modalBox = document.querySelector(".modal-box");
    modalBox.classList.toggle('hide');  
    document.body.classList.toggle('overflow-hidden')
})

// submit button.modal-box's form
document.querySelector('.modal-box > form > input[type=submit]').addEventListener('click', (e) => {
        e.preventDefault();
        const productName = document.querySelector('#prod-name');
        const productPrice = document.querySelector('#prod-price');
        const productImage = document.querySelector('#prod-image');
        const errorInfo = document.querySelector('.modal-box .error-info');
        let error = 0;
        

        validateProduct = () => {
            error = 0
            errorInfo.textContent = '';

            errorInfo.classList.add('hide');
            if (productName.value.length === 0) {
                error = 1;
                errorInfo.textContent = 'Product\'s name cannot be empty';
                errorInfo.classList.toggle('hide');
            }
            else if (!productImage.value) {
                error = 1;
                errorInfo.textContent = 'Product\'s image link cannot be empty';
                errorInfo.classList.toggle('hide');
            } 
        }

        validateProduct();
        if (error === 0) {
            document.querySelector('.modal-box').classList.toggle('hide');
            
            products.push(
                {
                    name: productName.value[0].toUpperCase() + productName.value.slice(1).toLowerCase(),
                    price: !productPrice.value ? 0 : productPrice.value,
                    quantity: 0,
                    productId: products[products.length - 1].productId + 1,
                    image: productImage.value,
                });
            
            drawProducts();
            document.body.classList.toggle('overflow-hidden');
        }
        
    })


document.querySelector('.close-modal-box').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal-box').classList.toggle('hide');
        document.body.classList.toggle('overflow-hidden');
    })
    

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
