const {Model, DataTypes} = require('sequelize')
const sequelize = require('./db')

class Folder extends Model{}

Folder.init({
    name: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        modelName: 'folder'
    })

module.exports = Folder