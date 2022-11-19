/*
    All routes for users
 */

const { Router } = require('express')
const User = require('../database/User')
const Folder = require('../database/Folder')

const router = Router()



// API ROUTES

// gets a user by login credentials
router.get('/', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({where: {username:username, password:password}})
    if (!user){
        res.status(400).send({err: "Could not find user"})
    }
    else res.send(user)
})

// get user by name

// creates a user
router.post('/create', async (req, res) => {
    /*
        takes in a name, password and avatar.
        creates an inbox and dark_mode setting on its own
     */

    const user = await User.create(req.body)
    if(!user) {
        res.status(400).send({err:"Couldnt find user"})
    }
    else{
        await Folder.create({name: "inbox", owner: user.id})
        res.send({msg: "successfully created"})
    }
})

// logs a user in
router.put('/login/:id', async (req, res) => {})

// change a user password
// requires a new password.
router.put('/edit/password/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({where: {id: id}})
    if (!user) {
        res.status(400).send({err:"Couldnt find user"})
    }
    else {
        user.password = req.body.password
        await user.save()
        res.send({msg: "updated"})
    }
})

// change user setting to dark mode
router.put('/edit/dark_mode/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({where: {id: id}})
    if (!user) {
        res.status(400).send({err:"Couldnt find user"})
    }
    else {
        user.dark_mode = req.body.dark_mode
        await user.save()
        res.send({msg: "updated"})
    }
})

// delete
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    if (!(await User.destroy({where: {id: id}}))) {
        res.status(400).send({err: "could not delete user"})
    }
    else res.send({msg: "deletion successful"})
})



module.exports = router 
