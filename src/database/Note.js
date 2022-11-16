const { Model, DataTypes} = require('sequelize')
const sequelize = require('./db')
const User = require('./User')
const Folder = require('./Folder')

class Note extends Model {}

Note.init({ // todo: let charlie override this
        // fields
        /*
        id
        content,
        title,
        author [id],
        folder [id],
        creation_date,
        last_modified
        starred?
         */
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        },
        title:{
            type: DataTypes.STRING
        }
    },
    { // options
        sequelize,
        modelName: 'NOTES',
        tableName: 'NOTES'
    })

// foreign keys
Note.belongsTo(User, {
    foreignKey: 'author'
}); Note.belongsTo(Folder, {
    foreignKey: 'folder'
})

module.exports = Note