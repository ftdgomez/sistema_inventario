import asyncHandler from 'express-async-handler'
import Store from '../models/storeModel.js'
import Product from '../models/productModel.js'

// @desc    Fetch all store
// @route   GET /api/store
// @access  Public

export const getStores = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Store.countDocuments({...keyword})
  const products = await Store.find({...keyword})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  res.json({products, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch ONE store
// @route   GET /api/store/:id
// @access  Public

export const getOneStore = asyncHandler(async (req, res) => {
  const product = await Store.findOne({ _id: req.params.id})
  if (product)
  {
    res.json(product)
  }
  else
  {
    res.status(404)
    throw new Error('Store not found')
  }
})


// @desc    Delete a store
// @route   DELETE /api/store/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Store.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Store removed' })
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})

// @desc    Fetch all products
// @route   GET /api/stores/:id/products
// @access  Public
export const getProductsByStore = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({store: req.params.storeid})
    res.json(products)
  } catch (error) {
    res.status(404)
    throw new Error('Bad params')
  }
})


