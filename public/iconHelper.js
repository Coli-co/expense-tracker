const handlebars = require('handlebars')
const CATEGORY = {
  家居物業: 'fa-solid fa-house',
  交通出行: 'fa-solid fa-van-shuttle',
  休閒娛樂: 'fa-solid fa-face-grin-beam',
  餐飲食品: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen'
}

const iconNumber = {
  1: '家居物業',
  2: '交通出行',
  3: '休閒娛樂',
  4: '餐飲食品',
  5: '其他'
}

const iconChoose = handlebars.registerHelper('iconChoose', function (number) {
  // choose number
  const item = iconNumber[number]
  // choose icon link
  return CATEGORY[item]
})

module.exports = iconChoose
