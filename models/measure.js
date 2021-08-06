//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class measure extends Model {}
measure.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    }
},
{
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'measure',
      }
);
module.exports = measure;


