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

import { protect, admin, store } from '../middleware/authMiddleware.js'

router.route('/')
      .get(protect, store, getProducts)
      .post(protect,store,createProduct)

router.route('/top')
      .get(protect,store, getTopProducts)

router.route('/:id')
      .get(protect,store, getOneProduct)
      .put(protect,store, updateProduct)
      .delete(protect,store, deleteProduct)

export default router
