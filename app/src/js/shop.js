console.log("Buy")
const popUp = document.querySelector(".shadow-overlay")
const chosenBlock = document.querySelector(".chosen div")

document.querySelector(".chosen button").addEventListener("click", function(e){
  e.preventDefault();
popUp.classList.add("hidden");
chosenBlock.innerHTML = "";
})
document.querySelectorAll(".shop-container a").forEach(item=>{
item.addEventListener("click", function(e){
e.preventDefault();
const itemDescription = this.querySelector(".description").textContent
const itemName = this.querySelector(".item-name").textContent
const itemPrice = this.querySelector(".item-price").textContent

const itemImg = this.querySelector("img").src
console.log(itemImg)
const itemContent = `
<h2 class="chosen-name">${itemName}</h2>
<img class="chosen-img" src="${itemImg}" alt="${itemName}">
<p class="chosen-price">${itemPrice}</p>
<p class="chosen-description">${itemDescription}</p>`
popUp.classList.remove("hidden");
chosenBlock.insertAdjacentHTML('beforeend', itemContent);
})
})
