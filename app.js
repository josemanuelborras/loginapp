'use strict'

// EXPRESS CONNECTION
const express = require('express');

// EXPRESS CALL
const app = express();

// ROUTES CONFIG
const user_routes = require('./routes/userRoutes');
const index_routes = require('./routes/indexRoutes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// ROUTES
const route = '/';
const routes = [user_routes, index_routes];

app.use(route, routes.map((routes)=> {
    return routes;
}));

// EXPORTS
module.exports = app;