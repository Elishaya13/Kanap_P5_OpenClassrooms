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
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart)
    }
}

// Sauvegarde les données passées dans le localStorage (key + string)
const saveCart = (cart) => {

    localStorage.setItem("cart", JSON.stringify(cart))

}