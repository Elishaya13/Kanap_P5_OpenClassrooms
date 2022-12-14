import { saveCart, getCart, fetchProduct, postOrder } from "./common.js";
import { FORM_MSG } from "./errorMsg.js";


/** Affichage du panier et total */

/**
 * Display each product from the cart and listen for the quantity change
 * @param {JSON} productsInCart 
 * 
 */
const displayCart = async (productsInCart) => {

  let displayHtmlProduct = ''
  let lastProductId
  let fetchProductJson

  // Loop on each product , keep the data from API and "id" data and store them in a variables
  // If the "id" is the same, do not query the API again
  // Add the "string" HTML content created using the data
  for (let product of productsInCart) {

    if (product.id !== lastProductId) {
      lastProductId = product.id
      fetchProductJson = await fetchProduct(product.id)
    }
    displayHtmlProduct += displayAProduct(product, fetchProductJson)
  }

  // Add the HTML content in parent element
  document
    .getElementById('cart__items')
    .insertAdjacentHTML("beforeend", displayHtmlProduct)

  setTotalQuantity()
  setTotalPrice()
}

/**
 * Browse the current cart, modify the quantity by the new value entered or delete the product
 * @param {number} quantityValue - value present in the input quantity 
 */
const updateCart = (domElt, quantityValue) => {

  // Check if target value parameter has been passed in correct type
  if (typeof quantityValue !== "number") {
    quantityValue = parseInt(quantityValue)
  }

  // Targets the parent element and retrieves the "id" and "color" information in its attributes
  let currentElt = domElt.closest("article")
  let currentEltId = currentElt.getAttribute('data-id')
  let currentEltColor = currentElt.getAttribute('data-color')

  // Find the current product in the cart, if it find, modify quantity value
  let foundProduct = cart.find(product => product.id == currentEltId && product.color == currentEltColor)
  foundProduct.quantity = quantityValue

  // Remove the product from the cart and the DOM
  if (foundProduct.quantity <= 0) {
    cart.splice(cart.indexOf(foundProduct), 1)
    currentElt.remove()
  }
  setTotalQuantity()
  setTotalPrice()

  // Save it to the localStorage
  saveCart(cart)
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
                    <p>${fetchProductJson.price} ???</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qt?? : </p>
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
 * Calculate the total number of items
 * @returns {number}
 */
const setTotalQuantity = () => {
  let quantityCart = []
  for (let product of cart) {
    quantityCart.push(parseInt(product.quantity))
  }
  quantityCart = quantityCart.reduce((a, b) => a + b, 0)
  document.getElementById('totalQuantity').textContent = quantityCart
}

/**
 * Calculate the total price of the items 
 * @returns {number}
 */
const setTotalPrice = async () => {
  let lastProductId
  let fetchProductJson
  let productPrice = 0
  for (let product of cart) {

    if (product.id !== lastProductId) {

      lastProductId = product.id
      fetchProductJson = await fetchProduct(product.id)
    }
    productPrice += product.quantity * fetchProductJson.price

  }

  document.getElementById('totalPrice').textContent = productPrice

}

/**
 * Set the listeners, for the quantity change, the delete button and the form button
 */
const setListeners = async () => {
  // Eventlistener on the quantity input
  document.querySelectorAll('.itemQuantity').forEach(inputQty =>
    inputQty.addEventListener('change', (e) => updateCart(inputQty, e.target.value))
  )
  // Eventlistener on the button "supprimer"
  document.querySelectorAll('.deleteItem').forEach(buttonSuppr =>
    buttonSuppr.addEventListener('click', () => (updateCart(buttonSuppr, 0)))
  )
  document.getElementById('order').addEventListener('click', postForm)
}
/**
 * Sort products by ID
 * @param {Json}cart
 */
const getSortedProducts = (cart) => {

  return cart.sort(function (a, b) {
    if (a.id < b.id)
      return -1
    if (a.id > b.id)
      return 1
    if (a.id === b.id)
      return 0
  })
}

/** Gestion du formulaire **/

/**
 * Check form fields and write an error message  in case of error
 * @param {string} eltId The form input element Id
 * @returns {boolean} 
 */
const checkIfValid = (eltId) => {

  const inputValidRegex = /^[a-zA-Z????????????????][a-z??????????????]+([-'\s][a-zA-Z????????????????][a-z??????????????]+)?$/
  const inputValidRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex for email 
  const inputValidRegexCity = /^([0-9]{5}).[a-zA-Z????????????????][a-z??????????????]+([-'\s][a-zA-Z????????????????][a-z??????????????]+)?$/ //Regex city ex: 75000 Paris
  const inputValidRegexAddress = /^[a-zA-Z0-9????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s\,\'\-]*$/

  const inputElt = document.getElementById(eltId) // input element
  const inputLength = inputElt.value.split(' ').length // split the value into words

  if (inputElt.validity.valueMissing) {
    displayFormErrorMsg(
      eltId,
      FORM_MSG.emptyField.errorMsg,
      FORM_MSG.emptyField.errorColor
    )
    return false
  }

  if (eltId == "email" && !inputValidRegexEmail.test(inputElt.value)) {

    displayFormErrorMsg(
      eltId,
      FORM_MSG.email.errorMsg,
      FORM_MSG.email.errorColor
    )
    return false
  }

  if (eltId == "address" && (!inputValidRegexAddress.test(inputElt.value) || !(inputLength > 2))) {

    displayFormErrorMsg(
      eltId,
      FORM_MSG.address.errorMsg,
      FORM_MSG.address.errorColor
    )
    return false
  }

  if (eltId == "city" && !inputValidRegexCity.test(inputElt.value)) {

    displayFormErrorMsg(
      eltId,
      FORM_MSG.city.errorMsg,
      FORM_MSG.city.errorColor
    )
    return false
  }

  if ((eltId == "firstName" || eltId == "lastName") && !inputValidRegex.test(inputElt.value)) {

    displayFormErrorMsg(
      eltId,
      FORM_MSG.name.errorMsg,
      FORM_MSG.name.errorColor
    )
    return false

  } else {
    displayFormErrorMsg(eltId)
    return true
  }
}
/**
 * Display form error messages 
 * @param {string} eltId - id of the form input element ex: "city", "email"..
 * @param {string} errorMsg 
 * @param {string} colorMsg 
 */
const displayFormErrorMsg = (eltId, errorMsg = null, colorMsg = null) => {
  const errorMsgElt = document.getElementById(eltId + "ErrorMsg") // error field element
  errorMsgElt.textContent = errorMsg
  errorMsgElt.style.color = colorMsg

}

/**
 * Builds the object containing the form data and the products array, and post it
 * @param {event} e 
 */
const postForm = (e) => {

  e.preventDefault()

  if (cart.length === 0) {
    alert("Votre panier est vide")
    return
  }

  // Create an array containing the "ids"
  // Send each ids to the check value function, an array of booleans is generated
  const formIds = ['firstName', 'lastName', 'address', 'city', 'email']
  const results = formIds.map(id => checkIfValid(id))

  // If the array does not contain false and the cart is not empty, we build the object and we post
  if (!results.includes(false)) {

    const formValues = formIds.map(value => document.getElementById(value).value)
    const productsId = cart.map(product => product.id)

    const orderObj = {
      contact: {
        firstName: formValues[0],
        lastName: formValues[1],
        address: formValues[2],
        city: formValues[3],
        email: formValues[4]
      },
      products: productsId,
    }

    postOrder(orderObj)

  }
}




/** Application **/

let cart = getCart()

await displayCart(getSortedProducts(cart))
await setListeners()

