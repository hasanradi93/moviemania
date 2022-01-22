const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: String,
    cancelGenre: {
        type: Boolean,
    },
    editGenre: {
        type: Boolean
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Genre', genreSchema)