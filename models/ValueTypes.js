const { Model, DataTypes } = require('sequelize')

class ValueType extends Model { }

module.exports = sequelize => {
  ValueType.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { 
    sequelize, 
    modelName: 'ValueType',
    tableName: 'value_type',
  })

  return () => {
    const {CategoryAttribute} = sequelize.models

    ValueType.hasMany(CategoryAttribute)

    return ValueType
  }
}