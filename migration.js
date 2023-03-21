require('dotenv').config()
const bcrypt = require('bcryptjs')
const sequelize = require('./models/sequelize')
// const cityList = require('./city-list.json').data

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

    const adminRole = await Role.create({ 
      name: 'admin',
      title: 'Администратор'
    })
    await Role.create({ 
      name: 'counsel',
      title: 'Продавец-консультант'
    })
    await Role.create({ 
      name: 'manager',
      title: 'Менеджер'
    })

    await User.create({
      name: 'Админ Админовый Админович',
      phone: '+7 (999) 333 00 44',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('password', 8),
      RoleId: adminRole.id
    })

    await ValueType.bulkCreate([
      { title: 'Число', name: 'number' },
      { title: 'Есть/нет', name: 'bool' },
      { title: 'Строка', name: 'string' },
      { title: 'Выбор', name: 'select' },
    ])

    // const { City, Region, District } = sequelize.models

    // await District.bulkCreate(cityList.districts)

  } catch (e) {
    console.log('Ошибка : ', e)
  }

  process.exit()
}

start()