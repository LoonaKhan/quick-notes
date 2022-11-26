const { Router } = require('express')
const Folder = require('../database/Folder')
const User = require('../database/User')
const Note = require('../database/Note')

const router = Router()

// get a folder by user and name
router.get('/user/search/:id', async (req, res) => {
    const uid = req.params.id
    const { name } = req.body

    const folders = await Folder.findOne({ where: { owner: uid, name: name } })
    if (!folders) {
        res.status(400).send({ err: "Folder not found" })
    }
    else res.status(201).send(folders)
})

// get a folder by id
router.get('/:id', async (req, res) => {
    const id = req.params.id

    const folder = await Folder.findOne({ where: { id: id } })
    if (!folder) {
        res.status(400).send({ err: "Folder not found" })
    }
    else res.status(201).send(folder)

})

// get all a user's folders
router.get('/user/:id', async (req, res) => {
    const uid = req.params.id
    try {
        const user = await User.findOne({ where: { id: uid } })
        //const folders = await Folder.findAll({where: {owner: user.id}})
        const folders = await Folder.findAll({ where: { owner: user.id }, include: Note })
        res.status(201).send(folders)
    } catch (e) {
        res.status(500).send({ msg: "internal server error", err: e })
    }
})

// get a user's inbox folder. given a user
router.get('/user/inbox/:id', async (req, res) => {
    const uid = req.params.id
    try {
        const folders = await Folder.findOne({ where: { owner: uid, name: "inbox" } })
        res.status(201).send(folders)
    } catch (e) {
        res.status(500).send({ msg: "internal server error", err: e })
    }
})

// create folder
router.post('/create', async (req, res) => {
    const { uid, name } = req.body
    try {
        const folder = await Folder.create({ name: name, owner: uid })
        res.status(201).send("Folder " + name + " is created")
    } catch (e) {
        res.status(400).send({ err: "Could not create folder" })
    }
})

// edit a folders name
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    try {
        const folder = await Folder.findOne({ where: { id: id } })
        folder.name = name
        await folder.save()

        res.status(201).send("updated")
    } catch (e) {
        res.status(400).send({ msg: "could not update folder", err: e })
    }
})

// delete a folder
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id

    try {
        await Folder.destroy({ where: { id: id } })
        res.status(201).send({ msg: "Created folder" })
    } catch (e) {
        res.status(400).send({ msg: "could not delete folder", err: e })
    }
})

module.exports = router