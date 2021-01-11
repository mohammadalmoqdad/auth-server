let mongoose = require('mongoose');

let user = mongoose.Schema({
    username:{type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('user',user);