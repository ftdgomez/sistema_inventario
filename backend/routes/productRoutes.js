import express from 'express'
const router = express.Router()

import {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getTopProducts
} from '../controllers/productController.js'

router.route('/')
      .get(getProducts)
      .post(createProduct)

router.route('/top')
      .get(getTopProducts)

router.route('/:id')
      .get(getOneProduct)
      .put(updateProduct)
      .delete(deleteProduct)

export default router
