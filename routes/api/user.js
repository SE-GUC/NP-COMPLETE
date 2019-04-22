// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/userController')
// login
router.post('/login', controller.login)
// resgister
router.post('/register', controller.register)
// confirmation email
router.get('/confirmation/:token', controller.confirmation)
// sending a confiramtion mail
router.post('/forgetPassword', controller.forgetPassword)

router.post('/resetPassword/:token', controller.resetPassword)
module.exports = router
