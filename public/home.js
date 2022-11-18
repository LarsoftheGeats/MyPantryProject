// get button listeners
const pauseButton = document.getElementById("pause")
//add document links to ingredients section, recipe section, and yummy-view

const ingredientsBox=document.getElementById("ingredients")
const recipeBox=document.getElementById("recipe")
const yummyViewBox=document.getElementById("yummy-view")
const instructionsBox=document.getElementById("instructions")
const baseURL = `http://localhost:5050/`



//timer that periodically serves a random recipe
function myTimerFnc() {
    axios.get("/recipestuff")
    .then((res) => {
        ingredientsBox.innerHTML=''
        console.log(res.data)
        const {ingredients, recipe, instructions, image}=res.data
        for (let i = 0; i< ingredients.length; i++){
            createFoodCard(ingredients[i])
        }
        recipeBox.innerHTML = recipe
        instructionsBox.innerHTML = instructions
        yummyViewBox.innerHTML = `<img src = "./${image}"/>`
        
        })
    .catch((err) => {
        console.log(err)
    })
    //console.log(index)


    // const d = new Date();
    // yummyViewBox.innerHTML = d.toLocaleTimeString();
 }

 function createFoodCard(foodItem){
    console.log(foodItem)
    let foodCard = document.createElement('div')
    foodCard.classList.add('food-card')
    let {name, quantity} = foodItem
    foodCard.innerHTML = 
    `<p>ingredient: ${name} <br>
    quantity: ${quantity} 
    <br>`
    ingredientsBox.appendChild(foodCard)
}


function togglePause(evt){
    evt.preventDefault()
    if (pauseButton.textContent === 'Pause')
    {
        clearInterval(myTimer)
        pauseButton.textContent="Unpause"
        console.log(pauseButton)
    }else {
        myTimer = setInterval(myTimerFnc, 5000);
        pauseButton.textContent="Pause"
        console.log(pauseButton)
    }
    
}


let myTimer = setInterval(myTimerFnc, 5000);
//randomly page through various pictures of recipes
pauseButton.addEventListener("click",togglePause)