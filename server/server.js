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
    updatePantry
} = require("./controller/pageControl.js")


app.use(express.json())

app.use(express.static('public'));
app.use(express.static('public/mealImage'))

//endpoints
app.get("/", landingPage )
app.get("/recipestuff",getRecipe)
app.get("/jpg:id",getPicture)
app.get("/pantrydata",getPantry)
app.put("/pantry",updatePantry)


app.listen(port, () => console.log(`Server listening on ${port}`))