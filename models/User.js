const { Model, DataTypes } = require('sequelize')

class User extends Model {}

module.exports = sequelize => {
    User.init({
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { sequelize, modelName: 'User' })

    return User
}