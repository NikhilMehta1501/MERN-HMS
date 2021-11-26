const User = require('../models/User')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const localStrategy = new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ username: username })
      
      if(!user) return done(null, false, { errorField: "username", msg: 'Username does not match any account' })
      
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        return done(null, false, { errorField: "password", msg: 'Incorrect password' });
      }

      return done(null, user);

    } catch (error) {
        return done(error)
    }
  }
)

module.exports = (passport) => {
  passport.use(localStrategy);

  passport.serializeUser( (user, done) => done(null, user.id) );
  
  passport.deserializeUser((id, done) => {
    User.findById({ _id: id }, (err, user) => done(err, user) );
  });
}