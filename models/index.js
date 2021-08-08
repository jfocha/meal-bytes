const recipe = require('./recipe');
const user=require('./user');
const favorite=require('./favorite');

module.exports = recipe;
module.exports=user;
module.exports=favorite;

//index.js file will export any models found within the models folder so that 
//they can be referenced from other files by just calling on the models folders