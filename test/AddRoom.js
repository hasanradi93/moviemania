const mongoose = require("mongoose");
const dbconnect = require("../index.js");
const RoomModel = require("../Server/modules/Room");



const Room1 = new RoomModel({
    name: 'queen',
    seats:[
        {
            blockName:"A", 
            nbOfSeats:5
        }, 
        {
            blockName:"B", 
            nbOfSeats:4
        }
    ]
    
});   

Room1.save().then(result => {
    console.log('Room 1 is added!')
    mongoose.connection.close()
}).catch((error) => {
    //showErrors(error) // call function from ./showErrors.js
    console.log(error)
    mongoose.connection.close()
})