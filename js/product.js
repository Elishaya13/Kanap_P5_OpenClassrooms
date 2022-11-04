import { apiUrl } from "./common.js"

//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)
// On récupère la valeur du paramètre id passée dans l'URL
const idProduct = url.searchParams.get("id")

const currentIdProduct = idProduct
/*

fetch(apiUrl + idProduct)
    .then((r) => r.json())

    .then((jsonInfo) => {
        displayProduct(jsonInfo)

    })

    .catch((err) => console.log('une erreur est trouvée :', err))
*/

/**
 * 
 * @returns 
 */
const getProduct = async () => {
    let r = await fetch(apiUrl + idProduct);
    let jsonInfo = await r.json();
    return jsonInfo;
}


const displayProduct = (jsonInfo) => {


    addProductImg(jsonInfo.imageUrl, jsonInfo.altTxt)
    addProductName(jsonInfo.name)
    addProductPrice(jsonInfo.price)
    addProductDescription(jsonInfo.description)
    addSelectColorsOption(jsonInfo.colors)

}



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

    //pour chaque couleur disponible dans mon tableau , crée une balise <option> avec la valeur de color
    for (let color of productColors) {

        let newOptionElt = document.createElement("option")
        newOptionElt.setAttribute("value", `${color} `)
        newOptionElt.innerText = color

        optionParentElt.appendChild(newOptionElt)

    }
}

// Button //

let cart = []
/**
 * 
 */
const addCart = () => {
    const currentColorProduct = document.getElementById('colors').value
    const currentQtyProduct = document.getElementById('quantity').value

    let isFound = cart.find(element => element.id == currentIdProduct && element.color == currentColorProduct)

    if (currentColorProduct !== ' ' && currentQtyProduct > 0) {

        if (isFound != null) {

            console.log("trouve")


        } else {

            let objCart = {
                id: currentIdProduct,
                color: currentColorProduct,
                quantity: currentQtyProduct
            }
            cart.push(objCart)


        }


        // console.log(cart)

        // alert("commande ok")
    } else {
        alert("Veuillez choisir une couleur et choisir une quantité")
    }
}


//Ciblage et fonctionnement du bouton
document.getElementById("addToCart")
    .addEventListener("click", addCart)


getProduct().then(jsonInfo => displayProduct(jsonInfo))


/*

         let objCart = {
                id: 25,
                color: 55,
                quantity: 1
            }
            let objCart2 = {
                id: 12,
                color: 55,
                quantity: 50
            }


const array1 = [5, objCart, 8, objCart2, 44];

const isLargeNumber = (element) => element.id == 12 && element.color == 55;

const indexTrouve = array1.findIndex(isLargeNumber)

// expected output
console.log(array1[indexTrouve].quantity+)

*/






//recuperer l'id , la couleur et la quantité et les mettre dans un array
//const colorProduct = document.get.value

// const arrayOfProduct = [
//     { id: idProduct, color: 'color', quantity: 'quantity' }
// ]
// console.log(arrayOfProduct.map((p) => p.id + ' ' + p.color + ' ' + p.quantity))

// let objectId = idProduct
// arrayOfProduct2.push(objectId)
// console.log(arrayOfProduct2)
// let count = arrayOfProduct.push(objectId)
// console.log(arrayOfProduct)
// const idStorage = () => {

//     localStorage.setItem("objId", idProduct)

// }
// idStorage()
// console.log(objectId)
//recuperer l'id de l'objet et l'ajouter au tableau


//recuperer la couleur choisi et l'ajouter au tableau

//recuperer la quantité selectionné et l'ajouter au tableau
