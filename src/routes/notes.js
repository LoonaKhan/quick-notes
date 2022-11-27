/*
  * routes for all notes
  * */

const { Router } = require('express')
const Folder = require('../database/Folder')
const Note = require('../database/Note')
const User = require('../database/User')

const router = Router()


// API ROUTES

// gets a note by id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    const note = await Note.findOne({ where: { id: id } })
    res.send(note)
})

// get all notes in a folder
router.get('/folder/:id/', async (req, res) => {
    const id = req.params.id
    const notes = await Note.findAll({ where: { folder: id } })
    res.send(notes)
})

// posts a note
router.post('/create', async (req, res) => {
    /*
    Requires a uid, folder name, content and title fo the note
     */

    const note = await Note.create(req.body)
    res.status(201).send("updated successfully")
})

// edits a note
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id
    const { newTitle, newContent } = req.body

    try {
        const note = await Note.findOne({ where: { id: id } })

        note.title = newTitle
        note.content = newContent

        await note.save()

        res.status(201).send({ msg: "updated successfully" })
    } catch (e) {
        res.status(401).send(e)
    }
})

// deletes a note
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id

    try {
        await Note.destroy({ where: { id: id } })
        res.status(201).send({ msg: "Deleted Note" })
    } catch (e) {
        res.status(400).send({ msg: "note not found", err: e })
    }
})

// send a copy of a note to an inbox
// requires a note id and the recipient's id
router.post('/send/:note_id', async (req, res) => {
    const note_id = req.params.note_id
    const { inbox } = req.body

    try {
        const note = await Note.findOne({ where: { id: note_id } })
        const sent_note = await Note.create({
            author: note.author,
            folder: inbox,
            content: note.content,
            title: note.title,
            owner: note.owner
        })
        res.status(201).send(sent_note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/send_macro/:note_id', async (req, res) => {
    const {username} = req.body
    const note_id = req.params.note_id

    // sends the note to that inbox
    try {
        console.log("started")

        const note = await Note.findOne({where: {id: note_id}})
        console.log("found note")
        const recipient = await User.findOne({where: {username: username}})
        console.log("found recipient")
        const inbox = await Folder.findOne({where: {owner: recipient.id, name: "inbox"}})
        console.log("found inbox")

        const sent_note = await Note.create({
            author: note.author,
            folder: inbox.id,
            content: note.content,
            title: note.title,
            owner: note.owner
        })
        console.log("sent note")
        res.status(201).send(sent_note)
    } catch (e) {
        res.status(400).send({err: e})
    }
})


module.exports = router 
