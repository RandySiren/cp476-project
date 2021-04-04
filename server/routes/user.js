import express from 'express'
import auth from '../middleware/auth.js'
import { getUserByID, login, signup } from '../controllers/user.js'

const router = express.Router()

router.get('/:id', auth, getUserByID)
router.post('/login', login)
router.post('/signup', signup)

export default router
