const express = require('express');
const router = express.Router();
const base64 = require('base-64')
let userCollection = require('../models/user-collection')




router.basicAuth = function (req, res, next) {
    console.log(req.headers.authorization);
    let authHeader = req.headers.authorization.split(' ');
    if (authHeader[0] == "Basic") {
        let basic = authHeader.pop();
        let [username, password] = base64.decode(basic).split(':');

        console.log(username, "this is ", password)
        userCollection.isUser(username, password).then(result=>{
            console.log(result)
            if(result){
                userCollection.generateToken(username).then(result=>{
                    req.token = result;
                    next();
                })
            }
            else next("we have an issue, we will fix it soon!");
            

        }).catch(res.status(403))
    }
}

module.exports = router.basicAuth;