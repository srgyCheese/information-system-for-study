const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const sequelize = require('../models/sequelize')
const Sequelize = require('sequelize')
const authMiddleware = require('../middlewares/auth.middleware')
const { getAttributesValues } = require('../helpers/getAttributesValues')

const {
  Product,
  ProductPhoto,
  ProductValue,
  CategoryAttribute,
  ValueType,
  ProductPrice,
  Category,
  ValuesSelectVariant
} = sequelize.models

const router = Router()

router.post('/create', authMiddleware(['manager']), [
  check('price').notEmpty(),
  check('title').notEmpty(),
  check('photos').notEmpty().isArray(),
  check('description').notEmpty(),
  check('attributesValues').notEmpty(),
  check('category_id').notEmpty(),
], async (req, res, next) => {
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

    await product.createProductPrice({
      value: req.body.price
    })

    for (let attrValueId of Object.keys(req.body.attributesValues)) {
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

    await ProductPhoto.bulkCreate(req.body.photos.map(photo => ({
      url: photo,
      ProductId: product.id
    })))

    return res.send({ product })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.getWithAllData({where: {id: req.params.id}})

    return res.send({ product })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', authMiddleware(['manager']), async (req, res, next) => {
  try {
    await ProductValue.destroy({
      where: {
        ProductId: req.params.id
      }
    })

    await ProductPhoto.destroy({
      where: {
        ProductId: req.params.id
      }
    })

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    })

    return res.send({
      message: 'Товар удален'
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:productId', authMiddleware(['manager']), async (req, res, next) => {
  try {
    const {productId} = req.params

    const newProductParams = {
      ...(req.body.title && {title: req.body.title}),
      ...(req.body.description && {description: req.body.description}),
    }

    if (req.body.price) {
      await ProductPrice.create({
        value: req.body.price,
        ProductId: productId
      })
    }

    if (req.body.photos?.length) {
      await ProductPhoto.destroy({
        where: {
          ProductId: productId
        }
      })

      await ProductPhoto.bulkCreate(req.body.photos.map(el => ({
        url: el,
        ProductId: productId
      })))
    }

    if (!Object.keys(newProductParams).length && !req.body.price && !req.body.photos) {
      return res.status(403).send({
        message: 'Не введены поля'
      })
    }

    await Product.update(newProductParams, {
      where: {
        id: productId
      },
    })

    const product = await Product.getWithAllData({where: {id: productId}})

    return res.send({product})
  } catch (e) {
    next(e)
  }
})

router.put('/:productId/attributes', authMiddleware(['manager']), async (req, res, next) => {
  try {
    const {productId} = req.params

    const product = await Product.findOne({
      where: {
        id: productId
      },
      include: [{
        model: ProductValue,
        include: [{
          model: CategoryAttribute,
          include: [{ model: ValueType }]
        },
        {
          model: ValuesSelectVariant
        }
      ]}]
    })

    const attributesValues = getAttributesValues(product.ProductValues)

    for (let key of Object.keys(attributesValues)) {
      if (typeof req.body?.attributesValues?.[key] !== 'boolean' && !req.body?.attributesValues?.[key]) {
        return res.status(403).send({
          message: 'Не все поля введены'
        })
      }
    }

    for (let productValue of product.ProductValues) {
      const newValue = req.body.attributesValues[productValue.CategoryAttribute.id]
      const valueTypeName = productValue.CategoryAttribute.ValueType.name

      if (newValue != productValue[valueTypeName]) {
        await ProductValue.update({
          [valueTypeName]: newValue
        }, {
          where: {
            id: productValue.id
          }
        })
      } 
    }

    const updatedProduct = await Product.getWithAllData({
      where: {
        id: productId
      }
    })

    return res.send({
      product: updatedProduct
    })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const searchOptions = {}

    if (req.query.category) {
      searchOptions.CategoryId = req.query.category
    }

    if (req.query.title) {
      searchOptions.title = {
        [Sequelize.Op.like]: '%' + req.query.title + '%'
      }
    }

    const products = await Product.findAll({
      where: searchOptions,
      include: [{
        model: ProductPhoto
      },
      {
        model: ProductPrice,
        attributes: []
      },
      ],
      attributes: {
        include: [
          [Sequelize.literal(`(
            SELECT value
            FROM product_price
            WHERE product_price.ProductId = Product.id
            AND product_price.createdAt = (
              SELECT MAX(product_price.createdAt) 
              FROM product_price
              WHERE product_price.ProductId = Product.id
            )
          )`), 'price']
        ]
      }
    })

    return res.send({ products })
  } catch (e) {
    next(e)
  }
})

module.exports = router