const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name :  String,
    location : String,
    room :  [{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Room"}], 
  
    })


module.exports = mongoose.model('Branch', branchSchema)