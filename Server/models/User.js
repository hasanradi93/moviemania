const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true
        // validate: [isEmail, 'invalid email']
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    profile: String
}, { timestamps: true })

//note: validate email and password

module.exports = mongoose.model('User', userSchema);