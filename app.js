const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dateFormat = require('./public/dateHelper')
const { iconChoose, iconNum } = require('./public/iconHelper')
const ifEven = require('./public/indexHelper')
require('./config/mongoose')
const Record = require('./models/record')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Record.find({})
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let total = 0

      for (let i = 0; i < records.length; i++) {
        total += records[i].amount
      }
      res.render('index', { records, total })
    })
    .catch((err) => console.log(err))
})

// edit record
app.get('/records/new', (req, res) => {
  res.render('new')
})

// add record
app.post('/records', (req, res) => {
  return Record.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// edit record
app.get('/records/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then((records) => res.render('edit', { records }))
    .catch((err) => console.log(err))
})

// update record
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findById(id)
    .then((records) => {
      records.name = name
      records.date = date
      records.categoryId = Number(categoryId)
      records.amount = amount
      return records.save()
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((records) => records.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
