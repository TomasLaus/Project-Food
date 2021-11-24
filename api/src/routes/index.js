const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('../controllers/recipe');
const recipes = require('../controllers/recipes');
const types = require('../controllers/types');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/recipe', recipe);
router.use('/recipes', recipes);
router.use('/types', types);


module.exports = router;
