'use strict';
require('dotenv').config(); 
const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';
const { Sequelize, DataTypes } = require('sequelize');
const players = require('./player.js');
const coaches = require('./coach.js');
const Collection = require('./collection-class.js');


const sequelize = new Sequelize(SQL_CONNECTION_STRING); // this can only be done once (it is a singleton)

const CoachModel = coaches(sequelize, DataTypes);
const PlayerModel = players(sequelize, DataTypes);




module.exports = {
    sequelize,
    PlayerModel: Player(sequelize, DataTypes),
    CoachModel: Coach(sequelize, DataTypes)   
};


// NOTE: coaches has players and players have one coach