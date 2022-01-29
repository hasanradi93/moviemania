const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    cancelTicket: {
        type: Boolean,
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movie"
    },
    roomId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Room"
    },
    technologyId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Technology"
    },
    date: Date,
    time: String,
    seatNumber: String
}, { timestamps: true })


module.exports = mongoose.model('Ticket', ticketSchema)