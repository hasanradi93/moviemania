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
        room:{
            type:mongoose.Schema.ObjectId,
            ref:"Room"
        },
        day:String,
        times:[String]
    }]
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)