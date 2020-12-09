import express from 'express'
const router = express.Router()

import {
  createPresupuesto,
  deletePresupuesto,
  getOnePresupuesto,
  getPresupuestos,
} from '../controllers/presupuestosController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
      .post(protect, admin, createPresupuesto)
      .get(protect, admin, getPresupuestos)

router.route('/:id')
      .delete(protect, admin, deletePresupuesto)
      .get(protect, admin, getOnePresupuesto)

export default router
