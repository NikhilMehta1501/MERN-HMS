const Hospital = require('../models/Hospital')

const createHospital = async(req, res) => {
  try {
    const newHosp = new Hospital({
      name : "State Hospital",
      hospitalType: 'government',
      status: 'public',
      address: {
        country: 'India',
        state: 'Delhi',
        city: 'CP',
        street: '1st Street',
        district: 'CP',
        pincode: 110058,
        buildingNumber: '1',
        landmark: 'near CP'
      },
      phoneNumber: 9876543210,
      email: 'cityHosp@gmail.com',
      admins: [req.user],
      description: 'nfeswfe'
    })
    await newHosp.save();
    res
      .status(200)
      .json({newHosp})
  } catch (error) {
    console.log(`Error has occurred: ${error}`)
  }
}

module.exports = {
  createHospital
}