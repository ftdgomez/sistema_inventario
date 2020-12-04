import express from 'express'
const router = express.Router()

import {
  createPresupuesto, getPresupuestos,
} from '../controllers/notasController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/presupuesto')
  .post(protect, admin, createPresupuesto)
  .get(getPresupuestos)
export default router
