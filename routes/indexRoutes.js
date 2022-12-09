'use strict'

const express = require('express');
const IndexController = require('../controllers/indexController');

const api = express.Router();

const md_auth = require('../middlewares/authetication');

api.post('/index', md_auth.ensureAuth, IndexController.index);

module.exports = api;