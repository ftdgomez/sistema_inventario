import asyncHandler from 'express-async-handler'
import Invoice from '../models/invoiceModel.js'
import Product from '../models/productModel.js'

export const getInvoices = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageSize)
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        refid: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    if (req.user.isAdmin)
    {
      if (pageSize > 0)
      {
        const count = await Invoice.countDocuments({...keyword})
        const invoices = await Invoice.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('products')
            .populate('store')
        res.json({invoices, page, pages: Math.ceil(count / pageSize)})
      }
      else
      {
        const invoices = await Invoice.find({...keyword}).populate('products').populate('store')
        res.json({invoices, page, pages: 1})
      }
    }
    else
    {
      if (pageSize > 0)
      {
        const count = await Invoice.countDocuments({...keyword, store: req.user._id})
        const invoices = await Invoice.find({...keyword, store: req.user._id})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('products')
        res.json({invoices, page, pages: Math.ceil(count / pageSize)})
      }
      else
      {
        const invoices = await Invoice.find({...keyword, store: req.user._id}).populate('products')
        res.json({invoices, page, pages: 1})
      }
    }
})


export const getOneInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({ _id: req.params.id})
                                       .populate('items.product')
                                       .populate('store')
  if (invoice)
  {
    res.json(invoice)
  }
  else
  {
    res.status(404).json({msg: 'not found'})
  }
})


export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = new Invoice(req.body)

  try
  {
    const createdInvoice = await invoice.save()

    createdInvoice.items.forEach(async (item) => {
      let product = await Product.findOne({_id: item.product})
      let indexRef = product.variants.findIndex(x => x.ref === item.variant.ref)
      product.variants[indexRef].countInStock -= item.qty
      product.variants[indexRef].sold += item.qty
      product.save()
    }) 

    res.status(201).json(createdInvoice)
  }
  catch (error)
  {
    res.status(400)
    console.error(error)
    throw new Error('Bad request')
  }
})

export const updateInvoice = asyncHandler(async (req, res) => {

  let invoice = await Invoice.findById(req.params.id)
  console.log(req.body)
  if (invoice) {
    const {
      cliente,
      store,
      items,
      state,
      pagado_at,
      total
    } = req.body
    invoice.cliente = cliente
    invoice.store = store
    invoice.items = items
    invoice.state = state
    invoice.pagado_at = pagado_at
    invoice.total = total

    /* res.json(invoice) */
    const updatedP = await invoice.save() 
    res.json(updatedP)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})
 


export const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
  if (invoice) {
    await invoice.remove()
    res.json({ message: 'invoice removed' })
  } else {
    res.status(404)
    throw new Error('invoice not found')
  }
})

