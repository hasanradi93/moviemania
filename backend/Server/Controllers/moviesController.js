require('../models/connectDB')
const Movie = require('../models/Movie')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const { ObjectId } = require('mongodb')
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

exports.movies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate({ path: 'dateTime.room', model: 'Room' })
      .populate({ path: 'genre', model: 'Genre' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.findMovies = async (req, res) => {
  try {
    const name = req.body.name
    const movies = await Movie.find({ title: new RegExp(name, 'i') })
      .populate({ path: 'dateTime.room', model: 'Room' })
      .populate({ path: 'genre', model: 'Genre' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.uploadPhoto = upload.single('photo')
exports.addMovie = async (req, res, next) => {
  if (req.body.title === undefined || req.body.releasedate === undefined
    || req.body.plot === undefined || req.body.director === undefined
    || req.body.actors === undefined || req.body.fromDate === undefined
    || req.body.toDate === undefined || req.body.runtime === undefined
    || req.body.technology === undefined || req.body.genre === undefined
    || req.body.dateTime === undefined || req.file.filename === undefined
    || req.body.videoUrl === undefined || req.body.rating === undefined
    || req.body.Availability === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const url = req.protocol + '://' + req.get('host')
  req.body.technology = JSON.parse(req.body.technology)
  req.body.dateTime = JSON.parse(req.body.dateTime)
  req.body.actors = JSON.parse(req.body.actors)
  req.body.technology.map((technology) => { ObjectId(technology.technologyId) })
  req.body.dateTime.map((dateTime) => { ObjectId(dateTime.room) })
  req.body.dateTime.map((dateTime) => { ObjectId(dateTime.technologyId) })


  const newMovie = new Movie({
    title: req.body.title,
    releasedate: req.body.releasedate,
    plot: req.body.plot,
    photo: url + '/public/' + req.file.filename,
    videoUrl: req.body.videoUrl,
    director: req.body.director,
    actors: req.body.actors,
    rating: req.body.rating,
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
    next(error)
  }
}

exports.updateMovie = async (req, res, next) => {
  const movieId = req.params.id
  if (req.params.id === undefined || req.body.title === undefined || req.body.releasedate === undefined
    || req.body.plot === undefined || req.body.director === undefined
    || req.body.actors === undefined || req.body.fromDate === undefined
    || req.body.toDate === undefined || req.body.runtime === undefined
    || req.body.technology === undefined || req.body.genre === undefined
    || req.body.dateTime === undefined
    || req.body.videoUrl === undefined || req.body.rating === undefined
    || req.body.Availability === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const url = req.protocol + '://' + req.get('host')
  req.body.technology = JSON.parse(req.body.technology)
  req.body.dateTime = JSON.parse(req.body.dateTime)
  req.body.actors = JSON.parse(req.body.actors)
  req.body.technology.map((technology) => { ObjectId(technology.technologyId) })
  req.body.dateTime.map((dateTime) => { ObjectId(dateTime.room) })
  req.body.dateTime.map((dateTime) => { ObjectId(dateTime.technologyId) })
  let newMovie = {}
  if (req.file) {
    newMovie = {
      title: req.body.title,
      releasedate: req.body.releasedate,
      plot: req.body.plot,
      photo: url + '/public/' + req.file.filename,
      videoUrl: req.body.videoUrl,
      director: req.body.director,
      actors: req.body.actors,
      rating: req.body.rating,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      runtime: req.body.runtime,
      technology: req.body.technology,
      Availability: req.body.Availability,
      genre: req.body.genre,
      dateTime: req.body.dateTime
    };
  }
  else {
    newMovie = {
      title: req.body.title,
      releasedate: req.body.releasedate,
      plot: req.body.plot,
      videoUrl: req.body.videoUrl,
      director: req.body.director,
      actors: req.body.actors,
      rating: req.body.rating,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      runtime: req.body.runtime,
      technology: req.body.technology,
      Availability: req.body.Availability,
      genre: req.body.genre,
      dateTime: req.body.dateTime
    };
  }

  try {
    const updateMovie = await Movie.findByIdAndUpdate({ _id: movieId }, newMovie);
    res.json(updateMovie);
  } catch (error) {
    next(error)
  }
}

//USER MOVIES

exports.theMovies = async (req, res) => {
  try {
    let date = new Date()
    console.log(date)
    const movies = await Movie.find({ "toDate": { $gte: date }, "fromDate": { $lte: date } })
    console.log(movies)
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.ComingSoon = async (req, res) => {
  try {
    let date = new Date()
    console.log(date)
    const movies = await Movie.find({ "fromDate": { $gt: date }, "Availability": 1 })
    console.log(movies)
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

//MOVIE DETAILS

exports.movie = async (req, res) => {
  // let dateNow = new Date().toString()
  // dateNow = dateNow.split("T")[0]
  // dateNow = dateNow + "00:00:00.000+00:00"
  // console.log(dateNow)
  try {
    // console.log(movieId);
    // var start = new Date();
    // start.setHours(0, 0, 0, 0);
    // var end = new Date();
    // end.setHours(23, 59, 59, 999);
    // console.log(start)
    // console.log(end)
    //, "dateTime.day": { $gte: start, $lt: end }
    let movieId = req.params.id
    const movie = await Movie.find({ _id: movieId })
      .populate({ path: 'dateTime.room', model: 'Room' })
      .populate({ path: 'genre', model: 'Genre' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(movie);
  } catch (error) {
    res.status(404).json({ messageError: error })
  }
}