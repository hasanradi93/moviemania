require('../models/connectDB')
const Genre = require('../models/Genre')

exports.genres = async (req, res) => {
  try {
    const genres = await Genre.find()
    res.json(genres);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addGenre = async (req, res) => {
  const newGenre = new Genre({
    name: req.body.name,
    cancelGenre: req.body.cancelGenre,
    editGenre: req.body.editGenre
  });

  try {
    await newGenre.save();
    res.json(newGenre);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}


exports.editGenre = async (req, res) => {
  const genreId = req.params.id;
  const newGenre = {
    name: req.body.name
  };
  try {
    const editGenre = await Genre.findByIdAndUpdate({ _id: genreId }, newGenre);
    res.json(editGenre);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.deleteGenre = async (req, res) => {
  const genreId = req.params.id;
  try {
    const data = await Genre.deleteOne({ _id: genreId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}