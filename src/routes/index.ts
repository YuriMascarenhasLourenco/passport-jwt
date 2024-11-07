import express from 'express'
import { loginController, registerController } from '../controllers/controller'
import { privateRoute } from '../config/passport'

export const router=express.Router()

router.post('/register', registerController)
router.post('/login',privateRoute ,loginController)