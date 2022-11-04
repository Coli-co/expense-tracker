const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dateFormat = require('./public/dateHelper')
const iconChoose = require('./public/iconHelper')
const ifEven = require('./public/indexHelper')
require('./config/mongoose')
const Record = require('./models/record')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  Record.find({})
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let total = 0

      for (let i = 0; i < records.length; i++) {
        total += records[i].amount
      }
      res.render('index', { records, total, dateFormat, iconChoose, ifEven })
    })
    .catch((err) => console.log(err))
})

// edit record
app.get('/records/new', (req, res) => {
  res.render('new')
})

// add record
app.post('/records', (req, res) => {
  Record.create(req.body)
    .then(() => {
      console.log('Record created')
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// edit record
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, catgoryId, amount } = req.body
  Record.findById(id)
    .lean()
    .then((records) => {
      records.name = name
      records.date = date
      records.catgoryId = catgoryId
      records.amount = amount
      Record.save()
    })
    .then(() => res.render('edit', { records }))
    .catch((err) => console.log(err))
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
