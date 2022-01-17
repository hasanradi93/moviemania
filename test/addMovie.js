const mongoose=require('mongoose')

//connect to db for testing
const dbConnect=require('../index.js')

//import the user module
const movieModel=require('../Server/modules/Movie.js')

const addMovie=new movieModel({
    title : 'Lord of the rings',
    description : [{
        plot: 'shire',
        actors: ["frodo", "sam"]
     }],
    fromDate : Date.now(),
    toDate : Date.now(),
    runtime: 120,
    Availability: 1,
    dateTime:[{
        day : Date.now(),
        // room: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: "Room"
        // },
        times: ["10pm", "5pm"]
    }, {
        day : Date.now(),
        // room: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: "Room"
        // },
        times: ["3pm", "5pm"]
    }]
})

addMovie.save().then(result => {
    console.log('Movie is added!')
    mongoose.connection.close()
}).catch((error) => {
    //showErrors(error) // call function from ./showErrors.js
    console.log(error)
    mongoose.connection.close()
})