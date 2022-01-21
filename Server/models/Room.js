// models/Person.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    seats: [{
        block: String,
        rowSeats: [{
            number: Number
        }],
    }]

}, { timestamps: true });

// export the created model
module.exports = mongoose.model("Room", RoomSchema);