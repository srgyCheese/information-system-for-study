const { Model, DataTypes } = require('sequelize')

class Category extends Model { }

module.exports = sequelize => {
  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // slug: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    photo: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
    },
    isProductCategory: {
      type: DataTypes.BOOLEAN
    }
  }, { sequelize, modelName: 'Category' })

  return () => {
    const {Product, CategoryAttribute} = sequelize.models

    Category.hasMany(Product)
    Category.hasMany(CategoryAttribute)

    return Category
  }
}