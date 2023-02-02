const jwt = require('jsonwebtoken')
const sequelize = require('../models/sequelize')

const { User, Role } = sequelize.models

const authMiddleware = async (req, res, next) => {
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

    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: "Пользователь не авторизован" })
  }
}

module.exports = authMiddleware