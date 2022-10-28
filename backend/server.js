const express = require('express')
const app = express()
const {PORT} = require('./config.json')



// API ROUTES

// testing html 
app.get('/', (req, res) =>{
  res.send('<html><body><h1>testing</h1></body></html>')
})


const usersRoutes = require('./routes/users.js')
app.use('users', usersRoutes)

const notesRoutes = require('./routes/notes.js')
app.use('notes', notesRoutes)
 



app.listen(PORT, () => {
  console.log('listening on port 4000')
})
