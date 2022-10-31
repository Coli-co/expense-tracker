const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
