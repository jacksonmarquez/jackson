let mongoose = require('mongoose')
let validator = require('validator')

let storyInfo = new mongoose.Schema({
  sentences: Number,
  name: String,
  lifeTime: Number,
  story: Array,
  recentSentence: String,
  storyID: Number,
})

module.exports = mongoose.model('StoryInfo', storyInfo)
