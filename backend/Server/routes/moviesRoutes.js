const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');

router.route('/movies')
    .get(moviesController.movies)
    .post(moviesController.addMovie)

router.route('/get-newest-movies')
    .get(moviesController.theMovies)

router.route('/ComingSoon')
    .get(moviesController.ComingSoon)

router.route('/:id')
    .get(moviesController.movie)
    .put(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)



module.exports = router;