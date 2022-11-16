//get html elements
//import {createFoodCard} from 'pantry.js'
const foodInputText = (document.getElementById("food1"))
const quantityInputText = (document.getElementById("quantity1"))
const ingredientsBox=document.getElementById("add-ingredients")
const recipeListBox = document.createElement('section')
const mainFrame = document.getElementsByClassName("mainFrame")[0]
const recipeBox=document.getElementById('recipe-box')
console.log(mainFrame)
mainFrame.appendChild(recipeListBox)
recipeListBox.setAttribute('display','none')
let globalID = 1;//global id
let buttonMinusArr=[]
let buttonPlusArr=[]
import {ListNode, LinkList} from './linklist.mjs'
let foodList = []
let instructionList = []
let linkNode = new ListNode(0)
let list = new LinkList(linkNode)
list.length=0

function renderRecipe(obj) {
    let {name,id} = obj
    let recipe = document.createElement('p')
    let button = document.createElement('button')
    let wrapper = document.createElement('div')
    button.id=`select_${id}`
    button.textContent='select'
    
    button.addEventListener('click',getRecipe)
    wrapper.appendChild(button)
    recipe.textContent=name
    console.log(name)
    wrapper.appendChild(recipe)
    wrapper.style.display="block"
    wrapper.style.width
    recipeListBox.appendChild(wrapper)
    recipeBox.style.display="none"
    console.log('hello')
}
function postRecipe() {

}
function getRecipe(evt ) {
    evt.preventDefault()
    let targetID = evt.target.id
    let id = parseInt(targetID.split('_')[1])
    console.log(`./recipe:${id}`)
    axios.get(`./recipe:${id}`)
    .then( (res) => {
        console.log(res.data)
        recipeListBox.style.display="none"
        recipeBox.style.display="inline"
    })
    .catch( (err) => {
        console.log(err)
    })

}

function getRecipeNames() {
    console.log('hello')
    axios.get('./recipes')
    .then((res) => {
        const {data}=res
        console.log(res.data)
        if (data.length===0){
            alert("no recipes added yet, please add some")
            return
        }
        for (let i = 0; i< data.length; i++){
            console.log('hello')
            renderRecipe(data[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function updateQuantity(evt){
    evt.preventDefault()
    console.log(evt.target.id)
    let str=evt.target.id.split('_')
    let type=str[0]
    let id=parseInt(str[1])
    console.log(type+" "+id)
    let offset = -1;
    if (type ==='plus'){
        offset = 1;
    }
    for (let i=0; i<foodList.length; i++){
        if (id = foodList[i].id){
            foodList[i].quantity+=offset
        }
    }

}
//TODO fix this
function createFoodCard(foodItem){
    let foodCard = document.createElement('div')
    foodCard.classList.add('food-card')
    let {ingredients, quantity, id} = foodItem
    foodCard.id=`ingredient_${id}`
    foodCard.innerHTML = 
    `<br><p>ingredient: ${ingredients} <br>
    <button id='minus_${id}')">-</button>
    quantity: ${quantity} 
    <button id='plus_${id}')">+</button>
    <br></p>`
    ingredientsBox.appendChild(foodCard)
    let buttonPlus=document.getElementById(`plus_${id}`)
    let buttonMinus=document.getElementById(`minus_${id}`)
    buttonPlus.addEventListener('click',updateQuantity)
    buttonMinus.addEventListener('click',updateQuantity)
    buttonMinusArr.push(buttonMinus)
    buttonPlusArr.push(buttonPlus)
    
}


//addIngredientsButton.addEventListener("click",addIngredients)
foodInputText.addEventListener("keyup", (evt) => {
    evt.preventDefault()
    //console.log("nameEnter")
    if (evt.keyCode ===13){
        //console.log("oduble enter")
        quantityInputText.focus()
    }

})

quantityInputText.addEventListener("keyup", (evt) => {
    evt.preventDefault()
    if (evt.code === "Enter"){  
        foodInputText.focus()
        let ingredientName = foodInputText.value
        let ingredientQuantity = quantityInputText.value
        const foodObj = {
            ingredients: ingredientName,
            quantity:ingredientQuantity,
            id: globalID,
            upladed: false
        }
        globalID++
        //console.log(ingredientName+" "+ingredientQuantity)
        createFoodCard(foodObj)
        foodList.push(foodObj)
        foodInputText.value=""
        quantityInputText.value=""
    }
    //console.log(foodList)

})

getRecipeNames()
