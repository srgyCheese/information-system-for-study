const errorHanderMiddleware = async (err, req, res, next) => {
  console.log(err)

  res.status(500).json({ message: 'Что-то пошло не так' })
}

module.exports = errorHanderMiddleware