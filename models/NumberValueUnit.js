const { Model, DataTypes } = require('sequelize')

class NumberValueUnit extends Model { }

module.exports = sequelize => {
  NumberValueUnit.init({
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'NumberValueUnit',
    tableName: 'number_value_unit'
  })

  return () => {
    const {CategoryAttribute} = sequelize.models

    NumberValueUnit.belongsTo(CategoryAttribute)

    return NumberValueUnit
  }
}