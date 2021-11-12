'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const configs = require('../config.json');
const secret = configs.pass;

exports.ensureAuth = (req, res, next) => {
	if(!req.headers.authorization){
		return res.status(403).json({message: 'Request does not have athentication headers'});
	}

	let token = req.headers.authorization.replace(/['"]+/g, '');
    let payload = jwt.decode(token, secret);

	try{		
		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'Expired token'});
		}
	}catch(ex){
		return res.status(404).send({message: 'Invalid token'});
	}
	
	req.user = payload;

	next();

}