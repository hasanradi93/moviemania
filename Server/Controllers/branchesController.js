require('../models/connectDB')
const Branch = require('../models/Branch')

exports.branches = async (req, res) => {
    try {
        const branches = await Branch.find()
        res.json(branches);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

exports.addBranch = async (req, res) => {
    const newBranch = new Branch({
        name: req.body.name,
        location: req.body.location,
        rooms: req.body.rooms
    });

    try {
        await newBranch.save();
        res.json(newBranch);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}