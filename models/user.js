//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class user extends Model{}
user.init(
    {

        name:{
            type:DataTypes.STRING,

        },
        email:{
            type:DataTypes.STRING,

        },
        password:{
            type:DataTypes.STRING
        }
        },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'user',
          }

          );
          module.exports = user;

