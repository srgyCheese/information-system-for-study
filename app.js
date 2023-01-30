require('dotenv').config()
const express = require('express')
const sequelize = require('./models/sequelize')
const path = require('path')

const app = express()

app.use(express.json({ extended: true }))

app.use('/assets', express.static('assets'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await sequelize.authenticate()
  } catch (e) {
    console.log('Ошибка подключения к БД: ', e)
  }

  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
}

start()