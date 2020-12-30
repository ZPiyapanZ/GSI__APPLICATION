'use strict'

const express = require('express')
const router = express.Router()
const checkInOutController = require('../controllers/checkInOut.controller')
const timeRegister = require('../controllers/timeRegister.controller')
const auth = require('../middlewares/auth')


router.use(auth)//ตรวจสอบว่ามีการล็อคอินเข้าสู่ระบบแล้วหรือยัง
router.post('/', checkInOutController.checkInOut, timeRegister.addTimeRegister)//เส้นทางไปยังการลงชื่อเข้า-ออกงาน

module.exports = router