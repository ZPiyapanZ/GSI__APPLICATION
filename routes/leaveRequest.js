'use strict'

const express = require('express')
const router = express.Router()
const validator = require('../middlewares/validator');
const leaveRequestController = require('../controllers/leaveRequest.controller')
const auth = require('../middlewares/auth')

router.use(auth)//ตรวจสอบว่ามีการล็อคอินแล้วหรือยัง
router.get('/', leaveRequestController.findAll)//เส้นทางแสดงข้อมูลการขอนุมัติลาทั้งหมด
router.get('/:id', leaveRequestController.findOne)//เส้นทางแสดงข้อมูลการขออนุมัติลา ตาม Id
router.get('/employee/:id', leaveRequestController.findByEmployee)//เส้นทางแสดงข้อมูลการขออนุมัติลา เฉพาะพนักงานที่เลือก
router.post('/', validator.leaveRequest, leaveRequestController.request)//เส้นทางการส่งข้อมูลการขออนุมัติลา
router.delete('/:id', leaveRequestController.cancelLeaveRequest)//เส้นทางการลบข้อมูลการขออนุมัติลา
router.put('/:id',  leaveRequestController.requestApproved)//เส้นทางการอนุมัติการลา


module.exports = router