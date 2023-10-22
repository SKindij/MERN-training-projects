// User.js
const mongoose = require('mongoose')

// створення схеми для моделі User
const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee" // за замовчуванням
    }],
    active: {
        type: Boolean,
        default: true // за замовчуванням
    }
  }
);

module.exports = mongoose.model('User', userSchema);
