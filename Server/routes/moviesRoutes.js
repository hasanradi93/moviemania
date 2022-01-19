const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');

router.route('/')
    .get(moviesController.movies)
    .post(moviesController.addMovie);

router.route('/get-newest-movies')
    .get(moviesController.theMovies);

router.route('/:id')
    .get(moviesController.movie)
    .put(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);


// router.get('/', moviesController.movies)
// router.post('/', moviesController.addMovie)
// router.put('/api/movies/:id', moviesController.updateMovie)
// router.delete('/api/movies/:id', moviesController.deleteMovie)
// router.get('/movies', moviesController.theMovies)
// router.get('/movies/:name', moviesController.movie)

module.exports = router;