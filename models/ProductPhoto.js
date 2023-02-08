const { Model, DataTypes } = require('sequelize')

class ProductPhoto extends Model { }

module.exports = sequelize => {
  ProductPhoto.init({
    url: ''
  }, { 
    sequelize, 
    modelName: 'ProductPhoto',
    tableName: 'product_photo'
  })

  return () => {
    const {Product} = sequelize.models

    ProductPhoto.belongsTo(Product)

    return ProductPhoto
  }
}