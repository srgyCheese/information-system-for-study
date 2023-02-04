const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const sequelize = require('../models/sequelize')
const router = Router()

const {Category, ValueType, CategoryAttribute} = sequelize.models

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll()

    return res.send({
      categories
    })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/value-types', async (req, res) => {
  try {
    const valueTypes = await ValueType.findAll()

    return res.send({
      valueTypes
    })
  } catch (e) {
    console.log({e});
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/:categoryId', async (req, res) => {
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
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.delete('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.categoryId
      }
    })

    await category.destroy()

    return res.send({
      success: true
    })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        message: 'Не введено название'
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
      isProductCategory: !!req.body.values
    })

    if (req.body.values) {
      for (const el of req.body.values) {
        await CategoryAttribute.create({
          title: el.title,
          ValueTypeId: el.type,
          CategoryId: category.id
        })
      }
    }

    return res.send({
      data: category,
      message: 'Категория создана'
    })
  } catch (e) {
    console.log({e});
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router