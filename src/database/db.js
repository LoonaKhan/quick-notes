const {Sequelize} = require('sequelize')
const { dev_db, dev_host, db, db_host } = require('../config.json')

const sequelize = new Sequelize(
    dev_db, // db name
    'user', 'passwd', // username and passwd arent too important for sqlite
    { // options object
        dialect: "sqlite",
        host: dev_host
})

module.exports = sequelize

