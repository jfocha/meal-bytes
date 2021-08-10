const recipe = require('./recipe');
const User = require('./User');
const favorite=require('./favorite');

//need to create associations and register foreign keys

module.exports = { User, recipe, favorite };

//index.js file will export any models found within the models folder so that 
//they can be referenced from other files by just calling on the models folders