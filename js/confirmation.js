import { CONFIRMATION_MSG } from "./errorMsg.js"
// We instantiate URL by passing it the address of the page as a parameter
const url = new URL(window.location.href)

// Get the orderId value passed on the URL
const orderId = url.searchParams.get('orderId')
const orderElt = document.getElementById("orderId")


if (orderId == null) {
    orderElt.innerText = CONFIRMATION_MSG.errMsg
    orderElt.style.color = CONFIRMATION_MSG.color
} else {
    orderElt.innerText = orderId
    orderElt.style.fontWeight = "700"
    localStorage.clear()
}
