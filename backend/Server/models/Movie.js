const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    releasedate: {
        type: Date,
        required: Date
    },
    plot: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: [{
        type: String,
        required: true
    }],
    rating: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    technology: [{
        technologyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technology",
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    Availability: {
        type: Number,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },
    dateTime: [{
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },
        day: {
            type: Date,
            required: true
        },
        technologyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technology",
            required: true
        },
        times: [{
            type: String,
            required: true
        }],
    }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Movie', movieSchema)