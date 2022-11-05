const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// edit record
router.get('/new', (req, res) => {
  res.render('new')
})

// add record
router.post('/', (req, res) => {
  return Record.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// edit record
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then((records) => res.render('edit', { records }))
    .catch((err) => console.log(err))
})

// update record
router.put('/:id', (req, res) => {
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

// delete record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((records) => records.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
