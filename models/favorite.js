//Should create tables of the database in the workbench
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class favorite extends Model{}
favorite.init(
    {
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    },


    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorite',
    
    }
);

module.exports = favorite;


	// Associations
	favorite.associate = function(db) {
		this.belongsTo(db.recipe);
		this.belongsTo(db.user);
	};

	return favorite;

