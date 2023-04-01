const {Router} = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const authMiddleware = require('../middlewares/auth.middleware')
const sequelize = require('../models/sequelize')
const Sequelize = require('sequelize')

const {
  User,
  Role
} = sequelize.models

const router = Router()

router.get('/current-user', authMiddleware, async (req, res) => {
  try {
    return res.send({user: req.user.makeJSON()})
  } catch (e) {
    next(e)
  }
})

router.post('/create', 
  authMiddleware,
  [
    check('email').notEmpty().isEmail(),
    check('photo').notEmpty(),
    check('role').notEmpty(),
    check('name').notEmpty(),
    check('phone').notEmpty(),
    check('password').isLength({ min: 6 }),
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

      const role = await Role.findOne({
        where: {
          name: req.body.role
        }
      })

      if (!role) {
        throw new Error()
      }

      const thisEmailUser = await User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (thisEmailUser) {
        return res.status(400).send({
          message: 'Пользователь с таким e-mail уже существует'
        })
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 8)

      await User.create({
        RoleId: role.id,
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        phone: req.body.phone,
        password: hashedPassword
      })

      return res.send({message: 'Пользователь создан'})
    } catch (e) {
      next(e)
    }
  }
)

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        Role
      ]
    })

    return res.send({users})
  } catch (e) {
    next(e)
  }
})

router.get('/:userId', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        Role
      ]
    })

    if (!user) {
      return res.send({user: null})
    }

    return res.send({user: user.makeJSON()})
  } catch (e) {
    next(e)
  }
})

router.put('/:userId', authMiddleware, async (req, res, next) => {
  try {
    const newUserParams = {}

    if (req.body.name) {
      newUserParams.name = req.body.name
    }

    if (req.body.phone) {
      newUserParams.phone = req.body.phone
    }

    if (req.body.email) {
      newUserParams.email = req.body.email
    }

    if (req.body.password) {
      newUserParams.password = await bcrypt.hash(req.body.password, 8)
    }

    if (!Object.keys(newUserParams).length) {
      return res.status(403).send({
        message: 'Не введены поля'
      })
    }

    await User.update(newUserParams, {
      where: {
        id: req.params.userId
      },
    })

    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        Role
      ],
    })

    return res.send({user: user.makeJSON()})
  } catch (e) {
    next(e)
  }
})

router.delete('/:userId', authMiddleware, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      },
    })

    return res.send({message: 'Пользователь удалён'})
  } catch (e) {
    next(e)
  }
})

module.exports = router