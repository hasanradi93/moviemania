require('../models/connectDB')
const Technology = require('../models/Technology')

exports.technologies = async (req, res) => {
    try {
        const technologies = await Technology.find()
        res.json(technologies);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

exports.addTechnology = async (req, res) => {
    const newTechnology = new Technology({
        name: req.body.name
    });

    try {
        await newTechnology.save();
        res.json(newTechnology);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}


exports.editTechnology = async (req, res) => {
    const technologyId = req.params.id;
    const newTechnology = {
        name: req.body.name
    };
    try {
        const editTechnology = await Technology.findByIdAndUpdate({ _id: technologyId }, newTechnology);
        res.json(editTechnology);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.deleteTechnology = async (req, res) => {
    const technologyId = req.params.id;
    try {
        const data = await Technology.deleteTechnology({ _id: technologyId });
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}