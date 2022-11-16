/*
  * server file.
  * created oct 27 2022
*/

const express = require('express')
const {PORT} = require('./config.json')
const path = require('path')
const sequelize = require('./database/db')

const app = express() // init express
app.use(express.json()) // allows us to parse json requests
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

app.get('/', async (req, res) =>{ // home
  // loads the login page
  // login page will redirect the user
  res.sendFile(path.join(__dirname, './webpages', 'login.html'))
})


// THE SERVER

app.listen(PORT, () => {
  console.log('listening on port 4000')
})
