'use strict'

const Sequelize = require('sequelize')
const db = require('../configs/database')
const MeetingRoomReservation = db.define('meetingRoomReservation', {
    bookingId:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    bookerId:{
        type:Sequelize.STRING,
        references:{
            model:db.define('employee'),
            key:'id'
        }
    },
    roomId:{
        type:Sequelize.INTEGER,
        references:{
            model:db.define('meetingRoom'),
            key:'roomId'
          }
    },
    description:{
        type:Sequelize.STRING,
    },
    topic:{
        type:Sequelize.STRING
    },
    participants:{
        type:Sequelize.ARRAY(Sequelize.STRING)
    },
    startTime:{
        type:Sequelize.DATE
    },
    endTime:{
        type:Sequelize.DATE
    }
})

module.exports = MeetingRoomReservation