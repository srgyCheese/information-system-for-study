const { Router } = require('express')
const {check, validationResult} = require('express-validator')
const sequelize = require('../models/sequelize')

const { Product, ProductPhoto, ProductValue, CategoryAttribute, ValueType } = sequelize.models

const router = Router()

router.post('/create', [
  check('price').notEmpty(),
  check('title').notEmpty(),
  check('photos').notEmpty().isArray(),
  check('description').notEmpty(),
  check('attributesValues').notEmpty(),
  check('category_id').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные'
      })
    }

    const product = await Product.create({
      title: req.body.title,
      description: req.body.description,
      CategoryId: req.body.category_id
    })

    for (attrValueId of Object.keys(req.body.attributesValues)) {
      const categoryAttribute = await CategoryAttribute.findOne({
        where: {
          id: attrValueId
        },
        include: [
          { model: ValueType }
        ]
      })

      await categoryAttribute.createProductValue({
        ProductId: product.id,
        [categoryAttribute.ValueType.name]: req.body.attributesValues[attrValueId]
      })
    }

    return res.send({product})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { 
          model: ProductValue,
          include: [
            {
              model: CategoryAttribute,
              include: [{ model: ValueType }]
            }
          ] 
        }
      ]
    })

    return res.send({product})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll()

    return res.send({products})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router