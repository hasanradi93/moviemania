const express = require('express')

const router = express.Router()

const roomsController = require('../Controllers/roomsController');

router.route('/')
    .get(roomsController.rooms)
    .post(roomsController.addRoom)

module.exports = router