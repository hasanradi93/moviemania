const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    profile: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    userType: Number
}, { timestamps: true })

//note: validate email and password

module.exports = mongoose.model('User', userSchema);