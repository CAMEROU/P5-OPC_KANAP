// Fetching data from backend, displaying kanaps on front page
const host = "https://kanapjmax.herokuapp.com/";
const getUrl = host + "api/products/";
let cardsFetch = function () {
  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let productSection = document.getElementById("items");

      for (i = 0; i < data.length; i++) {
        const productCard = `
          <a href="./product.html?id=${data[i]._id}">
            <article>
              <img
                src="${data[i].imageUrl}"
                alt="${data[i].altTxt}"
              />
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">
                ${data[i].description}
              </p>
            </article>
          </a>
        `;
        productSection.innerHTML += productCard;
      }
    });
};
cardsFetch();
