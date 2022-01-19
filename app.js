const express = require('express')
const cors = require('cors')
require('dotenv').config()
const movieRoutes = require('./Server/routes/moviesRoutes.js')
const userRoutes = require('./Server/routes/usersRoutes.js')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/movies', movieRoutes)
app.use('/users', userRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))