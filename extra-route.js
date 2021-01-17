const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./src/auth/main-middlewares/bearerAuth.js')
const ACLMiddleware = require('./src/auth/main-middlewares/authorize');



router.get('/secret', bearerMiddleware, ACLMiddleware, bearerHandler)

function bearerHandler(req, res) {
    console.log(req.user);
    res.status(200).json(req.user);
}

module.exports = router;
