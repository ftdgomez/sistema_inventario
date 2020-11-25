import mongoose from 'mongoose'

const storeSchema  = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  googleMapsUrl: {
    type: String,
    required: false
  },
  personInCharge: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true,
    match: [/([0-9])\w+/g] // only numerical values
  },
  contactMail: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // only email format
  }
}, 
{
timestamp: true
})

const Store = mongoose.model('Store', storeSchema)

export default Store
