const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');

router.get('/api/movies/', moviesController.movies)
router.post('/api/movies/', moviesController.addMovie) 
router.put('/api/movies/:id', moviesController.updateMovie)
router.delete('/api/movies/:id', moviesController.deleteMovie)
router.get('/movies', moviesController.theMovies)
router.get('/movies/:name', moviesController.movie)

module.exports = router;