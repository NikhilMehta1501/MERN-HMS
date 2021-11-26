const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const AddressSchema = mongoose.Schema({
  pincode: Number,
  city: String,
  street: String,
  district: String,
  buildingNumber: String
});

const HospitalSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    slug: "name",
    slugPaddingSize: 5
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
    country: { String, required: true },
    state: { String, required: true },
    city: { String, required: true },
    street: String,
    district: String,
    pincode: { Number, required: true },
    buildingNumber: { String, required: true },
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
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  description: {
    type: String
  }
  
})

module.exports = mongoose.model('Hospital', HospitalSchema)