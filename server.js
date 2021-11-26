const path = require('path')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const helmet = require('helmet')
const connectDB = require('./config/db')

const app = express()

//Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Load config
if (process.env.NODE_ENV !== "production") {
  dotenv.config({path : './config/config.env'})
}
//Connect to DB
connectDB()

//-----Middleware Start-----

//Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET))

//cors
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

//helmet
app.use(helmet())

//session
app.use(session({
  secret: "qwerty",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

//passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/LocalStrategy')(passport)
require('./config/JWTStrategy')(passport)

//Morgan logger
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//Disable x-powered-by header
app.disable('x-powered-by')

//------Middleware END------

//Routes
const { authRoutes } = require('./routes/api')
app.use('/api/auth', authRoutes)

// const { hospitalRoutes } = require('./routes/api')
// app.use('/api/hospital', passport.authenticate("jwt", { session: false }), hospitalRoutes)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

//Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> { console.log(`Server is up at ${PORT} in ${process.env.NODE_ENV} mode`); })