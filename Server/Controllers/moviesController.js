require('../models/connectDB')
const Movie = require('../models/Movie')

exports.movies = async(req, res) => {  
    try {
        const movies = await Movie.find()
        res.json(movies);
    } catch (err) {
        res.status(404).json( {message: err })
    } 
}

exports.addMovie = async(req, res) => {
    const newMovie = new Movie({
        title : req.body.title,
        releasedate: req.body.releasedate,
        plot:req.body.plot,
        director: req.body.director,
        actors: req.body.actors,
        fromDate : req.body.fromDate,
        toDate :req.body.toDate,
        runtime: req.body.runtime,
        technology: req.body.technology,
        price:req.body.price,
        Availability: req.body.Availability,
        dateTime: req.body.dateTime
    });
  
    try {
      await newMovie.save();
      res.json(newMovie);
    } catch (err) {
      res.status(400).json( { message: err })
    }
  }
  