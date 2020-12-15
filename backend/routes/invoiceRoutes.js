import express from 'express'
const router = express.Router()

import {
  createInvoice,
  deleteInvoice,
  getOneInvoice,
  getInvoices,
  updateInvoice
} from '../controllers/invoiceController.js'

import { protect, admin, store } from '../middleware/authMiddleware.js'

router.route('/')
      .post(protect, store, createInvoice)
      .get(protect, store, getInvoices)

router.route('/:id')
      .delete(protect, store, deleteInvoice)
      .put(protect, store, updateInvoice)
      .get(getOneInvoice)

export default router
