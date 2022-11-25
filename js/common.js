// We declare the paths that will be used
export const baseFrontURL = window.location.href.replace("/index.html", "") // Racine
export const API_URL = "https://kanap.angiepons.fr/api/products/"
export const KEY_STORAGE_CART = "cart"

/**
 * Retrieves the data saved in the localStorage and returns them in a JSON/Object
 * @returns {{id: String, color: String, quantity: String}[]} 
 */
export const getCart = () => {

    let cart = localStorage.getItem(KEY_STORAGE_CART)
    if (cart === null) {
        return [];
    } else {
        return JSON.parse(cart)
    }
}

/**
 * Transforms the data into string and saves it in localStorage
 * @param {JSON} cart 
 */
export const saveCart = (cart) => {

    localStorage.setItem(KEY_STORAGE_CART, JSON.stringify(cart))

}

/**
 * Get data from API
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
export const fetchAllProducts = async () => {

    let r = await fetch(API_URL)
    let json = await r.json()
    return json
}

/**
 * Query the product API and return the data from the URL in a JSON
 * @param {string} productId 
 * @returns {JSON}
 */
export const fetchProduct = async (productId) => {

    const r = await fetch(API_URL + productId)
    return await r.json()
}

/**
 * Request the API using the post method, post the content of the object, and retrieve the order ID
 * With the order Id , open the confirmation page
 * @param {Object} orderObj 
 */
export const postOrder = async (orderObj) => {

    let response = await fetch(API_URL + "order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(orderObj),
    })

    let resultat = await response.json()

    window.location.href = `./confirmation.html?orderId=${resultat.orderId}`

}