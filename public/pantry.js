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

function addIngredients (evt) {
    evt.preventDefault()

}

addIngredientsButton.addEventListener("click",addIngredients)
//add button listeners 