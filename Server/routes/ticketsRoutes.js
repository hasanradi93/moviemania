const express = require('express')

const router = express.Router()

const ticketController = require('../Controllers/ticketsController')

router.route('/')
    .post(ticketController.addTicket)
    .get(ticketController.tickets)
    .delete(ticketController.deleteTicket)

router.route('/:id')
// .get(TicketController.getTicketById)

module.exports = router;