//
//
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

//Recuperation des sous objets se trouvant dans l'objet principal
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

// Passation de ces objets a leur contenu 
function handleData( Autonoé){
  console.log({ Autonoé})
const {altTxt, colors, description, imageUrl, name, price, _id} = Autonoé
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
    colors.forEach ((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = color
      select.appendChild(option)
    })
  }
}


const Button = document.querySelector("#addToCart")
  if (Button != null){
    Button.addEventlistener("click", (e) => {
      //@ts-ignore
      const color = document.querySelector("#colors").value
      const quantity = document.querySelector("#quantity").value
      if (color != null || quantity !=null){
        alert("please select a color and quantity")
      }
  })
}































