const {Model, DataTypes} = require('sequelize')
const sequelize = require('./db')
const User = require('./User')

class Folder extends Model{}

Folder.init({
    /*
    name,
    user
    */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
     name: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        modelName: 'FOLDERS',
        tableName: 'FOLDERS'
    })

Folder.belongsTo(User, {
    foreignKey: 'owner'
})

module.exports = Folder