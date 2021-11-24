const router = require("express").Router();
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet} = require('../db');
const {API_KEY} = process.env;



const getApiInfo = async () => {

    const infoApi = await axios(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const apiInfo = infoApi.data.results.map(obj => {
        return {
            id: obj.id,
            title: obj.title,
            summary: obj.summary,
            score: obj.spoonacularScore,
            healthyScore: obj.healthScore,
            steps: obj.analyzedInstructions
            .map(r => r.steps.map(s => s.step))
            .flat()
            .join(""),
            image: obj.image,
            diets: obj.diets.map(diet => diet)
        };
    });
    return apiInfo;
};


const getDBInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attribute: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

const getAllInfo = async () => {
    const infoApi = await getApiInfo();
    const dbInfo = await getDBInfo();
    const allInfo = dbInfo.concat(infoApi);
    return allInfo;
};


router.get('/', async (req, res) => {
    const {name} = req.query;
    const totalRecipes = await getAllInfo();
    if (name) {
        const recipeTitles = await totalRecipes.filter(recipes => recipes.title.toLowerCase().includes(name.toLowerCase()));
            if(recipeTitles.length > 0) res.status(200).json(recipeTitles);
            else res.status(404).send('The indicated recipe does not exist');
    } else {
        res.status(404).json(totalRecipes);
    }
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const totalRecipes = await getAllInfo();
    if (id) {
        const recipeId = await totalRecipes.filter(recipes => recipes.id === parseInt(id));
            if (recipeId.length > 0) res.status(200).json(recipeId);
            else res.status(404).send('The indicated recipe does not exist');
    }
});

module.exports = router;