'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const User = db.define('user', {
  username:{
    type:Sequelize.STRING,
    primaryKey:true,
    allowNull:false,
    references:{
      model:db.define('employee'),
      key:'id'
    }
  },
  password:{
    type:Sequelize.STRING
  },
  isAdmin:{
    type:Sequelize.BOOLEAN
  }
})
User.belongsTo(db.define('employee'), {foreignKey:'username', targetKey:'id'})
module.exports = User
