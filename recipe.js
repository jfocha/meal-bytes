//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Recipe extends Model { }
Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    instructions: {

      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Recipe',
  }
);
module.exports = Recipe;
// need to be a model formed from Ingredients and Instructions
