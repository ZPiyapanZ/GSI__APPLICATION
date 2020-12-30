'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const RemainingLeave = db.define('remainingLeave', {
    // id:{
    //     type:Sequelize.INTEGER,
    //     primaryKey:true,
    //     allowNull:false,
    //     autoIncrement:true
    // },
    employeeId:{
        type:Sequelize.STRING,
        reference:{
            model:db.define('employee'),
            key:'id'
        },
        primaryKey:true
    },
    leaveId:{
        type:Sequelize.INTEGER,
        reference:{
            model:db.define('leave'),
            key:'id'
        },
        primaryKey:true
    },
    remainingTime:{
        type:Sequelize.INTEGER
    }
})

module.exports = RemainingLeave