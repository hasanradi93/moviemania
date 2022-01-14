//import package
const mongoose=require('mongoose')

//import the package for environment variable
require('dotenv/config')

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("Connect to DB")
})