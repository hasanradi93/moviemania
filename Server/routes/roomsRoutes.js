const express = require('express')

const router = express.Router()

const roomsController = require('../Controllers/roomsController');

router.route('/')
    .get(roomsController.rooms)

module.exports = router