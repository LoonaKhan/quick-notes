/*
    All routes for users
 */

const { Router } = require('express')
const User = require('../database/User')
const Folder = require('../database/Folder')
const { v4: uuidv4 } = require('uuid')
const { sessions, Session } = require('../models/sessions')

const router = Router()



// API ROUTES

// gets a user by login credentials
// initially tries the cookies, but if they are none, use the body
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username: username, password: password } })
    if (!user) {
        res.status(400).send({ err: "Could not find user" })
        return
    }
    else {
        const sessToken = uuidv4() // creates the user token

        // sets expiry date
        const now = new Date()
        const expiresAt = new Date(+now + 3600 * 1000)

        //creates a new user session
        const sess = new Session(username, expiresAt)

        // adds the session to sessions
        sessions[sessToken] = sess

        // sets the cookie
        console.log(sessToken)
        res.cookie("session_token", sessToken, { expires: expiresAt }).send(user)
    }
})

//logs user out
router.get('/logout', async (req, res) => {
    if (!req.cookies) {
        res.status(400).end()
        return
    }

    const sessToken = req.cookies['session_token']
    if (!sessToken) {
        res.status(400).end()
        return
    }

    delete sessions[sessToken]

    res.cookie('session_token', "", { expires: new Date() })
        .send("Logged out")
        .end()
})

// get user by name
router.get('/search', async (req, res) => {
    const { username } = req.body
    const user = await User.findOne({ where: { username: username } })
    if (!user) {
        res.status(400).send({ err: "Could not find user" })
    }
    else res.send({ id: user.id })
})

// creates a user
router.post('/create', async (req, res) => {
    /*
        takes in a name, password and avatar.
        creates an inbox and dark_mode setting on its own
     */

    const user = await User.create(req.body)
    if (!user) {
        res.status(400).send({ err: "Couldnt find user" })
    }
    else {
        await Folder.create({ name: "inbox", owner: user.id })
        res.send(user)
    }
})

// logs a user in
router.put('/login/:id', async (req, res) => { })

// change a user password
// requires a new password.
router.put('/edit/password/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ where: { id: id } })
    if (!user) {
        res.status(400).send({ err: "Couldnt find user" })
    }
    else {
        user.password = req.body.password
        await user.save()

        res
            .clearCookie('password')
            .cookie('password', req.body.password)
            .send({ msg: "updated" })
    }
})

// change user setting to dark mode
router.put('/edit/dark_mode/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ where: { id: id } })
    if (!user) {
        res.status(400).send({ err: "Couldnt find user" })
    }
    else {
        user.dark_mode = req.body.dark_mode
        await user.save()
        res.send({ msg: "updated" })
    }
})

// delete
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    if (!(await User.destroy({ where: { id: id } }))) {
        res.status(400).send({ err: "could not delete user" })
    }
    else res.send({ msg: "deletion successful" })
})



module.exports = router 
