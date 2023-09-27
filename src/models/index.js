'use strict';
require('dotenv').config(); 
const SQL_CONNECTION_STRING = process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';
const { Sequelize, DataTypes } = require('sequelize');
const players = require('./player.js');
const coaches = require('./coach.js');
const Collection = require('./Collection.js');


const sequelize = new Sequelize(SQL_CONNECTION_STRING, {logging:false}); // this can only be done once (it is a singleton)

const CoachModel = coaches(sequelize, DataTypes);
const PlayerModel = players(sequelize, DataTypes);

// creates our relations in the SQL database
CoachModel.hasMany(PlayerModel, { foreignKey: 'coachId', sourceKey: 'id' }); // a coach has many players // If i font do this i cannot grab player with coach
PlayerModel.belongsTo(CoachModel, { foreignKey: 'coachId', targetKey: 'id' }); // a player has one coach // If i dont do this i cannot grab coaches with one player




module.exports = {
    // sequelize,
    // PlayerModel: Player(sequelize, DataTypes),
    // CoachModel: Coach(sequelize, DataTypes)   
    
    sequelize,
    CoachModel,
    PlayerModel,
};


// NOTE: coaches has players and players have one coach. Players belong to a coach
