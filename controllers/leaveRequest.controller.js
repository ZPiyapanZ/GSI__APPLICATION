'use strict'

const Leave = require('../models/leave')
const Employee = require('../models/employee')
const Notification = require('../models/notification')
const RemainingLeave = require('../models/remainingLeave')
const DepartmentManager = require('../models/departmentManager')
const LeaveRequest = require('../models/leaveRequest')
const OfficeHour = require('../models/officeHour')
const { Op } = require("sequelize");
const methods = {
    async findAll(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลการขออนุมัติลาทั้งหมด
        try {
            const data = await LeaveRequest.findAll()
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    async findOne(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลการขออนุมัติลาตาม Id
        try {
            const data = await LeaveRequest.findByPk(req.params.id)
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    async findByEmployee(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลการขออนุมัติลาเฉพาะพนักงาน ตาม Employee Id
        try {
            const data = await LeaveRequest.findAll({where:{employeeId:req.params.id}})
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    async request(req, res, next){// ฟังก์ชั่นสำหรับการขออนุมัติลา
        try {
            const leaveIdCheck = await Leave.findByPk(req.body.leaveId)
            if(!leaveIdCheck) return next(Error('NOT_FOUND'))
            //-------------------------------------คำนวนเวลา ที่ใช้ลา------------------------------------------------------
            const officeHour = await OfficeHour.findByPk(1) // เวลา Check In - Out
            const workingHours = officeHour.checkOut - officeHour.checkIn //ชั่วโมงในการทำงานนับจากเวลาCheck In  - Out
            const minutesCheckOut = parseInt(officeHour.checkOut.split('.')[1])+(parseInt(officeHour.checkOut.split('.')[0])*60)//แปลงชั่วโมงการทำงานเป็นนาที
            const minutesCheckIn = parseInt(officeHour.checkIn.split('.')[1])+(parseInt(officeHour.checkIn.split('.')[0])*60)//แปลงชั่วโมงการทำงานเป็นนาที
            let totalMinutes;
            const LeaveDetail = {
                startTime:new Date(req.body.startTime),
                endTime:new Date(req.body.endTime)
            }
            if(LeaveDetail.startTime.toISOString().slice(0,10) !== LeaveDetail.endTime.toISOString().slice(0,10)){//เช็คว่าวันเวลาที่ลาเป็นการลาข้ามวันหรือไม่
                let minutesStartTime = LeaveDetail.startTime.getMinutes()+(LeaveDetail.startTime.getHours()*60)//แปลงวันเวลาที่เริ่มลาเป็นนาที
                let minutesEndTime = LeaveDetail.endTime.getMinutes()+(LeaveDetail.endTime.getHours()*60)//แปลงลาถึงวันที่เป็นนาที
                totalMinutes = (minutesCheckOut-minutesStartTime)+(minutesEndTime-minutesCheckIn)//รวมวันที่เริ่มลากับถึงวันที่ต้องการลา***เผื่อในกรณีที่ลาไม่เต็มวัน***
                let totalDay = (new Date(LeaveDetail.endTime.toISOString().slice(0,10)) - new Date(LeaveDetail.startTime.toISOString().slice(0,10)))/(1000*3600*24)//หาจำนวนวันที่ลาทั้งหมด
                let weekendCount = Math.floor((LeaveDetail.startTime.getDay()+(1+totalDay))/7)//คำนวณจำนวนจำสัปดาห์ทั้งหมดที่ลาไป
                weekendCount = 2*weekendCount+((LeaveDetail.startTime.getDay()==0)-(LeaveDetail.endTime.getDay()==6))//*2เข้าไปเพื่อเพิ่มเป็นจำนวนเสาร์อาทิตย์
                totalMinutes = totalMinutes+((totalDay-1-weekendCount)*(workingHours*60))//นำจำนวนวันที่ลาทั้งหมด-กับจำนวนเสาร์อาทิตย์และแปลงเป็นนาที
            }
            else{//กรณีที่ลาวันเดียวกัน
                totalMinutes = (LeaveDetail.endTime-LeaveDetail.startTime)/(1000*60);//เวลาที่ลาถึง - เวลาที่เริ่มลาและแปลงเป็นนาที
            }
            //ทำการอัพเดทเวลาที่ลาคงเหลือของพนักงานที่ลา
            const remainingLeave = await RemainingLeave.findOne({
                where: {
                    [Op.and]: [
                        {leaveId: req.body.leaveId},
                        {employeeId: req.body.employeeId}
                    ]
                    },raw:true
            })
            //ทำการอัพเดทเวลาลาคงเหลือ
            const remainingCheck = remainingLeave.remainingTime-totalMinutes
            if(remainingCheck<0) return next(Error('BAD_REQUEST'))//Return Error กลับไปกรณีที่เวลาลาคงเหลือ น้อยกว่านาทีที่ต้องการลา
            //-------------------------------------คำนวนเวลา ที่ใช้ลา------------------------------------------------------
            req.body.totalMinutes = totalMinutes
            // const data = await LeaveRequest.create(req.body)
            // const employeeData = await Employee.findByPk(req.body.employeeId)
            // const managerData = await DepartmentManager.findByPk(employeeData.departmentId)
            // const notificationData = {
            //     notificationType:'leave',
            //     notificationDescription:"คุณ "+employeeData.firstname+" "+employeeData.lastname+"ขออนุมัติลา",
            //     notificationId:data.id,
            //     employeeId:[managerData.employeeId]
            // }
            // await Notification.create(notificationData)
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    },
    async requestApproved(req, res, next){//ฟังก์ชั่นสำหรับให้หัวหน้าแผนกอนุมัติคำขออนุมัติการลา
        try {
            const approveData = {
                isApproved:req.body.isApproved,
                approvedBy:req.body.employeeId,
                approvedDate:new Date()
            }
            const data = await LeaveRequest.findByPk(req.params.id)
            if(!data) return next(Error('NOT_FOUND'))//ถ้าไม่มีไอดีการลานี้อยู่ให้Return Error
            else if(data.approvedBy) return next(Error('BODY_VALIDATE_ERROR'))//ถ้ามีการอนุมัติแล้วให้ Return Error
            await LeaveRequest.update(approveData, {where:{id:req.params.id}})//ทำการอัพเดทการอนุมัติลา
            const updatedData = await LeaveRequest.findByPk(req.params.id)
            //ถ้าหัวหน้าหรือผู้บังคับบัญชาอนุมัติการลา
            if(updatedData.isApproved){
                const remainingLeave = await RemainingLeave.findOne({
                    where: {
                        [Op.and]: [
                          {leaveId: updatedData.leaveId},
                          {employeeId: updatedData.employeeId}
                        ]
                      },raw:true
                })
                //ทำการอัพเดทเวลาลาคงเหลือ
                let totalMinutes = remainingLeave.remainingTime-updatedData.totalMinutes
                if(totalMinutes<0) return next(Error('BAD_REQUEST'))//Return Error กลับไปกรณีที่เวลาลาคงเหลือ น้อยกว่านาทีที่ต้องการลา
                await RemainingLeave.update({remainingTime:totalMinutes}, {where:{
                    [Op.and]: [
                      {leaveId: updatedData.leaveId},
                      {employeeId: updatedData.employeeId}
                    ]
                  }})
            }
            return res.status(200).json(updatedData)
        } catch (e) {
            next(e)
        }
    },
    async cancelLeaveRequest(req, res, next){//ฟังก์ชั่นสำหรับการขอยกเลิกคำขออนุมัติ
        try {
            const data = await LeaveRequest.findByPk(req.params.id)
            if(!data) return next(Error('NOT_FOUND'))
            if(data.isApproved){//ตรวจสอบว่าคำขอได้รับการอนุมัติให้ลา ถ้าใช่จะคำนวนเวลาที่ใช้ลาคืนให้กับเวลาการลาคงเหลือ
                const officeHour = await OfficeHour.findByPk(1)//ข้อมูลเวลาการเข้า - ออก งาน
                const workingHours = officeHour.checkOut - officeHour.checkIn // หาชั่วโมงการทำงานทั้งหมด จากการ - เวลา ออกงานกับเข้างาน
                const minutesCheckOut = parseInt(officeHour.checkOut.split('.')[1])+(parseInt(officeHour.checkOut.split('.')[0])*60)
                const minutesCheckIn = parseInt(officeHour.checkIn.split('.')[1])+(parseInt(officeHour.checkIn.split('.')[0])*60)
                let totalMinutes;
                //ใช้สำหรับคำนวนเวลา ลาที่ใช้ไปเพื่อคืนเวลาการลาคงเหลือให้
                if(data.startTime.toISOString().slice(0,10) !== data.endTime.toISOString().slice(0,10)){
                    let minutesStartTime = data.startTime.getMinutes()+(data.startTime.getHours()*60)
                    let minutesEndTime = data.endTime.getMinutes()+(data.endTime.getHours()*60)
                    totalMinutes = (minutesCheckOut-minutesStartTime)+(minutesEndTime-minutesCheckIn)
                    let totalDay = (new Date(data.endTime.toISOString().slice(0,10)) - new Date(data.startTime.toISOString().slice(0,10)))/(1000*3600*24)
                    totalMinutes = totalMinutes+((totalDay-1)*(workingHours*60))
                }
                else{
                    totalMinutes = (data.endTime-data.startTime)/(1000*60);
                }
                const remainingLeave = await RemainingLeave.findOne({
                    where: {
                        [Op.and]: [
                          {leaveId: data.leaveId},
                          {employeeId: data.employeeId}
                        ]
                      },raw:true
                })
                totalMinutes = remainingLeave.remainingTime+totalMinutes
                await RemainingLeave.update({remainingTime:totalMinutes}, {where:{
                    [Op.and]: [
                      {leaveId: data.leaveId},
                      {employeeId: data.employeeId}
                    ]
                  }})
            }
            await LeaveRequest.destroy({where:{id:req.params.id}})
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    }

}

module.exports = {...methods}