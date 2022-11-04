import { apiUrl } from "./common.js"

//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)
// On récupère la valeur du paramètre id passée dans l'URL
const idProduct = url.searchParams.get("id")


fetch(apiUrl + idProduct)
    .then((r) => {
        if (r.ok) {
            return r.json()
        } else {
            throw new Error("Requête pas ok")
        }
    })
    .then((jsonInfo) => {
        addProductImg(jsonInfo.imageUrl, jsonInfo.altTxt)
        addProductName(jsonInfo.name)
        addProductPrice(jsonInfo.price)
        addProductDescription(jsonInfo.description)
        addSelectColorsOption(jsonInfo.colors)


    })
    .catch((err) => console.log('une erreur est trouvée :', err))


//-- AddProduct functions --//

/**
 * Add an <img> node with provided attributes into div element containing item__img class
 * @param {String} imageUrl - the image url
 * @param {String} altTxt - the alt image value
 */
const addProductImg = (imageUrl, altTxt) => {
    let imgEltParent = document.querySelector("div.item__img")

    //J'efface le commentaire
    imgEltParent.innerHTML = ""

    let imageElt = document.createElement('img')
    imageElt.setAttribute("src", `${imageUrl}`)
    imageElt.setAttribute("alt", `${altTxt}`)
    imgEltParent.appendChild(imageElt)

}
const addProductName = (productName) => {
    document
        .getElementById("title")
        .innerText = productName
}

const addProductPrice = (productPrice) => {
    document
        .getElementById("price")
        .innerText = productPrice

}
const addProductDescription = (productDescription) => {
    document
        .getElementById("description")
        .innerText = productDescription

}

/**
 * Loop on json object and write <option> html content
 * @param {string[]} productColors 
 */
const addSelectColorsOption = (productColors) => {
    let optionParentElt = document.getElementById("colors")
    //J'efface le commentaire
    optionParentElt.innerHTML = ""

    //Je recrée la premiere option 
    let firstOptionElt = document.createElement("option")
    firstOptionElt.setAttribute("value", " ")
    firstOptionElt.innerText = "SVP, choississez une couleur"
    optionParentElt.appendChild(firstOptionElt)

    //pour chaque couleur disponnible dans mon tableau , crée une balise <option> avec la valeur de color
    for (let color of productColors) {

        let newOptionElt = document.createElement("option")
        newOptionElt.setAttribute("value", `${color} `)
        newOptionElt.innerText = color

        optionParentElt.appendChild(newOptionElt)

    }
}



