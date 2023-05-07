const Sequelize = require('sequelize')
const { Model, DataTypes } = Sequelize

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
    const {Category, ProductPhoto, ProductValue, ProductPrice, ProductItem, ValuesSelectVariant, CategoryAttribute, ValueType} = sequelize.models

    Product.getWithAllData = async function ({where}) {
      return await Product.findOne({
        where,
        include: [{
          model: ProductValue,
          include: [{
            model: CategoryAttribute,
            include: [{ model: ValueType }]
          },
          {
            model: ValuesSelectVariant
          }
        ]},
        {
          model: ProductPhoto
        },
        {
          model: ProductPrice,
          attributes: []
        }
        ],
        attributes: {
          include: [
            [Sequelize.literal(`(
              SELECT value
              FROM product_price
              WHERE product_price.ProductId = Product.id
              AND product_price.createdAt = (
                SELECT MAX(product_price.createdAt) 
                FROM product_price
                WHERE product_price.ProductId = Product.id
              )
            )`), 'price']
          ]
        }
      })
    }

    Product.belongsTo(Category)
    Product.hasMany(ProductPhoto)
    Product.hasMany(ProductValue)
    Product.hasMany(ProductPrice)
    Product.hasMany(ProductItem)
  
    return Product  
  }  
}  