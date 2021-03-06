const mongoose = require("mongoose");
const validator = require("validator");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid !");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password Length should be greater than 6 !");
      }
      
    },
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },
})

  UserSchema.pre('save' , async function(next) {
    const user = this
    console.log('Saving')
    next()
  }) 

const User = mongoose.model('User' , UserSchema)

module.exports = User;
