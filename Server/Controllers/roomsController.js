require('../models/connectDB')
const Room = require('../models/Room')

exports.rooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        .populate({path:'name'})
        .populate({path:'seats'})
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

    exports.cancelRoom = async (req, res) => {
        const RoomName = req.params.name
        try {
          const data = await Room.findByIdAndUpdate({ _name: RoomName}, {cancelRoom: true})
          res.json(data)
        } catch (error) {
          res.status(400).json({ message: error })
        }
      }

      exports.cancelRoomByName = async (req, res) => {
        const RoomName = req.params.name;
        try {
          const data = await Room.findById({ _name: RoomName})
            .populate({ path: 'name', model: 'Room' })
            // .populate({ path: 'movieId', model: 'seats' })
           
          res.json(data)
        } catch (error) {
          res.status(400).json({ message: error })
        }
      }

exports.editRoom = async (req, res) => {
        const RoomName = req.params.name
        try {
          const data = await Room.findByIdAndUpdate({ _name: RoomName}, {editRoom: true})
          res.json(data)
        } catch (error) {
          res.status(400).json({ message: error })
        }
      }

      exports.editRoomByName = async (req, res) => {
        const RoomName = req.params.name;
        try {
          const data = await Room.findById({ _name: RoomName})
            .populate({ path: 'name', model: 'Room' })
            // .populate({ path: 'movieId', model: 'seats' })
           
          res.json(data)
        } catch (error) {
          res.status(400).json({ message: error })
        }
      }
    
module.exports = mongoose.model('Room', RoomSchema)