'use strict'
//ENVIROMENT VARIABLES
const config = require('dotenv').config().parsed;

// DB CONNECTION
const mongoose = require('mongoose');

// APP.JS CALL
const app = require('./app');

// SERVER CONFIG
const serverUrl = config.SERVER_URL;
const serverPort = config.SERVER_PORT;

// DATABASE Config

const dataBaseURL = config.DATABASE_URL;
const dataBasePort = config.DATABASE_PORT;
const dataBaseName = config.DATABASE_NAME;

//DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(`${dataBaseURL}:${dataBasePort}/${dataBaseName}`, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		
		console.log(`Successfully connected to DATABASE: ${dataBaseURL}:${dataBasePort}/${dataBaseName}`);

		// SERVER SET UP
		app.listen(serverPort, () => {
			console.log(`Server running in http://${serverUrl}:${serverPort}`);
		});
	})
	.catch((err) => {
		console.log('Unable to connect');
		return err;
	});