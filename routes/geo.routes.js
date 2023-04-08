const { Router } = require('express')
const router = Router()
const sequelize = require('../models/sequelize')

const {
  City,
  Region,
  District
} = sequelize.models

router.get('/all', async (req, res, next) => {
  try {
    return res.send({
      districts: await District.findAll(),
      regions: await Region.findAll(),
      cities: await City.findAll(),
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router