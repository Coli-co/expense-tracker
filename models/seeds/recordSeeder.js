const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')

const seedUser = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    recordIndex: [0, 1, 2, 4]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    recordIndex: [3]
  }
]
const seedRecord = [
  {
    name: '午餐',
    date: '2022-4-23',
    categoryId: 4,
    amount: 60
  },
  {
    name: '晚餐',
    date: '2022-4-23',
    categoryId: 4,
    amount: 60
  },
  {
    name: '捷運',
    date: '2022-4-24',
    categoryId: 2,
    amount: 120
  },
  {
    name: '電影:驚奇隊長',
    date: '2022-4-23',
    categoryId: 3,
    amount: 60
  },
  {
    name: '租金',
    date: '2022-4-1',
    categoryId: 1,
    amount: 25000
  }
]

db.once('open', () => {
  return Promise.all(
    seedUser.map((user) => {
      const { name, email, password, recordIndex } = user
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      }).then((user) => {
        const records = recordIndex.map((index) => {
          const record = seedRecord[index]
          record.userId = user._id
          return record
        })
        return Record.create(records)
      })
    })
  )
    .then(() => {
      console.log('Record seeder created successfully')
      process.exit()
    })
    .catch((error) => console.log(error))
})
