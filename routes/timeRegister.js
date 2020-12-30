'use strict'

const express = require('express')
const router = express.Router()
const timeRegisterController = require('../controllers/timeRegister.controller')
const auth = require('../middlewares/auth')
router.use(auth)
router.get('/', timeRegisterController.getAllTimeRegister);//เส้นทางสำหรับการแสดงข้อมูลการบันทึกเข้า-ออกงานทั้งหมด
router.delete('/:id', timeRegisterController.deleteTimeRegister);//เส้นทางสำหรับการลบข้อมูลการบันทึกเข้า-ออกงานตาม Id ที่เลือก

module.exports = router