import { apiUrl } from "./common.js"

/** Affichage du panier et total */

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

/**
 * Transforms the data into a string and saves it in the localStorage
 * @param {JSON} cart 
 */
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

/**
 * Query the product API and return the data from the URL in a JSON
 * @param {string} productId 
 * @returns {JSON}
 */
const fetchProduct = async (productId) => {

  const r = await fetch(apiUrl + productId)
  return await r.json()
}

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
  //setListeners()
  setTotalPrice()
  setTotalQuantity()
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
  setTotalQuantity()
  setTotalPrice()

  // Save it to the localStorage
  saveCart()
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
 * Calculte the total price of the items 
 * @returns {number}
 */
const setTotalPrice = async () => {
  let lastProductId
  let fetchProductJson
  let productPrice = 0
  for (let product of cart) {

    if (product.id != lastProductId) {

      lastProductId = product.id
      fetchProductJson = await fetchProduct(product.id)
    }
    productPrice += product.quantity * fetchProductJson.price

  }

  document.getElementById('totalPrice').textContent = productPrice

}

/**
 * Add a eventListener on the change, on the quantity input element and the delete button element
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

/** Gestion du formulaire **/




/** Templates des fonctions*/


const checkIfValid = (eltId) => {

  const inputValidRegex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/
  const inputValidRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex pour l'email 
  const inputValidRegexCity = /^([0-9]{5}).[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/ //Regex ville ex: 75000 Paris

  const inputElt = document.getElementById(eltId) // input ID
  const errorMsgElt = document.getElementById(eltId + "ErrorMsg")
  const inputLength = inputElt.value.split(' ').length


  if (inputElt.validity.valueMissing) {
    errorMsgElt.textContent = "Le champ ne doit pas être vide"
    errorMsgElt.style.color = "red"
    return false
  }

  if (eltId == "email" && !inputValidRegexEmail.test(inputElt.value)) {
    errorMsgElt.textContent = "Le champ doit contenir un email valide"
    errorMsgElt.style.color = "yellow"
    return false
  }

  if (eltId == "address" && !(inputLength > 2)) {
    errorMsgElt.textContent = "L'adresse doit contenir minimum 3 mots"
    errorMsgElt.style.color = "white"
    return false
  }

  if (eltId == "city" && !inputValidRegexCity.test(inputElt.value)) {
    errorMsgElt.textContent = "Le champ doit contenir le code postal et la ville (ex: 75000 Paris)"
    errorMsgElt.style.color = "pink"
    return false
  }
  if ((eltId == "firstName" || eltId == "lastName") && !inputValidRegex.test(inputElt.value)) {
    errorMsgElt.textContent = "Le champ doit contenir un minimum de 2 caractères et ne pas contenir de chiffres"
    errorMsgElt.style.color = "orange"
    return false

  } else {
    errorMsgElt.textContent = ''
    return true
  }
}



/** Fonction formulaire main */
const postForm = (e) => {
  e.preventDefault()
  const formIds = ['firstName', 'lastName', 'address', 'city', 'email']
  const results = formIds.map(id => checkIfValid(id))

  if (!results.includes(false)) {

    const formValues = formIds.map(value => document.getElementById(value).value)
    const productsId = getCart().map(product => product.id)

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


const postOrder = async (orderObj) => {


  let response = await fetch(apiUrl + "order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(orderObj),
  })

  let resultat = await response.json()

  window.location.href = `./confirmation.html?orderId=${resultat.orderId}`
  console.log(resultat.orderId)
}



/** Application **/

let cart = getCart()
await displayCart(cart.sort(sortProducts()))
await setListeners()
