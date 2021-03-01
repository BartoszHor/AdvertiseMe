const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user: { type: String },
    emails: { type: String},
  isLogged: { type: Boolean, default: false},
});

module.exports = mongoose.model('User', userSchema);
