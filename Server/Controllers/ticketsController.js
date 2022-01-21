require('../models/connectDB')
const Ticket = require('../models/Ticket')

exports.tickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'branchId', model: 'Branch' })
      .populate({ path: 'userId', model: 'User' })
    res.json(tickets);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addTicket = async (req, res) => {
  const newTicket = new Ticket({
    userId: req.body.userId,
    branchId: req.body.branchId,
    movieId: req.body.movieId,
    roomId: req.body.roomId,
    seat: req.body.seat
  });

  try {
    await newTicket.save();
    res.json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.deleteTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const data = await Ticket.deleteOne({ _id: ticketId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

