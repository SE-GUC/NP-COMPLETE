// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/userController')
// login
router.post('/login', controller.login)
// resgister
router.post('/register', controller.register)
module.exports = router
