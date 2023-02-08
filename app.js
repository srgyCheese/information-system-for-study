require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('./models/sequelize')
const path = require('path')
const authMiddleware = require('./middlewares/auth.middleware')

const app = express()

app.use(fileUpload())
app.use(express.json({ extended: true }))

app.use('/assets', express.static('assets'))
app.use('/storage', express.static('storage'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/products', require('./routes/products.routes'))

app.post('/api/upload', authMiddleware, function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: 'Не прикреплены файлы'
    })
  }

  const photo = req.files.photo

  const url = '/storage/' + photo.md5 + '.' + photo.name.split('.').pop()

  const uploadPath = __dirname + url
  
  photo.mv(uploadPath, err => {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }

    res.send({
      url
    })
  });
})

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