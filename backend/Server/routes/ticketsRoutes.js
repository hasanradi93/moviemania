const express = require('express')
const router = express.Router()

const ticketsController = require('../Controllers/ticketsController')
//get all ticekts for admin
router.route('/')
    .get(ticketsController.tickets)
    .post(ticketsController.addTicket)

router.route('/takenSeats')
    .post(ticketsController.takenSeats)

router.route('/cancelTicket')
    .post(ticketsController.cancelTicket)

router.route('/userTickets')
    .post(ticketsController.getUserTickets)

router.route('/:id')
    .put(ticketsController.cancelTicket)

router.route('/movie/:id')
    .post(ticketsController.getMovieTicketsById)


module.exports = router;