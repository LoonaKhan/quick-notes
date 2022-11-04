/*
  * routes for all notes
  * */

const { Router } = require('express')

const router = Router()



// API ROUTES

// gets a note by id
router.get('/:id', async (req, res) => {})

// posts a note
router.post('/create', async (req, res) => {})

// edits a note
router.put('/edit/:id', async (req, res) => {})

// deletes a note
router.delete('/del/:id', async (req, res) => {})



module.exports = router 
