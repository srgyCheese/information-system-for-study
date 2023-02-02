const {Router} = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/current-user', authMiddleware, async (req, res) => {
  try {
    return res.send({user: req.user.makeJSON()})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router