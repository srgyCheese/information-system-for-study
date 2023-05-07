const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const sequelize = require('../models/sequelize')
const Sequelize = require('sequelize')
const authMiddleware = require('../middlewares/auth.middleware')

const {
  Product,
  ProductItem,
  Warehouse,
  ProductPhoto
} = sequelize.models

const router = Router()

router.post('/create', authMiddleware(['manager']), [
  check('productId').notEmpty(),
  check('quantity').notEmpty(),
  check('warehouseId').notEmpty(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные'
      })
    }

    const product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })

    if (!product) {
      return res.status(400).send({
        message: 'Такого товара не существует'
      })
    }

    for (let i = 0; i < +req.body.quantity; i++) {
      await ProductItem.create({
        ProductId: req.body.productId,
        WarehouseId: req.body.warehouseId,
      })
    }

    return res.send({ message: 'Продукты добавлены на склад' })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const searchOptions = {}

    if (req.query.warehouse_id) {
      searchOptions.WarehouseId = req.query.warehouse_id
    }

    const productItems = await ProductItem.findAll({
      where: searchOptions,
      include: [
        {
          model: Product,
          include: [ProductPhoto]
        },
        {
          model: Warehouse,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.literal(`(
            SELECT COUNT(product_item.ProductId)
            FROM product_item
            WHERE product_item.WarehouseId = Warehouse.id AND product_item.ProductId = Product.id
          )`), 'count']
        ]
      },
      group: ['ProductItem.ProductId']
    })

    return res.send({ productItems })
  } catch (e) {
    next(e)
  }
})

module.exports = router