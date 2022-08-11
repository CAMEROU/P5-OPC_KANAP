//
//
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null){
let itemPrice = 0
let imgUrl, altText,articleName
}

//Recuperation des sous objets se trouvant dans l'objet principal
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

// Passation de ces objets a leur contenu 
function handleData( KANAP){
const {altTxt, colors, description, imageUrl, name, price}= KANAP
itemPrice = price
imgUrl = imageUrl
altText = altTxt
articleName = name
makeImage(imageUrl, altTxt)
maketitle(name)
makePrice(price)
makeDescription(description)
makeColors(colors)
}

function makeImage(imageUrl, altTxt){
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
 parent.appendChild(image)
}

function maketitle(name){
const h1 =  document.querySelector("#title").textContent = name 
}

function makePrice(price){
const span = document.querySelector("#price")
const h3 = document.querySelector("#price")
if(span != null) span.textContent = price
}

function makeDescription(description){
  const p = document.querySelector("#description")
  if (p !=null) p.textContent = description
}

function makeColors(colors){
  const select = document.querySelector("#colors")
  if (select !=null) {
    colors.forEach ((colors) => {
      const option = document.createElement("option")
      option.value = colors
      option.textContent = colors
      select.appendChild(option)
    })
  }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 

function handleClick(){
  const color= document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
 if (isOrderInValid(color, quantity)) return
  saveOrder(color, quantity)
  window.location.href = "cart.html"
  redirectToCart()
}

function saveOrder(color, quantity) {
  const data = {
    id:id,
    color:color,
    quantity:Number(quantity),
    price:itemPrice,
    imageUrl: imgUrl,
     altTxt: altText,
     name : articleName

    }
    localStorage.setItem(id, JSON.stringify(data));
}

function isOrderInValid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("please select a color and quantity")
     return true
   }
}

//function redirectToCart(){
 // window.location.href = "cart.html"
//}*/























