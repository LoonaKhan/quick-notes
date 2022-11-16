/*
  * routes for all notes
  * */

const { Router } = require('express')
const Folder = require('../database/Folder')
const Note = require('../database/Note')

const router = Router()



// API ROUTES

// gets a note by id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    const note = Note.findOne({where: {id:id}})
    res.send(note)
})

// get all notes in a folder
router.get('/folder/:id/', async (req, res) => {
    const id = req.params.id
    const notes = Note.findAll({where: {folder:id}})
    res.send(notes)
})

// posts a note
router.post('/create', async (req, res) => {
    /*
    Requires a uid, folder name, content and title fo the note
     */
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
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id
    const {newTitle, newContent} = req.body

    try {
        const note = Note.findOne({where: {id:id}})

        if (newTitle) note.title = newTitle
        if (newContent) note.content = newContent

        await note.save()

        res.status(201).send({msg: "updated successfully"})
    } catch (e) {
        res.status(401).send(e)
    }
})

// deletes a note
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id

    try {
        Note.destroy({where:{id:id}})
        res.status(201).send({msg:"Destroyed Note"})
    } catch (e) {
        res.status(400).send({msg: "note not found", err:e})
    }
})

// send a copy of a note to an inbox
// requires a note id and the recipient's id
router.post('/send/:note_id', async (req, res) =>{
    // todo: implement this
    const note_id = req.params.note_id
    const {uid, recipient} = req.body

    try {
        const note = Note.findOne({where: {id: note_id}})
        // find the user's inbox folder, inbox todo: implement folder methods
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



module.exports = router 
