import express from 'express'
const router = express.Router()

import {
  createPresupuesto,
  deletePresupuesto,
  getOnePresupuesto,
  getPresupuestos,
  updatePresupuesto
} from '../controllers/presupuestosController.js'

import { protect, admin, store } from '../middleware/authMiddleware.js'

router.route('/')
      .post(protect, store, createPresupuesto)
      .get(protect, store, getPresupuestos)

router.route('/:id')
      .delete(protect, store, deletePresupuesto)
      .put(protect, store, updatePresupuesto)
      .get(getOnePresupuesto)

export default router
