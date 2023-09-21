'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Player = require('./player.js');
const Coach = require('./coach.js');

const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING); // this can only be done once (it is a singleton)

module.exports = {
    sequelize,
    PlayerModel: Player(sequelize, DataTypes),
    CoachModel: Coach(sequelize, DataTypes)   
};
