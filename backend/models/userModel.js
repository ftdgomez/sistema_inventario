import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refid: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isStore: {
      type: Boolean,
      required: true,
      default: false
    },
    address: {
      type: String,
      required: false
    },
    googleMapsUrl: {
      type: String,
      required: false
    },
    contactPhone: {
      type: String,
      required: false,
      match: [/([0-9])\w+/g, 'Solo valores numericos.'] // only numerical values
    },
    contactMail: {
      type: String,
      required: false,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // only email format
    },
    hours: {
      type: [String]
    },
    apikey: {
      type: String,
      required: false
    }
  },
  {
    timeStamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
