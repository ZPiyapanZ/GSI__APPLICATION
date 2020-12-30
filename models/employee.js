'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Department = require('./department')

const Employee = db.define('employee',{
  id:{
    type:Sequelize.STRING,
    allowNull:false,
    primaryKey:true
  },
  firstname:{
    type:Sequelize.STRING
  },
  lastname:{
    type:Sequelize.STRING
  },
  departmentId:{
    type:Sequelize.INTEGER,
    references:{
      model:db.define('department'),
      key:'departmentId'
    }
  },
  position:{
    type:Sequelize.STRING
  },
  startDate:{
    type:Sequelize.DATE
  }
})
Employee.belongsTo(Department, {foreignKey:'departmentId', targetKey:'departmentId'})
module.exports = Employee
