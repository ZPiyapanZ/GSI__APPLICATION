'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Department = db.define('department', {
  departmentId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  departmentName:{
    type:Sequelize.STRING
  }
})

module.exports = Department
