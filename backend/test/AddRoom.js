const mongoose = require("mongoose");
const dbconnect = require("../index.js");
const RoomModel = require("../Server/modules/Room");



const Room1 = new RoomModel({
    name: 'Balkis',
    seats:[
        {
            blockName:"A", 
            rowSeats:[
                {
                    name:"A1"
                },
                {
                    name:"A2"
                },
                {
                    name:"A3"
                }
            ]
        }, 
        {
            blockName:"B", 
            rowSeats:[
                {
                    name:"AB"
                },
                {
                    name:"B2"
                },
                {
                    name:"B3"
                }
            ]
        },
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