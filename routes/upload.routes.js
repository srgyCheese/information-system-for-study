const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.post('/', authMiddleware, (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            message: 'Не прикреплены файлы'
        })
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(req.files.photo.mimetype)) {
        return res.status(400).send({
            message: 'Не тот тип файла'
        })
    }

    if (req.files.photo.size > 10 * 1024 * 1024) {
        return res.status(400).send({
            message: 'Слишком большой размер файла'
        })
    }

    const photo = req.files.photo

    const url = '/../storage/' + photo.md5 + '.' + photo.name.split('.').pop()

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

module.exports = router