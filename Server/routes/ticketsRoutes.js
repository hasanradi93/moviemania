const express = require('express')

const router = express.Router()

const ticketsController = require('../Controllers/ticketsController')

router.route('/')
    .post(ticketsController.addTicket)
    .get(ticketsController.tickets)

router.route('/:id')
    .get(ticketsController.getTicketById)
    .put(ticketsController.cancelTicket)

module.exports = router;