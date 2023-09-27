'use strict';

const CoachModel = (sequelize, DataTypes) => sequelize.define('Coach', {// define a new table called Coach
    name: { // define a new column called name 
        type: DataTypes.STRING,
         allowNull: false 
        },
    championships: { // define a new column called championships
        type: DataTypes.INTEGER,
        allowNull: false
        },
        // playerId: { // foreign key
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
});

module.exports = CoachModel;