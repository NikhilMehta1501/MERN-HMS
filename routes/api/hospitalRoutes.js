const express = require('express')
const hospitalRouter = express.Router()

// const { authLogin, authRegister, authLogout, authjwtLogin, authRefreshjwt, authUser } = require('../../controllers/hospitalController')
const { createHospital } = require('../../controllers/hospitalController')


hospitalRouter.post('/create', createHospital)
// hospitalRouter.post('/login', authLogin, authjwtLogin);
// hospitalRouter.post('/refreshToken', authRefreshjwt);

module.exports = hospitalRouter