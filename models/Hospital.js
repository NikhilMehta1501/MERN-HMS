const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

// const AddressSchema = mongoose.Schema({
//   pincode: Number,
//   city: String,
//   street: String,
//   district: String,
//   buildingNumber: String
// });

const HospitalSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "name",
  },
  hospitalType: {
    type: String,
    enum: ['government', 'private'],
    required: true
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
  },
  address: {
    country: String,
    state: String,
    city: String,
    street: String,
    district: String,
    pincode: Number,
    buildingNumber: String,
    landmark: String
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  description: {
    type: String
  }
})

module.exports = mongoose.model('Hospital', HospitalSchema)