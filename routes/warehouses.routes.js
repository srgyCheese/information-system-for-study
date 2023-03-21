const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()
const sequelize = require('../models/sequelize')
const { check, validationResult } = require('express-validator')

const {
  City,
  Warehouse
} = sequelize.models

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    return res.send({
      warehouses: await Warehouse.findAll()
    })
  } catch (e) {
    next(e)
  }
})

router.post('/create', authMiddleware, 
  [
    check('title').notEmpty(),
    check('address').notEmpty(),
    check('cityId').notEmpty(),
  ],
async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные'
      })
    }

    const warehouse = await Warehouse.create({
      title: req.body.title,
      address: req.body.address,
      CityId: req.body.cityId
    })

    return res.send({
      warehouse
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router