//create the server
const express = require('express')
// providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors')
// indicating that this package has built-in type declarations.
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static('build'))
//like bodyparser for the requests
app.use(express.json())
//This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on
app.use(express.urlencoded({ extended: true }))
//providing a Connect/Express middleware that can be used to enable CORS with various option
app.use(cors())

//This library makes it trivial to log all incoming & outgoing requests & responses using Monolog.
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---------------------')
    next()
}
app.use(requestLogger)


const movieRoutes = require('./Server/routes/moviesRoutes.js')
const userRoutes = require('./Server/routes/usersRoutes.js')
const roomsRoutes = require('./Server/routes/roomsRoutes.js')
const genresRoutes = require('./Server/routes/genresRoutes.js')
const ticketsRoutes = require('./Server/routes/ticketsRoutes.js')
const branchesRoutes = require('./Server/routes/branchesRoutes.js')
const technologiesRoutes = require('./Server/routes/technologiesRoutes')

app.use('/movies', movieRoutes)
app.use('/users', userRoutes)
app.use('/tickets', ticketsRoutes)
app.use('/rooms', roomsRoutes)
app.use('/genres', genresRoutes)
app.use('/branches', branchesRoutes)
app.use('/technology', technologiesRoutes)
app.use('/admin/movies', movieRoutes)
app.use('/admin/tickets', ticketsRoutes)

const errorHandler = (error, request, response, next) => {
    console.error("From error handler: ", error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))