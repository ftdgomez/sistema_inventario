import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'


import products from './data/productsData.js'
import users from './data/userData.js'


import Product from './models/productModel.js'
import User from './models/userModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importUserAndProducts = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    const createdUsers = await User.insertMany(users)
    // const adminUser = createdUsers[0]._id
    
    const draftProducts = products.map((product, index) => {
      return { ...product, store: createdUsers[index % 2 === 0 ? 1 : 0]._id, sku: `${createdUsers[index % 2 === 0 ? 1 : 0].refid}-${product.sku}` }
    })

    
    await Product.insertMany(draftProducts)
    
/*     const sampleProducts = createdProducts.map(product => {
      return { ...product, sku: product._id.slice(-4).toString().replace(/,/g, '')}
    }) */
/* 
    createProducts.forEach(async (product) => {
      await Product.update({sku: product._id.slice(-6).toString().replace(/,/g, '')})
    }) */

    console.log('Data Imported! users and products'.green.inverse)
  }
  catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}


const importData = async () =>{
  await importUserAndProducts()
  process.exit()
}
/*  

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
*/

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
} 
