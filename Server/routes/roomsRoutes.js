const express = require('express')

const router = express.Router()

const roomsController = require('../Controllers/roomsController');

router.route('/')
    .get(roomsController.rooms)
    .post(roomsController.addRoom)

router.route('/:name')
    .put(roomsController.cancelRoom)
    .put(roomsController.editRoom)
    .delete(roomsController.deleteRoom)

module.exports = router