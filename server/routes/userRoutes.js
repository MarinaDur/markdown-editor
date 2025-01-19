import express from 'express'

import {
  signup,
  login,
  protect,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'
import { getMe } from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/getMe', protect, getMe)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

export default router
