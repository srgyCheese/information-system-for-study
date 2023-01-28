require('dotenv').config()
const bcrypt = require('bcryptjs')
const sequelize = require('./models/sequelize')

const start = async () => {
  try {
    await sequelize.authenticate()

    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')

    await sequelize.sync({ force: true })

    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    const { User, Role } = sequelize.models

    const adminRole = await Role.create({ name: 'admin' })
    await Role.create({ name: 'user' })

    await User.create({
      login: 'admin',
      password: bcrypt.hashSync('password', 8),
      fio: 'Admin',
      RoleId: adminRole.id
    })
  } catch (e) {
    console.log('Ошибка : ', e)
  }

  process.exit()
}

start()