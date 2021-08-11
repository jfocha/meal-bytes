const Recipe = require('./Recipe');
const User = require('./User');
const favorite = require('./favorite');
const Ingredients = require('./Ingredients');

//need to create associations and register foreign keys
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

Ingredients.belongsToMany(Recipe, {
    through: "Recipe_Ingredients",
    as: "Ingredients",
    foreignKey: "Ingredients_id",
});

Recipe.belongsToMany(Ingredients, {
    through: "Recipe_Ingredients",
    as: "Recipe",
    foreignKey: "Recipe_id",
});

module.exports = { User, Recipe, favorite, Ingredients };

//index.js file will export any models found within the models folder so that 
//they can be referenced from other files by just calling on the models folders