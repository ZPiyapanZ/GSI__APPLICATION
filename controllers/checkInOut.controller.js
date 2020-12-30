'use strict'

const CheckInOut = require('../models/checkInOut')
const OfficeHour = require('../models/officeHour')
const { Op } = require('sequelize')
const methods = {
    async checkInOut(req, res, next){
        try {
            const NOW = new Date()
            const officeHour =  await OfficeHour.findByPk(1)
            let hours = NOW.getHours();
            let minutes = NOW.getMinutes();
            req.body.currentTime = NOW
            const data = await CheckInOut.findOne({
                where:{
                  [Op.and]:[{
                    employeeId:req.body.employeeId,
                    checkOutTime:null
                  }]
                }
            })
            if(!data){//ตรวจสอบถ้าผู้ใช้ทำการCheck Out แล้ว
                if(req.body.isCheckIn === 'false') return next(Error('CHECK_OUT_ERROR'))
                let hourCheckIn = parseInt(officeHour['dataValues']['checkIn'])//ชั่วโมงของการเข้าทำงาน
                let minuteCheckIn = parseInt(officeHour['dataValues']['checkIn'].split('.')[1])//นาทีของการเข้าทำงาน
                let lateTime = 0
                if(hours > hourCheckIn){//นำเวลาที่เช็คอิน - กับเวลาที่เข้าทำงาน ในกรณีที่เวลาเช็คอินเข้าทำงาน > เวลาเข้าทำงาน
                    lateTime = ((hours-hourCheckIn)*60)+minutes-minuteCheckIn//นับเวลาที่เข้าสายเป็นนาที
                }
                else if(hours === hourCheckIn && minutes > minuteCheckIn){//ในกรณีที่ชั่วโมงเข้าทำงานตรงแต่สายเป็นนาที
                    lateTime = minutes - minuteCheckIn//นับเวลที่เข้าทำงานสายเป็นนาที
                }
                const checkInData = {
                    employeeId:req.body.employeeId,
                    checkInTime: req.body.currentTime,
                    lateTime:lateTime,
                    earlyTime:0
                };
                await CheckInOut.create(checkInData)//เพิ่มข้อมูลCheckInOut ลงฐานข้อมูล
            }

            if(req.body.isCheckIn === 'false'){//กรณีที่การ Check In เป็น false = คือการ Check Out
                let hourCheckOut = parseInt(officeHour['dataValues']['checkOut'])//ชั่วโมงการเลิกงาน
                let minuteCheckOut = parseInt(officeHour['dataValues']['checkOut'].split('.')[1])//นาทีการเลิกงาน
                let earlyTime = 0
                if(hours < hourCheckOut){//กรณีที่เลิกงานก่อนเวลา
                  earlyTime = ((hourCheckOut+(minuteCheckOut/60))-hours)*60-minutes//นับเวลาที่เลิกงานก่อนเวลาเป็นนาที
                }
                else if(hours === hourCheckOut && minutes < minuteCheckOut){//กรณีที่เลิกงานก่อนเวลา
                  earlyTime = minuteCheckOut - minutes//นับเวลาที่เลิกงานก่อนเวลาเป็นนาที
                }
                await CheckInOut.update({checkOutTime:req.body.currentTime, earlyTime:earlyTime}, {//อัพเดทข้อมูลเวลาเข้าออกงาน
                    where:{
                        [Op.and]:[{
                            employeeId:req.body.employeeId,
                            checkOutTime:null
                        }]
                    }
                })
            }
            next()
        } catch (e) {
            next(e)
        }
    },
}

module.exports = {...methods}