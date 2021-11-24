const router = require("express").Router();
require('dotenv').config();
const { Recipe, Diet} = require('../db');




router.post('/', async (req, res) => {
    let{
        name,
        summary,
        score,
        healthyScore,
        image,
        steps,
        diets
    } = req.body

    try{
        let recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthyScore,
            image,
            steps,
        })

        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })

        recipeCreate.addDiet(dietDB)
        res.send('Succesfull')
    }catch(error){
        res.status(400).json({message: error?.message | 'Error en carga de datos'})
    }
});

module.exports = router;