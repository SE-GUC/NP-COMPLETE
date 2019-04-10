const express = require('express')
const mongoose = require('mongoose')

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

const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

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

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT | 8000
app.listen(port, () => { console.log(`Server is up and running on port ${port}`) })
