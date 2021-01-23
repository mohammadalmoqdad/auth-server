const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./src/auth/main-middlewares/bearerAuth.js')
const permissions = require('./src/auth/main-middlewares/authorize');



router.get('/secret', bearerMiddleware, (req, res) => {
    res.json(req.user);
});

router.get('/read', bearerMiddleware, permissions('read'), (req, res) => {
    res.status(200).send('ACCESSED!: you can access this route if you have the READ capability!!');
});
router.post('/add', bearerMiddleware, permissions('create'), (req, res) => {
    res.status(200).send('ACCESSED!: you can access this route if you have the CREATE capability!! ');
});
router.put('/change', bearerMiddleware, permissions('update'), (req, res) => {
    res.status(200).send('ACCESSED!: you can access this route if you have the UPDATE capability!!');
});
router.delete('/remove', bearerMiddleware, permissions('delete'), (req, res) => {
    res.status(200).send('ACCESSED!: you can access this route if you have the DELETE capability!!');
});


module.exports = router;
