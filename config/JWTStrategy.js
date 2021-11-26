
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const JWTStrategy = new jwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({ _id: jwt_payload._id })
    if(!user) return done(null, false, { errorField: "username", msg: 'Username does not match any account' })
    
    return done(null, user)
    
  } catch (error) {
    return done(error, false)
  }

})

module.exports = (passport) => { passport.use(JWTStrategy) }