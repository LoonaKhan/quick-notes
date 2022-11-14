/*
  * routes for all notes
  * */

const { Router } = require('express')
const Folder = require('../database/Folder')
const Note = require('../database/Note')
const {where} = require("sequelize");

const router = Router()



// API ROUTES

// gets a note by id
router.get('/:id', async (req, res) => {})

// get all notes in a folder
router.get('/folder/:uid/', async (req, res) => {
    // body contains
})

// posts a note
router.post('/create', async (req, res) => {
    const {uid, folder, content, title} = req.body;

    // folder is the folder id
    // has to exist
    let fid =Folder.findOne({where: {user:uid, name:folder}})

    const note = Note.create({
        author: uid,
        folder: fid,
        title: title,
        content: content
    })
})

// edits a note
router.put('/edit/:id', async (req, res) => {})

// deletes a note
router.delete('/del/:id', async (req, res) => {})

// send a copy of a note to an inbox
// requires a note id and the recipient's id
router.post('/send/:note_id', async (req, res) =>{
    const note_id = req.params.note_id
    const {uid, recipient} = req.body

    try {
        const note = Note.findOne({where: {id: note_id}})
        // find the user's inbox folder, inbox
        const sent_note = Note.create({
            author: note.author,
            folder: inbox,
            content: note.content,
            title: note.title
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete a note from ur inbox
//router.delete('/inbox/del', async (req, res) => {})



module.exports = router 
