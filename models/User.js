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
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING
    }
  }, {
    sequelize, 
    modelName: 'User',
    timestamps: true,
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