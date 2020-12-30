'use strict'

const express = require('express')
const EmployeeController = require('../controllers/employee.controller');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth')
const router = express.Router()
// router.use(auth)ตรวจสอบว่ามีการล็อคอินหรือยัง
router.get('/', EmployeeController.findAll)//เส้นทางสำหรับแสดงข้อมูลพนักงานทั้งหมด
router.get('/:id', EmployeeController.findOne)//เส้นทางสำหรับแสดงข้อมูลพนักงานเฉพาะที่เลือก ตาม EmployeeId
router.get('/remainingLeave/:id', EmployeeController.getRemainingLeave)//เส้นทางสำหรับแสดงข้อมูลการลาคงเหลือ
router.post('/',validator.employee, EmployeeController.create)// เส้นทางสำหรับการเพิ่มข้อมูลพนักงาน
router.put('/:id', validator.employee, EmployeeController.update)//เส้นทางสำหรับการอัพเดทข้อมูลพนักงาน
router.delete('/:id', EmployeeController.delete)//เส้นทางสำหรับการลบข้อมูลพนักงาน


module.exports = router
