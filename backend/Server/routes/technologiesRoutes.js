const express = require('express')

const router = express.Router()

const technologiesRoutes = require('../Controllers/technologiesController');

router.route('/')
    .get(technologiesRoutes.technologies)
    .post(technologiesRoutes.addTechnology)

router.route('/:id')
    .delete(technologiesRoutes.deleteTechnology)
    .put(technologiesRoutes.editTechnology)

module.exports = router