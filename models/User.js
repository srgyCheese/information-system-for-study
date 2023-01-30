const { Model, DataTypes } = require('sequelize')

class User extends Model { }

module.exports = sequelize => {
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'User',
  })

  User.prototype.makeJSON = function () {
    const values = Object.assign({}, this.get())
    
    delete values.password
    return values
  }

  return () => {
    User.belongsTo(sequelize.models.Role)

    return User
  }
}