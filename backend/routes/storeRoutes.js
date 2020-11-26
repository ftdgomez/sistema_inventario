import express from 'express'
const router = express.Router()

import {
  getStores,
  getOneStore,
  getProductsByStore,
  deleteStore
} from '../controllers/storeController.js'

router.route('/')
      .get(getStores)

router.route('/:storeid/products')
      .get(getProductsByStore)

router.route('/:id')
      .get(getOneStore)
      .delete(deleteStore)

export default router
