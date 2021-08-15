//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Ingredient extends Model { }
Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false
            // needs to be unique. test?
        },
        // recipe_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'recipe',
        //         key: 'id'
        //     },
        //     constraints: false
        // },
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ingredient',
    }
);
module.exports = Ingredient;

// Need to write an Instructions.js and use a many to many relationship with ingredients to form the Recipe.js model. Don't forget to make the relationship in index.js in the model folder