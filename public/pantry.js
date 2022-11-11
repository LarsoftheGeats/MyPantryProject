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
    console.log("submit")
    let postBody = {
        quantityItems:0,
        items:[]
    }
    //TODO add expiration to HTML 
    //TODO add type to food type
    let foodItem ={
        itemName:"",
        quantity:0,
        expiration: ""
    }
    for (let i =0; i<foodInputText.length; i++){
        if (!(foodInputText[i].value==="")&&!(quantityInputText[i].value==="")&&!(quantityInputText[i].value===0))
        {
            foodItem.itemName=foodInputText[i].value
            foodItem.quantity=Number.parseFloat(quantityInputText[i].value)
            postBody.quantityItems++
            postBody.items.push(foodItem)
            foodInputText[i].value = ''
            quantityInputText[i].value= ''
        }
    }
    //console.log(postBody)//functional
    axios.post("addPantry",postBody)
    .then( (res) => {
        clearPantry()
        renderPantry(res.data)

    })//then block
    .catch( (err) => {
        console.log(err)
    })
    
    

}

function getPantry() {
    axios.get("/pantrydata")
    .then((res) => {
        clearPantry()
        renderPantry(res.data)
    })//axios then block
    .catch((err) => {
        console.log(err)
    })//axios catch block
}

getPantry()
addIngredientsButton.addEventListener("click",addIngredients)
foodInputText[0].addEventListener("keyup", (evt) => {
    evt.preventDefault()
    console.log("nameEnter")
    if (evt.keyCode ===13){
        quantityInputText[0].focus()
    }
})

quantityInputText[0].addEventListener("keyup", (evt) => {
    evt.preventDefault()
    console.log("#enter")
    if (evt.keyCode ===13){
        foodInputText[0].focus()
    }
})
//add button listeners 