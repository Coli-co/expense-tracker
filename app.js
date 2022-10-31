const express = require('express')
const PORT = 3000

require('./config/mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
