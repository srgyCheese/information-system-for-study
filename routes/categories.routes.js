const {Router} = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const sequelize = require('../models/sequelize')
const router = Router()

const {Category, ValueType, CategoryAttribute, ValuesSelectVariant} = sequelize.models

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()

    return res.send({
      categories
    })
  } catch (e) {
    next(e)
  }
})

router.get('/value-types', async (req, res, next) => {
  try {
    const valueTypes = await ValueType.findAll()

    return res.send({
      valueTypes
    })
  } catch (e) {
    next(e)
  }
})

router.get('/attributes/:categoryId', async (req, res, next) => {
  try {
    const attributes = await CategoryAttribute.findAll({
      where: {
        CategoryId: req.params.categoryId
      },
      attributes: ['id', 'title', 'number_unit'],
      include: [
        {
          model: ValueType
        },
        {
          model: ValuesSelectVariant
        }
      ]
    })

    return res.send({
      attributes
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: {
        parent_category_id: req.params.categoryId
      }
    })

    const category = await Category.findOne({
      where: {
        id: req.params.categoryId
      }
    })

    return res.send({
      category,
      categories
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.categoryId
      }
    })

    await CategoryAttribute.destroy({
      where: {
        CategoryId: req.params.categoryId
      }
    })

    await category.destroy()

    return res.send({
      success: true
    })
  } catch (e) {
    next(e)
  }
})

router.post('/create', authMiddleware, async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        message: 'Не введено название'
      })
    }

    if (!req.body.photo) {
      return res.status(400).json({
        message: 'Не прикреплено фото'
      })
    }

    let parent_category_id = req?.body?.parent_category_id

    if (parent_category_id == undefined) {
      parent_category_id = null
    }

    const isAlreadyExist = await Category.findOne({
      where: {
        title: req.body.title,
        parent_category_id: parent_category_id
      }
    })

    if (isAlreadyExist) {
      return res.status(400).json({
        message: 'Категория с таким названием уже существует'
      })
    }

    if (req.body.parent_category_id) {
      const cat = await Category.findOne({
        where: {
          id: parent_category_id
        }
      })

      if (!cat) {
        return res.status(400).json({
          message: 'Родительской категории не существует'
        })
      }
    }

    const category = await Category.create({
      title: req.body.title,
      parent_category_id: parent_category_id,
      isProductCategory: !!req.body.values,
      photo: req.body.photo
    })

    if (req.body.values) {
      for (const el of req.body.values) {
        const valueType = await ValueType.findOne({
          where: {
            id: el.type
          }
        })

        let numberUnit = null

        if (valueType.name == 'number') {
          numberUnit = el.number_unit
        }

        const categoryAttribute = await CategoryAttribute.create({
          title: el.title,
          ValueTypeId: el.type,
          CategoryId: category.id,
          number_unit: numberUnit
        })

        if (valueType.name == 'select' && el.variants) {
          for (const selectVariant of el.variants) {
            await ValuesSelectVariant.create({
              title: selectVariant.value,
              CategoryAttributeId: categoryAttribute.id
            })
          }
        }
      }
    }
 
    res.send({
      data: category,
      message: 'Категория создана'
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router