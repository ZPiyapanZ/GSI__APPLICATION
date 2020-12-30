'use strict'

const TimeRegister = require('../models/timeRegister')

const methods = {
    async addTimeRegister(req, res, next){//ฟังก์ชั่นสำหรับการเพิ่มเวลาเข้าทำงาน
        try {
            const NOW = new Date()
            let location = [req.body.longitude, req.body.latitude]
            const data = await TimeRegister.create({
                employeeId:req.body.employeeId,
                description:req.body.description,
                location:location,
                isCheckIn:req.body.isCheckIn,
                registrationTime:req.body.currentTime
            })
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    },
    async getAllTimeRegister(req, res, next){//ฟังก์ชั่นสำหรับการแสดงข้อมูลเวลาเข้าทำงานทั้งหมด
        try {
            const data = await TimeRegister.findAll({
                order:[
                    ['registrationTime', 'ASC']
                ]
            })
            return res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    },
    async deleteTimeRegister(req, res, next){//ฟังก์ชั่นสำหรับการลบข้อมูลการลงเวลาเข้าทำงานตาม Id
        try {
            const data = await TimeRegister.destroy({where:{id:req.params.id}})
            if(!data) return next(Error('NOT_FOUND'))
            return res.status(204).json()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {...methods}