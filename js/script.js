//On déclare les chemins qui seront utilisés
const baseFrontURL = window.location.origin + "/html"
const apiUrl = "http://localhost:3000/api/products/"


//On récupère les données de l'API
fetch(apiUrl)
    //On retourne un json si la réponse est 200 sinon on renvoie une erreur
    .then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error("Requête pas ok")
        }
    })
    // On appelle la fonction showArticles en lui passant le json récupéré.
    .then((json) => showArticles(json))

    .catch((err) => console.log('une erreur est trouvée :', err))


/**
 * Loop on json object and write html content
 * @param {JSON} articles
 */
const showArticles = (articles) => {
    //On récupère l'élément parent
    let itemsElt = document.getElementById('items')

    //On boucle sur chaque article
    for (let article of articles) {

        //On crée la balise <a> avec l'attribut href qui contient l'URL avec l'id de l'article en paramètre
        let articleElt = document.createElement('a')
        articleElt.setAttribute("href" , `${baseFrontURL}/product.html?id=${article._id}`)

        //On ajoute le contenu html ci-dessous à l'intérieur de la balise <a>
        articleElt.innerHTML =
            `<article>
                <img src="${article.imageUrl}" alt="${article.altTxt}"> 
                <h3 class='productName'> ${article.name} </h3>
                <p class='productDescription'> ${article.description} </p>
             </article>`

        itemsElt.appendChild(articleElt)

    }

}






