const { Diet } = require("../db");

const diets = [
    "gluten free",
    "dairy free",
    "vegetarian",
    "paleolithic",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "primal",
    "fodmap friendly",
    "whole 30",
];

async function preload() {
    diets.forEach(async (element) => {
        await Diet.findOrCreate({
        where: { name: element },
        });
    });

    const allDiets = await Diet.findAll();
    return allDiets;
}
  
console.log('Tipos de dieta pre-cargadas')
module.exports = {
preload,
};

