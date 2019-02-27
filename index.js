const express = require('express');
const app = express();

app.use(express.json());

const investors = require('./routes/api/investors')


app.get('/',(req,res) => {
    res.send(`<h1>Wgit elcomeEE</h1>
    <a href="/api/admins">Admins</a></br>,
    <a href="/api/externalEntities">EE</a></br>,
    <a href="/api/lawyers">lawyers</a></br>,
    <a href="/api/investors">Investors</a></br>`)
    
  })
  // Direct routes to appropriate files 
app.use('/api/investors',investors)

// Handling 404
app.use((req, res) => {
  res.status(404).send({err: 'We can not find what you are looking for'});
})


const port = 8000;
app.listen(port, () => { console.log(`Server is running on port ${port}`) })



// Use it with post  app.use(express.json())  


