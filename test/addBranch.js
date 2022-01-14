const mongoose=require('mongoose')

//connect to db for testing
const dbConnect=require('../index.js')

//import the branch module
const branchModel=require('../Server/modules/Branch.js')

const addBranch=new branchModel({
   name:'branchnamee',
    location:'branchlocation',
    room:['61e17d641fb615e0b87a36ba','61e18831ac3dfaa451f19dae']
})

 

addBranch.save().then(result => {
    console.log('Branch is added!')
    mongoose.connection.close()
}).catch((error) => {
    //showErrors(error) // call function from ./showErrors.js
    console.log(error)
    mongoose.connection.close()
})