const path = require("path")
const recipe = require("../data/recipe.json")
const pantry = require("../data/pantry.json")


//Documentation
//landingPage sends home page
//getRecipe gets a random Recipe, TODO refactore
module.exports = {
    landingPage: (req,res) => {
        res.sendFile(path.join(__dirname,"./../../public/home.html"))
    },

    getRecipe: (req,res) => {
        
        index=Math.floor(Math.random()*4)
        //console.log(recipe[index])
        res.send(recipe[index])
    },

    getPicture: (req,res) => {
        let {id} = req.params
        id=parseInt(id[1])
        console.log(id)
        // console.log(path.join( __dirname, `./../recipes/recipeImages/meal${id}.jpg`))
        // res.sendFile(path.join( __dirname, `./../recipes/recipeImages/meal${id}.jpg`))
    },/*TODO decide to add/remove this tag*/

    getPantry:(req,res) => {
        res.send(pantry)
    },

    updatePantry: (req,res) => {
        const {id, type} = req.body
        if (type === "minus"){
            for (let i =0; i< pantry.length; i++){
                if (pantry[i].id === id){
                    pantry[i].quantity -=1
                    if (pantry[i].quantity === 0){
                        pantry.splice(i,1)
                    }
                }
            }
            

        }
        if (type === "plus"){
            for (let i =0; i < pantry.length; i++){
                if (pantry[i].id === id){
                    pantry[i].quantity +=1
                }
            }
        }
        res.send(pantry)
    }
}