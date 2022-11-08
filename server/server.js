const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 5050

const {landingPage, getRecipe, getPicture} = require("./controller/pageControl.js")


app.use(express.json())

app.use(express.static('public'));
app.use(express.static('public/mealImage'))
//app.use(express.static("recipeImages"))

app.get("/", landingPage )
app.get("/recipestuff",getRecipe)
app.get("/jpg:id",getPicture)
app.listen(port, () => console.log(`Server listening on ${port}`))