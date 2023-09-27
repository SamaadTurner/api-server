'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');
const { sequelize, CoachModel } = require('../src/models/index.js'); // this is the instance of sequelize that we created in index.js
const request = supertest(server.app);

let coach;
// built in jest function, set up suites of our tests

beforeAll(async () => {
    await sequelize.sync(); // this will create our database tables based on our model definitions
});

afterAll(async () => {
    await sequelize.drop(); // this will drop all of our database tables

});
beforeEach(async () => {
    try{
        coach = await CoachModel.create({
        name: 'Jon', 
        championships: 1
    });
    } catch (error) {
    console.log(error);
    }
});
describe('Testing the REST Router', () => {

    test('Should CREATE a Player', async () => {
        let response = await request.post('/api/player').send({
            name: 'Samaad',
            position: 'Small forward',
            coachId: coach.id
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Samaad');
    });
    test('Should READ All Players', async () => {
        let response = await request.get('/api/player/');
        expect(response.status).toEqual(200); // expects a status code of 200 which means successful
        console.log("BODY",response.body);
        expect(response.body).toBeTruthy(); // expects response body to have a truthy value (not null, undefined, 0, alse, or an empty string)
    });
    test('Should READ a Player', async () => {
        let response = await request.get('/api/player/1');
        expect(response.status).toEqual(200); // expects a status code of 200 which means successful
        expect(response.body).toBeTruthy(); // expects response body to have a truthy value (not null, undefined, 0, alse, or an empty string)
    });
    test('Should UPDATE a Player', async () => {
        let response = await request.patch('/api/player/1').send({
            name: 'Jon',
            position: 'Center',
            coachId: 1
        });
    
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Jon');
      });
      test('Should DELETE a Player', async () => {
        let response = await request.delete('/api/player/1');
    
        expect(response.status).toEqual(204);
      });
});


































/*
404 on a Bad Route:

Route: /api/nonexistent
Expected Behavior: When you make a request to a route that doesn't exist, you should receive a 404 Not Found response.
Expected Status Code: 404

404 on a Bad Method:

Route: /api/coaches (with a method not supported, e.g., PATCH)
Expected Behavior: When you make a request to an existing route with an unsupported HTTP method, you should receive a 404 Not Found response.
Expected Status Code: 404

Create a Record Using POST:

Route: /api/coaches (HTTP POST request with JSON data)
Expected Behavior: You can create a new coach record by sending a POST request with JSON data. You should receive a 201 Created response with the newly created coach data in the response body.
Expected Status Code: 201
Expected Response Data: JSON representation of the newly created coach.

Read a List of Records Using GET:

Route: /api/coaches (HTTP GET request)
Expected Behavior: You can retrieve a list of coach records by sending a GET request to the coaches route. You should receive a 200 OK response with an array of coach records in the response body.
Expected Status Code: 200
Expected Response Data: An array of coach records in JSON format.

Read a Record Using GET:

Route: /api/coaches/:id (HTTP GET request with a valid coach ID)
Expected Behavior: You can retrieve a specific coach record by sending a GET request with a valid coach ID as part of the route. You should receive a 200 OK response with the coach data in the response body.
Expected Status Code: 200
Expected Response Data: JSON representation of the coach with the specified ID.

Update a Record Using PUT:

Route: /api/coaches/:id (HTTP PUT request with a valid coach ID and updated data in JSON format)
Expected Behavior: You can update an existing coach record by sending a PUT request with a valid coach ID and updated data. You should receive a 200 OK response with the updated coach data in the response body.
Expected Status Code: 200
Expected Response Data: JSON representation of the updated coach.

Destroy a Record Using DELETE:

Route: /api/coaches/:id (HTTP DELETE request with a valid coach ID)
Expected Behavior: You can delete an existing coach record by sending a DELETE request with a valid coach ID. You should receive a 204 No Content response indicating that the record has been successfully deleted.
Expected Status Code: 204
*/
