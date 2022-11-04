const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express()

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/record/new', (req, res) => {
  res.render('new')
})

app.get('/record/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
