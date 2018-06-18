const mongoose = require('mongoose')
const encryption = require('../utility/encryption')

let user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
      email: 'admin@a.a',
      password: hashedPass,
      salt,
      roles: ['Admin']
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = User