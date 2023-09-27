'use strict';

const { sequelize, CoachModel, PlayerModel } = require('../src/models/index.js');
let coach;
let player;
beforeAll(async () => {
    await sequelize.sync();
    coach = await CoachModel.create({
        name: 'Jacob',
        championships: 1,
    });
    player = await PlayerModel.create({
        name: 'Jon',
        position: 'QB',
        coachId: 1,
    })
})
afterAll(async () => {
    await sequelize.drop();
})

describe('Testing the Model Associations', () => {
    test('Should be able to create a Coach and Player', async () => {

        expect(coach.name).toEqual('Jacob');
        expect(player.name).toEqual('Jon');
        expect(player.coachId).toEqual(1);

    });
    test('Should be able to fetch a coach and include all players', async() => {
        coach = await CoachModel.findOne({ where: { id: 1 }, include: PlayerModel });

        expect(coach.name).toEqual('Jacob');
        console.log("COACHES*", coach);
        expect(coach.Players).toBeTruthy();
        expect(coach.Players[0].name).toEqual('Jon');
    });
});