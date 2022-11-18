import { getCart, saveCart, fetchProduct } from "./common.js"

// We instantiate URL by passing it the address of the page as a parameter
const url = new URL(window.location.href)

// We retrieve the value of the id parameter passed in the URL
const currentIdProduct = url.searchParams.get('id')

//------- Display functions ---------//

/**
 * Display all the product infos
 * @param {JSON} jsonInfo 
 */
const displayProduct = (jsonInfo) => {

    addProductImg(jsonInfo.imageUrl, jsonInfo.altTxt)
    addProductName(jsonInfo.name)
    addProductPrice(jsonInfo.price)
    addProductDescription(jsonInfo.description)
    addSelectColorsOption(jsonInfo.colors)
}

/**
 * Add an <img> node with provided attributes into div element containing item__img class
 * @param {String} imageUrl - the image url
 * @param {String} altTxt - the alt image value
 */
const addProductImg = (imageUrl, altTxt) => {
    let imgEltParent = document.querySelector('div.item__img')
    let imageElt = document.createElement('img')

    imageElt.setAttribute('src', `${imageUrl}`)
    imageElt.setAttribute('alt', `${altTxt}`)
    imgEltParent.appendChild(imageElt)

}
/**
 * Add product name info
 * @param {String} productName 
 */
const addProductName = (productName) => {
    document
        .getElementById("title")
        .innerText = productName
}

/**
 * Add product price info
 * @param {Number} productPrice 
 */
const addProductPrice = (productPrice) => {
    document
        .getElementById("price")
        .innerText = productPrice

}

/**
 * add product description info
 * @param {String} productDescription - jsonInfo.description
 */
const addProductDescription = (productDescription) => {
    document
        .getElementById("description")
        .innerText = productDescription

}

/**
 * Loop on json object and write the <option> html content
 * @param {string[]} productColors 
 */
const addSelectColorsOption = (productColors) => {

    let optionParentElt = document.getElementById('colors')
    //Add a value "choose" for the first option
    document
        .querySelector('#colors > option')
        .setAttribute('value', 'choose')

    // Create the DOM options elements and insert to the colors options values
    for (let color of productColors) {

        let newOptionElt = document.createElement('option')
        newOptionElt.setAttribute('value', `${color} `)
        newOptionElt.innerText = color

        optionParentElt.appendChild(newOptionElt)

    }
}

//-----Fonctions pour  le panier-----//

/**
 * Get the product values and save it to localStorage 
 */
const addCart = () => {

    // Get the cart from localStorage
    let localCart = getCart()
    const currentQtyProduct = parseInt(document.getElementById('quantity').value)
    const currentColorProduct = document.getElementById('colors').value
    const currentName = document.getElementById('title').textContent

    // If the same product already exists increase its quantity, otherwise create the object data and send it to localStorage
    if (currentColorProduct != "choose" && currentQtyProduct > 0 && currentQtyProduct <= 100) {

        let foundProductIndex = localCart.findIndex(element => element.id == currentIdProduct && element.color == currentColorProduct)

        if (foundProductIndex >= 0) {
            localCart[foundProductIndex].quantity += currentQtyProduct

        } else {
            let currentItem = {
                id: currentIdProduct,
                color: currentColorProduct,
                quantity: currentQtyProduct
            }
            localCart.push(currentItem)
        }

        saveCart(localCart)

        alert(`${currentQtyProduct} ${currentName} de couleur ${currentColorProduct} a bien été ajouté au panier !`)
    } else {
        alert("Merci de saisir une quantité (entre 1 et 100) et une couleur")
    }
}

// Add a button click event : "Ajouter au panier"
document.getElementById("addToCart")
    .addEventListener("click", addCart)

//----Application-----/

// Display the product
fetchProduct(currentIdProduct).then(jsonInfo => displayProduct(jsonInfo))

