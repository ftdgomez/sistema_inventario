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
    }
})

const productSchema  = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  sku: {
    type: String,
    required: true,
    unique: false
  },
  brand: {
    type: String,
    required: true,
    unique: false
  },
  tags: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imgpaths: {
    type: [String],
    default: ['/public/default.jpg']
  },
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
