'use strict'

const Office = require('../models/office')
const MeetingRoom = require('../models/meetingRoom')
const MeetingRoomReservation = require('../models/meetingRoomReservation')
const methods = {
    async reservation(req, res, next){
        try {
            return status(200).json('Hello World')
        } catch (e) {
            next(e)
        }
    },
    async findAvailabilityRoom(req, res, next){
        try {
            return status(200)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = {...methods}