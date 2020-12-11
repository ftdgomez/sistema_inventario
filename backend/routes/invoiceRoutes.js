import express from 'express'
const router = express.Router()

import {
  createInvoice,
  deleteInvoice,
  getOneInvoice,
  getInvoices,
  updateInvoice
} from '../controllers/invoiceController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
      .post(protect, admin, createInvoice)
      .get(protect, admin, getInvoices)

router.route('/:id')
      .delete(protect, admin, deleteInvoice)
      .put(protect, admin, updateInvoice)
      .get(protect, admin, getOneInvoice)

export default router
