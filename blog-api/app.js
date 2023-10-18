const express = require('express')

const app = express()

app.get('/poop/pea', (req, res) => {
  res.json('hello world')
})

app.listen(3000, () => {
  'app listening on port 3000'
})