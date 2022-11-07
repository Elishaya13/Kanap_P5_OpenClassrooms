//On déclare les chemins qui seront utilisés
export const baseFrontURL = window.location.href.replace("/index.html", "")
export const apiUrl = "http://localhost:3000/api/products/"

/**
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @returns {HTMLHtmlElement} - return a html element
 */
export function createHtmlElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    return element
}
