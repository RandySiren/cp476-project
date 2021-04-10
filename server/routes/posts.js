import express from 'express'
import { getPosts, getPostByID, getPostsByUserID, deletePost, createPost, createComment } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, getPosts)
router.get('/id/:id', auth, getPostByID)
router.get('/user/:id', auth, getPostsByUserID)
router.delete('/id/:id', auth, deletePost)
router.post('/create', auth, createPost)
router.post('/id/:id/create', auth, createComment)

export default router
