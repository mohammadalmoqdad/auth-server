let express = require('express');
let router = express.Router();
let model = require('./models/user-collection.js');
const basicOath = require('./main-middlewares/basicOath.js')
const OAuthMiddleware = require('./main-middlewares/oauth.js');

router.use(express.static('./public'));

router.post('/signup', signUpHandler);
router.post('/signin', basicOath, signInHandler);
router.get('/users', getAllUsers);
router.get('/oauth', OAuthMiddleware, oAuthHandler)

function signUpHandler(req, res, next) {
    model.create(req.body).then(result => {
        res.send(result)
        next();
    })


}



function signInHandler(req, res, next) {
    res.status(200).send(req.token)
}


function getAllUsers(req, res, next) {
    model.getAll().then(result => {
        res.send(result)
        next();
    })
}

function oAuthHandler(req,res,next){
    console.log("hiiii")
   res.status(200).send("hiii");
   next();
}




module.exports = router;