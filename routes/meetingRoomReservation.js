'use strict'

const express = require('express')
const router = express.Router()
const meetingRoomReservationController = require('../controllers/meetingRoomReservation.controller')
const auth = require('../middlewares/auth')
router.use(auth)
router.post('/', meetingRoomReservationController.reservation)

module.exports = router