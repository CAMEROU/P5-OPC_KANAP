// Récupération de l'id du produit via l' URL
const params = new URLSearchParams(document.location.search); 
// la variable id va récupérer la valeur du paramètre _id
const id = params.get("_id");
// Récupération des produits de l'api (voir script.js)
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((article) => {
    addleProducts(article);
  })
  /*.catch(() => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
  });*/

// Création d'objet articleClient
let articleClient = {};
articleClient._id = id;
// fonction d'affichage du produit de l'api
function addleProducts(produit) {
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");
  // boucle for pour chercher un indice
  for (let choix of produit) {
    //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
    if (id === choix._id) {
      //ajout des éléments de manière dynamique
      imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
      titre.textContent = `${choix.name}`;
      prix.textContent = `${choix.price}`;
      description.textContent = `${choix.description}`;
      // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)
      for (let couleur of choix.colors) {
        // ajout des balises d'option couleur avec leur valeur
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    }
  }
}
// choix couleur dynamique et définition des variables
let choixCouleur = document.querySelector("#colors");
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;
  couleurProduit = ec.target.value;
  articleClient.couleur = couleurProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
});
// choix quantité dynamique et définition des variables
let choixQuantity = document.querySelector('input[id="quantity"]');
let quantiteProduit;
choixQuantity.addEventListener("input", (eq) => {
  quantiteProduit = eq.target.value;
  articleClient.quantity = quantiteProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantiteProduit);
});
// conditions de validation du clic via le bouton ajouter au panier et déclaration variable
let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", () => {
  //conditions de validation du bouton ajouter au panier
  if (
    articleClient.quantity < 1 ||
    articleClient.quantity > 100 ||
    articleClient.quantity === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) {

    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
  }
   else {
    // joue panier
    Panier();
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});

// Déclaration de tableaux utiles (voir mutation) et déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier
let choixProduitClient = [];
let produitsEnregistres = [];
let produitsTemporaires = [];
let produitsAPousser = [];
// fonction ajoutPremierProduit qui ajoute l'article choisi dans le tableau vierge
function ajoutPremierProduit() {
  if (produitsEnregistres === null) {
    choixProduitClient.push(articleClient);
    return (localStorage.panierStocke = JSON.stringify(choixProduitClient));
  }
}
// fonction ajoutAutreProduit qui ajoute l'article dans le tableau non vierge et fait un tri 
function ajoutAutreProduit() {
  produitsAPousser = [];
  produitsTemporaires.push(articleClient);
  produitsAPousser = [...produitsEnregistres, ...produitsTemporaires];
  //fonction pour trier et classer les id puis les couleurs 
  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  produitsTemporaires = [];
  return (localStorage.panierStocke = JSON.stringify(produitsAPousser));
}

// fonction Panier qui ajuste la quantite si le produit est deja dans le tableau, sinon le rajoute si tableau il y a, ou creait le tableau avec un premier article choisi 
function Panier() {
  produitsEnregistres = JSON.parse(localStorage.getItem("panierStocke"));
  if (produitsEnregistres) {
    for (let choix of produitsEnregistres) {
      if (choix._id === id && choix.couleur === articleClient.couleur) {
        alert(" Cet article a déja été choisi.");
        let additionQuantite = parseInt(choix.quantite) + parseInt(quantiteProduit);
        choix.quantite = JSON.stringify(additionQuantite);
        return (localStorage.panierStocke = JSON.stringify(produitsEnregistres));
      }
    }
    return ajoutAutreProduit();
  }
  return ajoutPremierProduit();
}

