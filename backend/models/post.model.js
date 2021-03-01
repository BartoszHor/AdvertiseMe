const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: String },
  status: { type: String, required: true },
  title: { type: String, required: true, minLength: 10, maxLength: 25},
  text: { type: String, required: true, minLength: 20, maxLength: 50 },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  description: {type: String},
  email: {type: String},
  userId: {type: String, ref: 'User'},
});

module.exports = mongoose.model('Post', postSchema);
