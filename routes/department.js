'use strict'

const express = require('express')
const router = express.Router()
const DepartmentController = require('../controllers/department.controller')
const DepartmentManagerController = require('../controllers/departmentManager.controller')
const auth = require('../middlewares/auth')
const validator = require('../middlewares/validator')

// router.use(auth)ตรวจสอบว่ามีการล็อคอินหรือยัง
router.get('/', DepartmentController.findAll);//เส้นทางแสดงข้อมูลแผนกทั้งหมดในฐานข้อมูล
router.get('/:id', DepartmentController.findOne);//เส้นทางแสดงข้อมูลแผนกเฉพาะที่กำหนด ตาม Department Id
router.post('/', validator.department, DepartmentController.create);//เส้นทางสำหรับการเพิ่มแผนก
router.put('/:id', validator.department, DepartmentController.update);//เส้นทางสำหรับการอัพเดทข้อมูลแผนก
router.delete('/:id', DepartmentController.delete);//เส้นทางสำหรับการลบแผนก

router.put('/manager/:id', DepartmentManagerController.update)//เส้นทางสำหรับการอัพเดทว่าจะให้ใครเป็น Manager ของแผนกไหน
module.exports = router