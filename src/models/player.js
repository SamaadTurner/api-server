'use strict';

const Player = (sequelize, DataTypes) => sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

module.exports = Player;

