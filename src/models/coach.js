'use strict';

const CoachModel = (sequelize, DataTypes) => sequelize.define('Coach', {
    name: { 
        type: DataTypes.STRING,
         allowNull: false 
        },
    championships: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
});

module.exports = CoachModel;