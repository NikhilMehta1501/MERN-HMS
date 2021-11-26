const mongoose = require('mongoose')

const Session = new mongoose.Schema({
  token: {
    type: String,
    default: "",
  },
  expires: {
    type: Number,
    default: "",
  }
})

const UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
    unique: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: [Session],
  }
})

//Remove refreshToken from the response
UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

module.exports = mongoose.model('User', UserSchema)