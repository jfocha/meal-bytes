const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Instruction extends Model { }
Instruction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        instruction: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredient',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'instruction',
    }
);
module.exports = Instruction;