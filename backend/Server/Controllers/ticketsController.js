require('../models/connectDB')
const Ticket = require('../models/Ticket')

exports.tickets = async (req, res, next) => {
  try {
    const date = new Date()
    console.log(date)
    const tickets = await Ticket.find({ date: date })
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
      .populate({ path: 'technologyId', model: 'Technology' })
    // if (!tickets.length > 0) {
    //   console.log("ffffffff")
    //   return res.status(404).json({ message: "No Tickets Today" })
    // }

    res.json(tickets);
  } catch (error) {
    next(error)
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
    const data = await Ticket.findByIdAndUpdate({ _id: ticketId }, { cancelTicket: true })
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.getTicketById = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const data = await Ticket.findById({ _id: ticketId })
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.getMovieTicketsById = async (req, res) => {
  const movieId = req.params.id
  try {
    const data = await Ticket.find({ movieId: movieId })
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}


exports.takenSeats = async (req, res) => {
  if (!req.body.movieId && !req.body.roomId && !req.body.date && !req.body.time) {
    res.status(400).json({ message: "Data error" })
  }
  let movieId = req.body.movieId
  let roomId = req.body.roomId
  let date = req.body.date
  let time = req.body.time
  try {
    const data = await Ticket.find({ movieId: movieId, roomId: roomId, date: date, time: time });
    console.log(data)
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.getUserTicketById = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await Ticket.findById({ _id: userId })
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
      .populate({ path: 'technology.technologyId', model: 'Technology' })
      .populate({ path: 'dateTime.technologyId', model: 'Technology' })
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}