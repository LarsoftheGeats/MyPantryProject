const path = require("path")
const recipe = require("../data/recipe.json")
const pantry = require("../data/pantry.json")
let pantryId=7
let recipeId=6
let get_jello=0



//Documentation
//landingPage sends home page
//getRecipe gets a random Recipe, TODO refactore
module.exports = {
    landingPage: (req,res) => {
        res.sendFile(path.join(__dirname,"./../../public/home.html"))
    },

    getRecipe: (req,res) => {
        get_jello++
        
        index=Math.floor(Math.random()*recipe.length)
        if (get_jello==5)
        {
            index=4
            get_jello=0;
        }
        if (get_jello==2){index=4}
        //console.log(recipe[index])
        res.send(recipe[index]).status(200)
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
                'id':recipeId
                }
            recipeId++
            recipe.push(recipeObj)
            console.log(recipe)
            res.send("all good").status(200)}
            catch( err ){
                res.send(err)

        }
    },
    getNextId: (req,res) =>{
        res.send(recipeId)
    },

    deleteRecipe: (req,res) => {
        let {id}=req.params
        id = parseInt(id.split(':')[1])
        try{
            for (let i =0; i< recipe.length; i++){
                if (recipe[i].id===id){
                    recipe.splice(i,1)
                }
            }
            recipe.splice(id,1)
            res.status(200).send("success")}
            catch{
                res.status(404).send("error deleting")
            }
        
    },
    
    updateRecipe: (req,res) =>{
    let
        {
            recipe:recipeName,
            ingredients,
            instructions,
            image,
            id
        } = req.body
        console.log("req.body" + recipeName + " " + ingredients + " " + id +" "+instructions)
        for (let i =0; i < recipe.length; i++){
            if (id===recipe[i].id){
                console.log("found " + id+ " "+recipe[i])
                recipe[i].recipe=recipeName
                recipe[i].image=image
                recipe[i].ingredients = []
                recipe[i].instructions = []
                for (let j = 0; j < ingredients.length; j++){
                    recipe[i].ingredients.push(ingredients[j])
                    console.log("pushing" + recipe[i].ingredients[j].name)
                }
                console.log(recipe[i].instructions)
                for (j = 0; j < instructions.length; j++){
                    recipe[i].instructions.push(instructions[j])
                }
                console.log(recipe[i].instructions)
                console.log(recipe[i])
                res.send("").status(200)
            }
        }
        //res.send('recipe not found').status(404)
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