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
        name: req.body.name
    });

    try {
        await newGenre.save();
        res.json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}