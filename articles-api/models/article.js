const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  author:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  subtitle:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Article',articleSchema);