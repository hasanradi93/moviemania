require('../models/connectDB')
const Room = require('../models/Room')

exports.rooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate({ path: 'name' })
      .populate({ path: 'seats' })
    res.json(rooms);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addRoom = async (req, res) => {
  const newRoom = new Room({

    name: req.body.name,
    seats: req.body.seats,

  });
  try {
    await newRoom.save();
    res.json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}



exports.editRoom = async (req, res) => {
  const RoomId = req.params.id
  const newRoom = {
    name: req.body.name,
    seats: req.body.seats,
  }
  try {
    const data = await Room.findByIdAndUpdate({ _id: RoomId }, newRoom)
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const data = await Room.deleteOne({ _id: roomId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
