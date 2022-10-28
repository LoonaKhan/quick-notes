const { Router } = require('express')

const router = Router()



// API ROUTES

// gets a user by id
router.get('/:id', async (req, res) => {})

// creates a user
router.post('/create', async (req, res) => {})

// logs a user in
router.put('/login/:id', async (req, res) => {})



module.exports = router 
