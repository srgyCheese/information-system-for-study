const { Model, DataTypes } = require('sequelize')

class District extends Model { }

module.exports = sequelize => {
  District.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    sequelize, 
    modelName: 'District',
    tableName: 'district',
  })

  return () => {
    const {Region} = sequelize.models
    
    District.hasMany(Region)
    
    return District
  }
}