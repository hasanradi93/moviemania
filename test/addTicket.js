const mongoose=require('mongoose')

//connect to db for testing
const dbConnect=require('../index.js')

//import the user module
const ticketModel=require('../Server/modules/Ticket.js')

const addTicket=new ticketModel({
    userId : '61e14e3da64a78e4b94934f9', 
    branchId :  '61e18b7cceaf30353fcbcaaa', 
    movieId : '61e16dc210087e2fd3b233db', 
    roomId : '61e17d641fb615e0b87a36ba', 
    price: 50,
    date: '2022-01-14T12:34:10.066+00:00',
    times: '15'
})

// const saveUser=async ()=>{
//     await addUser.save()
// }

addTicket.save().then(result => {
    console.log('ticket is added!')
    mongoose.connection.close()
}).catch((error) => {
    //showErrors(error) // call function from ./showErrors.js
    console.log(error)
    mongoose.connection.close()
})