/* eslint-disable*/
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
//const io = require(socket.io)
require('./database-connection')

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const matchesRouter = require('./routes/matches')
const accountRouter = require('./routes/account')

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

if (app.get('env') == 'development') {
  app.use(require('connect-livereload')())
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}`, `${__dirname}/views`])
}

app.set('trust proxt', 1)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothernotasupersecuresecretsecret'],
    store: MongoStore.create({ clientPromise, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: 'none',
      secure: true,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  req.session.viewCount++
  next()
})

app.use('/api/', indexRouter)
app.use('/api/account', accountRouter)
app.use('/api/users', usersRouter)
app.use('/api/matches', matchesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

console.log('Hello, world!')
module.exports = app
