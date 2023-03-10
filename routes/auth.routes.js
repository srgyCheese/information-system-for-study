const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const sequelize = require('../models/sequelize')
const router = Router()

const {User} = sequelize.models

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Добавьте email').notEmpty(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ where: {email} })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.getRole().name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({ token })
  } catch (e) {
    next(e)
  }
})

module.exports = router