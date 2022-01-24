const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: String,
    location: String,
    rooms: [{
        room: {
            type: mongoose.Schema.ObjectId,
            ref: "Room"
        }
    }]
}, { timestamps: true })


module.exports = mongoose.model('Branch', branchSchema)