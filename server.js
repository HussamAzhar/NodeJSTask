'use strict';
// importing required modules
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const dal = require('./DAL');
// setting route for landing page which in index.html
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//getting get request from client for fetching record from DB
app.get('/get_users', dal.fetchUsersFromDB);
//getting post request from client for data insertion into DB
app.post('/insert_users', dal.insertUsersIntoDB);

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');