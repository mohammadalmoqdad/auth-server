'use strict';

const superagent = require('superagent');
let userCollection = require('../models/user-collection')
require('dotenv');
// 2. Users are redirected back to your site by GitHub
// POST https://github.com/login/oauth/access_token
const tokenUrl = process.env.TOKEN_SERVER;
const userUrl = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_ID = process.env.SECRET_ID;
const API_SERVER = process.env.API_SERVER;
console.log("teeest")


module.exports = async function (req, res, next) {
    try {
        console.log("i am inside fun1", req.query)
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
    } catch (e) { next(`ERROR: ${e.message}`) }

}

async function exchangeCodeWithToken(code) {
    // tokenUrl
    console.log("i am inside fun2")
    let tokenResponse = await superagent.post(tokenUrl).send({
        code: code,
        client_id: CLIENT_ID,
        client_secret: SECRET_ID,
        redirect_uri: API_SERVER
    });
    return tokenResponse.body.access_token;
}

async function getRemoteUserInfo(token) {
    let userResponse = await superagent.get(userUrl)
        .set('Authorization', `token ${token}`)
        .set('user-agent', '401d6-app');
    let user = userResponse.body;
    return user;
}

async function getUser(userObj) {
    let userRecord = {
        username: userObj.login,
        password: 'defaultPasswordCuzItIsNotReturnedWithUserInfro'
    };
    let user = await userCollection.create(userRecord);
    let token = await userCollection.generateToken(user);
    return [user, token];
}





//send authorixation object 
// get the code 
// send the code to get access token
// Get user Info by token