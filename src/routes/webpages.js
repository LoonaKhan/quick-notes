const { Router } = require('express')
const { Session, sessions } = require('../models/sessions')
const path = require("path");

router = Router()

const sessHandler = (req) => { // checks if a user is logged in. returns a bool
    if (!req.cookies) {
        return false
    }

    const sessToken = req.cookies['session_token'] // gets the session token
    if (!sessToken) {
        return false
    }

    userSess = sessions[sessToken] // validates its existence
    if (!userSess) {
        return false
    }

    if (userSess.isExpired()) { // checks if its expired
        delete sessions[sessToken]
        return false
    }

    return true // if it exists and hasnt expired, return true indicating that this is a valid session
}

const webpagesPath = '../webpages'

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, webpagesPath, 'login.html'))
})

router.get('/signup', async (req, res) => {
    res.sendFile(path.join(__dirname, webpagesPath, 'signup.html'))
})

router.get('/index', async (req, res) => {
    if (sessHandler(req)) {
        res.sendFile(path.join(__dirname, webpagesPath, 'index.html'))
    } else { // always just redirect to the login page
        res.sendFile(path.join(__dirname, webpagesPath, 'login.html'))
    }
})

module.exports = router