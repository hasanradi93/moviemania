const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: String,
    location: String,
    rooms: [{
        room: {
            type: mongoose.Schema.ObjectId,
            ref: "Room"
        }
    }],
    cancelBranch:{
        type: Boolean,
    },
    editBranch:{
        type: Boolean,
    },

}, { timestamps: true })


module.exports = mongoose.model('Branch', branchSchema)