const express = require('express')

const router = express.Router()

const usersController = require("../Controllers/usersController")

router.route('/')
    .get(usersController.users)
    .post(usersController.addUser)

router.route('/:id')
    .put(usersController.updateUser)
    .get(usersController.getUserData)

 
router.route('/signin')
    .get(usersController.signIn)

module.exports = router