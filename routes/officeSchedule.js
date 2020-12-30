'use strict'

const express = require('express')
const router = express.Router()
const OfficeSchedule = require('../controllers/officeSchedule.controller')
const validator = require('../middlewares/validator')
const auth = require('../middlewares/auth')

// router.use(auth) มีไว้เพื่อ ตรวจสอบก่อนว่า ผู้ใช้ Login แล้วหรือยัง
router.get('/officeHours', OfficeSchedule.getOfficeHour)//เส้นทางสำหรับการดูข้อมูลเวลาเข้า-ออกงานของบริษัท
router.put('/officeHours', OfficeSchedule.updateOfficeHour)//เส้นทางสำหรับการอัพเดทข้อมูลเวลาเข้า - ออกงาน

router.get('/holiday/:year', OfficeSchedule.getHoliday)//เส้นทางสำหรับการดูข้อมูลวันหยุดของบริษัทตามปีที่กำหนด
router.post('/holiday', validator.holiday, OfficeSchedule.createHoliday)//เส้นทางสำหรับการเพิ่มวันหยุดของบริษัท 
router.put('/holiday/:id', validator.holiday, OfficeSchedule.updateHoliday)//เส้นทางสำหรับการอัพเดทวันหยุดของบริษัท
router.delete('/holiday/:id', OfficeSchedule.deleteHoliday)//เส้นทางสำหรับการลบวันหยุดของบริษัท

router.get('/satWorkingDay/:year', OfficeSchedule.getSatWorkingDay)//เส้นทางสำหรับแสดงข้อมูลวันเสาร์ที่ต้องมาทำงาน ตามปีที่เลือก
router.post('/satWorkingDay', OfficeSchedule.createSatWorkingDay)//เส้นทางสำหรับการเพิ่มข้อมูลวันเสาร์ที่ต้องมาทำงาน
router.put('/satWorkingDay/:id', OfficeSchedule.updateSatWorkingDay)//เส้นทางสำหรับการอัพเดทข้อมูลวันเสาร์ที่ต้องมาทำงาน
router.delete('/satWorkingDay/:id', OfficeSchedule.deleteSatWorkingDay)//เส้นทางสำหรับการลบข้อมูลวันเสาร์ที่ต้องมาทำงาน
module.exports = router