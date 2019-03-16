const express = require('express')
const externalEntities = require('./routes/api/externalEntities')
const admins = require('./routes/api/admins')
const investors = require('./routes/api/investors')
const lawyers = require('./routes/api/lawyers')
const reviewers = require('./routes/api/reviewers')
const companies = require('./routes/api/companies')
const tasks = require('./routes/api/tasks')

const app = express()
app.use(express.json())

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

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.port | 8000
app.listen(port, () => { console.log(`Server is up and running on port ${port}`) })
