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
    rating : Number,
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
            type: mongoose.Schema.ObjectId,
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
        type: mongoose.Schema.ObjectId,
        ref: "Genre",
        required: true
    },
    dateTime: [{
        room: {
            type: mongoose.Schema.ObjectId,
            ref: "Room",
            required: true
        },
        day: {
            type: Date,
            required: true
        },
        technologyId: {
            type: mongoose.Schema.ObjectId,
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