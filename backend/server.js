const express = require("express")
const app = express()
const apiPort = 4000
const cors = require('cors')
const bodyParser = require('body-parser')

const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth-router')
const projectRouter = require('./routes/project-router')
const lineRouter = require('./routes/line-login-router')
require('./controllers/auth-ctrl')

const COOKIE_SECRET = '321secret'

app.use(cookieParser(COOKIE_SECRET))
app.use(cors({credentials: true, origin: 'https://localhost:3000'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



const db = require('./db')
//Additional DB check
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(session({
  secret: 'sessionSecret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', passport.authenticate('jwt', { session : false }), projectRouter)
app.use('/', authRouter)
app.use('/line', lineRouter)
//We plugin our jwt strategy as a middleware so only verified users can access this route
//Handle defaulted errors

app.listen(apiPort, () => console.log('Express app start on port ' + apiPort))
