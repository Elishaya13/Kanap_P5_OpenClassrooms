import { confirmationMsg } from "./errorMsg.js"
//On instancie URL en lui passant en paramètre l'adresse de la page
const url = new URL(window.location.href)

// On récupère la valeur du paramètre orderId passée dans l'URL
const orderId = url.searchParams.get('orderId')
const orderElt = document.getElementById("orderId")


if (orderId == null) {
    orderElt.innerText = confirmationMsg.errMsg
    orderElt.style.color = confirmationMsg.color
} else {
    orderElt.innerText = orderId
    orderElt.style.fontWeight = "700"
    localStorage.clear()
}
