import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import path from 'path' 
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import presupuestosRoutes from './routes/presupuestosRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js'
import fileuploadRoutes from './routes/fileuploadRoutes.js'

dotenv.config()

connectDB()

const app = express()
 
app.use(cors())

if (process.env.NODE_ENV === 'development')
{
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/presupuestos', presupuestosRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/fileupload', fileuploadRoutes)

const __dirname = path.resolve()
app.use('/public', express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
