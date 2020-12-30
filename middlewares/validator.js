'use strict'
//ใช้สำหรับตรวจสอบความถูกต้องของ Request
const leave = require('../models/leave')
const Joi = require('joi')
const methods = {
  employee(req, res, next){//ตรวจสอบ Request สำหรับ employee.controller
    const schema = Joi.object({
      id:Joi.string().required(),
      firstname:Joi.string().alphanum().required(),
      lastname:Joi.string().alphanum().required(),
      departmentId:Joi.number().integer().required(),
      position:Joi.string().required(),
      startDate:Joi.date().required()
    })
    if(req.params.id){
      req.body.id = req.params.id
    }
    const dataEmployee = {
      id:req.body.id,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      departmentId:req.body.departmentId,
      position:req.body.position,
      startDate:req.body.startDate
    }
    const { error } = schema.validate(dataEmployee)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  department(req, res, next){//ตรวจสอบ Request สำหรับ department.controller
    const schema = Joi.object({
      departmentId:Joi.number().integer().required(),
      departmentName:Joi.string().required(),
    })
    if(req.params.id){
      req.body.departmentId = req.params.id
    }
    const dataDepartment = {
      departmentId:req.body.departmentId,
      departmentName:req.body.departmentName
    }
    const { error } = schema.validate(dataDepartment)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  user(req, res, next){//ตรวจสอบ Request สำหรับ user.controller
    const schema = Joi.object({
      username:Joi.string().required(),
      password:Joi.string().required(),
      isAdmin:Joi.boolean(),
    }) 
    const userData = {
      username:req.body.username,
      password:req.body.password,
      isAdmin:req.body.isAdmin
    }
    const { error } = schema.validate(userData)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  holiday(req, res, next){//ตรวจสอบ Request สำหรับวันหยุดใน officeSchedule.controller
    const schema = Joi.object({
      date:Joi.date().required(),
      description:Joi.string().required(),
    })
    const holidayData = {
      date:req.body.date,
      description:req.body.description
    }
    const { error } = schema.validate(holidayData)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  satWorkingDay(req, res, next){//ตรวจสอบ Request สำหรับวันเสาร์ที่ต้องมาทำงานใน officeSchedule.controller
    req.body.date = new Date (req.body.date+"T00:00:00.000Z")
    const schema = Joi.object({
      date:Joi.date().required()
    })
    const { error } = schema.validate(req.body.date)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  leave(req, res, next){
    const schema = Joi.object({
      leaveType:Joi.string().required(),
      leavePerYear:Joi.number().integer().required()
    })
    const leaveData = {
      leaveType:req.body.leaveType,
      leavePerYear:req.body.leavePerYear
    }
    const { error } = schema.validate(leaveData)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  },
  leaveRequest(req, res, next){//ตรวจสอบ Request สำหรับการขออนุมัติลาใน leaveRequest.controller
    const schema = Joi.object({
      leaveId:Joi.number().integer().required(),
      startTime:Joi.date().required(),
      endTime:Joi.date().required()
    })
    const requestData = {
      leaveId:req.body.leaveId,
      startTime:req.body.startTime,
      endTime:req.body.endTime
    }

    const { error } = schema.validate(requestData)
    return error ? next(Error('BODY_VALIDATE_ERROR')) : next()
  }
}

module.exports = {...methods}
