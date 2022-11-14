/*
    All routes for users
 */

const { Router } = require('express')
const User = require('../database/User')

const router = Router()



// API ROUTES

// gets a user by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({where: {id: id}})
    console.log(user)
    res.send(user)
})

// creates a user
router.post('/create', async (req, res) => {
    /*
        takes in a name, password and avatar.
        creates an inbox and dark_mode setting on its own
     */
    //const {username, password, avatar, dark_mode} = req.body
    //const inbox = []

    User.create(req.body)

    res.send({msg: "successfully created"})
})

// logs a user in
router.put('/login/:id', async (req, res) => {})

// change a user password
// requires a new password.
router.put('/edit/password/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({where: {id:id}})
    user.password = req.body.password
    await user.save()
    res.send({msg: "updated"})
})

// change user setting to dark mode
router.put('/edit/dark_mode/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({where: {id:id}})
    user.dark_mode = req.body.dark_mode
    await user.save()
    res.send({msg: "updated"})
})

// delete
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await User.destroy({where: {id:id}})
    res.send({msg: "deletion successful"})
})



module.exports = router 
