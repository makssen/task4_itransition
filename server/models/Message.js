const { Schema, model } = require('mongoose');

const Message = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Message', Message);