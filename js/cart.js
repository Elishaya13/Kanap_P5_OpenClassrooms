import { apiUrl } from "./common.js"

/**
 * Retrieves the data saved in the localStorage and returns them in a JSON/Object
 * @returns {{id: String, color: String, quantity: String}[]} 
 */
const getCart = () => {

  let cart = localStorage.getItem("cart")
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart)
  }
}
let cart = getCart()

/**
 * Transforms the data into a string and saves it in the localStorage
 * @param {JSON} cart 
 */
const saveCart = (cart) => {

  localStorage.setItem("cart", JSON.stringify(cart))
}

/**
 * Query the product API and return the data from the URL in a JSON
 * @param {string} productId 
 * @returns {JSON}
 */
const fetchProduct = async (productId) => {

  const r = await fetch(apiUrl + productId)
  let jsonProduct = await r.json()
  return jsonProduct
}

/**
 * Display each product from the cart and listen for the quantity change
 * @param {JSON} productsInCart 
 * 
 */
const showDetailsCart = async (productsInCart) => {

  let displayHtmlProduct = ''
  let lastProductId
  let fetchProductJson

  // Loop on each product , keep the data from API and "id" data and store them in a variables
  // If the "id" is the same, do not query the API again
  // Add the "string" HTML content created using the data
  for (let product of productsInCart) {

    if (product.id != lastProductId) {
      lastProductId = product.id
      fetchProductJson = await fetchProduct(product.id)
    }
    displayHtmlProduct += displayAProduct(product, fetchProductJson)
  }
  // Add the HTML content in parent element
  document
    .getElementById('cart__items')
    .insertAdjacentHTML("beforeend", displayHtmlProduct)


  // Add the listeners for input and delete elements
  listeners()




}

/**
 * Create the DOM elements for the product with the Json data
 * @param {JSON} product 
 * @param {JSON} fetchProductJson 
 * @returns {String} -string
 */
const displayAProduct = (product, fetchProductJson) => {
  let productElt =
    `
             <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${fetchProductJson.imageUrl}" alt="${fetchProductJson.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${fetchProductJson.name}</h2>
                    <p>${product.color}</p>
                    <p>${fetchProductJson.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
         `
  return productElt
}

/**
 * Sort products by ID
 */
const sortProducts = () => {

  cart.sort(function (a, b) {
    if (a.id < b.id)
      return -1
    if (a.id > b.id)
      return 1
    if (a.id === b.id)
      return 0
  })
}

/**
 * Add a eventListener on the change, on the quantity input element and the delete button element
 */
const listeners = () => {
  // Eventlistener on the quantity input
  document.querySelectorAll('.itemQuantity').forEach(inputQty =>
    inputQty.addEventListener('change', (e) => updateCart(inputQty, e.target.value))
  )
  // Eventlistener on the button "supprimer"
  document.querySelectorAll('.deleteItem').forEach(buttonSuppr =>
    buttonSuppr.addEventListener('click', () => (updateCart(buttonSuppr, 0)))
  )

  document.querySelector('#totalQuantity').textContent = `${getTotalQuantity(cart)}`



}

/**
 * Browse the current basket, modify the quantity by the new value entered or delete the product
 * @param {number} targetValue
 */
const updateCart = (domElt, targetValue) => {

  // Targets the parent element and retrieves the "id" and "color" information in its attributes
  let currentElt = domElt.closest("article")
  let currentEltId = currentElt.getAttribute('data-id')
  let currentEltColor = currentElt.getAttribute('data-color')

  // Find the current product from the cart
  let foundProduct = cart.find(product => product.id == currentEltId && product.color == currentEltColor)
  foundProduct.quantity = targetValue

  // Remove the product from the cart and the DOM
  if (foundProduct.quantity <= 0) {
    cart.splice(cart.indexOf(foundProduct), 1)
    currentElt.remove()
  }
  document.querySelector('#totalQuantity').textContent = `${getTotalQuantity(cart)}`


  // Save it to the localStorage
  saveCart(cart)
}


//****** Total and Price ********/


/**
 * Calculate the total number of items
 * @param {JSON} cart 
 * @returns {number}
 */
const getTotalQuantity = (cart) => {
  let quantityCart = []
  for (let product of cart) {
    quantityCart.push(parseInt(product.quantity))
  }
  quantityCart = quantityCart.reduce((a, b) => a + b, 0)
  return quantityCart
}




/** Application **/
showDetailsCart(cart.sort(sortProducts()))

