require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('./models/sequelize')
const path = require('path')
const errorHanderMiddleware = require('./middlewares/errorHander.middleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(fileUpload())
app.use(express.json({ extended: true }))

app.use('/assets', express.static('assets'))
app.use('/storage', express.static('storage'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/geo', require('./routes/geo.routes'))
app.use('/api/warehouses', require('./routes/warehouses.routes'))
app.use('/api/product-items', require('./routes/productItems.routes'))

app.use('/api/upload', require('./routes/upload.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(errorHanderMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
  } catch (e) {
    console.log('Ошибка подключения к БД: ', e)
  }

  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
}

start()