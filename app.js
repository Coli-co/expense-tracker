const express = require('express')
const PORT = process.env.PORT

require('./config/mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
