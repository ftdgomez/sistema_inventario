import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import ApiCode from '../models/apicodeModel.js'
import { nanoid } from 'nanoid'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email.toLowerCase() })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStore: user.isStore,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone, apikey } = req.body
  console.log(req.body)
  // check the api code
  const apik = await ApiCode.findOne({apicode: apikey})
  if (!apik || apik.used)
  {
    res.status(401)
    throw new Error('Prohibido.')
  }
  else
  {
    const userExists = await User.findOne({ email: email.toLowerCase() })
  
    if (userExists) {
      res.status(400)
      throw new Error('No puedes utilizar ese mail.')
    }
    // comprobar que el nombre tenga al menos dos palabras
    /* let refid = name.split(' ')
    if (refid[1])
    {
      refid = name.split(' ')[1].toString().toLowerCase().replace(/,/g,'').slice(0,3)
    }
    else
    {
    } */
    refid = nanoid(3)
/* 
    console.log(refid)
     */
    try {
      const user = await User.create({
        name,
        email,
        password,
        address,
        contactPhone: phone,
        refid,
        isAdmin: apik.isAdmin,
        isStore: true,
        contactMail: email,
        hours: [
          'Lunes a vier: de 8:30 a.m. a 5:30 p.m',
          'Sábados: 9:00 a.m. a 3:00 p.m.',
          'Domingos: cerrado'
        ],
        apikey
      })
      if (user) {
        apik.used = true;
        await apik.save()
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isStore: user.isStore,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isStore: user.isStore
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStore: updatedUser.isStore,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
