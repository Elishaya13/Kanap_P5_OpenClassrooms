//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)

// On récupère la valeur du paramètre orderId passée dans l'URL
const idOrder = url.searchParams.get('orderId')

const orderElt = document.getElementById("orderId")

orderElt.innerText = idOrder