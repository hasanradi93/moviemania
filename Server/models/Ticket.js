const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    branchId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Branch"
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movie"
    },
    roomId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Room"
    },
    date: Date,
    times: String,
    seat: {
        block: String,
        rowSeats: Number
    }
}, { timestamps: true })


module.exports = mongoose.model('Ticket', ticketSchema)