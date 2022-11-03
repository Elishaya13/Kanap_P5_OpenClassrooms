const apiUrl = "http://localhost:3000/api/products/"
//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)
// On récupère la valeur du paramètre id passée dans l'URL
const idProduct = url.searchParams.get("id")


fetch(apiUrl + idProduct)
    .then ((r) => {
        if (r.ok) {
            return r.json()
        } else {
            throw new Error("Requête pas ok")
        }
    })
    .then ((jsonInfo ) => {
        addPrice(jsonInfo.price)
        addDescription(jsonInfo.description)
        addImg(jsonInfo.imageUrl, jsonInfo.altTxt)

    })
    .catch((err) => console.log('une erreur est trouvée :', err))


 const addPrice = (price) => {
    document.getElementById("price").innerText = price

}
const addDescription =  (description) => {
    document
        .getElementById("description")
        .innerText = description

}

/**
 * Add an <img> node with provided attributes into div element containing item__img class
 * @param {String} imageUrl - the image url
 * @param {String} altTxt - the alt image value
 */
const addImg = (imageUrl, altTxt) => {
    let imgEltParent = document.querySelector("div.item__img")

    //J'efface le commentaire
    imgEltParent.innerHTML = ""
    let imageElt = document.createElement('img')
    imageElt.setAttribute("src" , `${imageUrl}`)
    imageElt.setAttribute("alt" , `${altTxt}`)
    console.log(imageElt)
    imgEltParent.appendChild(imageElt)

}

console.log(document.getElementsByClassName("item__img"))

