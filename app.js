const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const movieRoutes = require('./Server/routes/moviesRoutes.js')
const userRoutes = require('./Server/routes/usersRoutes.js')

app.use('/', movieRoutes)
app.use('/', userRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))