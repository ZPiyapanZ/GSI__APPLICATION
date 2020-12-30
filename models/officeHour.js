'use strict'

const Sequelize = require('sequelize')
const db =require('../configs/database')
const OfficeHour = db.define('officeHour', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    checkIn:{
        type:Sequelize.STRING
    },
    checkOut:{
        type:Sequelize.STRING
    }
})

module.exports = OfficeHour