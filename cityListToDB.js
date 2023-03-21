require('dotenv').config()
const sequelize = require('./models/sequelize')
const cityList = require('./city-list.json').data

const start = async () => {
  try {
    await sequelize.authenticate()

    if (process.env.DB_DRIVER == 'MYSQL') {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    }

    const { City, Region, District } = sequelize.models

    await District.drop()
    await District.sync({forced: true})

    await Region.drop()
    await Region.sync({forced: true})

    await City.drop()
    await City.sync({forced: true})

    if (process.env.DB_DRIVER == 'MYSQL') {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    }

    await District.bulkCreate(cityList.districts.map(el => ({title: el.name})))

    await Region.bulkCreate(cityList.regions.map(el => ({title: el.name, DistrictId: el.districtId + 1})))

    await City.bulkCreate(cityList.bigCities.map(el => ({title: el.name, RegionId: el.regionId + 1})))
    await City.bulkCreate(cityList.cities.map(el => ({title: el.name, RegionId: el.regionId + 1})))
  } catch (e) {
    console.log('Ошибка : ', e)
  }

  process.exit()
}

start()