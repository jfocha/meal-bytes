const router = require('express').Router();

const recipeRoutes = require('./recipes');

router.use('/recipes', recipeRoutes);

module.exports = router;