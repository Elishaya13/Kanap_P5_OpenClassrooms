//On déclare les chemins qui seront utilisés
export const baseFrontURL = window.location.href.replace("/index.html", "")
export const apiUrl = "http://localhost:3000/api/products/"


/**
 * Function to create a HTML element with attributes
 * @param {string} tagName 
 * @param {Object} attributes 
 * @returns {HTMLElement} - return a html element
 */
export function createHtmlElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    return element
}

/**
 * Retrieves the data saved in the localStorage and returns them in a JSON/Object
 * @returns {{id: String, color: String, quantity: String}[]} 
 */
export const getCart = () => {

    let cart = localStorage.getItem("cart")
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

    localStorage.setItem("cart", JSON.stringify(cart))

}

/**
 * Get data from API
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
export const fetchAllProducts = async () => {

    let r = await fetch(apiUrl)
    let json = await r.json()
    return json
}

/**
 * Query the product API and return the data from the URL in a JSON
 * @param {string} productId 
 * @returns {JSON}
 */
export const fetchProduct = async (productId) => {

    const r = await fetch(apiUrl + productId)
    return await r.json()
}

/**
 * Request the API using the post method, post the content of the object, and retrieve the order ID
 * With the order Id , open the confirmation page
 * @param {Object} orderObj 
 */
export const postOrder = async (orderObj) => {

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

}