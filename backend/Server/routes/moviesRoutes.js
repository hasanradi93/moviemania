const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');

router.route('/admin')
    .get(moviesController.movies)
    .post(moviesController.addMovie)

router.route('/get-newest-movies')
    .get(moviesController.theMovies)

router.route('/:id')
    .get(moviesController.movie)
    .put(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

router.route('/ComingSoon')
    .get(moviesController.ComingSoon)

module.exports = router;