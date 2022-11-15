//get html elements
//import {createFoodCard} from 'pantry.js'
const foodInputText = (document.getElementById("food1"))
const quantityInputText = (document.getElementById("quantity1"))
const ingredientsBox=document.getElementById("add-ingredients")
let globalID = 1;//global id
import {ListNode, LinkList} from './linklist.mjs'

let linkNode = new ListNode(0)
let list = new LinkList(linkNode)
list.length=0

function updateQuantity(evt){
    evt.preventDefault()
    console.log(evt.target.id)
    let str=evt.target.id.split('_')
    let type=str[0]
    let id=parseInt(str[1])
    let node = list.head
    let offset = -1;
    if (type === 'plus'){
        offset = 1;
    } 
    let continueLoop=true
    let index=0;
    while (node!== null&&continueLoop){
        if (node.nodeData.id === id){
            node.nodeData.quantity+=offset
            continueLoop=false
            if (node.nodeData.quantity===0){
                list.removeElement(index)
            }
            
        }
        node=node.nextNode
        index++
    }
    
}
//TODO fix this
function createFoodCard(foodItem){
    let foodCard = document.createElement('div')
    foodCard.classList.add('food-card')
    foodCard.id
    let {ingredients, quantity, id} = foodItem
    foodCard.innerHTML = 
    `<p>ingredient: ${ingredients} <br>
    <button id='minus_${id}')">-</button>
    quantity: ${quantity} 
    <button id='plus_${id}')">+</button>
    <br></p>`
    ingredientsBox.appendChild(foodCard)
    let buttonPlus=document.getElementById(`plus${id}`)
    let buttonMinus=document.getElementById(`minus${id}`)
    buttonPlus.addEventListener('click',updateQuantity)
    buttonMinus.addEventListener('click',updateQuantity)
    
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
            id: globalID
        }
        globalID++
        //console.log(ingredientName+" "+ingredientQuantity)
        createFoodCard(foodObj)
        if (list.length===0){
            list.head.nodeData=foodObj
            list.length++
            return
        }
        let foodNode = new ListNode(foodObj)
        list.pushElement(foodNode)
        foodInputText.value=""
        quantityInputText.value=""
    }

})

