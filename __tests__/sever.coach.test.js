'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');
const { sequelize } = require('../src/models/index.js'); // this is the instance of sequelize that we created in index.js
const request = supertest(server.app);


// built in jest function, set up suites of our tests

beforeAll(async () => {
    await sequelize.sync(); // this will create our database tables based on our model definitions
});

afterAll(async () => {
    await sequelize.drop(); // this will drop all of our database tables

});
describe('Testing the REST Router', () => {

    test('Should CREATE a coach', async () => {
        let response = await request.post('/api/coach').send({
            name: 'Gregg Popovich',
            championships: 5,
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Gregg Popovich');
    });
    test('Should READ All coaches', async () => {
        let response = await request.get('/api/coach/');
        expect(response.status).toEqual(200); // expects a status code of 200 which means successful
        console.log("BODY",response.body);
        expect(response.body).toBeTruthy(); // expects response body to have a truthy value (not null, undefined, 0, alse, or an empty string)
    });
    test('Should READ a coach', async () => {
        let response = await request.get('/api/coach/1');
        expect(response.status).toEqual(200); // expects a status code of 200 which means successful
        expect(response.body).toBeTruthy(); // expects response body to have a truthy value (not null, undefined, 0, alse, or an empty string)
    });
    test('Should UPDATE a coach', async () => {
        let response = await request.patch('/api/coach/1').send({
            championships: 10,
        });
    
        expect(response.status).toEqual(200);
        expect(response.body.championships).toEqual(10);
      });
      test('Should DELETE a coach', async () => {
        let response = await request.delete('/api/coach/1');
    
        expect(response.status).toEqual(204);
      });
});


