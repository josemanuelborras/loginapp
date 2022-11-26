'use strict'

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

const User = require('../models/userModel');

const home = (req, res) =>{
    return res.status(200).json({ message: 'Home' });
}

const newUser = (req, res) => {
    let params = req.body;

    let user = new User();

    if(params.name && params.last_name && params.email && params.password){
        user.name = params.name;
        user.last_name = params.last_name;
        user.email = params.email;

        User.find({ $or: 
            [{email: user.email.toLowerCase()}] })
            .exec((err, users) => {
                if(err) return res.status(500).json({ message: 'User request error'});
            
                if(users && users.length >= 1){
                    return res.status(200).json({ message: 'User already exists' });
                }else{
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if(err) return res.status(500).json({ message: 'Error when registering user' });

                            if(userStored){
                                return res.status(200).json({ user: userStored });
                            }else{
                                return res.status(404).json({ message: 'Unable to register' });
                            }
                        });
                    });
                }
        });
    }else{
        return res.status(200).json({ message: 'Missing information' });
    }

}

const loginUser = (req, res) => {
    let params = req.body;

    let email = params.email;
    let password = params.password;

    User.findOne({ email: email }, (err, user) =>{
        if(err) return res.status(500).json({ message: 'Request Error' });

        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    if(params.gettoken){
                        return res.status(200).json({ token: jwt.createToken(user) });
                    }else{
                        user.password = undefined;
                        return res.status(200).json({ user });
                    }
                }else {
                    return res.status(404).json({ message: 'Wrong Email or Password' });
                }
            });
        }else{
            return res.status(404).json({ message: 'Wrong Email or Password' });
        }
    });
}

const getUser = (req, res) =>{

    let id = req.body.id ?? req.query.id;

    if(!id) return res.status(404).json({ message: 'Must provide a User ID ' });

    User.findById(id, (err, user) => {
        if(err) return res.status(404).json({ message: 'Request Error' });

        if(!user) return res.status(404).json({ message: 'No User with given ID' });
        
        user.password = undefined;

        return res.status(200).json({ user: user });
    });
    
}

const updatUser = (req, res) =>{
    let id = req.params.id;
    let update = req.body;

    delete update.password;

    if(id != req.user.sub) return res.sutatus(500).json({ message: 'Permission denied' });

    User.find({ $or: [
        { email: update.email.toLowerCase()}
    ]}).exec((err, users) =>{
        let user_isset = false;
        users.forEach((user) =>{
            if(user && user._id != id) user_isset = true;
        });

        if(user_isset) return res.status(404).json({ message: 'Email already in use '});

        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) =>{
            if(err) return res.status(500).json({ message: 'Request Error'});

            if(!userUpdated) return res.status(404).json({ message: 'Error trying to update user' });

            return res.status(200).send({ user: userUpdated });
        });
    });
}

module.exports = {
    newUser,
    loginUser,
    getUser,
    updatUser,
    home
}