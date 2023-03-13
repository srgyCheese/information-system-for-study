const { Model, DataTypes } = require('sequelize')

class Warehouse extends Model { }

module.exports = sequelize => {
  Warehouse.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    x: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    y: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { 
    sequelize, 
    modelName: 'Warehouse',
    tableName: 'warehouse',
  })

  return () => {

    
    return Warehouse
  }
}