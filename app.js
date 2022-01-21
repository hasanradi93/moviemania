const express = require('express')
const cors = require('cors')
require('dotenv').config()
const movieRoutes = require('./Server/routes/moviesRoutes.js')
const userRoutes = require('./Server/routes/usersRoutes.js')
const roomsRoutes = require('./Server/routes/roomsRoutes.js')
const genresRoutes = require('./Server/routes/genresRoutes.js')
const ticketsRoutes = require('./Server/routes/ticketsRoutes.js')
const branchesRoutes = require('./Server/routes/branchesRoutes.js')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/movies', movieRoutes)
app.use('/users', userRoutes)
app.use('/tickets', ticketsRoutes)
app.use('/rooms', roomsRoutes)
app.use('/genres', genresRoutes)
app.use('/branches', branchesRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))