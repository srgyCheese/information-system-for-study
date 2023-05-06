const {Router} = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const authMiddleware = require('../middlewares/auth.middleware')
const sequelize = require('../models/sequelize')
const Sequelize = require('sequelize')
const { getLowerRoles } = require('../helpers/lowerRoles')

const {
  User,
  Role
} = sequelize.models

const router = Router()

router.get('/current-user', authMiddleware(), async (req, res) => {
  try {
    return res.send({user: req.user.makeJSON()})
  } catch (e) {
    next(e)
  }
})

router.post('/create', 
  authMiddleware(['manager']),
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

      if (!getLowerRoles(req.user.Role.name).includes(req.body.role)) {
        return res.status(403).send({
          message: 'Недостаточно прав',
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

router.get('/', authMiddleware(), async (req, res, next) => {
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

router.get('/:userId', authMiddleware(), async (req, res, next) => {
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

router.put('/:userId', authMiddleware(['manager']), async (req, res, next) => {
  try {
    const editingUser = await User.findOne({
      where: {
        id: req.params.userId
      }, 
      include: [Role]
    })

    if (!getLowerRoles(req.user.Role.name).includes(editingUser.Role.name)) {
      return res.status(403).send({
        message: 'Недостаточно прав',
      })
    }

    const newUserParams = {}

    if (req.body.photo) {
      newUserParams.photo = req.body.photo
    }

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

    if (newUserParams.password && newUserParams.password?.length < 6) {
      return res.status(403).send({
        message: 'Длина пароля должна быть не менее 6 символов'
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

router.delete('/:userId', authMiddleware(['manager']), async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      return res.status(403).send({
        message: 'Нельзя удалить себя',
      })
    }

    const deletingUser = await User.findOne({
      where: {
        id: req.params.userId
      }, 
      include: [Role]
    })

    if (!getLowerRoles(req.user.Role.name).includes(deletingUser.Role.name)) {
      return res.status(403).send({
        message: 'Недостаточно прав',
      })
    }

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