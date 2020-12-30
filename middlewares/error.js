'use strict'
//เป็นตัวกลางในการตัวสอบ Error
const ERROR_MESSAGE = {
  BAD_REQUEST:{
    statusCode:400,
    message:"'Bad request invalid syntax.'"
  },
  BODY_VALIDATE_ERROR: {
    statusCode: 400,
    message: 'Your request body validate failed.'
  },
  INVALID_TOKEN: {
    statusCode: 400,
    message: 'Invalid token'
  },
  CHECK_OUT_ERROR:{
    statusCode:400,
    message: 'Please Check In Before Check Out'
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Access dinied. No token.'
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'You not have permission'
  },
  CHECK_OUT_FORBIDDEN:{
    statusCode:403,
    message: 'Repeated check out not allow.'
  },
  NOT_FOUND: {
    statusCode: 404,
    message: 'Data not found.'
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error'
  }
}

module.exports = function (err, req, res, next) {
  if (!Object.keys(ERROR_MESSAGE).includes(err.message)) {
    return res.status(500).json({ statusCode: 500, message: 'Internal server error' })
  }
  const { statusCode, message } = ERROR_MESSAGE[err.message]
  console.log(message);
  return res.status(statusCode).json({ statusCode: statusCode, message: message })
}
