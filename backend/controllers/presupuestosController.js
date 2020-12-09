import asyncHandler from 'express-async-handler'
import Presupuesto from '../models/presupuestoModel.js'


export const getPresupuestos = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageSize)
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        cliente: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  if (pageSize > 0)
  {
    const count = await Presupuesto.countDocuments({...keyword})
    const presupuestos = await Presupuesto.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('products')
    res.json({presupuestos, page, pages: Math.ceil(count / pageSize)})
  }
  else
  {
    const presupuestos = await Presupuesto.find({...keyword}).populate('products')
    res.json({presupuestos, page, pages: 1})
  }
})


export const getOnePresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = await Presupuesto.findOne({ _id: req.params.id}).populate('products')
  if (presupuesto)
  {
    res.json(presupuesto)
  }
  else
  {
    res.status(404).json({msg: 'not found'})
  }
})


export const createPresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = new Presupuesto(req.body)

  try {
    const createdPresupuesto = await presupuesto.save()
    res.status(201).json(createdPresupuesto)
  } catch (error) {
    res.status(400)
    console.error(error)
    throw new Error('Bad request')
  }
})

/* export const updateProduct = asyncHandler(async (req, res) => {
  const {
    tags,
    store,
    name,
    brand,
    description,
    variants,
    categories
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.tags =  tags
    product.store = store
    product.name =  name
    product.brand = brand
    product.description = description
    product.variants =  variants  
    product.categories = categories

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
 */


export const deletePresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = await Presupuesto.findById(req.params.id)
  if (presupuesto) {
    await presupuesto.remove()
    res.json({ message: 'presupuesto removed' })
  } else {
    res.status(404)
    throw new Error('presupuesto not found')
  }
})

