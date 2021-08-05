//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class recepies extends Model{}
recipe.init(
    {
        name:{
    
          type: DataTypes.STRING,
        },
        
        description:{
    
         type: DataTypes.TEXT,
        },
        
        mealType:{
    
          type: DataTypes.STRING,
        },
        
        image:{
    
          type: DataTypes.BLOB("long"),
        },
      
        imageURL:{
    
          type: DataTypes.STRING,
        },
       
        gluten_free:{
    
          type:  DataTypes.BOOLEAN,
        },
        dairy_free:{
    
          type:  DataTypes.BOOLEAN,
        },
        vegetarian:{
    
          type:  DataTypes.BOOLEAN,
        },
        vegan:{
    
          type:  DataTypes.BOOLEAN,
        },
        prep_time:{
    
           type: DataTypes.INTEGER,
        },
        cook_time:{
    
           type: DataTypes.INTEGER,
        },
        instructions:{
    
           type: DataTypes.TEXT,
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'recies',
  }

);
module.exports = recipe;