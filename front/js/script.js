// Récupération des produits de l'api 
fetch("http://localhost:3000/api/products")

  .then((res) => res.json())
  .then((data) => {
    addProducts(data);
  })
  .catch(() => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  });

// fonction d'affichage des produits de l'api sur la page index
function addProducts(data) {
  let zoneArticle = document.querySelector("#items");
  for (let article of data) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
