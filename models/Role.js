const { Model, DataTypes } = require('sequelize')

class Role extends Model {}

module.exports = sequelize => {
    Role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, { sequelize, modelName: 'Role' })

    return () => {
        Role.hasMany(sequelize.models.User)

        return Role
    }
}