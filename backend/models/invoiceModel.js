import mongoose from 'mongoose'

const invoiceSchema  = mongoose.Schema({
  cliente: {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
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
      variant: { type: Object },
    }
  ],
  total: {
    type: Number
  },
  state: {
    type: String,
    enum: ['pendiente', 'pagada', 'pago-parcial'],
    default: 'pendiente'
  },
  pagado_at: {
    type: Date,
    required: true
  }
}, 
{
timeStamp: true
}
)

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice
