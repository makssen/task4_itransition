const { Schema, model } = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false
    },
    facebookId: {
        type: String,
        required: false
    },
    twitterId: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = model('User', User);