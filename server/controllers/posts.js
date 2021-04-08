import Post from '../models/Post.js'
import User from '../models/User.js'

export const getPosts = async (req, res) => {
  const posts = await Post.find({})
  if (!posts) {
    return res.status(400).json({ error: 'No posts found' })
  }
  return res.status(200).json(posts)
}

export const getPostByID = async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  if (!post) {
    return res.status(400).json({ error: `No post found by ID: ${id}` })
  }
  return res.status(200).json(post)
}

export const getPostsByUserID = async (req, res) => {
  let { id } = req.params
  if (id === 'me') {
    id = req.userId.id
  }
  const posts = await Post.find({ author: id })
  if (!posts) {
    return res.status(400).json({ error: `No posts found by user ID: ${id}` })
  }
  return res.status(200).json(posts)
}

export const createPost = async (req, res) => {
  const { title, content } = req.body
  const user = await User.findById(req.userId.id)
  if (!user) return res.status(400).json({ error: 'Could not find user to create post' })
  const post = new Post({
    author: user,
    authorName: user.name,
    date: Date.now(),
    title,
    content,
  })
  post.save((err, doc) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    return res.status(200).json({ result: doc._id })
  })
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  await Post.findByIdAndDelete(id, (err, doc) => {
    if (err) return res.status(400).json({ error: err })
    return res.status(204).json({})
  })
}
