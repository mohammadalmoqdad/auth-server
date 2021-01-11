let server = require('./server.js')
let mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/authentication-lab';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});



server.start();