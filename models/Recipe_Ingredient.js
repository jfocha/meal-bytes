  
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe_Ingredient extends Model {}

Recipe_Ingredient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredient',
          key: 'id'
        }
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recipe',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe_ingredient'
    }
  );

module.exports = Recipe_Ingredient;