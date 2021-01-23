let express = require('express');
let router = express.Router();
const basicOath = require('./main-middlewares/basicOath.js')
const OAuthMiddleware = require('./main-middlewares/oauth.js');
const userCollection = require('./models/user-collection.js');


router.use(express.static('./public'));

router.post('/signup', signUpHandler);
router.post('/signin', basicOath, signInHandler);
router.get('/users', getAllUsers);
router.get('/oauth', OAuthMiddleware, oAuthHandler)
router.delete('/deleteUser/:id', deleteHandler)


function signUpHandler(req, res, next) {
    userCollection.create(req.body).then(result => {
        userCollection.generateToken(result).then(result => {
            res.json({ token: result });
            next();

        })
    })
}



function signInHandler(req, res) {
    res.cookie("token", req.token)
    res.status(200).send({ token: req.token })
}





function getAllUsers(req, res, next) {
    userCollection.getAll().then(result => {
        res.send(result)
        next();
    })
}





function oAuthHandler(req, res, next) {
    res.json({ userinfo: req.user, token: req.token });
    next();
}





function deleteHandler(req, res, next) {
    res.send(userCollection.delete(req.params.id));
    next();
}


module.exports = router;