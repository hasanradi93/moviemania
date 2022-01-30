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

// exports.addUser = async(req, res) => {
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         profile: req.body.profile,
//         userType : req.body.userType
//     })
// console.log(newUser)
//     try {
//         const users = await newUser.save()
//         res.json(users);
//     } catch (error) {
//         res.status(404).json( {message: error })
//     } 
// }

// Register route
exports.register = async (req, res) => {
    try {
        const { email, password, passwordCheck, username } = req.body;

        // validate
        // status code 400 means bad request
        // status code 500 means internal server error

        if (!email || !password || !passwordCheck || !username) {
            return res.status(400)
                .json({ msg: "Not all fields have been entered" });
        }

        // Checking to ensure password length is at least 5 characters
        //let's validate the data before we make a user
        const { error } = registerValidation(req.body)
        if (error)
            return res.status('400').send(error.details[0].message)

        // Checking the password entered vs the password checker
        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({ msg: "Passwords do not match. Please try again" });
        }

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
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

        // Catching any errors that come through
    } catch (error) {
        res.status(500).json({ err: error.message });
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

// exports.signIn = async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     try {
//         const data = await User.find({ $or: [{ username: username }, { email: username }], password: password })
//         res.json(data);
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }

// login route setup
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //first validate if data filled
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered" });
        }

        //let's validate the data before we make a user
        const { error } = loginValidation(req.body)
        if (error)
            return res.status('400').send(error.details[0].message)

        // checking email that was entered and comparing email in our database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Invalid credentails" });
        }

        // Checking password entered and comparing with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Creating our json web token by passing the user id and our JWT_SECRET
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username
            },
        });
    } catch (error) {
        res.status(500).json({ err: error.message });
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
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.Token_Secret);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}

// This route is grabbing one user
exports.getUserData = async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
    })
}

// exports.getUserData = async (req, res) => {
//     const userId = req.params.id
//     try {
//         const users = await User.findById({ _id: userId })
//         res.json(users);
//     } catch (error) {
//         res.status(404).json({ message: error })
//     }
// }

