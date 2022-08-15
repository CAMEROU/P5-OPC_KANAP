////////
// getting id of the teddy from the single.html URL
////////
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "https://kanapjmax.herokuapp.com/";
const objectURL = host + "api/products/" + id;

/////////
// Fetching data from backend & constructing DOM
/////////
let cardsFetch = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // get data image
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      // data.name and title
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      // price
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      // description
      let description = document.getElementById("description");
      description.innerHTML = data.description;
      // colors
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};
cardsFetch();

////////
//Getting HTML values from HTML
/////////
// function that gets quantity value of the form in the markup
function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

// function that get the kanap color value in the markup
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// HTML element : button add to cart
const toCartBtn = document.getElementById("addToCart");
const goToCartButton = document.getElementById("goToCart");
goToCartButton.style.display = "none";
// at button press : toCartBtn, function addCart that activates the 2 other function by click
toCartBtn.addEventListener("click", () => {
  let qty = parseInt(qtyValue());
  let color = colorValue();
  add2Cart(id, color, qty);
  goToCartButton.style.display = "block";
});
goToCartButton.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
