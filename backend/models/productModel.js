import mongoose from 'mongoose'

const variationSchema = mongoose.Schema({
  ref: {
    type: String,
    required: true
  },
  sellPrice: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },
  sold: {
      type: Number,
      default: 0
    },
  imgs: {
    type: [String],
  }
})

const productSchema  = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  thumbnail: [],
  variants: [variationSchema],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
},
{
timeStamp: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
