import { apiUrl } from "./common.js"


// Recupere les données sauvegardées dans le localStorage (string) et les retourne sous forme de Json/Objet
const getCart = () => {

  let cart = localStorage.getItem("cart")
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart)
  }
}
let cart = getCart()
/**
 * Transforms the data into a string 
 * And saves it in the localStorage
 * @param {JSON} cart 
 */
const saveCart = (cart) => {

  localStorage.setItem("cart", JSON.stringify(cart))
}

// Intérroge l'API du produit et récupere le Json
const fetchProduct = async (productId) => {

  const r = await fetch(apiUrl + productId)
  let jsonProduct = await r.json()
  return jsonProduct
}



/**
 * Fuction showDetailsCart
 * @param {JSON} productsInCart 
 * 
 */
const showDetailsCart = async (productsInCart) => {

  let displayHtmlProduct = ''

  // Boucle sur chaque produit et intérroge les données de l'API
  // Puis créer un contenu html
  for (let product of productsInCart) {
    await fetchProduct(product.id)
      .then(fetchProductJson => {
        displayHtmlProduct += displayAProduct(product, fetchProductJson)
      })
  }

  // Insère le contenu HTML dans le parent
  document
    .getElementById('cart__items')
    .insertAdjacentHTML("beforeend", displayHtmlProduct)

  //Ecoute si un changement est fait sur le panier 
  changeCart()

  // deleteItem()
  //bouton supprimer

  //To do ajouter l'effacement dans le localstorage au clic suppr
  document.querySelectorAll('.deleteItem').forEach(item => {

    let currentElt = item.closest("article")
    let currentEltId = currentElt.getAttribute('data-id')
    let currentEltColor = currentElt.getAttribute('data-color')
    console.log(currentEltId + currentEltColor)
    item.addEventListener('click', () => (
      currentElt.remove()
    ))
  })



}

/**
 * Use 
 * @param {JSON} product 
 * @param {JSON} fetchProductJson 
 * @returns {string}
 */
const displayAProduct = (product, fetchProductJson) => {
  let productElt =
    `
             <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${fetchProductJson.imageUrl}" alt="${fetchProductJson.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${fetchProductJson.name}</h2>
                    <p>${product.color}</p>
                    <p>${fetchProductJson.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
         `
  return productElt
}

//Trie les produits par Id
const sortProducts = () => {

  productsInCart.sort(function (a, b) {
    if (a.id < b.id)
      return -1
    if (a.id > b.id)
      return 1
  })
}

/**
 * Update cart with new values of product quantity
 */
const changeCart = () => {

  // Selectionne tous les inputs de quantité
  document.querySelectorAll('.itemQuantity').forEach(item => {

    // Cible le parent et recupère l'information id et color dans ses attributs
    let currentElt = item.closest("article");
    let currentEltId = currentElt.getAttribute('data-id')
    let currentEltColor = currentElt.getAttribute('data-color')

    // Ajoute un evenement d'ecoute au changement de valeur de l'input
    item.addEventListener('change', (e) => changeQuantity(e.target.value))

    /**
     * @param {number} targetValue
     * Parcours l'actuel panier, modifie la quantité par la nouvelle valeur saisie
     */
    const changeQuantity = (targetValue) => {

      let foundProduct = cart.find(p => p.id == currentEltId && p.color == currentEltColor)
      if (foundProduct != undefined) {

        foundProduct.quantity = targetValue

        if (foundProduct.quantity <= 0) {
          //retourn l'index 
          let foundIndex = cart.indexOf(foundProduct)
          cart.splice(foundIndex, 1)
          //puis lancer la fonction deleteItem lorsqu'elle sera créée
          currentElt.remove()
        }
      }
      saveCart(cart)
    }

  })
}






// const removeFromCart = (item) => {

//   let foundProduct = cart.find(p => p.id == currentEltId && p.color == currentEltColor)
//   if (foundProduct != undefined) {
//     foundProduct
//   }









// const deleteItem = () => {
//   document.querySelectorAll('.deleteItem').forEach(item => {
//     let currentElt = item.closest("article");
//     let currentEltId = currentElt.getAttribute('data-id')
//     let currentEltColor = currentElt.getAttribute('data-color')

//     //let foundProduct = cart.find(p => p.id == currentEltId && p.color == currentEltColor)

//     item.addEventListener('click', () => {


//       let foundProduct = cart.find(p => p.id == currentEltId && p.color == currentEltColor)
//       if (foundProduct != undefined) {

//         let foundIndex = cart.indexOf(foundProduct)
//         cart.splice(foundIndex, 1)
//         console.log("supp")
//       }
//     })
//     // saveCart()
//     //   removeItem(currentElt))
//     // const removeItem = () => {
//     // //selectionne l'article complet et supprime son contenu
//     // }
//   })

// }




// const deleteItem = () => {
//   console.log("je supprime")
//   //localStorage.removeItem('cart', item)

// }


const productsInCart = getCart()
showDetailsCart(productsInCart), sortProducts()

