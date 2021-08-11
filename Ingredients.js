//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Ingredients extends Model { }
Ingredients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredients: {

            type: DataTypes.STRING,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Ingredients',
    }
);
module.exports = Ingredients;

// Need to write an Instructions.js and use a many to many relationship with ingredients to form the Recipe.js model. Don't forget to make the relationship in index.js in the model folder