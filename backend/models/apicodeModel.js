import mongoose from 'mongoose'

const apicodeShcema = mongoose.Schema({
  apicode: {
    type: String,
    unique: true
  },
  used: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const ApiCode = mongoose.model('ApiCode', apicodeShcema)

export default ApiCode
