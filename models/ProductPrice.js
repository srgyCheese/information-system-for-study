const { Model, DataTypes } = require('sequelize')

class ProductPrice extends Model { }

module.exports = sequelize => {
  ProductPrice.init({
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, { 
    sequelize, 
    modelName: 'ProductPrice',
    tableName: 'product_price',
    timestamps: true,
  })

  return () => {
    const {Product} = sequelize.models

    ProductPrice.belongsTo(Product)

    return ProductPrice
  }
}