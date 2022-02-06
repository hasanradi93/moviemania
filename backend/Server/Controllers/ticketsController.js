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
    res.json(tickets);
  } catch (error) {
    next(error)
  }
}

exports.addTicket = async (req, res) => {
  const newTicket = new Ticket({
    userId: req.body.userId,
    cancelTicket: false,
    movieId: req.body.movieId,
    roomId: req.body.roomId,
    seatNumber: req.body.seat,
    technologyId: req.body.technology,
    date: req.body.day
  });

  try {
    await newTicket.save();
    res.json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.cancelTicket = async (req, res) => {
  const ticketId = req.body.id
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
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.getUserTickets = async (req, res) => {
  console.log("DDD")
  const userId = req.body.userId
  console.log("req.body", req.body)
  console.log(userId)
  let dateNow = new Date()
  try {
    console.log(userId)
    const data = await Ticket.find({ userId: userId, cancelTicket: false, date: { $gte: dateNow } })
      .populate({ path: 'roomId', model: 'Room' })
      .populate({ path: 'movieId', model: 'Movie' })
      .populate({ path: 'userId', model: 'User' })
      .populate({ path: 'technologyId', model: 'Technology' })
    console.log(data)
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
