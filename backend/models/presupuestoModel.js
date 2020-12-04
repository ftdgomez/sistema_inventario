import mongoose from 'mongoose'

const presupuestoSchema  = mongoose.Schema({
  cliente: {
    type: String,
  },
  vendedor: {
    type: String,
    required: true
  },
  items: {
    type: [],
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  }],
}, 
{
timestamp: true
})

const Presupuesto = mongoose.model('Presupuesto', presupuestoSchema)

export default Presupuesto
