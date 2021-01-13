'use strict';

let userCollection = require('../models/user-collection')
require('dotenv');

module.exports = (req, res, next) => {
    // I expect to recieve in the req headers
    // Authorization should be Bearer a$sdadtoejen3ADSD32AsQsf
    if (!req.headers.authorization) {next('not LoggedIn!'); return;}

    let authHeader = req.headers.authorization.split(' ');
    if (authHeader[0] != 'Bearer') {next('invalid Header!'); return;}
    let token = authHeader[1];
    // authenticate the token
    userCollection.authenticateToken(token).then(validUser=> {
        console.log("authenticateToken : validUser", validUser)
        req.user = validUser;
        next();
    }).catch(err=> next('invalid token !!'))

}