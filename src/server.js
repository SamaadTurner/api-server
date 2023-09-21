'use strict';

const express = require('express');
const cors = require('cors');
const app = express();  // singleton -> there can only be one express server running at a time

const playerRouter = require('./routes/players.js');
const coachRouter = require('./routes/coaches.js');

app.use(cors()); // this is a middleware that allows us to make requests from a different domain
app.use(express.json()); // this is a middleware that allows us to read json from the request body

app.use('/api/', playerRouter);
app.use('/api/', coachRouter);

// Error handlers

module.exports = {  
    app,
    start: (port) => {
        app.listen(port, () => {
            console.log(`REST server is running on port ${port}`);
        });
    }
}