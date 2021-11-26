const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
// const { verifyUser } = require("../../utils/authenticate")
const { authLogin, authRegister, authLogout, authjwtLogin, authRefreshjwt, authUser } = require('../../controllers/authController')

// const verifyUser = () => passport.authenticate("jwt", { session: false })

authRouter.post('/register', authRegister)
authRouter.post('/login', authLogin, authjwtLogin);
authRouter.post('/refreshToken', authRefreshjwt);

authRouter.get('/logout', passport.authenticate("jwt", { session: false }), authLogout)
authRouter.get('/user', passport.authenticate("jwt", { session: false }), authUser)

module.exports = authRouter