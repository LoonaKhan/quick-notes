/*
    All routes for users
 */

const { Router } = require('express')

const router = Router()



// API ROUTES

// gets a user by id
router.get('/:id', async (req, res) => {})

// creates a user
router.post('/create', async (req, res) => {})

// logs a user in
router.put('/login/:id', async (req, res) => {})

// change a user password
// requires a new password.
router.put('/edit/password/:id', async (req, res) =>{})

// change user setting to dark mode
router.put('/edit/dark_mode/:id', async (req, res)=>{})



module.exports = router 
