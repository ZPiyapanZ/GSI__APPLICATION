'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes')
const app = express()
const cors = require('cors')
const error = require('./middlewares/error')
app.use(cors())

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
app.use('/api', route)
app.use(error)

const port = process.env.port || 3005
console.log(`Server running on port ${port}`);
app.listen(port)
