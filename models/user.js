const mongoose = require('mongoose');

//schema
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }
}, {timestamps: true});

//model
const User = mongoose.model("user", schema);

module.exports = User;