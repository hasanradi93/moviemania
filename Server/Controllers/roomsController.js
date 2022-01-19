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