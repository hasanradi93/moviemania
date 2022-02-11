require('../models/connectDB')
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../middleware/validationUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth")
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("file", file)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

exports.users = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

// Register route
exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body

        // validate
        // status code 400 means bad request
        // status code 500 means internal server error

        if (!email || !password || !username) {
            return res.status(400)
                .json({ msg: "Not all fields have been entered" })
        }

        // Checking to ensure password length is at least 5 characters
        //let's validate the data before we make a user
        const { error } = registerValidation(req.body)
        if (error)
            return res.status(400)
                .json({ msg: error.details[0].message })

        // Checking database and running an email check to ensure no duplicate emails upon register 
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ msg: "An account with this email already exists" });
        }

        // using Bcrypt to hash passwords for security
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // creating out new user notice password value is passwordHash not password
        const newUser = new User({
            email: email,
            password: passwordHash,
            username: username,
            profile: '../avatar.png',
            userType: 1
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

        // Catching any errors that come through
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// login route setup
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //first validate if data filled
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }

        //let's validate the data before we make a user
        const { error } = loginValidation(req.body)
        if (error)
            return res.status(400).json({ msg: error.details[0].message });

        // checking email that was entered and comparing email in our database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Email not found" });
        }

        // Checking password entered and comparing with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Creating our json web token by passing the user id and our JWT_SECRET
        const token = jwt.sign({ id: user._id }, process.env.Token_Secret);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                profile: user.profile,
                role: user.userType
            },
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// validating if user is logged in by boolean check most useful for front-end
exports.checkToken = async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.Token_Secret)
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        return res.json(verified)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// This route is grabbing one user
exports.getUserData = async (req, res) => {
    const user = await User.findById(req.body.id)
    res.json({
        id: user._id,
        username: user.username,
        profile: user.profile,
        role: user.userType
    })
}

//upload phpto
exports.uploadProfile = upload.single('profileImg')
exports.savePicture = async (req, res, next) => {
    const userId = req.body.userId
    console.log("req.bodyr", req.body)
    console.log("userId", userId)
    console.log("req.file", req.file)
    const url = req.protocol + '://' + req.get('host')
    console.log("url", url)
    const newProfile = ({
        profile: url + '/public/' + req.file.filename
    })
    console.log(newProfile)
    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, newProfile)
        res.json(users.profile);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

//update UserName
exports.updateUserName = async (req, res, next) => {
    console.log(req.body)
    const userId = req.body.userId;
    const newUserName = {
        username: req.body.userName
    }
    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, newUserName)
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}