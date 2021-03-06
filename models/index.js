const Recipe = require('./Recipe');
const User = require('./User');
const favorite = require('./favorite');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction');
const Post = require("./Post");
const Vote = require('./Vote');
const Comment = require('./Comment');

//need to create associations and register foreign keys
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

// Ingredient.belongsToMany(Instruction, {
//     through: Recipe,
//     foreignKey: 'instruction_id',
    
    
//   });
// Instruction.belongsTo(Ingredient, {
//     // through: Recipe,
//     foreignKey: 'ingredient_id',
    
    
//   });

// Recipe.hasOne(Instruction, {
//     foreignKey: 'instruction_id',
    
//   });
  
//   Instruction.hasMany(Ingredient, {
//     foreignKey: 'ingredient_id',
    
//   });




Ingredient.hasMany(Recipe, {
    // through: "Recipe_Ingredient",
    // as: "Ingredient",
    // foreignKey: 'recipe_id',
    // constraints: false
    // target: 'id'
  });

  Ingredient.belongsToMany(Recipe, {
    // constraints: false,
    through: "Recipe_Ingredient",
    // as: "Recipe",
    
    foreignKey: 'ingredient_id',
    constraints: false
    // target: 'id'
  });
  
// Recipe.belongsToMany(Ingredient, {
//     foreignKey: 'ingredient_id',
//     // target: 'id'
//   });

// Ingredient.belongsToMany(Recipe, {
//     through: "Recipe_Ingredient",
//     as: "Ingredient",
//     foreignKey: "Ingredient_id",
// });

// Recipe.belongsToMany(Ingredient, {
//     through: "Recipe_Ingredient",
//     as: "Recipe",
//     foreignKey: "Recipe_id",
// });

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Recipe, favorite, Ingredient, Post, Vote, Comment };

//index.js file will export any models found within the models folder so that 
//they can be referenced from other files by just calling on the models folders