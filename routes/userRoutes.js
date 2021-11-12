'use strict'

const express = require('express');
const UserController = require('../controllers/userController');

const api = express.Router();

const md_auth = require('../middlewares/authetication');

api.post('/register', UserController.newUser);

api.post('/login', UserController.loginUser);

api.get('/user/:id?', UserController.getUser);

api.get('/home', md_auth.ensureAuth, UserController.home);

module.exports = api;