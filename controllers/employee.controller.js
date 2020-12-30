'use strict'

const Employee = require('../models/employee')
const Department = require('../models/department')
const DepartmentManager = require('../models/departmentManager')
const Leave = require('../models/leave')
const User = require('../models/user')
const RemainingLeave = require('../models/remainingLeave')
const TimeRegister = require('../models/timeRegister')
const CheckInOut = require('../models/checkInOut')
const methods =  {
  async findAll(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลพนักงานทั้งหมด
    try {
      // const data = await Employee.findAll()
      const data = await Employee.findAll({include:[Department], raw:true})
      return res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  },
  async findOne(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลเฉพาะพนักงาน ตาม Employee Id
    try {
      const data = await Employee.findByPk(req.params.id,{include:[Department], raw:true})
      // const remainingLeave = await RemainingLeave.findOne({where: {employeeId: data.id},raw:true})
      // const employeeData = {
      //   data,
      //   remainingLeave
      // }
      // console.log(employeeData);
      if(!data) return next(Error('NOT_FOUND'))
      return res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  },
  async getRemainingLeave(req, res, next){
    try {
      const data = await RemainingLeave.findAll({attributes: ['leaveId', 'remainingTime'],where: {employeeId: req.params.id},raw:true})
      if(!data) return next(Error('NOT_FOUND'))
      return res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  },
  async create(req, res, next){//ฟังก์ชั่นสำหรับการเพิ่มข้อมูลพนักงานใหม่
    try {
      const data = await Employee.create(req.body)
      const leaveData = await Leave.findAll({raw:true})
      for(const leaveId in leaveData){//เมื่อเพิ่มพนักงานแล้วจะทำการเพิ่มเวลาที่พนักงานสามารถลาได้
        let employeeData = {
          employeeId:req.body.id,
          leaveId:leaveData[leaveId]['id'],
          remainingTime:leaveData[leaveId]['leavePerYear']
        }
        await RemainingLeave.create(employeeData)
      }
      return res.status(201).json(data)
    } catch (e) {
      next(e)
    }
  },
  async update(req, res, next){//ฟังก์ชั่นสำหรับการอัพเดทข้อมูลพนักงาน
    try {
      const data = await Employee.update(req.body, {where:{id:req.body.id}})
      if(!data[0]) return next(Error('NOT_FOUND'))
      const updateData = await Employee.findByPk(req.body.id)
      res.status(200).json(updateData)
    } catch (e) {
      next(e)
    }
  },
  async delete(req, res, next){//ฟังก์ชั่นสำหรับการลบข้อมูลพนักงาน
    try {
      const data = await Employee.findByPk(req.params.id)
      if(!data) return next(Error('NOT_FOUND'));
      await DepartmentManager.update({employeeId:null}, {where:{employeeId:req.params.id}})
      await User.destroy({where:{username:req.params.id}})
      await TimeRegister.destroy({where:{employeeId:req.params.id}})
      await CheckInOut.destroy({where:{employeeId:req.params.id}})
      await Employee.destroy({where:{id:req.params.id}})
      await RemainingLeave.destroy({where:{employeeId:req.params.id}})
      // const data = await Employee.destroy({where:{id:req.params.id}})
      // if(!data) return next(Error('NOT_FOUND'));
      res.status(204).json()
    } catch (e) {
      next(e)
    }
  }
}

module.exports = {...methods}
