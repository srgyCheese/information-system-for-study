const { Model, DataTypes } = require('sequelize')

class ProductItem extends Model { }

module.exports = sequelize => {
  ProductItem.init({

  }, { 
    sequelize, modelName: 'ProductItem',
    tableName: 'product_item'
  })

  return () => {
    const {Product, Warehouse} = sequelize.models

    ProductItem.belongsTo(Product)
    ProductItem.belongsTo(Warehouse)

    return ProductItem
  }
}