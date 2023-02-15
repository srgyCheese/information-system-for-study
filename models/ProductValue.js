const { Model, DataTypes } = require('sequelize')

class ProductValue extends Model { }

module.exports = sequelize => {
  ProductValue.init({
    string: {
      type: DataTypes.STRING,
    },
    bool: {
      type: DataTypes.BOOLEAN,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  }, { 
    sequelize, 
    modelName: 'ProductValue',
    tableName: 'product_value'
  })

  return () => {
    const {Product, CategoryAttribute, ValuesSelectVariant} = sequelize.models

    ProductValue.belongsTo(Product)
    ProductValue.belongsTo(CategoryAttribute)
    ProductValue.belongsTo(ValuesSelectVariant, {
      foreignKey: 'select'
    })

    return ProductValue
  }
}