class Session { // session class to keep track of user sessions
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }

    isExpired() {
        return this.expiresAt < (new Date())
    }
}

const sessions = {} // the sessions. good enough for a small scale app

module.exports = {
    Session,
    sessions
}