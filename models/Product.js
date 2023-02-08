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
    const {Category, ProductPhoto, ProductValue} = sequelize.models
  
    Product.belongsTo(Category)
    Product.hasMany(ProductPhoto)
    Product.hasMany(ProductValue)
  
    return Product  
  }  
}  