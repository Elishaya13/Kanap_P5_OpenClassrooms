import { apiUrl, baseFrontURL } from "./common.js"


//On récupère les données de l'API
//To do verifier a faire fonctionner le catch
/**
 * 
 * @returns {Promise<JSON>} Promise object represents the Json of the API
 */
const getProducts = async () => {
    let r = await fetch(apiUrl)
    let json = await r.json()
    return json
}



/**
 * Loop on json object and write html content
 * @param {JSON} articles
 */
const showArticles = (articles) => {

    let displayHtml = ''
    //On boucle sur chaque article pour y créer et ajouter le contenu HTML
    for (let article of articles) {

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
    //On récupère l'élément parent et on insert le code HTML
    document.getElementById('items').insertAdjacentHTML('beforeend', displayHtml)
}

getProducts().then(json => showArticles(json))
