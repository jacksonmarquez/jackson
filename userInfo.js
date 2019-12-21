let mongoose = require('mongoose')
let validator = require('validator')

let userInfo = new mongoose.Schema({
  username: String,
  score: Number,
  level: Number,
  stories: Number,
  letters: Number,
  words: Number,
})



module.exports = mongoose.model('UserInfo', userInfo)
