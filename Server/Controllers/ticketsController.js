require('../models/connectDB')
const Ticket = require('../models/Ticket')

exports.tickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
    res.json(tickets);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addTicket = async (req, res) => {
  const newTicket = new Ticket({
    userId: req.body.userId,
    cancelTicket: req.body.cancelTicket,
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

exports.cancelTicket = async (req, res) => {
  const ticketId = req.params.id
  try {
    const data = await Ticket.findByIdAndUpdate({ _id: ticketId}, {cancelTicket: true})
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.getTicketById = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const data = await Ticket.findById({ _id: ticketId})
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

