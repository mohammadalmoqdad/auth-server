let express = require('express');
let router = express.Router();
let model = require('./models/user-collection.js');
const basicOath = require('./main-middlewares/basicOath.js')




router.post('/signup', signUpHandler);
router.post('/signin', basicOath, signInHandler);
router.get('/oauth', oathHandler)
router.get('/users', getAllUsers);


function signUpHandler(req, res, next) {
    model.create(req.body).then(result => {
        res.send(result)
        next();
    })


}



function signInHandler(req, res, next) {
    res.status(200).send(req.token)
}

function oathHandler() {


}

function getAllUsers(req, res, next) {
    model.getAll().then(result => {
        res.send(result)
        next();
    })
}




module.exports = router;