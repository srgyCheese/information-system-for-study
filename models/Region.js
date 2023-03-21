const { Model, DataTypes } = require('sequelize')

class Region extends Model { }

module.exports = sequelize => {
  Region.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'Region',
    tableName: 'region',
  })

  return () => {
    const {City, District} = sequelize.models
    
    Region.hasMany(City)
    Region.belongsTo(District)
    
    return Region
  }
}