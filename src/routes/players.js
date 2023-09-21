'use strict';

const express = require('express'); 

const  { PlayerModel} = require('../models'); // ./models/index.js is the same as ./models

const router = express.Router();// this is a router object, which is a mini-app

// ROUTES FOR PLAYERS

router.get('/player', async (req, res) => { 

  let players = await PlayerModel.findAll(); // find all players in the PlayerModel
  res.status(200).json(players); // all the players i find, send them back as a json object
});
router.get('/player/:id', async (req, res) => { 
    let id = req.params.id; // get the id from the url
    let players = await PlayerModel.findByPk(id); // find all players in the PlayerModel
    res.status(200).json(players); // all the players i find, send them back as a json object
  });


router.post('/player', async (req, res) => {
    let player = await PlayerModel.create(req.body); // create a new player in the PlayerModel
    res.status(200).json(player); // send back the player i created
});

router.patch('/player/:id', async (req, res) => {
    let id = req.params.id; // get the id from the url
    let playerToUpdate = await PlayerModel.findByPk(id); // find the player in the PlayerModel
    playerToUpdate.update(req.body); // update the player in the PlayerModel
    await playerToUpdate.save(); // save the player in the PlayerModel

    console.log('UPDATED PLAYER', playerToUpdate);
    res.status(200).send(playerToUpdate); // send back the player i updated
});

router.delete('/player/:id', async (req, res) => {
    let id = req.params.id; // get the id from the url
    await PlayerModel.destroy({ where: 
        { id } }); // destroy the player in the PlayerModel by id
    res.status(204).send('DELETED PLAYER'); // send back a message
});

module.exports = router;