import mongoose from 'mongoose'

const presupuestoSchema  = mongoose.Schema({
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
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },
  valido_hasta: {
    type: Date,
    required: true
  }
}, 
{
timeStamp: true
}
)

const Presupuesto = mongoose.model('Presupuesto', presupuestoSchema)

export default Presupuesto
