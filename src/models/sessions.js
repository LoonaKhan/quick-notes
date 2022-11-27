class Session { // session class to keep track of user sessions
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }

    isExpired() {
        return this.expiresAt < (new Date())
    }
}

const sessions = {} // session object to contain all current sessions

module.exports = {
    Session,
    sessions
}