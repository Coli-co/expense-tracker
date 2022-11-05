const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
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

module.exports = router
