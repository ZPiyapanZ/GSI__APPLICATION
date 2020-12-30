'use strict'

const express = require('express')
const employee = require('./employee')
const department = require('./department')
const checkInOut = require('./checkInOut')
const officeSchedule = require('./officeSchedule')
const timeRegister = require('./timeRegister')
const user = require('./user')
const leave = require('./leave')
const leaveRequest = require('./leaveRequest')
// const meetingRoomReservation = require('./meetingRoomReservation')
const router = express.Router()

router.use('/employee', employee)//เส้นทางที่จัดการข้อมูลเกี่ยวกับพนักงาน
router.use('/department', department)//เส้นทางที่จัดการข้อมูลเกี่ยวกับแผนก
router.use('/checkInOut', checkInOut)//เส้นทางที่จัดการเกี่ยวกับการ Check In - Out
router.use('/officeSchedule', officeSchedule)//เส้นทางที่จัดการเกี่ยวกับระเบียบกำหนดการบริษัท
router.use('/timeRegister', timeRegister)//เส้นทางที่จัดการเกี่ยวกับการบันทึกเข้าออกงาน
router.use('/leaveRequest', leaveRequest)//เส้นทางที่จัดการเกี่ยวกับระบบการขออนุมัติลา
router.use('/leave', leave)//เส้นทางที่จัดการข้อมูลเกี่ยวกับประเภทและเวลาในการลาต่อปี
router.use('/user', user)//เส้นทางที่ใช้จัดการผู้เข้าใช้งาน App
// router.use('/meetingRoomReservation', meetingRoomReservation)// เส้นทางที่ใช้ในการจองห้องประชุม
module.exports = router
