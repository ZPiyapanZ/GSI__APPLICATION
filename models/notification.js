'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Notification = db.define('notification', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    notificationType:{
        type:Sequelize.ENUM('leave', 'meeting'),
        allowNull:false
    },
    notificationDescription:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    notificationId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    employeeId:{
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull:false
    },
})

module.exports = Notification