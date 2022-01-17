const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : String,
    releasedate: String,
    plot: String,
    director: String,
    actors: [String],
    fromDate : Date,
    toDate : Date,
    runtime: Number,
    technology: String,
    price: Number,
    Availability: Number,
    dateTime:[{
        day : Date,
        room: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Room"
        },
        times: [String]
    }]
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)