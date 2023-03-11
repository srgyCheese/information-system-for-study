const { Model, DataTypes } = require('sequelize')

class CategoryAttribute extends Model { }

module.exports = sequelize => {
  CategoryAttribute.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_unit: {
      type: DataTypes.STRING,
    }
  }, { 
    sequelize, 
    modelName: 'CategoryAttribute',
    tableName: 'category_attributes'
  })

  return () => {
    const {Category, ValueType, ProductValue, ValuesSelectVariant} = sequelize.models

    CategoryAttribute.belongsTo(Category)
    CategoryAttribute.belongsTo(ValueType)
    CategoryAttribute.hasMany(ProductValue)
    CategoryAttribute.hasMany(ValuesSelectVariant)

    return CategoryAttribute
  }
}