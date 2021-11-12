'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    last_name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);