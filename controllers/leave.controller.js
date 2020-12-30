'use strict'

const Leave = require('../models/leave')
const Employee = require('../models/employee')
const RemainingLeave = require('../models/remainingLeave')
const LeaveRequest = require('../models/leaveRequest')
const OfficeHour = require('../models/officeHour')
const methods = {
    async findAll(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลประเภทการลาทั้งหมด
        try {
            const data = await Leave.findAll()
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async create (req, res, next){//ฟังก์ชั่นสำหรับการเพิ่มข้อมูลประเภทการลา
        try {
            const data = await Leave.create(req.body)
            //เมื่อมีการสร้างการลาขึ้นมา จะต้องเพิ่มการลาคงเหลือให้พนักงานทั้งหมด
            const employeeData = await Employee.findAll({raw:true})
            for(const id in employeeData){
                let remainingLeaveData = {
                    leaveId:data['id'],
                    leavePerYear:data['leavePerYear'],
                    employeeId:employeeData[id]['id'],
                }
                await RemainingLeave.create(remainingLeaveData)
            }
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    },
    async update(req, res, next){//อัพเดทประเภทการลา
        try {
            const data = await Leave.update(req.body, {where:{id:req.params.id}})
            if(!data[0]) return next(Error('NOT_FOUND'))
            const updateData = await Leave.findByPk(req.params.id)
            return res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    },
    async delete(req, res, next){//ลบข้อมูลประเภทการลา
        try {
            const data = await Leave.destroy({where:{id:req.params.id}})
            if(!data) return next(Error('NOT_FOUND'))
            //ลบประเภทการลาแล้วต้องลบการลาคงเหลือของพนักงานด้วย
            await RemainingLeave.destroy({where:{leaveId:req.params.id}})
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    },

}

module.exports = {...methods}