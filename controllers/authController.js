const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { issueToken, COOKIE_OPTIONS, refreshNewToken } = require("../utils/authenticate")

const dev = process.env.NODE_ENV !== "production"

const authRegister = async (req, res) =>{
  try {
    const user = await User.findOne({ $or: [{email: req.body.email}, {username: req.body.username}] }).lean()
    
    if(user) {
      let msg = '';
      let errorField = ''
      if(user.username === req.body.username){
        msg = 'Username already exists'
        errorField = 'username'
      }
      else if(user.email === req.body.email){
        msg = 'Account with same Email already exists'
        errorField = 'email'
      }

      res.status(400).json({
        msg,
        errorField
      })
    }else{
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = new User({
        username: req.body.username,
        name: {
          firstName: req.body.name.firstName,
          lastName: req.body.name.lastName
        },
        email: req.body.email,
        password: hashedPassword,
        refreshToken: []
      })

      await newUser.save()

      const token = issueToken({ _id: newUser._id })
      const newRefreshToken = refreshNewToken({ _id: newUser._id })
      newUser.refreshToken.push(newRefreshToken)
      await newUser.save()
         
      res.status(200)
        .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
        .json({
          success: true,
          msg: "New user Created",
          user: {
            username: newUser.username,
            name: {
              firstName: newUser.name.firstName,
              lastName: newUser.name.lastName
            },
            email: newUser.email,
          },
          token: token.token,
          expiresIn: token.expires
        })
    }
  } catch (error) {
    res.sendStatus(500)
    console.log(error);
  }
}

const authLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      console.log(err)
      res.status(500)
      return next(err)
    }
    if (!user) { return res.status(400).json({msg: info.msg, errorField: info.errorField}); }
    req.logIn(user, err => {
      if (err) { 
        console.log(err)
        res.status(500)
        return next(err)
      }

      next()
    });
  })(req, res, next);
}

const authjwtLogin = async (req, res) => {
  try {
    
    const user = await User.findOne({ _id: req.user._id })

    const token = issueToken({ _id: user._id })
    const newRefreshToken = refreshNewToken({ _id: user._id })
    user.refreshToken.push(newRefreshToken)
    await user.save();
          
    res.status(200)
        .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
        .json({
          success: true,
          msg: "User Logged In",
          user: {
            username: user.username,
            name: {
              firstName: user.name.firstName,
              lastName: user.name.lastName
            },
            email: user.email,
          },
          token: token.token,
          expiresIn: token.expires
        })

  } catch (error) {
    res.sendStatus(500)
    console.log(error);
  }

}

const authRefreshjwt = async (req, res) => {
  const { signedCookies } = req
  const { refreshToken } = signedCookies

  // console.log(signedCookies);

  if(refreshToken){
    try {
      const payload = jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id

      const user = await User.findOne({ _id: userId })

      if(user){
        const tokenIndex = user.refreshToken.findIndex( item => item.token === refreshToken.token )
        if(tokenIndex === -1){
          console.log('non-existant token');
          res.status(401).json({success: false, msg: "Unauthorized"})
        }else{
          const token = issueToken({ _id: user._id })
          const newRefreshToken = refreshNewToken({ _id: user._id })
          user.refreshToken[tokenIndex] = newRefreshToken
          await user.save()

          res.status(200)
              // .clearCookie("refreshToken", COOKIE_OPTIONS)
              .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
              .json({
                success: true,
                msg: "User Authorized",
                user: {
                  username: user.username,
                  name: {
                    firstName: user.name.firstName,
                    lastName: user.name.lastName
                  },
                  email: user.email,
                },
                token: token.token,
                expiresIn: token.expires
              })
        }

      }else{
        console.log('no user');
        res.status(401).json({success: false, msg: "Unauthorized"})
      }

    } catch (error) {
      console.log(error);
      res.status(401).json({success: false, msg: "Unauthorized"})
    }
  }else{
    console.log('no token');
    res.status(401).json({success: false, msg: "Unauthorized"})
  }

}

const authLogout = async (req, res) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  try{
    const user = await User.findOne({ _id: req.user._id })

    if(refreshToken){
      const tokenIndex = user.refreshToken.findIndex( item => item.token === refreshToken.token )
      if(tokenIndex !== -1){
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }
    }
    
    await user.save()

    req.logout()
    res.status(200)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .json({ success: true, msg: "Successfully Logged Out" })
  }catch (error) {
    console.log(error);
    res.status(500).json({success: false})
  }
}

const authUser = (req, res) =>{
  // try {
    res.json({user: req.user})
  // } catch (error) {
  //   res.sendStatus(500)
  //   console.log(error);
  // }
}

module.exports = {
  authRegister,
  authLogin,
  authLogout,
  authjwtLogin,
  authRefreshjwt,
  authUser
}