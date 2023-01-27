const { Model, DataTypes } = require('sequelize')

class User extends Model {}

module.exports = sequelize => {
    User.init({
        fio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'User' })

    return () => {
        User.belongsTo(sequelize.models.Role)

        return User
    }
}