import { apiUrl, baseFrontURL } from "./common.js"
import { createHtmlElement } from "./common.js"

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
    //On récupère l'élément parent
    let itemsElt = document.getElementById('items')

    //On boucle sur chaque article pour y créer et ajouter la balise <a> et son attribut href
    for (let article of articles) {

        //On crée la balise <a> avec l'attribut href qui contient l'URL avec l'id de l'article en paramètre
        let anchorElt = createHtmlElement('a', {
            href: `${baseFrontURL}/product.html?id=${article._id}`
        })
        itemsElt.appendChild(anchorElt)

        //Création de la balise <article> puis ajout à l'interieur de la balise <a> anchorElt
        let articleElt = createHtmlElement('article')
        anchorElt.appendChild(articleElt)


        //On ajoute les contenus html ci-dessous à l'intérieur de la balise <article> articleElt

        // l'image
        let imgElt = createHtmlElement('img', {
            src: `${article.imageUrl}`,
            alt: `${article.altTxt}`
        })
        articleElt.appendChild(imgElt)

        //le h3 avec le nom du produit
        let h3Elt = createHtmlElement('h3', {
            class: 'productName',
        })
        h3Elt.textContent = `${article.name}`
        articleElt.appendChild(h3Elt)

        //le paragraphe de description
        let pElt = createHtmlElement('p', {
            class: 'productDescription'
        })
        pElt.textContent = `${article.description}`
        articleElt.appendChild(pElt)

    }

}

getProducts().then(json => showArticles(json))







