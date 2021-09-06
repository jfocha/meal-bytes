const router = require('express').Router();

const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const ingredientRoutes = require('./ingredient-routes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/ingredient', ingredientRoutes);

module.exports = router;