const { Model, DataTypes } = require('sequelize')

class City extends Model { }

module.exports = sequelize => {
  City.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'City',
    tableName: 'city',
  })

  return () => {
    const {Region} = sequelize.models
    
    City.belongsTo(Region)
    
    return City
  }
}