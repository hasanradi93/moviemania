const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: String
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model('Technology', technologySchema)