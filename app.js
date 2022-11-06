const express = require('express')
const session = require('express-session')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// handlebars helper
const dateFormat = require('./public/dateHelper')
const { iconChoose, iconNum } = require('./public/iconHelper')
const ifEven = require('./public/indexHelper')
require('./config/mongoose')
const routes = require('./routes')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUnitialized: true
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
