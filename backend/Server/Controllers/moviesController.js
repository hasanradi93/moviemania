require('../models/connectDB')
const Movie = require('../models/Movie')

exports.movies = async (req, res) => {
  try {
    const movies = await Movie.find().populate({ path: 'dateTime.room', model: 'Room' }).populate({ path: 'genre', model: 'Genre' });
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addMovie = async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    releasedate: req.body.releasedate,
    plot: req.body.plot,
    director: req.body.director,
    actors: req.body.actors,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    runtime: req.body.runtime,
    technology: req.body.technology,
    Availability: req.body.Availability,
    genre: req.body.genre,
    dateTime: req.body.dateTime
  });

  try {
    await newMovie.save();
    res.json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const newMovie = {
    title: req.body.title,
    releasedate: req.body.releasedate,
    plot: req.body.plot,
    director: req.body.director,
    actors: req.body.actors,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    runtime: req.body.runtime,
    technology: req.body.technology,
    Availability: req.body.Availability,
    genre: req.body.genre,
    dateTime: req.body.dateTime
  };
  try {
    const updateMovie = await Movie.findByIdAndUpdate({ _id: movieId }, newMovie);
    res.json(updateMovie);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const data = await Movie.deleteOne({ _id: movieId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//USER MOVIES

exports.theMovies = async (req, res) => {
  try {
    console.log("ssfsd")
    let date = new Date()
    console.log(date)
    const movies = await Movie.find({ "toDate": { $lte: date } })
    console.log(movies)
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.ComingSoon = async (req, res) => {
  try {
    console.log("ssfsd")
    let date = new Date()
    console.log(date)
    const movies = await Movie.find({ "toDate": { $gte: date } })
    console.log(movies)
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

//MOVIE DETAILS

exports.movie = async (req, res) => {
  try {
    let movieId = req.params.id
    console.log(movieId);
    const movie = await Movie.find({ _id: movieId }).populate({ path: 'dateTime.room', model: 'Room' }).populate({ path: 'genre', model: 'Genre' });
    res.json(movie);
  } catch (error) {
    res.status(404).json({ messageError: error })
  }
}