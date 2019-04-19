// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/userController')
// login
router.post('/login', controller.login)
// resgister
router.post('/register', controller.register)

router.put('/updatePassword/:id', controller.updatePassword)
router.put('/updateEmail/:id', controller.updateEmail)

module.exports = router
