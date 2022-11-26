'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('dotenv').config().parsed;

const secret = config.PASS;

exports.createToken = (user)=>{
    let payload = {
        sub: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};