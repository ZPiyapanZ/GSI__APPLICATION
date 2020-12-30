'use strict'

const User = require('../models/user')
const Employee = require('../models/employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const methods = {
    async create(req, res, next){//ฟังก์ชั่นสำหรับการสร้าง User ในการเข้าใช้งานระบบ
        try {
            const check404 = await Employee.findByPk(req.body.username)
            if(!check404) return next(Error('NOT_FOUND'))
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const data = await User.create(req.body)
            return res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }, 
    async login(req, res, next){//ฟังก์ชั่นสำหรับการ Login 
        try {
            console.log(req.body);
            if(!req.body.username || !req.body.password) return next(Error('BODY_VALIDATE_ERROR'))
            const username = await User.findByPk(req.body.username, {include:[Employee], raw:true})
            if(!username) return next(Error('NOT_FOUND'))
            const password = await bcrypt.compare(req.body.password, username.password)
            if(!password) return next(Error('BODY_VALIDATE_ERROR'))
            const token = jwt.sign({employeeId:username.username}, "SECRETKEY")
            return res.status(200).json(token)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {...methods}