import { apiUrl } from "./common.js"




// /**
//  * 
//  * @returns {Promise<JSON>} Promise object represents the Json of the API
//  */
// const getProducts = async () => {
//     let r = await fetch(apiUrl)
//     let json = await r.json()
//     return json
// }



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
    return jsonProduct
}
const sortProducts = () => {
    productsInCart.sort(function (a, b) {
        if (a.id < b.id)
            return -1
        if (a.id > b.id)
            return 1
    })
}


//recupere le panier en localstorage puis parcours les données
/**
 * @param {JSON} products // Json recuperer de getCart()
 */
const showDetailsCart = async (productsInCart) => {

    let displayHtmlProduct = ''

    // Pour chaque produit intérroge les données de l'API puis créer un contenu html
    for (let product of productsInCart) {

        await fetchProduct(product.id).then(fetchProductJson => {
            displayHtmlProduct += displayAProduct(product, fetchProductJson)

        })

    }
    // Insère le contenu HTML dans le parent
    document.getElementById('cart__items').insertAdjacentHTML("beforeend", displayHtmlProduct)

    // document.querySelectorAll('.itemQuantity').forEach(item => {
    //     item.addEventListener('change', (item) => updateCart(item))
    // })


}
// const updateCart = (item) => {
//     let currentElt = item.closest("article");
//     console.log(currentElt.getAttribute('data-id'))
// }

/**
 * Use 
 * @param {JSON} product 
 * @param {JSON} fetchProductJson 
 * @returns {string}
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




const productsInCart = getCart()
showDetailsCart(productsInCart), sortProducts()

