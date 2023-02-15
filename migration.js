require('dotenv').config()
const bcrypt = require('bcryptjs')
const sequelize = require('./models/sequelize')

const start = async () => {
  try {
    await sequelize.authenticate()

    if (process.env.DB_DRIVER == 'MYSQL') {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    }

    await sequelize.sync({ force: true })

    if (process.env.DB_DRIVER == 'MYSQL') {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    }

    const { User, Role, ValueType } = sequelize.models

    const adminRole = await Role.create({ name: 'admin' })
    await Role.create({ name: 'user' })

    await User.create({
      login: 'admin',
      name: 'Админ Админовый Админович',
      phone: '+7 (999) 333 00 44',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('password', 8),
      fio: 'Admin',
      RoleId: adminRole.id
    })

    await ValueType.bulkCreate([
      { title: 'Число', name: 'number' },
      { title: 'Есть/нет', name: 'bool' },
      { title: 'Строка', name: 'string' },
      { title: 'Выбор', name: 'select' },
    ])
  } catch (e) {
    console.log('Ошибка : ', e)
  }

  process.exit()
}

start()