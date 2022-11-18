//get html elements
let foodInputText = (document.getElementById("food1"))
foodInputText.style.display='block'
foodInputText.defaultValue="EnterFoodName"
let quantityInputText = (document.getElementById("quantity1"))
quantityInputText.style.display='block'
quantityInputText.defaultValue="EnterQuantity"
const ingredientsBox=document.getElementById("add-ingredients")
const recipeListBox = document.createElement('section')
const recipeTitle = document.getElementById('recipe-name')
const mainFrame = document.getElementsByClassName("mainFrame")[0]
const recipeBox=document.getElementById('recipe-box')
const instructionsBox = document.getElementById("instructions_input")
let submitButton = document.getElementById('submit-food')
let titleBoxInput = document.createElement('input')
titleBoxInput.setAttribute("type","text")
titleBoxInput.defaultValue="enter recipe"
titleBoxInput.id="titlein"
recipeBox.appendChild(titleBoxInput)
const addRecipeButton = document.createElement('button')
addRecipeButton.setAttribute('display','inline-block')
addRecipeButton.textContent="add recipe"
addRecipeButton.addEventListener('click',RecipeForm)
mainFrame.appendChild(addRecipeButton)
let image = ''


let newRecipe = false;
// console.log(mainFrame)
mainFrame.appendChild(recipeListBox)
recipeListBox.classList.add('hidden')
let globalID = 1;//global id
let buttonMinusArr=[]
let buttonPlusArr=[]
let deleteButton

let foodList = []
let instructionList = []

function RecipeForm(evt){
    evt.preventDefault()
    newRecipe=true
    buttonMinusArr=[]
    buttonPlusArr=[]
    // console.log("add recipe")
    //mainFrame.innerHTML=""
    recipeBox.classList.remove('hidden')
    ingredientsBox.classList.remove('hidden')
    ingredientsBox.innerHTML=''
    ingredientsBox.appendChild(foodInputText)
    ingredientsBox.appendChild(quantityInputText)
    instructionsBox.classList.remove('hidden')
    recipeListBox.classList.add('hidden')
    mainFrame.appendChild(instructionsBox)
    mainFrame.appendChild(ingredientsBox)
    mainFrame.appendChild(recipeBox)

}
function renderRecipeName(obj) {
    let {name,id} = obj
    let recipe = document.createElement('p')
    let button = document.createElement('button')
    let wrapper = document.createElement('div')
    button.id=`select_${id}`
    button.textContent='select'
    
    button.addEventListener('click',getRecipe)
    wrapper.appendChild(button)
    recipe.textContent=name
    // console.log(name)
    wrapper.appendChild(recipe)
    wrapper.style.display="block"
    wrapper.style.width
    recipeListBox.classList.remove('hidden')
    recipeListBox.appendChild(wrapper)
    
    //ingredientsBox.classList.add('hidden')
    //console.log('hello')
}
function postRecipe(evt) {
    evt.preventDefault()
    console.log("posting recipe")
    let postBody = {
        recipe:'',
        ingredients:[],
        instructions:[],
        image:''
    }
    postBody.recipe=recipeTitle.textContent
    if (postBody.recipe ===''){
        postBody.recipe = 'default name'
    }
    for (let i=0; i<foodList.length; i++){
        postBody.ingredients.push(foodList[i])
    }
        postBody.instructions=(instructionsBox.textContent)
        let array=postBody.instructions
        postBody.instructions=''
        for (let i =0; i< array.length; i++){
            
            if (!(array[i]===',')){
                postBody.instructions = postBody.instructions+ array[i]
            }
        }
        console.log(postBody.instructions)

        // console.log(instructionsBox.textContent)
    // console.log(postBody)
    // console.log(newRecipe)
    postBody.image=image
    if (newRecipe === true){
        console.log("newRecipe")
        postBody.recipe=titleBoxInput.value
        console.log(postBody)
        axios.post('./addrecipe',postBody)
        .then( (res) => {
            // console.log("good return")
            newRecipe = false;

            getRecipeNames()

        })
        .catch ((err) => {
            // console.log(err)
        })
    }
    else {
        postBody.id=globalID
        postBody.recipe=recipeTitle.textContent
        console.log(postBody)
        axios.put('./updaterecipe',postBody)
        .then( (res) => {
            newRecipe = false;
            getRecipeNames()
        })
        .catch ((err) => {
            //console.log(err)
        })
    }

}
function getRecipe(evt ) {
    evt.preventDefault()
    let targetID = evt.target.id
    let id = parseInt(targetID.split('_')[1])
    //console.log(`./recipe:${id}`)
    axios.get(`./recipe:${id}`)
    .then( (res) => {
        globalID=id
        foodList = []
        
        //console.log(res.data)
        recipeListBox.classList.add('hidden')
        recipeBox.classList.remove('hidden')
        instructionsBox.classList.remove('hidden')
        let currentRecipe = res.data
        ingredientsBox.innerHTML=""
        image=res.data.image
        for (let i =0; i< currentRecipe.ingredients.length; i++){
            let foodObj={
                id:0,
                quantity:0,
                name:""
            }
            foodObj.id=i;
            foodObj.quantity=currentRecipe.ingredients[i].quantity;
            foodObj.name=currentRecipe.ingredients[i].name;
            createFoodCard(
                foodObj)
            
            
        } 
        recipeTitle.textContent=res.data.recipe
        instructionsBox.placeholder=res.data.instructions
        instructionsBox.textContent=res.data.instructions
        newRecipe=false//this is an edited recipe
        deleteButton = document.createElement('button') 
        deleteButton.addEventListener('click', deleteRecipe)
        deleteButton.id=`delete_${id}`
        deleteButton.textContent="Delete Recipe"
        mainFrame.appendChild(deleteButton)


        //console.log(foodList)
        
    })
    .catch( (err) => {
        //console.log(err)
    })

}

function deleteRecipe (evt) {
    evt.preventDefault()
    let target=evt.target.id
    target = parseInt(target.split('_')[1])
    console.log(target)
    deleteButton.style.display='none'
    axios.delete(`./delete/:${target}`,'')
    .then( (res) => {
        console.log(res)
        getRecipeNames()
        deleteButton.style.display='none'
    })
    .catch((err) => {
        console.log(err)
    })
}

function getRecipeNames() {
    recipeListBox.innerHTML=''
    //console.log('hello')
    axios.get('./recipes')
    .then((res) => {
        const {data}=res
        // console.log(res.data)
        if (data.length===0){
            alert("no recipes added yet, please add some")
            return
        }instructionsBox.classList.add('hidden')
        recipeBox.classList.add('hidden')
        for (let i = 0; i< data.length; i++){
            //console.log('hello')
            
            renderRecipeName(data[i])
            globalID=data[i].id
        }
        globalID++
    })
    .catch((err) => {
        // console.log(err)
    })
}

function updateQuantity(evt){
    evt.preventDefault()
    // console.log(evt)
    //console.log(evt.target.id)
    let str=evt.target.id.split('_')
    let type=str[0]
    let id=parseInt(str[1])
    //console.log(type+" "+id)
    let offset = -1;
    if (type ==='plus'){
        offset = 1;
    }
    for (let i=0; i<foodList.length; i++){
        if (id === foodList[i].id){
            foodList[i].quantity+=offset
            // console.log(foodList[i])
            // console.log(i)
        }
    }
    // console.log(foodList)

}
//TODO fix this
function createFoodCard(foodItem){
    foodList.push(foodItem)
    let foodCard = document.createElement('div')
    foodCard.classList.add('food-card')
    let {name, quantity, id} = foodItem
    foodCard.id=`ingredient_${id}`
    foodCard.innerHTML = 
    `<br><p>ingredient: ${name} <br>
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

function foodEnter (evt) {
    
        evt.preventDefault()
        //console.log("nameEnter")
        if (evt.keyCode ===13){
            //console.log("oduble enter")
            quantityInputText.focus()
        } 
}

function quantEnter (evt) {
    evt.preventDefault()
    if (evt.code === "Enter"){  
        foodInputText.focus()
        let ingredientName = foodInputText.value
        let ingredientQuantity = parseInt(quantityInputText.value)
        const foodObj = {
            name: ingredientName,
            quantity:ingredientQuantity,
            id: globalID,
            uploaded: false
        }
        globalID++

        createFoodCard(foodObj)
        foodInputText.defaultValue="EnterFoodName"
        quantityInputText.defaultValue="EnterQuantity"
    }


}
quantityInputText.addEventListener("keyup", quantEnter)

foodInputText.addEventListener("keyup", foodEnter)
submitButton.addEventListener('click',postRecipe)
getRecipeNames()
