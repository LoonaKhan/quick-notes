const { Model, DataTypes} = require('sequelize')
const sequelize = require('./db')

class Note extends Model {}

Note.init({ // todo: let charlie override this
        // fields
        /*
        content, author,
        folder. folder id

         */
        content: {
            type: DataTypes.TEXT
        }
    },
    { // options
        sequelize,
        modelName: 'note'
    })

module.exports = Note