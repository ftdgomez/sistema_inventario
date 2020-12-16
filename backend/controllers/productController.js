import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 20
  const page = Number(req.query.pageNumber) || 1
  const keyName = req.query.keyName || 'name'
  const keyword = req.query.keyword
    ? {
        [keyName]: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  if (req.user.isAdmin)
  {
    if (pageSize > 0)
    {
      const count = await Product.countDocuments({...keyword})
      const products = await Product.find({...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .populate('store')
      res.json({products, page, pages: Math.ceil(count / pageSize)})
    }
    else
    {
      const products = await Product.find({ ...keyword })
      res.json({products, page, pages: 1})
    }
  }
  else
  {
    if (pageSize > 0)
    {
      const count = await Product.countDocuments({...keyword, store: req.user._id})
      const products = await Product.find({...keyword, store: req.user._id})
          .limit(pageSize)
          .skip(pageSize * (page - 1))
      res.json({products, page, pages: Math.ceil(count / pageSize)})
    }
    else
    {
      const products = await Product.find({...keyword, store: req.user._id})
      res.json({products, page, pages: 1})
    }
  }
})



// @desc    Fetch ONE product
// @route   GET /api/products/:id
// @access  Public

export const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id}).populate('store')
  if (product)
  {
    res.json(product)
  }
  else
  {
    res.status(404).json({msg: 'not found'})
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body)
  product.sku = `${req.user.refid}-${product.sku}`
  try {
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400)
    console.error(error)
    throw new Error('Bad request')
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    tags,
    name,
    brand,
    description,
    variants,
    categories,
    imgpaths
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.tags =  tags
    product.name =  name
    product.brand = brand
    product.description = description
    product.variants =  variants  
    product.categories = categories
    product.imgpaths = imgpaths || product.imgpaths
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top sold products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ "variants.inStore.sold": -1 }).limit(10)
  res.json(products)
})
