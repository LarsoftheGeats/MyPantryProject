// get button listeners
const pauseButton = document.getElementById("pause")
//add document links to ingredients section, recipe section, and yummy-view

const ingredientsBox=document.getElementById("ingredients")
const recipeBox=document.getElementById("recipe")
const yummyViewBox=document.getElementById("yummy-view")
const baseURL = `http://localhost:5050/`



//timer that periodically serves a random recipe
function myTimerFnc() {
    let index
    axios.get(baseURL+"recipestuff")
    .then((res) => {
        //console.log(res.data)
        ingredientsBox.innerHTML = res.data.ingredients
        recipeBox.innerHTML = res.data.recipe
        index = res.data.image
        yummyViewBox.innerHTML = `<img src = "./meal${index}.jpg"/>`
        })
    .catch((err) => {
        console.log(err)
    })
    //console.log(index)


    // const d = new Date();
    // yummyViewBox.innerHTML = d.toLocaleTimeString();
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


let myTimer = setInterval(myTimerFnc, 1000);
//randomly page through various pictures of recipes
pauseButton.addEventListener("click",togglePause)