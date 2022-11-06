/*
  * server file.
  * created oct 27 2022
*/

const express = require('express')
const app = express()
const {PORT} = require('./config.json')
const path = require('path')



// API ROUTES

const usersRoutes = require('./routes/users.js')
app.use('api/users', usersRoutes)

const notesRoutes = require('./routes/notes.js')
app.use('api/notes', notesRoutes)


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
