// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

//Require body-parser
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Require cors
const cors = require('cors');

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port , serverSetup);

function serverSetup(){
    console.log('Server is up');
    console.log('Server running on port '+ port);

}

//getter to return project Data..
app.get ('/all',sendData);

function sendData(request,response){
    response.send(projectData);
}

app.post('/addData',addData);

function addData(request, response) {
    projectData= {
        date: request.body.date,
        temp: request.body.tempreature,
        feelings : request.body.feelings
    }
    response.send(projectData);
    console.log(projectData);
    console.log(request.body);
}