require('../models/connectDB')
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../middleware/validationUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");

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
        const { email, password, passwordCheck, username } = req.body

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
            profile: 'https://banner2.cleanpng.com/20180323/zkw/kisspng-user-profile-computer-icons-avatar-clip-art-profile-cliparts-free-5ab58cd0d25269.4945707915218475048615.jpg',
            userType: 1
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

        // Catching any errors that come through
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        userType: req.body.userType
    }

    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, newUser)
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: error })
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
                username: user.username
            },
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// delete user account route
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ err: error.message });
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
        username: user.username,
        id: user._id,
    })
}