const { Model, DataTypes } = require('sequelize')

class ValuesSelectVariant extends Model { }

module.exports = sequelize => {
  ValuesSelectVariant.init({
    title: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ValuesSelectVariant',
    tableName: 'values_select_variant'
  })

  return () => {
    const { ProductValue, CategoryAttribute } = sequelize.models

    ValuesSelectVariant.belongsTo(ProductValue)
    ValuesSelectVariant.belongsTo(CategoryAttribute)

    return ValuesSelectVariant
  }
}