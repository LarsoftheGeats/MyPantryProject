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

function createFoodCar(foodItem){
    
}

function renderPantry (pantryArr) {
    for (let i =0; i < pantryArr.length; i++){
        createFoodCard(pantryArr[i])
    }
}

function addIngredients (evt) {
    evt.preventDefault()
}

function getPantry() {
    axios.get(baseURL+"pantrydata")
    .then((res) => {
        console.log(res.data)
        //renderPantry
    })//axios then block
    .catch((err) => {
        console.log(err)
    })//axios catch block
}

getPantry()
addIngredientsButton.addEventListener("click",addIngredients)
//add button listeners 