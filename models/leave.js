'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Leave = db.define('leave', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    leaveType:{
        type:Sequelize.STRING
    },
    leavePerYear:{
        type:Sequelize.INTEGER
    }
})

module.exports = Leave