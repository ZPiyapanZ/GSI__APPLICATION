'use strict'

const Department = require('../models/department')
const Employee = require('../models/employee')
const DepartmentManager = require('../models/departmentManager')
const methods = {
    async findAll(req, res, next){//ฟังก์ชั่นสำหรับการเแสดงข้อมูลแผนกทั้งหมด
        try {
            const data = await Department.findAll()
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async findOne(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลแผนกตาม Department Id
        try {
            const data = await Department.findByPk(req.params.id)
            if(!data) return next(Error('NOT_FOUND'))
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async create(req, res, next){//ฟังชั่นสำหรับการเพิ่มข้อมูลแผนก
        try {
            const data = await Department.create(req.body)
            await DepartmentManager.create({departmentId:req.body.departmentId})
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
      },
    async update(req, res, next){//ฟังก์ชั่นสำหรับการอัพเดทข้อมูลแผนกงาน
        try {
            const data = await Department.update(req.body, {where:{departmentId:req.body.departmentId}})
            if(!data[0]) return next(Error('NOT_FOUND'))
            const updateData = await Department.findByPk(req.body.departmentId)
            return res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    },
    async delete(req, res, next){//ฟังก์ชั่นสำหรับการลบข้อมูลแผนกงาน
        try {
            const check404 = await Department.findByPk(req.params.id)
            if(!check404) return next(Error('NOT_FOUND'))
            await Employee.update({departmentId:null}, {where:{departmentId:req.params.id}})//การจะลบข้อมูลแผนกต้อง Set ค่าแผนกให้พนักงานทุกคนเป็น null เนื่องจากเป็น FK จาก Department 
            await DepartmentManager.destroy({where:{departmentId:req.params.id}})//การลบข้อมูลแผนกต้องลบข้อมูลหัวหน้าแผนกด้วยเนื่องจากไม่มีแผนกแล้วหัวหน้าก็ต้องถูกลบไปด้วย
            await Department.destroy({where:{departmentId:req.params.id}})//ลบข้อมูลแผนก
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {...methods}