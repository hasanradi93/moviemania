const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : String,
    description : [{
       aboutMovie: String,
       actors: [String]
    }],
    fromDate : Date,
    toDate : Date,
    duration: Number,
    Availability: Number,
    dateTime:[{
        day : Date,
        room: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Room"
        },
        times: [String]
    }]
})

module.exports = mongoose.model('Movie', movieSchema)