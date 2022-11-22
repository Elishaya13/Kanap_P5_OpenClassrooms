# P5-Kanap - Construisez un site e-commerce en JavaScript #

-- Projet 5 de la formation développeur web d'OpenClassrooms --

Le CSS, le HTML et le back-end étaient fournis.
Il était demandé d'intégrer dynamiquement les divers éléments aux pages, grâce à JavaScript et l'API.

Page index.js : 
Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente

Page product.js :
Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier

Page cart.js
Une page “panier”. Celle-ci contient plusieurs parties :
○ Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
○ Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.

Page confirmation.js : 
Une page “confirmation” :
○ Un message de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant l'identifiant de commande envoyé par l’API.

______________________________________________________________________________________
Une partie des techniques que j'ai utilisé au cours du projet :

- Requêtes Fecth (GET, POST)
- Requêtes Asynchrone
- API
- DOM : Ciblage et création d'elements DOM avec  querySelector/getElementById, createElement et insertAdjacentHTML / appendChild / setAttribute..
- Boucles for , fonction map()
- Conditions if - else
- Evenements : EventListeners 
- Regex pour validation des données
- Les objets et les tableaux.
- ...



______________________________________________________________________________________

Hebergé sur pages : https://elishaya13.github.io/Kanap_P5_OpenClassrooms/html/index.html 

### Back end ###

Vous aurez besoin d'installer  Node et `npm` sur votre machine

### Back end Installation ###
Back-end fourni par openClassrooms https://github.com/OpenClassrooms-Student-Center/P5-Dev-Web-Kanap

Clonez ce dépôt. Depuis le dossier "back" du projet, exécutez `npm install`. 
Vous pouvez alors exécuter le serveur avec `node server`.
Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000`. Si la
serveur s'exécute sur un autre port pour une raison quelconque, ceci est imprimé sur le
console au démarrage du serveur, par ex. `Listening on port 3001`.
