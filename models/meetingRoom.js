'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const MeetingRoom = db.define('meetingRoom', {
    roomId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    meetingRoomName:{
        type:Sequelize.STRING
    },
    officeId:{
        type:Sequelize.INTEGER,
        references:{
            model:db.define('office'),
            key:'id'
          }
    },
    peopleCapacity:{
        type:Sequelize.INTEGER
    },
    meetingRoomStatus:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    meetingRoomImage:{
        type:Sequelize.STRING
    }
})

module.exports = MeetingRoom