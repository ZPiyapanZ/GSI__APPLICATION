'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const Office = db.define('office', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    officeName:{
        type:Sequelize.STRING,
    },
    location:{
        type:Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = Office