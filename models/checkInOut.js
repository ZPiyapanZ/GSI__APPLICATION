'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')

const CheckInOut = db.define('checkInOut', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    employeeId:{
        type:Sequelize.STRING,
        references:{
            model:db.define('employee'),
            key:'id'
        }
    },
    checkInTime:{
        type:Sequelize.DATE
    },
    checkOutTime:{
        type:Sequelize.DATE
    },
    lateTime:{
        type:Sequelize.INTEGER
    },
    earlyTime:{
        type:Sequelize.INTEGER
    }
})

module.exports = CheckInOut