const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Require Router Handlers

const externalEntities = require('./routes/api/externalEntities')
const admins = require('./routes/api/admins')
const investors = require('./routes/api/investors')
const lawyers = require('./routes/api/lawyers')
const reviewers = require('./routes/api/reviewers')
const companies = require('./routes/api/companies')
const tasks = require('./routes/api/tasks')
const companyTypes = require('./routes/api/companyTypes')
const users = require('./routes/api/users')
const user = require('./routes/api/user')
const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

// DB Config
const db = require('./config/keys').mongoURI
// // Passport configuration
require('./config/passport')(passport)
// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// added cors access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/', (req, res) => {
  res.send(`<h1>Welcome</h1>
  <a href="/api/admins">Admins</a></br>
  <a href="/api/companies">Companies</a></br>
  <a href="/api/externalEntities">External Entities</a></br>
  <a href="/api/investors">Investors</a></br>
  <a href="/api/lawyers">lawyers</a></br>
  <a href="/api/reviewers">Reviewers</a></br>
<a href="/api/tasks">Tasks</a></br>`)
})

// Direct routes to appropriate files
app.use('/api/externalEntities', externalEntities)
app.use('/api/admins', admins)
app.use('/api/investors', investors)
app.use('/api/reviewers', reviewers)
app.use('/api/lawyers', lawyers)
app.use('/api/companies', companies)
app.use('/api/tasks', tasks)
app.use('/api/companyTypes', companyTypes)
app.use('/api/users', users)
app.use('/api/user',user)

// 500 internal server error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 400) {
    return next(err)
  }

  return res.status(500).json({
    data: null,
    err: process.env === 'production'
      ? null
      : err,
    msg: process.env === 'production'
      ? 'Error!'
      : '500 Internal Server Error'
  })
})

// 400 error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 404) {
    return next()
  }

  return res.status(400).json({
    data: null,
    err: process.env === 'production'
      ? null
      : err,
    msg: '400 Bad Request'
  })
})

// 404 error handler
app.use((_req, res) => res.status(404)
  .json({
    data: null,
    status: 'Error',
    msg: 'Error 404: We can not find what you are looking for'
  }))

// const port = process.env.PORT | 8000
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000

app.listen(port, () => { console.log(`Server is up and running on port ${port}`) })

// to force heroku to deploy since there is no changes
