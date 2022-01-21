const express = require('express')

const router = express.Router()

const genresController = require('../Controllers/genresController');

router.route('/')
    .get(genresController.genres)
    .post(genresController.addGenre)

module.exports = router