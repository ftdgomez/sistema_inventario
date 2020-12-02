import mongoose from 'mongoose'

const variationSchema = mongoose.Schema({
  ref: {
    type: String,
    required: true
  },
  unityPrice: {
    type: Number,
    required: false
  },
  sellPrice: {
    type: Number,
    required: true
  },
  inStore: [
    {
    store: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Store',
        default: 'defaultstore'
      },
    countInStock: {
        type: Number,
        required: true
      },
    sold: {
        type: Number,
        default: 0
      }
    }
  ],
})

const productSchema  = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }],
  variants: [variationSchema],
}, {
timestamp: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
