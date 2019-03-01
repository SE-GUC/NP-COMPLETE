const express = require('express')
const app = express()

app.use(express.json())

const lawyers = require('./routes/api/lawyers')

app.get('/', (req, res) => {
  res.send(`<h1>WelcomeEE</h1>`)
})

// Direct routes to appropriate files
app.use('/api/lawyers', lawyers)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = 8000
app.listen(port, () => { console.log(`Server is running on port ${port}`) })
