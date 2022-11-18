const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 5050

const cors = require('cors');
const corsOptions ={
    origin:"*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const {landingPage, 
    getRecipe, 
    getPicture,
    getPantry,
    updatePantry,
    addPantry,
    getAllRecipeNames,
    getRecipeDetails,
    addRecipe,
    updateRecipe,
    getNextId,
    deleteRecipe
} = require("./controller/pageControl.js")


app.use(express.json())

app.use(express.static('public'));
app.use(express.static('public/mealImage'))

//endpoints
app.get('id',getNextId)
app.get("/", landingPage )
app.get("/recipestuff",getRecipe)
app.get("/jpg:id",getPicture)
app.get("/pantrydata",getPantry)
app.get("/recipes",getAllRecipeNames)
app.get("/recipe:id",getRecipeDetails)
app.put("/pantry",updatePantry)
app.put("/updaterecipe",updateRecipe)
app.post("/addPantry",addPantry)
app.post("/addRecipe",addRecipe)
app.delete("/delete/:id",deleteRecipe)


app.listen(port, () => console.log(`Server listening on ${port}`))