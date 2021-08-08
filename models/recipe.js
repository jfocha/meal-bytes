//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class recipe extends Model{}
recipe.init(
    {

      Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
	
    },
    measurement:{
       type:DataTypes.STRING,
       allowNull: false,
    
},
      ingredients:{
    
          type: DataTypes.STRING,
        },
        
        description:{
    
         type: DataTypes.TEXT,
        },
        
             
        image:{
    
          type: DataTypes.BLOB("long"),
        },
      
        imageURL:{
    
          type: DataTypes.STRING,
        },
       
        mealType:{
         type: DataTypes.STRING,

        },
        instructions:{
    
           type: DataTypes.TEXT,
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipes',
  }

);
module.exports = recipe;