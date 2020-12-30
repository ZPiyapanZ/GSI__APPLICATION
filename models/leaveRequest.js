'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const LeaveRequest = db.define('leaveRequest', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    employeeId:{
        type:Sequelize.STRING,
        references:{
            model:db.define('employee'),
            key:'id'
          }
    },
    leaveId:{
        type:Sequelize.INTEGER,
        references:{
            model:db.define('leave'),
            key:'id'
          }
    },
    startTime:{
        type:Sequelize.DATE
    },
    endTime:{
        type:Sequelize.DATE
    },
    totalMinutes:{
        type:Sequelize.INTEGER
    },
    isApproved:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    approvedBy:{
        type:Sequelize.STRING
    },
    approvedDate:{
        type:Sequelize.DATE
    }
})

module.exports = LeaveRequest