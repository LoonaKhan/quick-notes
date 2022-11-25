const { Model, DataTypes } = require('sequelize')
const sequelize = require('./db')

class User extends Model { }

User.init({ // todo: let charlie override this
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    dark_mode: {
        type: DataTypes.BOOLEAN
    },
    avatar: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        modelName: 'USERS',
        tableName: 'USERS'
    })

module.exports = User