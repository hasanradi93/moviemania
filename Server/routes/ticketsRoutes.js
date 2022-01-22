const express = require('express')
const { rooms } = require('../Controllers/roomsController')

const router = express.Router()

const ticketsController = require('../Controllers/ticketsController')

router.route('/')
    .post(ticketsController.addTicket)

router.route('/admin')
    .get(ticketsController.tickets)
    
    // .get(roomsController.rooms)
    // .post(roomsController.addRoom)


router.route('/:id')
    .get(ticketsController.getTicketById)
    .put(ticketsController.cancelTicket)


router.route('/admin/movie/:id')
    .get(ticketsController.getMovieTicketsById)


module.exports = router;