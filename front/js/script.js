// Récupération des produits de l'api
fetch("http://localhost:3000/api/products")
  // quand tu as la réponse donne le résultat en json.
  .then((res) => res.json())
  // ce que l'on a reçu et qui a été traité en json sera appelé objetProduits
  .then((data) => {
    // appel de la fonction d'affichage des produits
    addproducts(data);
  })

  .catch(() => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  });

// fonction d'affichage des produits de l'api sur la page index
function addproducts(index) {
  let zoneArticle = document.querySelector("#items");
  // boucle pour chaque indice dans index
  for (let article of index) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
