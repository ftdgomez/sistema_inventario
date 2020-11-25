import mongoose from 'mongoose'

const variationSchema = mongoose.Schema({
  ref: {
    type: String,
    required: true
  },
  unityPrice: {
    type: Number,
    required: true
  },
  sellPrice: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  }
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
  store: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Store',
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }],
  prices: [variationSchema],
  sold: {
    type: Number,
    default: 0
  }
}, {
timestamp: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
