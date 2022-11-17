import { apiUrl } from "./common.js"
import { createHtmlElement } from "./common.js"
import { getCart } from "./common.js"
import { saveCart } from "./common.js"

//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)

// On récupère la valeur du paramètre id passée dans l'URL
const idProduct = url.searchParams.get('id')

const currentIdProduct = idProduct

//To do export avec getProductId
/**
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
const getProduct = async () => {
    const r = await fetch(apiUrl + idProduct)
    return await r.json()

}
//------- Display functions ---------//

/**
 * Use the Json API and call the other functions to add product infos
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
    let imageElt = createHtmlElement('img', {
        src: `${imageUrl}`,
        alt: `${altTxt}`
    })
    imgEltParent.appendChild(imageElt)

    //let imageElt = document.createElement('img')
    // imageElt.setAttribute('src', `${imageUrl}`)
    // imageElt.setAttribute('alt', `${altTxt}`)


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
 * Loop on json object and write <option> html content
 * @param {string[]} productColors 
 */
const addSelectColorsOption = (productColors) => {
    let optionParentElt = document.getElementById('colors')

    // J'ajoute la valeur "choose" dans ma première option pour pouvoir après l'exclure des conditions valable d'ajout au panier
    let firstOptionElt = document.querySelector('#colors > option')
    firstOptionElt.setAttribute('value', 'choose')

    //Pour chaque couleur disponible dans mon tableau du produit , crée une balise <option> avec les valeurs disponible
    for (let color of productColors) {

        let newOptionElt = document.createElement('option')
        newOptionElt.setAttribute('value', `${color} `)
        newOptionElt.innerText = color

        optionParentElt.appendChild(newOptionElt)

    }
}


//-----Fonctions pour  le panier -----//

/**
 * Get the product values and save it to localStorage 
 */
const addCart = () => {

    // On recupere le panier qui existe dans le local storage
    let localCart = getCart()
    const currentQtyProduct = parseInt(document.getElementById('quantity').value)
    const currentColorProduct = document.getElementById('colors').value
    const currentName = document.getElementById('title').textContent

    if (currentColorProduct != "choose" && currentQtyProduct > 0 && currentQtyProduct <= 100) {

        // findIndex va retourner l'index du produit correspondant (meme id + meme color) ou -1
        let foundProductIndex = localCart.findIndex(element => element.id == currentIdProduct && element.color == currentColorProduct)

        // Si un index est trouvé, ajoute la quantité du currentproduct a [index].quantity
        if (foundProductIndex >= 0) {

            // parseInt(objCart[foundProductIndex].quantity) += currentQtyProduct
            localCart[foundProductIndex].quantity += currentQtyProduct

            // Sinon creer le tableau des valeurs du produit et l'ajoute au tableau du localstorage
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

//** Application  **/


// Display the product
getProduct().then(jsonInfo => displayProduct(jsonInfo))

