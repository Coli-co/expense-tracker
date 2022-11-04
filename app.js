const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')
const Record = require('./models/record')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  Record.create(req.body)
    .then(() => {
      console.log('Record created')
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

app.get('/records/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
