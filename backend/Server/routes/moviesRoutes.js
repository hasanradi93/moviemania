const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');
//get all movies for admin
router.route('/')
    .get(moviesController.movies)
    .post(moviesController.uploadPhoto, moviesController.addMovie)
//get available
router.route('/get-newest-movies')
    .get(moviesController.theMovies)
//get coming soon
router.route('/ComingSoon')
    .get(moviesController.ComingSoon)
//get movie by id
router.route('/:id')
    .get(moviesController.movie)
    .put(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)



module.exports = router;