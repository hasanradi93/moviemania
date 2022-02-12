const express = require('express')
require('../models/connectDB')
const User = require('../models/User')
const router = express.Router()

const usersController = require("../Controllers/usersController")
const auth = require("../middleware/auth");
// const photo = require("../middleware/uploadFile");

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

router.route('/', auth)
    .post(usersController.getUserData)
router.route('/login')
    .post(usersController.login)
router.route('/register')
    .post(usersController.register)
router.route('/tokenIsValid')
    .post(usersController.checkToken)
router.route('/updateUsername')
    .post(usersController.updateUserName)
router.route('/uploadPhoto')
    .post(usersController.uploadProfile, usersController.savePicture)
router.route('/getUsersAndCountTickets')
    .get(usersController.getUsersAndCountTickets)



module.exports = router