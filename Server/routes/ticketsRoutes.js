const express = require('express')
const { rooms } = require('../Controllers/roomsController')

const router = express.Router()

const ticketsController = require('../Controllers/ticketsController')

router.route('/')
    .post(ticketsController.addTicket)
    .get(ticketsController.tickets)
    
    // .get(roomsController.rooms)
    // .post(roomsController.addRoom)


router.route('/:id')
    .get(ticketsController.getTicketById)
    .put(ticketsController.cancelTicket)

// router.route('/:name')
//     .put(roomsController.cancelRoom)
//     .put(roomsController.editRoom)


module.exports = router;