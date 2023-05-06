const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()
const sequelize = require('../models/sequelize')
const { check, validationResult } = require('express-validator')

const {
  City,
  Warehouse,
  ProductItem
} = sequelize.models

router.get('/', async (req, res, next) => {
  try {
    return res.send({
      warehouses: await Warehouse.findAll({
        include: [City]
      })
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:warehouseId', async (req, res, next) => {
  try {
    return res.send({
      warehouse: await Warehouse.findOne({
        where: {
          id: req.params.warehouseId
        },
        include: [City]
      })
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:warehouseId', async (req, res, next) => {
  try {
    const newWarehouseParams = {}

    if (req.body.title) {
      newWarehouseParams.title = req.body.title
    }

    if (req.body.address) {
      newWarehouseParams.address = req.body.address
    }

    if (!Object.keys(newWarehouseParams).length) {
      return res.status(403).send({
        message: 'Не введены поля'
      })
    }

    await Warehouse.update(newWarehouseParams, {
      where: {
        id: req.params.warehouseId
      }
    })

    const warehouse = await Warehouse.findOne({
      where: {
        id: req.params.warehouseId
      }
    })

    return res.send({warehouse})
  } catch (e) {
    next(e)
  }
})

router.delete('/:warehouseId', async (req, res, next) => {
  try {
    const productItems = await ProductItem.findAll({
      where: {
        WarehouseId: req.params.warehouseId
      }
    })

    if (productItems?.length) {
      return res.status(403).send({message: 'Нельзя удалить склад с товарами'})
    }

    await Warehouse.destroy({
      where: {
        id: req.params.warehouseId
      }
    })

    return res.send({message: 'Склад удален'})
  } catch (e) {
    next(e)
  }
})

router.post('/create', authMiddleware(['manager']), 
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