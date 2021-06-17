const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  favoriteGenre:{
    type:String,
    required: true,
  },
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('user', schema)
