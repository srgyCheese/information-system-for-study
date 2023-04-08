const jwt = require('jsonwebtoken')
const sequelize = require('../models/sequelize')

const { User, Role } = sequelize.models

const authMiddleware = (allowedRoles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findOne({
      where: {
        id: decodedData.id,
      },
      include: [
        { model: Role }
      ]
    })

    if (!next) {
      return
    }

    if (allowedRoles && !['admin', ...allowedRoles].includes(req.body.user.Role.name)) {
      return res.status(403).send({
        message: 'Недостаточно прав'
      })
    }

    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: "Пользователь не авторизован" })
  }
}

module.exports = authMiddleware