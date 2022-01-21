const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: String,
    releasedate: String,
    plot: String,
    director: String,
    actors: [String],
    fromDate: Date,
    toDate: Date,
    runtime: Number,
    technology: String,
    price: Number,
    Availability: Number,
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: "Genre"
    },
    dateTime: [{
        room: {
            type: mongoose.Schema.ObjectId,
            ref: "Room"
        },
        day: Date,
        times: [String]
    }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Movie', movieSchema)