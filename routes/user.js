const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const validator = require('../middlewares/validator')

router.post('/login', UserController.login)//เส้นทางสำหรับการตรวจสอบการ Login
router.post('/register', validator.user, UserController.create)//เส้นทางสำหรับการเพิ่ม User เพื่อเข้าใช้งานระบบ

module.exports = router