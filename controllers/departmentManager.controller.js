'use strict'

const DepartmentManager = require('../models/departmentManager')
const Employee = require('../models/employee')
const methods = {
    async findAll(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลหัวหน้าแผนกทั้งหมด
        try {
            const data = await DepartmentManager.findAll()
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async findOne(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลหัวหน้าแผนกเฉพาะแผนกที่กำหนด ตาม Department Id
        try {
            const data = await DepartmentManager.findByPk(req.params.id)
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async update(req, res, next){// ฟังก์ชั่นสำหรับการอัพเดทข้อมูลหัวหน้าแผนก
        try {

            const check404 = await Employee.findByPk(req.body.employeeId)
            if(!req.body.employeeId){
                req.body.employeeId = null
            }
            else if(!check404) return next(Error('NOT_FOUND'))
            const data = await DepartmentManager.update({employeeId:req.body.employeeId}, {where:{departmentId:req.params.id}})
            if(!data[0]) return next(Error('NOT_FOUND'))
            const updateData = await DepartmentManager.findByPk(req.params.id)
            return res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports ={...methods}