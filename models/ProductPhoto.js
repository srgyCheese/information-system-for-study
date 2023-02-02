const { Model, DataTypes } = require('sequelize')

class ProductPhoto extends Model { }

module.exports = sequelize => {
  ProductPhoto.init({
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
    modelName: 'ProductPhoto',
    tableName: 'product_photo'
  })

  return () => {
    const {Product} = sequelize.models

    ProductPhoto.belongsTo(Product)

    return ProductPhoto
  }
}