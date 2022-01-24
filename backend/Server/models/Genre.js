const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: String

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Genre', genreSchema)