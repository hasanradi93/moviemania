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
<<<<<<< HEAD
        day : Date,
        room: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Room"
        },
        times: [String]
=======
        room:{
            type:mongoose.Schema.ObjectId,
            ref:"Room"
        },
        day:String,
        times:[String]
>>>>>>> ec297ad7326cfd8ecc7b3f9652b524f511d2d4c9
    }]
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)