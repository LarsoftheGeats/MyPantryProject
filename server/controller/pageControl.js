const path = require("path")
const recipe = require("../recipes/recipe.json")

module.exports = {
    landingPage: (req,res) => {
        res.sendFile(path.join(__dirname,"./../../public/home.html"))
    },

    getRecipe: (req,res) => {
        
        index=Math.floor(Math.random()*4)
        console.log(recipe[index])
        res.send(recipe[index])
    },

    getPicture: (req,res) => {
        let {id} = req.params
        id=parseInt(id[1])
        console.log(id)
        // console.log(path.join( __dirname, `./../recipes/recipeImages/meal${id}.jpg`))
        // res.sendFile(path.join( __dirname, `./../recipes/recipeImages/meal${id}.jpg`))
    }


    
}