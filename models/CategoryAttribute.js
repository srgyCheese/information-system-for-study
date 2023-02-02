const { Model, DataTypes } = require('sequelize')

class CategoryAttribute extends Model { }

module.exports = sequelize => {
  CategoryAttribute.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'CategoryAttribute',
    tableName: 'category_attributes'
  })

  return () => {
    const {Category, ValueType, ProductValue} = sequelize.models

    CategoryAttribute.belongsTo(Category)
    CategoryAttribute.belongsTo(ValueType)
    CategoryAttribute.hasMany(ProductValue)

    return CategoryAttribute
  }
}