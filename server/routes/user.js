import express from 'express'
import { login, signup } from '../controllers/user.js'

const router = express.Router()

router.post('/login', login)
router.get('/login',(req,res)=>{
  res.sendFile(../../client/src/pages/login.html);
})
router.post('/signup', signup)

export default router
