// Set variables related to error messages and colors

export const FORM_MSG = {
    name: {
        errorMsg: "Le champ doit contenir un minimum de 2 caractères et ne pas contenir de chiffres",
        errorColor: "orange"
    },
    address: {
        errorMsg: "Le champ doit contenir un format d'adresse valide et au moins 2 mots",
        errorColor: "orange"
    },
    city: {
        errorMsg: "Le champ doit contenir le code postal et la ville (ex: 75000 Paris)",
        errorColor: "orange"
    },
    email: {
        errorMsg: "Le champ doit contenir un email valide",
        errorColor: "orange"
    },
    emptyField: {
        errorMsg: "Le champ ne doit pas être vide",
        errorColor: "red"
    }

}
export const CONFIRMATION_MSG = {
    errMsg: "Une erreur est survenue, veuillez recommencer svp",
    color: "red"
}

