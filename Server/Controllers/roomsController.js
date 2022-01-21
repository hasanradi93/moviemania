require('../models/connectDB')
const Room = require('../models/Room')

exports.rooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

exports.addRoom = async (req, res) => {
    const newRoom = new Room({
        name: req.body.name,
        seats: req.body.seats
    });

    try {
        await newRoom.save();
        res.json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}