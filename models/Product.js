const { Model, DataTypes } = require('sequelize')

class Product extends Model { }

module.exports = sequelize => {
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'Product',
    timestamps: true,
  })

  return () => {
    const {Category, ProductPhoto, ProductValue, ProductPrice, ProductItem} = sequelize.models

    Product.belongsTo(Category)
    Product.hasMany(ProductPhoto)
    Product.hasMany(ProductValue)
    Product.hasMany(ProductPrice)
    Product.hasMany(ProductItem)
  
    return Product  
  }  
}  