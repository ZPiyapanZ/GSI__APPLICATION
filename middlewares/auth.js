'use strict'

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {//ใช้สำหรับเป็นตัวกลางในการยืนยันตัวตน
    try {
        const token = req.header('x-auth-token')
        if(!token) return next(Error('UNAUTHORIZED'))
        const decoded = jwt.verify(token, "SECRETKEY")
        req.body.userData = decoded
        req.body.employeeId = decoded['employeeId']
        next();
    } catch (e) {
        next(Error('INVALID_TOKEN'))
    }
}