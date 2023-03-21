const { Model, DataTypes } = require('sequelize')

class Warehouse extends Model { }

module.exports = sequelize => {
  Warehouse.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'Warehouse',
    tableName: 'warehouse',
  })

  return () => {
    const {City} = sequelize.models
    
    Warehouse.belongsTo(City)
    
    return Warehouse
  }
}