'use strict';

const express = require('express'); 

const  { CoachModel} = require('../models'); 

const router = express.Router();// this is a router object, which is a mini-app

// ROUTES FOR COACHES

router.get('/coach', async (req, res) => { 

    let coach = await CoachModel.findAll(); // find all coaches in the CoachModel
    res.status(200).json(coach); // all the coaches i find, send them back as a json object
  });
  router.get('/coach/:id', async (req, res) => {
    let id = req.params.id;
    let coach = await CoachModel.findByPk(id);
    res.status(200).json(coach);
  });

  router.post('/coach', async (req, res) => {
      let coach = await CoachModel.create(req.body); // create a new coach in the coachModel
      res.status(200).json(coach); // send back the coach i created
  });
  
  router.patch('/coach/:id', async (req, res) => {
      let id = req.params.id; // get the id from the url
      let coachToUpdate = await CoachModel.findByPk(id); // find the coach in the CoachModel
      coachToUpdate.update(req.body); // update the coach in the CoachModel
      await coachToUpdate.save(); // save the coach in the CoachModel
  
      console.log('UPDATED COACH', coachToUpdate);
      res.status(200).send(coachToUpdate); // send back the coach i updated
  });
  
  router.delete('/coach/:id', async (req, res) => {
      let id = req.params.id; // get the id from the url
      await CoachModel.destroy({ where: 
          { id } }); // destroy the cpoach in the coachModel by id
      res.status(204).send('DELETED COACH'); // send back a message
  });

module.exports = router;