import { apiUrl, baseFrontURL } from "./common.js"

/**
 * Get data from API
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
const getProducts = async () => {

    let r = await fetch(apiUrl)
    let json = await r.json()
    return json
}


/**
 * Loop on json object and write html content
 * @param {JSON} productsJson - API product result 
 */
const showArticles = (productsJson) => {

    let displayHtml = ''
    //Loop on each article and create the html content with Json infos
    for (let article of productsJson) {

        displayHtml += `
            <a href="${baseFrontURL}/product.html?id=${article._id}">
                <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p class="productDescription">${article.description}</p>
                </article>
            </a> 
         `
    }
    // Get parent element and insert to the Html code
    document.getElementById('items').insertAdjacentHTML('beforeend', displayHtml)
}


getProducts()
    .then(json => showArticles(json))
    .catch(err =>
        document.querySelector("#items").innerHTML = `<p style = "color:red">${err}  Merci de démarrer votre back end </p>`
    )