'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Holiday = db.define('holiday', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE
    },
    description:{
        type:Sequelize.STRING
    }
})

module.exports = Holiday