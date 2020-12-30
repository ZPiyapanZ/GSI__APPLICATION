'use strict'

const Holiday = require('../models/holiday')
const OfficeHour = require('../models/officeHour')
const SatWorkingDay = require('../models/satWorkingDay')
const LeaveRequest = require('../models/leaveRequest')
const remainingLeave = require('../models/remainingLeave')
const { Op } = require("sequelize");
const methods = {

    //------------------------ OfficeHour -------------------------
    async getOfficeHour(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลเวลาเข้าออกงาน
        try {
            const data = await OfficeHour.findByPk(1)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async updateOfficeHour(req, res, next){//ฟังก์ชั่นสำหรับการอัพเดทเวลาเข้าออกงาน
        try {
            const data = await OfficeHour.update(req.body, {where:{id:1}})
            if(!data) return next(Error('NOT_FOUND'))
            const updateData = await OfficeHour.findByPk(1)
            res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    },
    //------------------------ OfficeHour -------------------------


    //------------------------ Holiday ----------------------------------
    async createHoliday(req, res, next){//ฟังก์ชั่นสำหรับการเพิ่มข้อมูลวันหยุด
        try {
            req.body.date = new Date(req.body.date)
            const data = await Holiday.create(req.body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    },
    async getHoliday(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลวันหยุดตามปีที่กำหนด
        try {
            let newYear = new Date(req.params.year+'-01-01')
            let endYear = new Date(req.params.year+'-12-31')
            const data = await Holiday.findAll({
                where:{
                    date:{
                        [Op.gte]:newYear,
                        [Op.lte]:endYear
                    }
                }
            })
            if(!data[0]) return next(Error('NOT_FOUND'))
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async updateHoliday(req, res, next){//ฟังก์ชั่นสำหรับการอัพเดทข้อมูลวันหยุด
        try {
            const data = await Holiday.update(req.body, {where:{id:req.params.id}})
            if(!data[0]) return next(Error('NOT_FOUND'))
            const updateData = await Holiday.findByPk(req.params.id)
            return res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    },
    async deleteHoliday(req, res, next){//ฟังก์ชั่นสำหรับการลบข้อมูลวันหยุด
        try {
            const data = await Holiday.destroy({where:{id:req.params.id}})
            if(!data) return next(Error('NOT_FOUND'))
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    },
    //------------------------ Holiday ----------------------------------


    //------------------------ SatWorkingDay----------------------------------
    async createSatWorkingDay(req, res, next){//ฟังก์ชั่นสำหรับการเพิ่มข้อมูลวันเสาร์ที่ต้องมาทำงาน
        try {
            const data = await SatWorkingDay.create(req.body)
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    },
    async updateSatWorkingDay(req, res, next){//ฟังก์ชั่นสำหรับการอัพเดทข้อมูลวันเสาร์ที่ต้องมาทำงาน
        try {
            const data = await SatWorkingDay.update(req.body, {where:{id:req.params.id}})
            if(!data[0]) return next(Error('NOT_FOUND'))
            const updateData = await SatWorkingDay.findByPk(req.params.id)
            return res.status(200).json(updateData)
        } catch (e) {
            next(e)
        }
    },
    async deleteSatWorkingDay(req, res, next){//ฟังก์ชั่นสำหรับการลบข้อมูลวันเสาร์ที่ต้องมาทำงาน
        try {
            const data = await SatWorkingDay.destroy({where:{id:req.params.id}})
            if(!data) return next(Error('NOT_FOUND'))
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    },
    async getSatWorkingDay(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลวันเสาร์ที่ต้องมาทำงานตามปี
        try {
            let newYear = new Date(req.params.year+'-01-01')
            let endYear = new Date(req.params.year+'-12-31')
            const data = await SatWorkingDay.findAll({
                where:{
                    date:{
                        [Op.gte]:newYear,
                        [Op.lte]:endYear
                    }
                }
            })
            if(!data[0]) return next(Error('NOT_FOUND'))
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }
    //------------------------ SatWorkingDay----------------------------------
}

module.exports = {...methods}