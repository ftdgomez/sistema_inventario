import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import { nanoid } from 'nanoid'
import connectDB from './config/db.js'
import ApiCode from './models/apicodeModel.js'

dotenv.config()


export const generateApiCode = async (qty = 1, isAdmin) => {
  connectDB()
  let apicodeArray = []
  try {
    for (let i = 1; i <= qty; i++) {
      const apicode = await ApiCode.create({
        apicode: nanoid(),
        isAdmin: isAdmin
      })
      apicodeArray.push(apicode.apicode)
    }
    const msg = `Se ${qty > 1 ? 'han' : 'ha'} creado ${qty} apicode${qty > 1 ? 's' : ''}`
    console.log(msg.green.inverse)
  } catch (error) {
    console.error(error)
    return null
  }
  return qty > 1 ? apicodeArray : apicodeArray[0]
}

const generateRegisterLink = async (qty, isAdmin=false) => {
  let apicodes = await generateApiCode(qty, isAdmin)
  apicodes.forEach((apicode)=> {
    console.log(`https://inventario.refrigeracionmc.com/register/${apicode}`)
  })
  process.exit()
}

const args = process.argv.slice(2);

switch (args[0]) {
case 'registerstore':
    generateRegisterLink(args[1] ? args[1] : 1)
    break;
case 'registeradmin':
    generateRegisterLink(args[1] ? args[1] : 1, true)
    break;
default:
    console.log('Sorry, that is not something I know how to do.');
}


