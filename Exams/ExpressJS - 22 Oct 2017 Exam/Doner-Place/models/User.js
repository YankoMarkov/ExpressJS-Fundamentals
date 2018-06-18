const mongoose = require('mongoose')
const encryption = require('../utility/encryption')

let objectId = mongoose.Schema.Types.ObjectId

let user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  age: {
    type: Number,
    min: [0, 'Age must be between 0 and 120'],
    max: [120, 'Age must be between 0 and 120']
  },
  salt: { type: String, required: true },
  roles: [{ type: String, required: true }]
})

user.method({
  authenticate: function (password) {
    return encryption.generateHashedPass(this.salt, password) === this.password
  }
})

const User = mongoose.model('User', user)
User.seedAdminUser = async () => {
  try {
    let users = await User.find()
    if (users.length > 0) return
    const salt = encryption.generateSalt()
    const hashedPass = encryption.generateHashedPass(salt, 'Admin')
    return User.create({
      username: 'admin',
      password: hashedPass,
      salt,
      roles: ['Admin']
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = User