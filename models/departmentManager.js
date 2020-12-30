'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const DepartmentManager = db.define('departmentManager', {
  departmentId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    references:{
      model:db.define('department'),
      key:'departmentId'
    }
  },
  employeeId:{
    type:Sequelize.STRING,
    references:{
      model:db.define('employee'),
      key:'id'
    }
  }
})

module.exports = DepartmentManager
