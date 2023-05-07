// Importing the menu array from the data.js file
import { menuArray } from "./data.js"

// Getting the elements from the HTML file
const foooD = document.getElementById('fodio')
const yourOrder = document.getElementById('your-order')
const totalPriceDisplay = document.getElementById('total-price')
const visibleWindow = document.getElementById('visible')

// Initializing variables
let orderArray = []
let totalPrice = 0

// Adding event listeners to the buttons on the page
document.addEventListener("click", function(e){

 // If the button clicked has a data-btn attribute, call handleBtn function with that attribute as an argument
 if(e.target.dataset.btn){
 handleBtn(e.target.dataset.btn)
 card.style.display='none'
 }

 // If the button clicked has a data-remove attribute, call removeBtn function with that attribute as an argument
 if(e.target.dataset.remove){
 removeBtn(e.target.dataset.remove)
 card.style.display='none'
 }

 // If the button clicked has an id of "complete-order" and there are items in the cart, display the payment form
 if(e.target.id === 'complete-order'){
 if(totalPrice > 0){
 card.style.display='block'
 }
 }

 // If the button clicked has an id of "cancel", hide the payment form
 if(e.target.id ==='cancel'){
    card.style.display="none"
    }
   
    // If the button clicked has an id of "pay", call afterPay function
    if(e.target.id === 'pay'){
    afterPay()
    }
   
    // If the button clicked has an id of "another-order", reload the page to start again
    if(e.target.id === 'another-order'){
    startAgain()
    }
   })
   
   // Function to handle adding items to the cart
   function handleBtn(foodId){
    // Find the item in the menuArray that matches the foodId passed in as an argument
    const targetItemObj = menuArray.filter(function(food){
    return food.id === parseInt(foodId)
    })[0]
   
    // Add the price of the item to the total price
    totalPrice += targetItemObj.price 
    totalPriceDisplay.innerHTML = '$' + totalPrice
   
    // Increment the quantity of the item in the orderArray
    targetItemObj.quantity++
   
    // If the quantity is greater than 1, render the order array with updated quantities
    if (targetItemObj.quantity > 1){
    renderOrder(orderArray)
    }
    // Otherwise, add the item to the order array and render it
    else{
    orderArray.push(targetItemObj)
    renderOrder(orderArray)
    }
   }
   
   // Function to handle removing items from the cart
   function removeBtn(removeId){
    // Find the index of the item in orderArray that matches removeId passed in as an argument
    const targetRemoveIndex = orderArray.findIndex(function(remove){
    return remove.id === parseInt(removeId)
    })
   
    // Subtract the price of the item from the total price
    totalPrice -= orderArray[targetRemoveIndex].price
    totalPriceDisplay.innerHTML = "$" + totalPrice
   
    // Decrement the quantity of the item in orderArray
    orderArray[targetRemoveIndex].quantity--
   
    // If there is still at least one of that item in orderArray, render it with updated quantities
    if (orderArray[targetRemoveIndex].quantity > 0){
    renderOrder(orderArray)
    }
    // Otherwise, remove it from orderArray and render it without that item
    else{
    orderArray.splice(targetRemoveIndex, 1)
    console.log(orderArray)
    renderOrder(orderArray)
    }
   }
   
   // Function to render menu items on page load
   function render(){
    let item = ""
    for(let food of menuArray){
    item += 
    `
    <div class="item">
    <div class="info">
    <h1>${food.emoji}</h1>
    <div>
    <h3>${food.name}</h3>
    <p>${food.ingredients}</p>
    <h4>$${food.price}</h4>
    </div>
    </div>
    <button data-btn="${food.id}">+</button>
    </div>
    <hr>
    `
    }
    foooD.innerHTML += item
   }
   render()
   
   // Function to render items in order array on payment form display
   function renderOrder(ItemOrderer){
    visibleWindow.style.display = "block"
    let renderedOrder = ""
    for(let order of ItemOrderer){
    renderedOrder += 
    `
    <div class="item-name">
    <h3>${order.name}</h3>
    <h4 id="${order.id}">${order.quantity}</h4>
    <p data-remove="${order.id}">remove</p>
    </div>
    <h4 class="order-price">$${order.price}</h4>
    `
   }
   yourOrder.innerHTML = renderedOrder
   }
   
   // Function to display thank you message and reset page on payment completion
   function afterPay(){
    card.style.display='none'
    visibleWindow.innerHTML = `
    <div class="complete-order thank-you">
    <h2>Thank you for ordering with us</h2>
    <h2 id="another-order">Make another order</h2>
    </div>`
    console.log(visibleWindow)
    visibleWindow.style.display='block'
   }
   
   // Function to reload page and start over when "Make another order" button is clicked
   function startAgain(){
    window.location.reload()
   }