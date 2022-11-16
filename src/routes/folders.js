const { Router} = require('express')
const Folder = require('../database/Folder')
const User = require('../database/User')

const router = Router()

// get a folder by user and name
router.get('/user/search/:id', async (req, res) => {
    const uid = req.params.id
    const {name} = req.body
    try {
        const user = User.findOne({where: {id:uid}})
        const folders = Folder.findAll({where: {owner: user, name:name}})
        res.status(201).send(folders)
    } catch (e) {
        res.status(500).send({msg: "internal server error", err:e})
    }
})

// get a folder by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const folder = Folder.findOne({where: {id:id}})
    } catch (e) {
        res.status(400).send({msg: "folder not found", err:e})
    }
})

// get all a user's folders
router.get('/user/:id', async (req, res) => {
    const uid = req.params.id
    try {
        const user = User.findOne({where: {id:uid}})
        const folders = Folder.findAll({where: {owner: user}})
        res.status(201).send(folders)
    } catch (e) {
        res.status(500).send({msg: "internal server error", err:e})
    }
})

// get a user's inbox folder. given a user
router.get('/user/inbox/:id', async (req, res) => {
    const uid = req.params.id
    try {
        const user = User.findOne({where: {id:uid}})
        const folders = Folder.findAll({where: {owner: user, name: "inbox"}})
        res.status(201).send(folders)
    } catch (e) {
        res.status(500).send({msg: "internal server error", err:e})
    }
})

// create folder
router.post('/create', async (req, res) => {
    const {uid, name} = req.body
    try {
        Folder.create({name: name, owner: uid})
        res.status(201).send({msg: "Created Folder"})
    } catch (e) {
        res.status(500).send(e)
    }
})

// edit a folders name
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id
    const {name} = req.body

    try {
        const folder = Folder.findOne({where: {id: id}})
        folder.name = name
        await folder.save()

        res.status(201).send("updated")
    } catch (e) {
        res.status(400).send({msg: "could not update folder", err:e})
    }
})

// delete a folder
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id

    try {
        Folder.destroy({where:{id:id}})
    } catch (e) {
        res.status(400).send({msg: "could not delete folder", err:e})
    }
})

module.exports = router