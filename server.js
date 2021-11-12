'use strict'
const configuration = require('./config.json');

// DB CONNECTION
const mongoose = require('mongoose');

// APP.JS CALL
const app = require('./app');

// SERVER CONFIG
const server = configuration.server;
const serverUrl = server.url;
const serverPort = server.port;

// DATABASE Config
const dataBase = configuration.dataBase;

const dataBaseURL = dataBase.url;
const dataBasePort = dataBase.port;
const dataBaseName = dataBase.name;

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