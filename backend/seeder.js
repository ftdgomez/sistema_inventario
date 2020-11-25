import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import stores from './data/storeData.js'
import products from './data/productsData.js'
import categories from './data/categoriesData.js'
import users from './data/userData.js'

import Store from './models/storeModel.js'
import Product from './models/productModel.js'
import Category from './models/categoryModel.js'
import User from './models/userModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importUserAndProducts = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported! users and products'.green.inverse)
  }
  catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const importCategories = async () => {
  try {
    await Store.deleteMany()
    await Category.deleteMany()
    await Store.insertMany(stores)
    await Category.insertMany(categories)
    console.log('Data Imported! stores and categories'.green.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}


const importData = async () =>{
  await importUserAndProducts()
  await importCategories()
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
