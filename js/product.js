import { apiUrl } from "./common.js"
import { createHtmlElement } from "./common.js"

//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)

// On récupère la valeur du paramètre id passée dans l'URL
const idProduct = url.searchParams.get('id')

const currentIdProduct = idProduct


/**
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
const getProduct = async () => {
    const r = await fetch(apiUrl + idProduct)
    let jsonInfo = await r.json()
    return jsonInfo

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
 * @param {String} productName 
 */
const addProductName = (productName) => {
    document
        .getElementById("title")
        .innerText = productName
}

/**
 * @param {Number} productPrice 
 */
const addProductPrice = (productPrice) => {
    document
        .getElementById("price")
        .innerText = productPrice

}

/**
 * @param {String} productDescription 
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


//-----Fonctions pour local storage et ajout panier -----//


// Sauvegarde les données passées dans le localStorage (key + string)
const saveCart = (cart) => {

    localStorage.setItem("cart", JSON.stringify(cart))

}

// Recupere les données sauvegardées dans le localStorage (string) et les retourne sous forme de Json/Objet
const getCart = () => {

    let cart = localStorage.getItem("cart")
    //si le localStorage est vide , retourne un tableau vide
    if (cart == null) {

        return [];
        // sinon retourne la valeur recuperée (string) et la retourne en JSON
    } else {

        return JSON.parse(cart)
    }

}


//Fonction qui réagis au clic. Récupere le localStorage, verifie que la couleur et l'id existe deja 
//Si oui incrémente la quantité du produit de la valeur récuperée currentQty 
//Sinon ajoute au panier/localstorage /les valeurs current id, currentcolor et current qty 
const addCart = () => {
    // On recupere le panier qui existe dans le local storage
    let objCart = getCart()
    const currentQtyProduct = parseInt(document.getElementById('quantity').value)
    const currentColorProduct = document.getElementById('colors').value


    if (currentColorProduct != "choose" && currentQtyProduct > 0 && currentQtyProduct <= 100) {

        // findIndex va retourner l'index du produit correspondant (meme id + meme color) ou -1
        let foundProductIndex = objCart.findIndex(element => element.id == currentIdProduct && element.color == currentColorProduct)

        // Si un index est trouvé, ajoute la quantité du currentproduct a [index].quantity
        if (foundProductIndex >= 0) {

            objCart[foundProductIndex].quantity += currentQtyProduct

        } else {
            let currentItem = {
                id: currentIdProduct,
                color: currentColorProduct,
                quantity: currentQtyProduct
            }
            //on lui ajoute le produit
            objCart.push(currentItem)
        }

        saveCart(objCart)
    } else {
        alert("Merci de saisir une quantité (entre 1 et 100) et une couleur")
    }
}


// Ajout d'un evenement sur le bouton Ajouter au panier
document.getElementById("addToCart")
    .addEventListener("click", addCart)

// Affichage du produit au chargement de la page
getProduct().then(jsonInfo => displayProduct(jsonInfo))

