const path = require("path")
const recipe = require("../data/recipe.json")
const pantry = require("../data/pantry.json")
let pantryId=7
let recipeId=5


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

    getRecipeDetails: (req,res) => {
        let {id} = req.params
        id = id.split(':')
        id = parseInt(id[1])
        //console.log(id)
        for (let index=0; index <recipe.length; index++){
            if (recipe[index].id===id){
                //console.log(recipe[index])
                res.send(recipe[index])
                return
            }
            
        }
        console.log('file not found on the database')
        res.status(404).send('id does not match any database item')
    },

    addRecipe: (req,res) =>{
       try
        {let
            {
                recipe:recipeName,
                ingredients,
                instructions,
                image,
            } = req.body
            recipeObj = {
                'recipe':recipeName,
                'ingredients':ingredients,
                'instructions':instructions,
                'image':image,
                id:recipeId
                }
            recipeId++
            recipe.push(recipeObj)
            getAllRecipeNames()}
            catch( err ){
                res.send(err)

        }
    },
    

    addPantry: (req,res) => {
       //console.log(req.body) 
    //    console.log(req.body)
       let pantryItem = {
        ingredients:"",
        quantity:0,
        expiration:"",
        id:null
       }
       const {quantityItems, items} = req.body
       for (let i =0; i < quantityItems; i++){
        pantryItem.ingredients=items[i].itemName
        pantryItem.quantity=items[i].quantity
        pantryItem.expiration=items[i].expiration
        pantryItem.id = pantryId
        pantry.push(pantryItem)
        pantryId++
       }
       console.log(pantry)
       res.send(pantry)
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

    getSpecRecipe: (req,res) => {

    },

    getAllRecipeNames: (req,res) => {
        let responseArray = []
        for (let i =0; i < recipe.length; i++){
            let resObj={
                name:"",
                id:0
            }
            resObj.name=recipe[i].recipe
            resObj.id=recipe[i].id
            responseArray.push(resObj)
        }
        res.send(responseArray)
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