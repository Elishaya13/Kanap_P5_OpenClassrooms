import { apiUrl } from "./common.js"

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


//------- AddProduct functions ---------//

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
    let imageElt = document.createElement('img')

    imageElt.setAttribute('src', `${imageUrl}`)
    imageElt.setAttribute('alt', `${altTxt}`)
    imgEltParent.appendChild(imageElt)

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
//Affichage des produits
getProduct().then(jsonInfo => displayProduct(jsonInfo))

// Button //

const currentColorProduct = document.getElementById('colors').value
const currentQtyProduct = document.getElementById('quantity').value
// let objCart = {
//     id: currentIdProduct,
//     color: currentColorProduct,
//     quantity: currentQtyProduct
// }


const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}




const getCart = () => {


    let cart = localStorage.getItem("cart")


    if (cart == null) {

        return [];

    } else {

        return JSON.parse(cart)
    }

}



const addCart = () => {

    const currentColorProduct = document.getElementById('colors').value
    const currentQtyProduct = document.getElementById('quantity').value

    //on recupere le panier qui existe dans le local storage
    let objCart = getCart()
    //find va retourner undefined s'il ne trouve pas
    let isFoundProduct = objCart.findIndex(element => element.id == currentIdProduct && element.color == currentColorProduct)

    console.log(isFoundProduct)


    if (isFoundProduct >= 0) {
        //    currentQtyProduct++

        //to do convertir en int
        objCart[isFoundProduct].quantity += currentQtyProduct
        console.log("trouvééééé")

    } else {

        console.log("pas trouvé")
        let currentItem = {
            id: currentIdProduct,
            color: currentColorProduct,
            quantity: currentQtyProduct
        }

        //on lui ajoute le produit
        objCart.push(currentItem)
    }
    saveCart(objCart)
}

// let isFound = cart.find(element => element.id == currentIdProduct && element.color == currentColorProduct)

// if (currentColorProduct !== 'choose' && currentQtyProduct > 0) {

//     if (isFound != null) {

//         console.log("trouve")


//     } else {

//         let objCart = {
//             id: currentIdProduct,
//             color: currentColorProduct,
//             quantity: currentQtyProduct
//         }
//         cart.push(objCart)


//     }



//     alert("commande ok")
// } else {
//     alert("Veuillez choisir une couleur et choisir une quantité")
// }



//Ciblage et fonctionnement du bouton
document.getElementById("addToCart")
    .addEventListener("click", addCart)






//----------//


// const getCart = () => {
//     let cart = localStorage.getItem("cart")
//     if (cart == null) {
//         return []
//     } else {
//         return JSON.parse(cart)
//     }

// }
// function addBasket(product) {
//     //on recupere le panier qui existe dans le local storage
//     let basket = getBasket()
//     //find va retourner undefined s'il ne trouve pas
//     let foundProduct = basket.find(p => p.id == product.id)
//     if (foundProduct != undefined) {
//         foundProduct.quantity++
//     } else {
//         product.quantity = 1
//         //on lui ajoute le produit
//         basket.push(product)
//     }


//     // on enregistre le nouveau panier
//     saveBasket(basket)
// }

// function removeFromBasket(product) {
//     let basket = getBasket()
//     basket = basket.filter(p => p.id != product.id)
//     saveBasket(basket)
// }

// function changeQuantity(product, quantity) {
//     //on recupere le panier qui existe dans le local storage
//     let basket = getBasket()
//     //find va retourner undefined s'il ne trouve pas
//     let foundProduct = basket.find(p => p.id == product.id)
//     if (foundProduct != undefined) {
//         foundProduct.quantity += quantity
//         if (foundProduct.quantity <= 0) {
//             removeFromBasket(foundProduct)
//         } else {
//             saveBasket(basket)
//         }

//     }

// }

// function getNumberProduct() {
//     let basket = getBasket()
//     let number = 0
//     for (let product of basket) {
//         number += product.quantity
//     }
//     return number
// }

// function getTotalPrice() {
//     let basket = getBasket()
//     let total = 0
//     for (let product of basket) {
//         total += product.quantity * product.price
//     }
//     return total
// }





// const array1 = [5, objCart, 8, objCart2, 44];

// const isLargeNumber = (element) => element.id == 12 && element.color == 55;

// const indexTrouve = array1.findIndex(isLargeNumber)

// expected output
// console.log(array1[indexTrouve].quantity +)

//     * /


//const colorProduct = document.get.value

// const arrayOfProduct = [
//     { id: idProduct, color: 'color', quantity: 'quantity' }
// ]
// console.log(arrayOfProduct.map((p) => p.id + ' ' + p.color + ' ' + p.quantity))

// let objectId = idProduct
// arrayOfProduct2.push(objectId)
// console.log(arrayOfProduct2)
// let count = arrayOfProduct.push(objectId)
// console.log(arrayOfProduct)
// const idStorage = () => {

//     localStorage.setItem("objId", idProduct)

// }
// idStorage()
// console.log(objectId)
//recuperer l'id de l'objet et l'ajouter au tableau


//recuperer la couleur choisi et l'ajouter au tableau

//recuperer la quantité selectionné et l'ajouter au tableau
