const express = require('express')

const router = express.Router()

const moviesController = require('../Controllers/moviesController');

router.get('/api/movies/', moviesController.movies);
router.post('/api/movies/', moviesController.addMovie); 
// router.patch('/api/movies/:id', moviesController.updateSingleMovie); 
// router.delete('/api/movies/:id', moviesController.deleteSingleMovie); 

module.exports = router;