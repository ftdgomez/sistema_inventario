import express from 'express'
const router = express.Router()

import {
  getStores,
  getOneStore,
  getProductsByStore
} from '../controllers/storeController.js'

router.route('/')
      .get(getStores)

router.route('/:storeid/products')
      .get(getProductsByStore)

router.route('/:id')
      .get(getOneStore)

export default router
