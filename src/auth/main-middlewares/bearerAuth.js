'use strict';

const e = require('express');
let userCollection = require('../models/user-collection')
require('dotenv');

module.exports = async (req, res, next) => {
    // I expect to recieve in the req headers
    // Authorization should be Bearer a$sdadtoejen3ADSD32AsQsf
    if (!req.headers.authorization) { next('not LoggedIn!'); return; }

    try {
        let token = req.headers.authorization.split(' ').pop();
        // authenticate the token
        userCollection.authenticateToken(token).then(validUser => {
            console.log("authenticateToken : validUser", validUser)
            req.user = validUser;
            next();
        }).catch(err => next('invalid token !!'))
    }
    catch{
        next("not Logged IN !")
    }
}