//get HTML Elements

const addIngredientsButton = document.getElementById("submit-food")
const ingredientsBox=document.getElementById("ingredients")
const recipeBox=document.getElementById("recipe")
const yummyViewBox=document.getElementById("yummy-view")
const foodInputText = []
foodInputText.push(document.getElementById("food1"))
const quantityInputText = []
quantityInputText.push(document.getElementById("quantity1"))
const baseURL = `http://localhost:5050/`



function renderPantry (pantryArr) {
    for (let i =0; i < pantryArr.length; i++){
        createFoodCard(pantryArr[i])
    }
}

function clearPantry () {
    ingredientsBox.innerHTML =``
}

function createFoodCard(foodItem){
    let foodCard = document.createElement('div')
    foodCard.classList.add('food-card')
    let {ingredients, quantity, expiration,id} = foodItem
    foodCard.innerHTML = 
    `<p>ingredient: ${ingredients} <br>
    <button onclick="updateQuantity(${id}, 'minus')">-</button>
    quantity: ${quantity} 
    <button onclick="updateQuantity(${id}, 'plus')">+</button>
    <br>
    expiration ${expiration}</p>`
    ingredientsBox.appendChild(foodCard)
}

function updateQuantity(id, type){
    let postBody = {
        id:id,
        type:type
    }
    axios.put("/pantry",postBody)
    .then( (res) => {
        clearPantry()
        renderPantry(res.data)
    } ).catch ((err) => {
        console.log(err)
    })
}

function addIngredients (evt) {
    evt.preventDefault()
}

function getPantry() {
    axios.get("/pantrydata")
    .then((res) => {
        renderPantry(res.data)
    })//axios then block
    .catch((err) => {
        console.log(err)
    })//axios catch block
}

getPantry()
addIngredientsButton.addEventListener("click",addIngredients)
//add button listeners 