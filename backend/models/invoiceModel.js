import mongoose from 'mongoose'

const invoiceModel  = mongoose.Schema({
  cliente: {
    type: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      qty: {
        type: Number,
        required: true,
        default: 1
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  valido_hasta: {
    type: Date,
    required: true
  }
}, 
{
timestamp: true
}
)

const Invoice = mongoose.model('Invoice', presupuestoSchema)

export default Invoice
