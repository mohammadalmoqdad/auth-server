let mongoose = require('mongoose');

let user = mongoose.Schema({
    username:{type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, required: true, enum: ['user', 'writer', 'admin', 'editor']}
});

module.exports = mongoose.model('user',user);