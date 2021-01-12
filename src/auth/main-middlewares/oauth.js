'use strict';

const superagent = require('superagent');
let userCollection = require('../models/user-collection')
require('dotenv');

// 2. Users are redirected back to your site by GitHub
// POST https://github.com/login/oauth/access_token
const tokenUrl ="https://github.com/login/oauth/access_token"
const userUrl = 'https://api.github.com/user';
const CLIENT_ID = "e7ea836a35e1d3df4679";
const SECRET_ID = "1d7a9a8db499fc97fd373bc71fdf743cc5eeb4a6";
const API_SERVER = "http://localhost:3000/oauth";
console.log("teeest");


module.exports = async function (req, res, next) {
    try {
        let code = await req.query.code;
        console.log('(1) CODE ====== ', code);
        let remoteToken = await exchangeCodeWithToken(code);
        console.log('(2) remoteToken =====> ', remoteToken);
        let remoteUser = await getRemoteUserInfo(remoteToken);
        console.log("(3) remoteUser.login-----> ", remoteUser.login);

        let [localUser, localToken] = await getUser(remoteUser);
        console.log("(4) localUser -----> ", localUser, " localToken ===> ", localToken);
        req.user = localUser;
        req.token = localToken;
        next();
    } catch (e) {console.log("hi am an error") }

}

async function exchangeCodeWithToken(code) {
    // tokenUrl

    let tokenResponse = await superagent.post(tokenUrl).send({
        code: code,
        client_id: CLIENT_ID,
        client_secret: SECRET_ID,
        redirect_uri: API_SERVER,
        grant_type: 'authorization_code'
    });
    return await tokenResponse.body.access_token;
}







async function getRemoteUserInfo(token) {
    let userResponse = await superagent.get(userUrl)
        .set('Authorization', `token ${token}`)
        .set('user-agent', 'express-app');
    let user = userResponse.body;
    return user;
}

async function getUser(userObj) {
    let userRecord = {
        username: userObj.login,
        password: 'defaultPasswordCuzItIsNotReturnedWithUserInfro'
    };
    let user = await userCollection.create(userRecord);
    console.log("the useeeeeeeerrrrrrr issssssssss",user)
    let token = await userCollection.generateToken(userRecord.username);
    console.log("the token issssssssss",token);
    return [user, token];
}





//send authorixation object 
// get the code 
// send the code to get access token
// Get user Info by token