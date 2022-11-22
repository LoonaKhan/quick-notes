/*
  * server file.
  * created oct 27 2022
*/

const express = require('express')
const cookieParser = require('cookie-parser')
const {PORT} = require('./config.json')
const path = require('path')
const sequelize = require('./database/db')


const app = express() // init express
app.use(express.json()) // allows us to parse json requests
app.use(cookieParser())
sequelize.sync().then(() => console.log('db on')) // init sqlite and syncs all tables


// API ROUTES

const usersRoutes = require('./routes/users.js')
app.use('/api/users', usersRoutes)

const notesRoutes = require('./routes/notes.js')
app.use('/api/notes', notesRoutes)

const foldersRoutes = require('./routes/folders')
app.use('/api/folders', foldersRoutes)


// WEBPAGES
// only pages that are meant to be directly reached.
// redirects are excluded

const webPages = require('./routes/webpages')
app.use('/', webPages)


// THE SERVER

app.listen(PORT, () => {
  console.log('listening on port 4000')
})
