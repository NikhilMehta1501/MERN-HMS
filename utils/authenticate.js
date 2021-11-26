const jwt = require('jsonwebtoken')
const dev = process.env.NODE_ENV !== "production"

const issueToken = (user) => {
  const _id = user._id
  const expiresIn = eval(process.env.SESSION_EXPIRY)

  const jwt_payload = {
    _id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: expiresIn })

  return {
    token: signedToken,
    expires: expiresIn
  }
}

const refreshNewToken = (user) => {
  const _id = user._id
  const expiresIn = eval(process.env.REFRESH_TOKEN_EXPIRY)

  const jwt_payload = {
    _id,
    iat: Date.now()
  }

  const refreshToken = jwt.sign(jwt_payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expiresIn })

  return {
    token: refreshToken,
    expires: expiresIn
  }
}

// const verifyUser = () => passport.authenticate("jwt", { session: false })

const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  expires: new Date(Date.now() + (eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000)),
  // sameSite: "none"
}

module.exports = {
  COOKIE_OPTIONS,
  issueToken,
  // verifyUser,
  refreshNewToken
}