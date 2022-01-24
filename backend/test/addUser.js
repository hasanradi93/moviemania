const mongoose=require('mongoose')

//connect to db for testing
const dbConnect=require('../index.js')

//import the user module
const userModel=require('../Server/modules/User.js')

const addUser=new userModel({
    username:'hadimakki',
    email:'hadi@gmail.com',
    password:'12345678'
})

// const saveUser=async ()=>{
//     await addUser.save()
// }

addUser.save().then(result => {
    console.log('User is added!')
    mongoose.connection.close()
}).catch((error) => {
    //showErrors(error) // call function from ./showErrors.js
    console.log(error)
    mongoose.connection.close()
})