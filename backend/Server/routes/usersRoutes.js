const express = require('express')

const router = express.Router()

const usersController = require("../Controllers/usersController")
const auth = require("../middleware/auth");

router.route('/', auth)
    .get(usersController.getUserData)
router.route('/login')
    .post(usersController.login)
router.route('/register')
    .post(usersController.register)
router.route('/tokenIsValid')
    .post(usersController.checkToken)
router.route('/delete', auth)
    .post(usersController.login)
router.route('/:id')
    .put(usersController.updateUser)




module.exports = router