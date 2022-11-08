import { apiUrl } from "./common.js"
import { createHtmlElement } from "./common.js"



/**
 * 
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
const getProducts = async () => {
    let r = await fetch(apiUrl)
    let json = await r.json()
    return json
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

const fetchProduct = async (productId) => {
    const r = await fetch(apiUrl + productId)

    let jsonProduct = await r.json()
    //console.log(jsonProduct.imageUrl)
    return jsonProduct
}


//recupere le panier en localstorage puis parcours les données
/**
 * @param {JSON} products // Json recuperer de getCart()
 */
const showDetailsCart = (productsInCart) => {

    //pour chaque produit creer un contenu html
    for (let product of productsInCart) {

        fetchProduct(product.id).then(fetchProductJson => {
            displayAProduct(product, fetchProductJson)

        })
    }
}


const displayAProduct = (product, fecthProductJson) => {
    const sectionParentElt = document.getElementById('cart__items')


    //<article>
    const articleElt = generateHtmlNode('article', sectionParentElt, {
        class: "cart_item",
        "data-id": `${product.id}`,
        "data-color": `${product.color}`
    })


    //<article> > <div cart_item_img>
    const divCartImgElt = generateHtmlNode('div', articleElt, { class: "cart__item__img" })

    //<article> > <div cart_item_img> > <img>
    generateHtmlNode('img', divCartImgElt, {
        src: `${fecthProductJson.imageUrl}`,
        alt: "Photographie d'un canapé"
    })


    //<article> > <div cart_item_content>
    const divContent = generateHtmlNode('div', articleElt, { class: "cart__item__content" })


    //<article> > <div cart_item_content> > <div cart_content_item_description>
    const divContentDescription = generateHtmlNode('div', divContent, { class: "cart__item__content__description" })

    //<article> > <div cart_item_content> > <div_cart_item_description> > <h2> + <p> + <p>
    generateHtmlNode('h2', divContentDescription, {})
    generateHtmlNode('p', divContentDescription, {})
    generateHtmlNode('p', divContentDescription, {})

    //<article> > <div cart_item_content> > <div cart_item_settings>
    const divContentSettings = generateHtmlNode('div', divContent, { class: "cart__item__content__settings" })


    //<div cart_item_content> > <div cart_item_settings> > <div cart_item_settings_quantity>
    const divContentSettingsQty = generateHtmlNode('div', divContentSettings, { class: "cart__item__content__settings__quantity" })

    //<div cart_item_settings_quantity> > <p> + <input>

    const pSettingsQty = generateHtmlNode('p', divContentSettingsQty, {})
    pSettingsQty.textContent = `Qté : `

    generateHtmlNode(
        'input',
        divContentSettingsQty,
        {
            type: "number",
            class: "itemQuantity",
            name: "itemQuantity",
            min: "1",
            max: "100",
            value: `${product.quantity}`
        })

    //<div cart_item_settings> > <div cart_item_settings_delete>
    const divContentSettingsDelete = generateHtmlNode('div', divContentSettings, { class: "cart__item__content__settings__delete" })


    //div cart_item_settings_delete> > <p>
    const pSettingsDelete = generateHtmlNode('p', divContentSettingsDelete, { class: "deleteItem" })
    pSettingsDelete.textContent = "Supprimer"

}


const productsInCart = getCart()
showDetailsCart(productsInCart)



const generateHtmlNode = (nodeType, parentElement, attributeObject) => {
    const childElement = createHtmlElement(nodeType, attributeObject)
    return parentElement.appendChild(childElement)
}
//     nameChild = createHtmlElement(typeElt, {})
//     nameParent.appendChild(nameChild)

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
