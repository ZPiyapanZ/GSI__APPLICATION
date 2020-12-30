'use strict'

const express = require('express')
const router = express.Router()
const leaveController = require('../controllers/leave.controller')
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth')

router.use(auth)//ตรวจสอบว่ามีการล็อคอินมาแล้วหรือยัง
router.get('/', leaveController.findAll)//เส้นทางแสดงข้อมูลประเภทการลาและเวลาที่ลาได้ต่อปี ของบริษัท
router.post('/',validator.leave, leaveController.create)//เส้นทางเพิ่มข้อมูลประเภทการลาและเวลาที่ลาได้ต่อปี
router.put('/:id',validator.leave, leaveController.update)//เส้นแก้ไขข้อมูลประเภทการลาและเวลาที่ลาได้ต่อปี
router.delete('/:id', leaveController.delete)//เส้นทางสำหรับลบข้อมูลประเภทการลา


module.exports = router