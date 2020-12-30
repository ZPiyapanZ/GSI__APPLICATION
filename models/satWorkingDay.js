'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const SatWorkingDay = db.define('satWorkingDay', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE
    }
})

module.exports = SatWorkingDay